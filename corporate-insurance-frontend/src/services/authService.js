import API from "../api";

// Register
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

// Login
export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

// Forgot Password
export const forgotPassword = (email) => {
  return API.post("/auth/forgot-password", { email });
};

// Reset Password
export const resetPassword = (token, newPassword) => {
  return API.post("/auth/reset-password", { token, newPassword });
};

// Verify Email
export const verifyEmail = (token) => {
  return API.get(`/auth/verify-email?token=${token}`);
};
