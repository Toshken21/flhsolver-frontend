import {React, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import articleCSS from "./article.module.css";
import EmbeddedArticlePreview from "./embeddedArticlePreview/embeddedArticlePreview";
import { Link, Element } from "react-scroll";
import TableOfContents from "./tableOfContents/tableOfContents";
import ReactGA from "react-ga";

function Article(props) {
    let {id} = useParams();
    const [content, setContent] = useState([]);
    const [imageData, setImageData] = useState({});
    const [allArticles, setAllArticles] = useState([]);
    const [embeddedArticles, setEmbeddedArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    
    // this function is used to measure how often the users go back to the main lightroom page
    const handleLightroomClick = () => {
        ReactGA.event({
            category: 'User',
            action: 'Went back to the main lightroom page from an article'
          });
    }




    
    //shuffleArray function
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {                
            let j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        }
        return array;
    }

    

    // This useEffect hook fetches the article
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`http://localhost:4000/lightroom/article/view/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP Error! status: ${response.status}`);
                }
                const articleData = await response.json();
                setContent(articleData.content);

                //Fetch image data for each image in the article

                articleData.content.forEach(async (iteratedArray) => {
                    if (iteratedArray[1] === "img") {
                        try {
                            const imgResponse = await fetch(`http://localhost:4000/lightroomimage/view/${iteratedArray[2]}`);
                            if (!imgResponse.ok) {
                                throw new Error(`HTTP Error! status: ${imgResponse.status}`);
                            }
                            const imgData = await imgResponse.json();
                            setImageData(prevData => ({
                                ...prevData,
                                [iteratedArray[2]]: { url: imgData.url, caption: imgData.caption }
                            }));
                        } catch (error) {
                            console.error("Failed to fetch image data:", error);
                        }
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchArticle();
        setIsLoading(false);
    }, [id]);

    // useEffect hook to fetch articles
    useEffect(() => {
        fetch("http://localhost:4000/lightroom/article/view/all")
        .then(response => {
            if(response.ok) {
                return response.json();
                }
            else {
                    throw new Error("HTTP error" + response.status);
                }
        })
        .then(data => {
            console.log(data);
            const filteredData = data.filter(article => article._id !== id);
            setAllArticles(shuffleArray([...filteredData]));
                        
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            console.log(allArticles);
        });
    }, []);


    // This useEffect hook sets the embeddedArticles state

    useEffect(() => {
        if(allArticles.length > 2) {
            setEmbeddedArticles(allArticles.slice(0, 3));
            console.log("Embedded articles", embeddedArticles);
            
        }

    }, [allArticles]);

    // This function renders the article

    const renderAllArrays = (myArrayHolder) => {
        let headerIndex = 0;
        return myArrayHolder.map((iteratedArray, index) => {
            let elementName;
            if (['h1', 'h2', 'h3', 'h4'].includes(iteratedArray[1])) {
                // Generate a unique name for the element based on the header text and index
                elementName = `${iteratedArray[2].toLowerCase().replace(/ /g, "-")}-${headerIndex}`;
                console.log(elementName);
                headerIndex++;
            }
            switch(iteratedArray[1]){
                case "h1":
                    
                    return (
                        <Element name={elementName}>
                            <div className={articleCSS["h1-div"]}>
                                <h1 className={articleCSS["h1-div"]} key={iteratedArray[0]} > {iteratedArray[2]} </h1>
                            </div>
                        </Element>

                    )
                case "h2":
                    return (
                        <Element name={elementName}>
                            <div>
                                <h2 className={articleCSS["h2-div"]} key={iteratedArray[0]} >{iteratedArray[2]}</h2>
                                <br/>
                            </div>
                        </Element>



                    )
                    
                case "h3":
                    return (
                        <Element name={elementName}>
                            <div>
                                <h3 className={articleCSS["h3-div"]} key={iteratedArray[0]} >{iteratedArray[2]}</h3>
                                <br/>
                            </div>
                        </Element>

                    
                    )
                    
                case "h4":
                    return (
                        <Element name={elementName}>
                            <div>
                                <h4 className={articleCSS["h4-div"]} key={iteratedArray[0]}>{iteratedArray[2]}</h4>
                                <br/>
                            </div>
                        </Element>

                    )
                    
                case "p":
                    return (
                    <div>
                        <p className={articleCSS["p-div"]} key={iteratedArray[0]}>{iteratedArray[2]}</p>
                        <br/>
                    </div>
                    )
                    
                case "img":
                    if(imageData[iteratedArray[2]]) {
                        return (
                            <div>
                                <img className={articleCSS["img-div"]} key={iteratedArray[0]} src={imageData[iteratedArray[2]].url} alt="image"/>
                            </div>
                        );
                    }
                    console.log("we couldn't fetch the image for article.js");
                    return null;

                default:
                    console.log("Unknown element type");
                
            }
        })
    }

    return (
        <div className={articleCSS["article-body"]}>
            <nav className={articleCSS["article-nav"]}>
                
                <a href="http://localhost:3000/seventwo" className={articleCSS["lightroom-a"]}><h2 className={articleCSS["lightroom-holder"]}><span className={articleCSS["lightroom-span"]} onClick={handleLightroomClick}>Seven</span>Two</h2></a>
                {!isLoading && <TableOfContents content={content} />}
               

                <ul className={articleCSS["article-nav-ul"]}>
                    <li className={articleCSS["article-nav-li"]}>Home</li>
                    <li className={articleCSS["article-nav-li"]}>Most popular</li>
                    <li className={articleCSS["article-nav-li"]}>Guides</li>
                </ul>
            </nav>
            <article className={articleCSS["article-holder"]}>
                <div>
                {renderAllArrays(content)}
                </div>
                
            
            </article>
            <h4 className={articleCSS["other-articles"]}>Other Articles</h4>
            <footer className={articleCSS["article-footer"]}>
            
            
                {embeddedArticles.map(embeddedArticle => {
                     return (
                        <EmbeddedArticlePreview
                            id={embeddedArticle._id}
                            key={embeddedArticle._id}
                            title={embeddedArticle.title}
                            content={embeddedArticle.content}
                            tag={embeddedArticle.tag}
                            thumbnailLink={embeddedArticle.thumbnailLink}
                        />
                     );
})}

            </footer>
        </div>
    );
}

export default Article;
