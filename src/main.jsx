import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  ScrollRestoration,
} from "react-router-dom";
import NotFound from "./components/NotFound.jsx";
import Post from "./routes/Post.jsx";
import App from "./routes/Root.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      basename: import.meta.env.VITE_BASE_URL,
      children: [
        {
          path: "posts/:slug",
          element: (
            <>
              <ScrollRestoration />
              <Post />
            </>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/notfound" />,
    },
    {
      path: "notfound",
      element: <NotFound />,
    },
  ],
  { basename: import.meta.env.VITE_BASE_URL }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
