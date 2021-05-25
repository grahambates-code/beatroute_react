
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {gpx} from '@mapbox/togeojson'
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";

// example of using that class
import {GoogleMapsApi} from './../../../../../util/googlemaps';

export default function MyDropzone({card, updateTripGeojson}) {

    const onDrop = useCallback(acceptedFiles => {

        if (!acceptedFiles[0].name.endsWith('.gpx')) {
            alert("You must upload GPX files");

            return;
        }

        var reader = new FileReader();

        reader.onload = function(e) {
            var readXml=e.target.result;

            var parser = new DOMParser();
            var doc = parser.parseFromString(readXml, "application/xml");

            const gmapApi = new GoogleMapsApi();

            let path = gpx(doc).features.filter(d => d.geometry.type=== 'Point').map(s => ({lng : s.geometry.coordinates[0], lat : s.geometry.coordinates[1]}));

            gmapApi.load().then(() => {

                const elevator = new window.google.maps.ElevationService();

                elevator.getElevationAlongPath(
                    {
                        path: path,
                        samples: 256,
                    },
                    (e) => {
                        let r = (e.map(d => ({type : "Feature", properties : {elevation : d.elevation}, geometry : {type : "Point", coordinates : [d.location.lng(), d.location.lat()]}})));
                        updateTripGeojson({ variables : {card_id : card.id, data : {type : 'FeatureCollection', features : r} }});
                    }
                );

            });

        }

        reader.readAsText(acceptedFiles[0]);

    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <AddCircleOutline></AddCircleOutline>
        </div>
    )
}
