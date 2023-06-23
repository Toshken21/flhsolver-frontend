import { React, useState, useEffect } from "react";
import LightRoomPreviewCSS from "./lightroomPreview.module.css";

function LightRoomPreview(props){
    let ourData = JSON.parse(localStorage.getItem("previewData"));

    const [previewData, setPreviewData] = useState(ourData);
    const [imageData, setImageData] = useState({});

    useEffect(() => {
        const fetchImageData = async () => {
            ourData.forEach(async (iteratedArray) => {
                if(iteratedArray[1] === "img") {
                    try {
                        console.log(iteratedArray[2]);
                        const response = await fetch(`http://localhost:4000/lightroomimage/view/${iteratedArray[2]}`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                            },

                        });

                        if (!response.ok) {
                            throw new Error("HTTP error " + response.status);
                        }

                        const data = await response.json();
                        setImageData(prevData => ({
                            ...prevData,
                            [iteratedArray[2]]: { url: data.url, caption: data.caption }
                        }));
                    } catch (error) {
                        console.error("Failed to fetch image data:", error);
                    }
                }
            })
        };

            fetchImageData();
        }, [ourData]);

        const clearLocalStorage = () => {
            localStorage.removeItem("previewData");
            setPreviewData([]);
        }

        const renderAllArrays = (myArrayHolder) => {
            return myArrayHolder.map((iteratedArray) => {
                switch(iteratedArray[1]){
                    case "h1":
                        return <h1 className={LightRoomPreviewCSS["h1-preview"]} key={iteratedArray[0]}>{iteratedArray[2]}</h1>
                    case "h2":
                        return <h2 className={LightRoomPreviewCSS["h2-preview"]} key={iteratedArray[0]}>{iteratedArray[2]}</h2>
                    case "h3":
                        return <h3 className={LightRoomPreviewCSS["h3-preview"]} key={iteratedArray[0]}>{iteratedArray[2]}</h3>
                    case "h4":
                        return <h4 className={LightRoomPreviewCSS["h4-preview"]} key={iteratedArray[0]}>{iteratedArray[2]}</h4>
                    case "p":
                        return <p className={LightRoomPreviewCSS["p-preview"]} key={iteratedArray[0]}>{iteratedArray[2]}</p>
                    case "img":
                        if (imageData[iteratedArray[2]]) {  
                            return <img className={LightRoomPreviewCSS["img-preview"]} key={iteratedArray[0]} src={imageData[iteratedArray[2]].url} alt={imageData[iteratedArray[2]].caption}/>
                        }
                        return null;
                    default:
                        console.log("Unknown element type");
                }
            });
        }

        return(
            <div className={LightRoomPreviewCSS["preview-holder"]}>
                {renderAllArrays(previewData)}
                <button className={LightRoomPreviewCSS["reset-button"]} onClick={clearLocalStorage}>Clear local data</button>
            </div>
        )
    }

    export default LightRoomPreview;
