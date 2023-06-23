import {React, useState, useEffect} from "react";
import ArticlePreview from "../../individualComponents/articlePreview/articlePreview";
import lightroomHomeCSS from "./lightroomHome.module.css";

function LightroomHome(props) {
    // States for LightroomHome
    const [articles, setArticles] = useState([]);
    const [newestArticles, setNewestArticles] = useState([]);
    const [popularArticles, setPopularArticles] = useState([]);
    const [newestArticleCountMin, setNewestArticleCountMin] = useState(0);
    const [newestArticleCountMax, setNewestArticleCountMax] = useState(4);
    const [popularArticleCountMin, setPopularArticleCountMin] = useState(0);
    const [popularArticleCountMax, setPopularArticleCountMax] = useState(4);
    const [newAdditionnalCount, setNewAdditionnalCount] = useState(0);
    const [popularAdditionnalCount, setPopularAdditionnalCount] = useState(0);


    // function for shuffling most popular articles
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        }
        return array;
    }

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
            setArticles(data);
            setNewestArticles([...data].reverse());
            setPopularArticles(shuffleArray([...data]));
            
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            console.log(articles);
        });
    }, []);

    //This useEffect hook updates gets the when there's new articles
    useEffect(() => {
        console.log('Newest articles:', newestArticles);
    }, [newestArticles]);

    // This useEffect hook updates when there's new popular articles

    useEffect(() => {
        console.log("Popular Articles: ", popularArticles);
    }, [popularArticles]);

    // addNewestCount and substractNewestCount both deal with mananging which articles are shown in the newest category
    const addNewestCount = () => {
        if(window.innerWidth <= 600) {
            setNewAdditionnalCount(newAdditionnalCount + 4);
        } else {
            setNewestArticleCountMin(newestArticleCountMin + 4);
            setNewestArticleCountMax(newestArticleCountMax + 4);
        }

    }

    const substractNewestCount = () => {
        if(newestArticleCountMin > 0){
            setNewestArticleCountMin(newestArticleCountMin - 4);
            setNewestArticleCountMax(newestArticleCountMax - 4);
        }
    }

    //

    const addPopularCount = () => {
        if(window.innerWidth <= 600) {
            setPopularAdditionnalCount(popularAdditionnalCount + 4);
        } else {
            setPopularArticleCountMax(popularArticleCountMax + 4);
            setPopularArticleCountMin(popularArticleCountMin + 4);
        }

    }

    const substractPopularCount = () => {
        if(popularArticleCountMin > 0){
            setPopularArticleCountMax(popularArticleCountMax - 4);
            setPopularArticleCountMin(popularArticleCountMin - 4);
        }

    }
    
    // useEffecto to handle resizing
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 600 && newAdditionnalCount !== 0 ) {
                if(newAdditionnalCount !== 0) {
                    setNewAdditionnalCount(0);
                }

                if(popularAdditionnalCount !== 0) {
                    setPopularAdditionnalCount(0);
                }
                
                
            }
        };

        window.addEventListener('resize', handleResize);

        // Clean up function
        return () => window.removeEventListener('resize', handleResize);
    }, [newAdditionnalCount, popularAdditionnalCount]);


    

    // This array represents all the article counts you want to display
    let articleCounts = Array.from({ 
        length: Math.min(
            newestArticleCountMax + newAdditionnalCount - newestArticleCountMin, 
            newestArticles.length - newestArticleCountMin
        ) 
    }, (_, i) => i + newestArticleCountMin);

    let mostPopularArticleCounts = Array.from({ 
        length: Math.min(
            popularArticleCountMax  + popularAdditionnalCount - popularArticleCountMin, 
            popularArticles.length - popularArticleCountMin
        ) 
    }, (_, i) => i + popularArticleCountMin);
    

    return(
        <div className={lightroomHomeCSS["lightroom-home-body"]}>
            <div>
                <h3 className={lightroomHomeCSS["lightroom-home-h3"]}>Newest</h3>
                <div style={{display:"flex"}} className={lightroomHomeCSS["lightroom-newest-holder"]}>
                    <button onClick={substractNewestCount} className={`${lightroomHomeCSS["lightroom-home-adjust-button"]} ${lightroomHomeCSS["invisible-button"]}`}> - </button>
                    {articleCounts.map(articleCount =>
                        newestArticles[articleCount] && 
                        <ArticlePreview
                            id={newestArticles[articleCount]._id} 
                            key={articleCount}
                            title={newestArticles[articleCount].title} 
                            content={newestArticles[articleCount].content}
                            tag={newestArticles[articleCount].tag}
                            thumbnailLink={newestArticles[articleCount].thumbnailLink}
                        />
                    )}
                    <button onClick={addNewestCount} className={lightroomHomeCSS["lightroom-home-adjust-button"]}> + </button>
                </div>
            </div>
            <div>
                
                <div>
                    {/*This is where the articles will conditionally render*/}
                </div>
            </div>
            <div>
                <h3 className={lightroomHomeCSS["lightroom-home-h3"]}>Most Popular</h3>
                <div  className={lightroomHomeCSS["lightroom-newest-holder"]}>
                    <button onClick={substractPopularCount} className={`${lightroomHomeCSS["lightroom-home-adjust-button"]} ${lightroomHomeCSS["invisible-button"]}`}> - </button>
                    {mostPopularArticleCounts.map(mostPopularArticleCounts =>
                        popularArticles[mostPopularArticleCounts] &&
                        <ArticlePreview
                            id={popularArticles[mostPopularArticleCounts]._id}
                            key={mostPopularArticleCounts}
                            title={popularArticles[mostPopularArticleCounts].title}
                            content={popularArticles[mostPopularArticleCounts].content}
                            tag={popularArticles[mostPopularArticleCounts].tag}
                            thumbnailLink={popularArticles[mostPopularArticleCounts].thumbnailLink}
                        />
                        )}
                    <button onClick={addPopularCount} className={lightroomHomeCSS["lightroom-home-adjust-button"]}> + </button>
                </div>
            </div>
        </div>
    )
}

export default LightroomHome;
