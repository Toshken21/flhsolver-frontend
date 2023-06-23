import {React, useState, useEffect} from "react";
import articlePreviewCSS from "./articlePreview.module.css";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";

// states for ArticlePreview

function ArticlePreview(props) {
    const [articleTitle, setArticleTitle] = useState(props.title);
    const [articleTag, setArticleTag] = useState(props.tag);
    const [articleThumbnail, setArticleThumbnail] = useState(props.thumbnailLink);
    const [articleThumbnailUrl, setArticleThumbnailUrl] = useState("");
    const [content, setContent] = useState(props.content);
    const [id, setId] = useState(props.id);

    const handleClick = () => {
        ReactGA.event({
            category: 'User',
            action: 'Clicked at an account from the main lightroom page'
          });
    }

    useEffect(() => {
        console.log(id);
    }, [id]);

    // This useEffect gets used to render the background image 

    useEffect(() => {

        fetchThumbnail();
        
    }, [articleThumbnail]);



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
        <Link to={`/seventwo/article/${id}`} className={articlePreviewCSS["linkStyle"]} onClick={handleClick}>
            <div style={{
                backgroundImage: `url(${articleThumbnailUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }} className={articlePreviewCSS["preview-container"]} width={300} height={300}>
                
                <div className={articlePreviewCSS["preview-h3-container"]}>
                    <h3 className={articlePreviewCSS["preview-h3"]}>{articleTag}</h3>
                </div>
                <div className={articlePreviewCSS["preview-darker-div"]}>
                <h1 className={articlePreviewCSS["preview-h1"]}>{articleTitle}</h1>
                </div>
                
            </div>
        </Link>
    )
}


export default ArticlePreview;