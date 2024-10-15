import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import TodoList from "./pages/TodoList/TodoList";
import NotFound from "./pages/NotFound/NotFound";
import Timer from "./pages/Timer/Timer";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function Layout() {
  return (
    <>
      <Header />
      <div className="h-[85vh] p-3">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          errorElement: <NotFound />,
          children: [],
        },
        {
          path: "/todo",
          element: <TodoList />,
        },
        {
          path: "/timer",
          element: <Timer />,
        },
      ],
    },
  ]);
  return (
    <RouterProvider future={{ v7_startTransition: true }} router={router} />
  );
}
