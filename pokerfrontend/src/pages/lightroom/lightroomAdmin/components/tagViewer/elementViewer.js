import {React, useState, useEffect} from "react";
import HComponent from "./individualTags/h1Component/h1Component";


import PComponent from "./individualTags/pComponent/pComponent";
import ImageComponent from "./individualTags/imageComponent/imageComponent";
import * as ReactDOMClient from "react-dom/client";
import ElementCSS from "./elementViewer.js";






function ElementViewer(props){
    // This component is a tag that lets you view a tag with it's type and its first 30 characters.
   
    // states of Tagviewer


    const [tag, setTag] = useState("");
    const [preview, setPreview] = useState("");
    const [content, setContent] = useState("");
    const [originalElementID, setOriginalElementID] = useState("");
    const [isPreview, setIsPreview] = useState(false);
    const [sendDataToParent, setSendDataToParent] = useState(props.isPreviewing);
    const [elementIndex, setElementIndex] = useState(props.index);
    const [isMounted, setIsMounted] = useState(true);
    const [id,setId] = useState(props.id);
    const [selectedComponent, setSelectedComponent] = useState(null);
   
   
   
    // this is a hook that set up react root


   


    const handleData = (data) => {
        console.log("data arrived to ElementViewer");
        setTag(data.tag);
        setContent(data.content);


        if(data.tag !== "image"){
            if(data.content.length > 30){
                setPreview(data.content.slice(0, 30) + "...");
            } else {
                setPreview(data.content);
            }
        }
        setIsPreview(true);
    }


    // This function updates the state from the child component
    const handleDelete = (data) => {
        console.log("handleDelete in elementViewer has been called");
        console.log(data.willDelete);
        if(data.willDelete === true){
            setIsMounted(false);
        }
    }


    // This useEffect hook passes the delete setIsMounted state and it's key to the parent TextEditor component


    useEffect(() => {
        if(isMounted === false){
            const dismountData = {
                componentIsMounted: false,
                componentId: id,
                index: elementIndex
            };
            props.onDismount(dismountData);
        }
    }, [isMounted])
   






    // This function will write the content into the tag


    const turnElementIntoJSX = () => {
        const elementJSX = `<${tag}>${content}</${tag}>`;
        console.log(elementJSX);
    }


    // This function will give the users different form based on which tag they chose




   
    const assignFormComponent =  (event) => {
    const selectedTag = event.target.value;
    console.log(selectedTag);
    let component = null;
     setTag(selectedTag);
    console.log(tag);
   


    switch (selectedTag) {
        case "h1":
        component = (
            <HComponent
            getTag={selectedTag}
            getContent={content}
            getId={originalElementID}
            handleData={handleData}
            handleDelete={handleDelete}
            />
        );
        break;
        case "h2":
        component = (
            <HComponent
            getTag={selectedTag}
            getContent={content}
            getId={originalElementID}
            handleData={handleData}
            handleDelete={handleDelete}
            />
        );
        break;
        case "h3":
        component = (
            <HComponent
            getTag={selectedTag}
            getContent={content}
            getId={originalElementID}
            handleData={handleData}
            handleDelete={handleDelete}
            />
        );
        break;
        case "h4":
        component = (
            <HComponent
            getTag={selectedTag}
            getContent={content}
            getId={originalElementID}
            handleData={handleData}
            handleDelete={handleDelete}
            />
        );
        break;
        case "p":
        component = (
            <PComponent
            getTag={selectedTag}
            getContent={content}
            getId={originalElementID}
            handleData={handleData}
            handleDelete={handleDelete}
            />
        );
        break;
        case "img":
        component = (
            <ImageComponent
            getTag={selectedTag}
            getContent={content}
            getId={originalElementID}
            handleData={handleData}
            handleDelete={handleDelete}
            />
        );
        break;
        default:
        console.log("Image didn't load, something went wrong");
    }


    setSelectedComponent(component);
    };


   










    ///This function will remove the preview state and allow you to edit


    const editElement =  () => {
        const tagHolder = document.getElementById("tag-preview");
       
        const tagValue = tagHolder.textContent;
        setIsPreview(false);


       
       
        console.log(content);
        let component = null;
       
   
        switch (tagValue) {
            case "h1":
            component = (
                <HComponent
                getTag={tagValue}
                getContent={content}
                getId={originalElementID}
                handleData={handleData}
                handleDelete={handleDelete}
                />
            );
            break;
            case "h2":
            component = (
                <HComponent
                getTag={tagValue}
                getContent={content}
                getId={originalElementID}
                handleData={handleData}
                handleDelete={handleDelete}
                />
            );
            break;
            case "h3":
            component = (
                <HComponent
                getTag={tagValue}
                getContent={content}
                getId={originalElementID}
                handleData={handleData}
                handleDelete={handleDelete}
                />
            );
            break;
            case "h4":
            component = (
                <HComponent
                getTag={tagValue}
                getContent={content}
                getId={originalElementID}
                handleData={handleData}
                handleDelete={handleDelete}
                />
            );
            break;
            case "p":
            component = (
                <PComponent
                getTag={tagValue}
                getContent={content}
                getId={originalElementID}
                handleData={handleData}
                handleDelete={handleDelete}
                />
            );
            break;
            case "img":
            component = (
                <ImageComponent
                getTag={tagValue}
                getContent={content}
                getId={originalElementID}
                handleData={handleData}
                handleDelete={handleDelete}
                />
            );
            break;
            default:
            console.log("Image didn't load, something went wrong");
        }
       
        setSelectedComponent(component);
        };
       
    // This useEffect hook updates the sendDataToParent state when the props.isPreviewing gets updated    




    useEffect(() => {
        console.log("updating is previewing prop");
        console.log(props.isPreviewing);
        setSendDataToParent(props.isPreviewing);
        sendDataToTextEditor();
      }, [props.isPreviewing]);
     


   


    // This function will send the id, tag, and component back to the textEditor parent component. It will be called from
    // TextEditor using a ref


    const sendDataToTextEditor = () => {
        
        
        const dataArray = [elementIndex, tag, content];
        props.sendForPreview(dataArray);
        console.log("sending data to the text editor");
    }


    // This useEffectHook send information to the parentComponent when the sendDataToParent state is true,


    useEffect(() => {
        if(isPreview){
            sendDataToTextEditor();
        }
        
    }, [isPreview]);


   




    if(isMounted){    
        if(isPreview === true){
            return (
            <div className="viewer-holder">
                <div className="viewer-holder-tag">
                    <h3 id="tag-preview">{tag}</h3>
                </div>
                <div className="viewer-holder-preview">
                    <p>{preview}</p>
                </div>
                <button onClick={editElement}>Edit</button>
            </div>
        )
        } else {
            return (
                <div className="creator-holder">
                    <form>
                        <label htmlFor="tag-selector">tag</label>
                        <select id="tag-selector" onChange={assignFormComponent} defaultValue={tag}>
                            <option>Select the desired tag</option>
                            <option>h1</option>
                            <option>h2</option>
                            <option>h3</option>
                            <option>h4</option>
                            <option>p</option>
                            <option>img</option>
                           




                        </select>
                    </form>
                    <div id="rendered-component-holder">{selectedComponent}</div>
                    <button onClick={turnElementIntoJSX}>Test for jsx</button>
                </div>
            )
        }
    }
}  


export default ElementViewer;
