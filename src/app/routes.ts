import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Journal } from "./pages/Journal";
import { Calendar } from "./pages/Calendar";
import { Tasks } from "./pages/Tasks";
import { NotePage } from "./pages/NotePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Journal },
      { path: "calendar", Component: Calendar },
      { path: "tasks", Component: Tasks },
      { path: "uni/synthetic-bio", Component: NotePage },
      { path: "uni/untitled", Component: NotePage },
      { path: "work", Component: Journal },
      { path: "personal", Component: Journal },
    ],
  },
]);
