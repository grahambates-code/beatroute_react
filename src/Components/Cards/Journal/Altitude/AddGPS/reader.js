
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {gpx} from '@mapbox/togeojson'
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";

// example of using that class
import {GoogleMapsApi} from './../../../../../util/googlemaps';

export default function MyDropzone({card, updateData, close}) {

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

           // console.log( gpx(doc).features);
            let path = gpx(doc).features[0].geometry.coordinates.map(s => ({lng : s[0], lat : s[1]}));

            console.log(path);

            gmapApi.load().then(() => {

                const elevator = new window.google.maps.ElevationService();

                elevator.getElevationAlongPath(
                    {
                        path: path,
                        samples: 256,
                    },
                    (e) => {
                        let r = (e.map(d => ({type : "Feature", properties : {elevation : d.elevation}, geometry : {type : "Point", coordinates : [d.location.lng(), d.location.lat()]}})));

                        updateData({ variables : {card_id : card.id, data : {type : 'FeatureCollection', features : r} }});
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
            <AddCircleOutline></AddCircleOutline> Drag your gpx file here
        </div>
    )
}
