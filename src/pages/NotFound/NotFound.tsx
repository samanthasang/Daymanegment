import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <Link to="/">GO Home</Link>
      <div className="underline">404 Not Found</div>
    </div>
  );
}

export default NotFound;
