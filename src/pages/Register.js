import { useNavigate } from "react-router-dom";
import { register } from "../api";
import AuthForm from "../components/AuthForm";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await register(formData);
      navigate("/dashboard");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div>
      <h2 className="container text-center ">Register</h2>
      <AuthForm isLogin={false} onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
