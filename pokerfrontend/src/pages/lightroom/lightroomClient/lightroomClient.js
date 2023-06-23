import {React} from "react";
import lightroomClientCSS from "./lightroomClient.module.css";
import LightroomHome from "./components/lightroomSubPages/lightroomHome/lightroomHome";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";



function LightroomClient(props) {
    //States of LightRoomClient


    //

    const handleClick = () => {
        ReactGA.event({
            category: 'User',
            action: 'Went from lightroom main page to the homepage'
          });
    }

    const handleFLHClick = () => {
        ReactGA.event({
            category: 'User',
            action: 'Went from lightroom main page to the homepage'
          });
          window.location.href = "http://localhost:3000";       
    }

    return(
        <div className={lightroomClientCSS["lightroom-body"]}>
            <div className={lightroomClientCSS["lightroom-upper"]}>
                <div className={lightroomClientCSS["lightroom-title-yellow-line"]}></div>
                <h1 className={lightroomClientCSS["lightroom-title"]}><span className={lightroomClientCSS["lightroom-light"]}>Seven</span>Two</h1>
                <h2 className={lightroomClientCSS["everything-poker"]}>Everything Poker</h2>
                <nav className={lightroomClientCSS["lightroom-nav"]}>
                    <ul >
                        <li className={lightroomClientCSS["lightroom-nav-li"]}>About</li>
                        <li className={lightroomClientCSS["lightroom-nav-li"]}>F.A.Q</li>
                        
                        <li className={lightroomClientCSS["lightroom-nav-li"]}>Join the Community</li>
                    </ul>
                </nav>
                
                
                <h3 className={`${lightroomClientCSS["lightroom-h3"]} ${lightroomClientCSS["full-lighthouse"]}`}>Full <span className={lightroomClientCSS["lightroom-light"]} onClick={handleFLHClick}>Light</span>House</h3>

                <Link to="http://localhost:3000" className={`${lightroomClientCSS["one-solver-parent"]}`} onClick={handleClick}>
                    <h4 className={`${lightroomClientCSS["lightroom-h3"]} ${lightroomClientCSS["one-solver"]}`}>One Solver, One Subscription<span className={lightroomClientCSS["lightroom-join-beta"]}>Coming soon!</span></h4>
                    

                </Link>
                
                
            </div>
            <div className={lightroomClientCSS["lightroom-content-holder"]}>
                <ul className={lightroomClientCSS["lightroom-ul"]}>
                    <li className={lightroomClientCSS["lightroom-li"]}>Home</li>
                    <li className={lightroomClientCSS["lightroom-li"]}>Most Popular</li>
                    <li className={lightroomClientCSS["lightroom-li"]}>Articles</li>
                    <li className={lightroomClientCSS["lightroom-li"]}>Guides</li>
                </ul>
                <LightroomHome />

            </div>
        </div>
    )
}




export default LightroomClient;