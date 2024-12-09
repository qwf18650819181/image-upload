import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorPage from "./views/ErrorPage.jsx";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { UserSubscriptionProvider, useSubscription } from "./provider/UserSubscriptionProvider.jsx";
import GitUtil from "./views/GitUtil.jsx";
import TikUtil from "./views/TikUtil.jsx";
import ImageUpload from "./views/ImageUpload.jsx";


function ProtectedRoute({ children }) {
  const { isSubscribed } = useSubscription();
  return isSubscribed ? children : <div>Access Denied. Please subscribe to access this feature.</div>;
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>} errorElement={<ErrorPage/>}>
      <Route path="views/gitUtil" element={<GitUtil/>}/>
      <Route path="views/imageProcessing" element={<TikUtil/>}/>
      <Route path="views/imageUpload" element={<ImageUpload/>}/>


    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserSubscriptionProvider>
      <RouterProvider router={router}/>
    </UserSubscriptionProvider>
  </React.StrictMode>,
);
