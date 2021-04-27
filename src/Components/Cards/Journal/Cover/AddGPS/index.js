import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {gpx} from '@mapbox/togeojson'

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

            updateTripGeojson({ variables : {id : card.id, geojson : gpx(doc) }});
        }

        reader.readAsText(acceptedFiles[0]);

    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ? <p>Drop here ...</p> : <button>Add GPS</button>
            }
        </div>
    )
}
