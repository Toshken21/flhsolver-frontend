import {React, useState, useEffect} from "react";
import ElementViewer from "./components/tagViewer/elementViewer";
import TextEditor from "./components/textEditor/textEditor";


function LightRoomAdmin(props) {
    // this is the lightRoom page for admins
    // step 1 add form component
    // step2 add form
    const [articleContentArray, setArticleContentArray] = useState([]);
    

    // This function gets the data necessary to create a preview
    const getDataForPreview = (data) => {
        setArticleContentArray(data);
    }

    // this UseEffect hook gets called when articleContentArray changes sending the contents to the parent App component

    useEffect(() => {
        props.sendPreviewData(articleContentArray);

    }, [articleContentArray]);



    return(
        <div>
            <TextEditor getPreview={getDataForPreview}/>
        </div>
    )
}

export default LightRoomAdmin;

