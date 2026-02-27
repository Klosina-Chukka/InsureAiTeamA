import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Landing() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      toast.success("Registration successful! Please check your email for verification.");
      setIsLogin(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Enter email and password");
      return;
    }

    setLoading(true);
    try {
      // Send as JSON instead of form data
      const loginData = {
        email: formData.email,
        password: formData.password
      };
      
      await login(loginData);
      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center text-white">
      <div className="bg-[#111827] p-10 rounded-2xl shadow-2xl w-[400px]">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? "Login to InsureAI" : "Create InsureAI Account"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-[#1F2937] border border-gray-600 outline-none"
          />
        )}

        {!isLogin && (
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-[#1F2937] border border-gray-600 outline-none"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-[#1F2937] border border-gray-600 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-[#1F2937] border border-gray-600 outline-none"
        />

        {!isLogin && (
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-3 rounded-xl bg-[#1F2937] text-white border border-gray-600 outline-none"
          >
            <option value="CUSTOMER">Customer</option>
            <option value="AGENT">Agent</option>
            <option value="ADMIN">Admin</option>
          </select>
        )}

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
        )}

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-gray-400 mt-4 text-center cursor-pointer hover:text-cyan-400"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
}

export default Landing;
