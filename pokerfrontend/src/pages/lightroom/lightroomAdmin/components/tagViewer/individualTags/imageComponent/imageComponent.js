import React, {useState, useEffect} from "react";
import axios from "axios";
import imageComponentCSS from "./imageComponent.module.css";


function ImageComponent(props){

    const [file,setFile] = useState();
    const [caption, setCaption] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        if(name){
            console.log(name);
            const dataSet = {
                tag: props.getTag,
                content: name
            };
            props.handleData(dataSet);
            console.log("data-sent");
        }
    }, [name]);  // This will run whenever 'name' changes

    
    //submit image function
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        formData.append("caption", caption);
        const response = await axios.post("http://localhost:4000/lightroomimage/add", formData, {headers: {"Content-Type": "multipart/form-data"}})
        if(response.status === 201){
            setName(response.data.name);
        }
    }

    return(
        <form action="/upload" method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>
            <label className={imageComponentCSS["label"]} htmlFor="image">Choose an image:</label>
            <input type="file" id="image" name="image" accept="image/*" onChange={e => setFile(e.target.files[0])} required/>
            <br/>
            

            <label className={imageComponentCSS["label"]} htmlFor="description">Image caption:</label>
            <input type="text" id="caption" name="caption" onChange={e => setCaption(e.target.value)} required/>
            <br/>
            

            <label htmlFor="alt-description">Alt image description</label>
            <input type="text" id="alt-description" name="alt-description" required/>
            <br/>


            <input name="submit-img" id="submit-img" type="submit" value="save"/>
        </form>
    )
}

export default ImageComponent;
