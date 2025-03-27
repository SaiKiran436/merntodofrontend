import { useNavigate } from "react-router-dom";
import { login } from "../api";
import AuthForm from "../components/AuthForm";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Defined correctly

  const handleLogin = async (formData) => {
    try {
      await login(formData);
      navigate("/dashboard"); // Redirect to Dashboard if login is successful
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage(error.response.data.error); // ✅ Show backend error message
          setShowPopup(true); // ✅ Show the popup

          setTimeout(() => {
            if (error.response.data.error === "User not found") {
              navigate("/register"); // Redirect to register if user doesn't exist
            }
          }, 2000);
        } else {
          setErrorMessage("Login failed! Please try again.");
        }
      } else {
        setErrorMessage("Server error. Please try later.");
      }
    }
  };

  return (
    <div className="container text-center">
      <h2 className="mb-4">Login</h2>

      {/* ✅ Show error message */}
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

      <AuthForm isLogin={true} onSubmit={handleLogin} />
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/register")}>
        Register Here
      </button>

      {/* ✅ Show Popup if User Not Found */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Body className="text-center">
          <h5>User Doesn't Exist</h5>
          <p>Would you like to create an account?</p>
          <Button variant="success" onClick={() => navigate("/register")}>
            Register Now
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
