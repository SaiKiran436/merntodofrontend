import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center ">
      <h2 className=" m-4">To-Do App</h2>
      <button className="btn btn-primary me-2"  onClick={() => navigate("/login")}>Login</button>
      <button className="btn btn-success me-2" onClick={() => navigate("/register")}>Register</button>
    </div>
  );
};

export default Home;
