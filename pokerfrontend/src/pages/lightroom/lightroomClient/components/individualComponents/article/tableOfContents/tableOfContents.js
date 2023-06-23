import {React, useState, useEffect} from "react";
import tableOfContentsCSS from "./tableOfContents.module.css";


import { Link, scroller } from "react-scroll";

function TableOfContents({ content }) {
    const headers = content.filter(arr => ['h1', 'h2', 'h3', 'h4'].includes(arr[1]));
    const [viewTable, setViewTable] = useState(true);
    const [buttonValue, setButtonValue] = useState("∧");
    


    function scrollToElement(element) {
        scroller.scrollTo(element, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }





    // this function runs when I click the button
    const changeTableVisibility = () => {
        if(viewTable === true) {
            setViewTable(false);
            setButtonValue("∨")
        } else {
            setViewTable(true);
            setButtonValue("∧")

        }
    }

    


    return (
        <div className={tableOfContentsCSS["content-table-parent-div"]} id="content-parent-div">
            <div className={`${tableOfContentsCSS["content-table-holder"]} ${viewTable ? tableOfContentsCSS["visible-table"] : tableOfContentsCSS["invisible-table"] }`} onClick={changeTableVisibility}>
                <h3 className={tableOfContentsCSS["content-table-h3"]}>Table of contents</h3>
                {headers.map((header, index) => {
                    const elementName = `${header[2].toLowerCase().replace(/ /g, "-")}-${index}`;
                    

                    return (
                        <Link
                            className={tableOfContentsCSS["content-table-link"]}
                            key={elementName}
                            to={elementName}
                            onClick={() => setTimeout(() => { scrollToElement(elementName) }, 1000)}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            {header[2]}
                        </Link>
                    );
                })}
            </div>
            <button className={tableOfContentsCSS["content-table-button"]} onClick={changeTableVisibility}>{buttonValue}</button>
        </div>
    );
}

export default TableOfContents;
