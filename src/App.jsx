import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Rotlayout from "./rotlayout/Rotlayout";
import All from "./pages/React";
import Html from "./pages/Html";
import Bootstrap from "./pages/Bootstrap";
import Barchasi from "./pages/Barchasi";
import Newxt from "./pages/Newxt";
import Splus from "./pages/Splus";
import Sshap from "./pages/Sshap";
import Javascrpt from "./pages/Javascrpt";
import Taypscrpt from "./pages/Taypscrpt";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Index from "./pages/indesx";
import Phyton from "./pages/Phyton";
import Flutter from "./pages/Flutter";
import Java from "./pages/Java";
import Vue from "./pages/Vue";
import Angular from "./pages/Angular";
import Nuxt from "./pages/Nuxt";
import Node from "./pages/Node";
import Sql from "./pages/Sql";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Rotlayout />,
      children: [
        {
          path: "/",
          element: <PrivateRoute />,
          children: [
            {
              index: true,
              element: <Index />,
            },
            {
              path: "react",
              element: <All />,
            },
            {
              path: "html",
              element: <Html />,
            },
            {
              path: "bootstrap",
              element: <Bootstrap />,
            },
            {
              path: "next.js",
              element: <Newxt />,
            },
            {
              path: "c++",
              element: <Splus />,
            },
            {
              path: "c sharp",
              element: <Sshap />,
            },
            {
              path: "javascript",
              element: <Javascrpt />,
            },
            {
              path: "taypscript",
              element: <Taypscrpt />,
            },
            {
              path: "barchasi",
              element: <Barchasi />,
            },
            {
              path: "python",
              element: <Phyton />,
            },
            {
              path: "flutter",
              element: <Flutter />,
            },
            {
              path: "java",
              element: <Java />,
            },
            {
              path: "Vue.js",
              element: <Vue />,
            },
            {
              path: "angular",
              element: <Angular />,
            },
            {
              path: "nuxt.js",
              element: <Nuxt />,
            },
            {
              path: "node.js",
              element: <Node />,
            },
            {
              path: "sQL",
              element: <Sql />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />, // Login page component
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
