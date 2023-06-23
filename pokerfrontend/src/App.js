import ReactGA from "react-ga";
import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import RegisterPage from './pages/register/register';
import LoginPage from './pages/login/login';
import HomePage from './pages/home/home';
import SolverFrontend from './pages/solver/solver';
import LightRoomAdmin from './pages/lightroom/lightroomAdmin/lightroomAdmin';
import LightRoomPreview from './pages/lightroom/lightroomPreview/lightroomPreview';
import LightroomClient from './pages/lightroom/lightroomClient/lightroomClient';
import Article from './pages/lightroom/lightroomClient/components/individualComponents/article/article';

function usePageViews() {
  let location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
}

function RoutesComponent({sendPreviewData, previewData}) {
  // Call usePageViews here, inside a component which will be a child of Router
  usePageViews();
  return (
    <Routes>
      <Route exact path="/" element={<HomePage/>}></Route>
      <Route exact path="/solver" element={<SolverFrontend/>}></Route>
      <Route exact path="/seventwoadmin" element={<LightRoomAdmin sendPreviewData={sendPreviewData}/>}></Route>
      <Route exact path="/seventwopreview" element={<LightRoomPreview getPreviewData={previewData}/>}></Route>
      <Route exact path="/seventwo" element={<LightroomClient/>}></Route>
      <Route exact path="/seventwo/article/:id" element={<Article/>}></Route>
    </Routes>
  );
}

function App() {

  //states for app component
  const [previewData, setPreviewData] = useState([]);
  
  //This useEffect hook will send data to the preview component when the previewData state is updated
  const sendPreviewData = (data) => {
    setPreviewData(data);
  }

  ReactGA.initialize('G-18ZB9XWFEX');

  useEffect(() => {
    if (previewData.length > 0) {
      localStorage.setItem("previewData", JSON.stringify(previewData));
      const newWindow = window.open("/backroompreviewpreview", "_blank");
      if (newWindow) newWindow.opener = null;
    }
  }, [previewData]);

  return (
    <div>
      {/*Routes for the web-app*/}
        <Router>
           <RoutesComponent sendPreviewData={sendPreviewData} previewData={previewData} />
        </Router>
    </div>
  );
}

export default App;
