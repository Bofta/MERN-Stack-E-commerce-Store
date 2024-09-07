import React from "react";
import ReactDom from "react-dom/client";
import App from './App.jsx'
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter(createRoutesFromElements (<Route path="/" element={<App />}/>));

ReactDom.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
