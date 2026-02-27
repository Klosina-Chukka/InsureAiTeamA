import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case "ADMIN":
        navigate("/admin/dashboard");
        break;
      case "AGENT":
        navigate("/agent/dashboard");
        break;
      case "CUSTOMER":
        navigate("/customer/dashboard");
        break;
      default:
        navigate("/");
    }
  }, [user, navigate]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
        <p className="text-xl">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}

export default Home;
