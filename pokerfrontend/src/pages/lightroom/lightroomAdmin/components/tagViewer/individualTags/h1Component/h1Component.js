import {React, useState, useEffect} from "react";
import H1ComponentCSS from "./h1Component.module.css";



function HComponent(props){

    // states of Hcomponent

    const [inputValue, setInputValue] = useState(props.getContent);
    
    
    // This function handles and updates the value of InputValue

    const handleInput = (event) => {
        setInputValue(event.target.value);
    }

    // This function handles the toDelete useState
    const deleteComponent = (e) => {
        
        e.preventDefault();
        
        const dataSet = {
            willDelete: true
        }
        console.log("delete function is called");
        props.handleDelete(dataSet);
        
    }

    const sendData = (e) => {
        console.log("sendDataCalled")
        
        e.preventDefault();
        const dataSet = {
            tag: props.getTag,
            content: inputValue,
        };
        console.log(dataSet.tag);
        props.handleData(dataSet);
        

            

    }


    // This useEffect hook sets the value of the input  after it has rendered.




    return(
        <div>
            <form onSubmit={sendData}>
                <label htmlFor="h-input">{props.getTag}</label>
                <input name="h-input" id="h-input" type="text" className={H1ComponentCSS["h1-input"]} defaultValue={props.getContent} onChange={handleInput}/>
                <br/>
                <input name="submit-h" id="submit-h" type="submit" value="save" />
                
                <button className="delete-h" onClick={deleteComponent}>Delete</button>
            </form>
        </div>
    )
    }









export default HComponent;