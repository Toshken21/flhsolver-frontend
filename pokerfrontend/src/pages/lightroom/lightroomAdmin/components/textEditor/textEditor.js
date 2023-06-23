import React, { useState, useEffect } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ElementViewer from '../tagViewer/elementViewer';
import axios from "axios";
import textEditorCSS from "./textEditor.module.css";

function TextEditor(props) {
  //state holders and reactdom root


  const [root, setRoot] = useState(null);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleTag, setArticleTag] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [elementViewers, setElementViewers] = useState([]);
  const [contentHolderArray, setContentHolderArray] = useState([]);
  const [dataCalls, setDataCalls] = useState(0);
  const [isPreviewing, setUpisPreviewing] = useState(false);
  const [previewButtonClicked, setPreviewButtonClicked] = useState(false);
  const [file, setFile] = useState();


  




  // This function will render a new element when the Add element button clicked

  const renderNewElement = () => {
    
    setElementViewers(prevElementViewers => [
      ...prevElementViewers,
      <ElementViewer key={prevElementViewers.length} id={generateRandomId()} index={prevElementViewers.length} onDismount={handleDismount} sendForPreview={handleElementData} isPreviewing={previewButtonClicked}/>

    ])
    
  };


  //This function randomly generates an id for the Elementviewer components

  function generateRandomId(length = 11) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }
  



  //This function will remove the dismounted component from the elementViewers state
  
  const handleDismount = (data) => {
    setContentHolderArray((prevContentHolderArray) => prevContentHolderArray.filter(contentComponent => contentComponent[0] !== data.index));
    setElementViewers((prevElementViewers) => prevElementViewers.filter(
      elementComponent => elementComponent.props.id !== data.componentId
    )
    );
  };


  // This function changes the state of isPreview to true

  const clickToStartPreview = () => {

    console.log("previewButton has been clicked");
    console.log(previewButtonClicked);
    console.log(elementViewers);
    props.getPreview(contentHolderArray);
    console.log("This is the contentHolderArray", contentHolderArray);
    
  }

  // This useEffect hook modifies the elementViewer's component props


  // This function will handle all of the data from the tags and bundle them into a nested array

  const handleElementData = (data) => {
    console.log("handleElementData function has been called");
    const contentCopyArray = [...contentHolderArray];
    contentCopyArray.push(data);
    setContentHolderArray(contentCopyArray);
    setDataCalls(dataCalls => dataCalls + 1);
    console.log("check THE number of datacalls", dataCalls);
  }

  
  //these functions handle input states

  const handleTitle = (e) => {
    setArticleTitle(e.target.value);
  }

  const handleTag = (e) => {
    setArticleTag(e.target.value);
  }

  const handleImageLink = (e) => {
    setImageLink(e.target.value);
  }

  // This functions deals with posting the article

  const postArticle = async () => {
    if (!imageLink) {
      alert('Please provide an image link.');
      return;
    }

    const response = await fetch("http://localhost:4000/lightroom/article/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({contentHolderArray, articleTitle, articleTag, imageLink}),
    });

    console.log(response.body);
    const result = await response.json();
    console.log(result);
  }

  // This functions handles the submit of the image

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData;
    formData.append("image", file);
    const caption = "background image";
    formData.append("caption", articleTitle);

    
    const response = await axios.post("http://localhost:4000/lightroomimage/add", formData, {headers: {"Content-Type": "multipart/form-data"}})
    if(response.status === 201){
      setImageLink(response.data.name);
      console.log(imageLink);
      
    }
  }

  // This useEffect hook checks that the thumbnail has been updated 



  
  return (
    <div>
      <div id={textEditorCSS["rendered-element-holder"]}>
        {elementViewers.map(ElementViewer => ElementViewer)}
      </div>
      <button className={textEditorCSS["add-element"]} onClick={renderNewElement}>
        Add element
      </button>
      <form onSubmit={handleSubmit}>
        <label className={textEditorCSS['editor-label']}>Article Title</label>
        <input type="text" onChange={handleTitle}/>
        <label className={textEditorCSS['editor-label']}>tag</label>
        <input type="text" onChange={handleTag}/>
        <label className={textEditorCSS['editor-label']}>Thumbnail</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={e => setFile(e.target.files[0])} required/>
        
        <br/>
        <input type="submit" value="submit"/>
      </form>
      <button className={textEditorCSS["preview-article"]} onClick={clickToStartPreview}>Preview article</button>
      <button className={textEditorCSS["post-article"]} onClick={postArticle}>Post article</button>
    </div>
  );
}




export default TextEditor;
