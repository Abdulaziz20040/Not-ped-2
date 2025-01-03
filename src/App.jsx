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
              element: <Barchasi />,
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
              path: "nextjs",
              element: <Newxt />,
            },
            {
              path: "c++",
              element: <Splus />,
            },
            {
              path: "cshap",
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
