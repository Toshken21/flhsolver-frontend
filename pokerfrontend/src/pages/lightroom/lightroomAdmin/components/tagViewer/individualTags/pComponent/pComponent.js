import {React, useState} from "react";

function PComponent(props){

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
            console.log("data-sent");
    
        // CSS styles of the component
        const styleObject = {
            width: "500px",
            height: "500px",
            overflow: "scroll"
        }
    
        }
    return(
        <div>
            <form onSubmit={sendData}>
                <label htmlFor="p-input">p</label>
                <textarea style={{
                    width: "700px",
                    height: "200px",
                    overflow: "scroll"
                    }
                } name="p-input" id="p-input" type="textarea" onChange={handleInput} defaultValue={props.getContent}>
                    
                </textarea>
                <br/>
                <input name="submit-p" id="submit-p" type="submit" value="save" />
                <button className="delete-h" onClick={deleteComponent}>Delete</button>
            </form>
        </div>
    )
}

export default PComponent;