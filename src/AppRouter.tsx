import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import TodoList from "./pages/TodoList/TodoList";
import NotFound from "./pages/NotFound/NotFound";

export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
          element: <HomePage />,
      errorElement: <NotFound />
    },
    {
      path: "/todo",
      element: <TodoList />,
    },
  ]);
  return (
    <RouterProvider future={{ v7_startTransition: true }} router={router} />
  );
}
