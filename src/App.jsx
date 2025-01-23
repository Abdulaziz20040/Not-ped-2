import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Rotlayout from "./rotlayout/Rotlayout";
import All from "./pages/React";
import Html from "./pages/Html";
import Bootstrap from "./pages/Bootstrap";
import Figma from "./pages/figma";
import Newxt from "./pages/Newxt";
import Splus from "./pages/Splus";
import Sshap from "./pages/Sshap";
import Javascrpt from "./pages/Javascrpt";
import Taypscrpt from "./pages/Taypscrpt";
import Projects from "./pages/Projects";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Barchasi from "./pages/Barchasi";
import Index from "./pages/indesx";

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
              path: "figma",
              element: <Figma />,
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
              path: "projects",
              element: <Projects />,
            },
            {
              path: "barchasi",
              element: <Barchasi />,
            },
            {
              path: "Vue.js",
              element: <Barchasi />,
            },
            {
              path: "Angular",
              element: <Barchasi />,
            },
            {
              path: "Nuxt.js",
              element: <Barchasi />,
            },
            {
              path: "Node.js",
              element: <Barchasi />,
            },
            {
              path: "SQL",
              element: <Barchasi />,
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
