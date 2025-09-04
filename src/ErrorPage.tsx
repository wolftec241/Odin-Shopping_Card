import { Link } from "react-router";
import "./styles/ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;
