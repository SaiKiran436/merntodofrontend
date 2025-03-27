import { useState } from "react";

const AuthForm = ({ isLogin, onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  return (
    <form className="text-center p-5 border rounded shadow bg-light container text-center" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
      {!isLogin && (
        <input type="text" className="form-control mb-3" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
      )}
      <input type="email" className="form-control mb-3" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
      <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
      <button type="submit" className="btn btn-primary ">{isLogin ? "Login" : "Register"}</button>
    </form>
  );
};

export default AuthForm;
