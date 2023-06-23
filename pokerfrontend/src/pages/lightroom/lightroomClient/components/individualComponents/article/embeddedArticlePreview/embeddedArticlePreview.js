import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import EmbeddedPreviewCSS from "./embeddedArticlePreview.module.css";
import ReactGA from "react-ga";

function EmbeddedArticlePreview(props) {
    //states
    const [articleTitle, setArticleTitle] = useState(props.title);
    const [articleTag, setArticleTag] = useState(props.tag);
    const [articleThumbnail, setArticleThumbnail] = useState(props.thumbnailLink);
    const [articleThumbnailUrl, setArticleThumbnailUrl] = useState("");
    const [content, setContent] = useState(props.content);
    const [id, setId] = useState(props.id);
  


        
    const handleClick = () => {
        ReactGA.event({
            category: 'User',
            action: 'Clicked on another article after reading an article'
          });
    }
    

    useEffect(() => {
        console.log(id);
    }, [id]);

        // This useEffect gets used to render the image 

        useEffect(() => {

            fetchThumbnail();
            
        }, [articleThumbnail]);

            // useEffect hook to fetch articles
   
    
        const fetchThumbnail = async () => {
            try {
                const response = await fetch(`http://localhost:4000/lightroomimage/view/${articleThumbnail}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
    
                });
    
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
    
                const data = await response.json();
                setArticleThumbnailUrl(data.url);
                console.log("Article thumnail", articleThumbnail);
                console.log("Article Thumbnail url", articleThumbnailUrl);
            }   catch (error) {
                console.error("Failed to fetch image data:", error);
            }
    
        }
    
        return(
            <Link to={`/seventwo/article/${id}`} className={EmbeddedPreviewCSS["linkStyle"]} onClick={handleClick}>
                <div className={EmbeddedPreviewCSS["embedded-container"]} width={400} height={400}>
                    <img src={articleThumbnailUrl} className={EmbeddedPreviewCSS["embedded-image"]} />
                    <h3 className={EmbeddedPreviewCSS["embedded-h3"]}>{articleTitle}</h3>
                    
                    
                </div>
            </Link>
        )
    }
    
    



    export default EmbeddedArticlePreview;
