import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Post from "./routes/Post.jsx";
import App from "./routes/Root.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: "Error: coming soon",
    children: [
      {
        path: "posts/:slug",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
