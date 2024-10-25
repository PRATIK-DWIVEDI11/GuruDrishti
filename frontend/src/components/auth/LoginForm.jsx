import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(""); // For error handling
	const navigate = useNavigate(); // Initialize useNavigate

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(""); // Reset error state on new login attempt
		try {
			const response = await axiosInstance.post("/auth/login", { username, password });
			if (response.data.message === "Logged in successfully") {
				// Redirect to homepage on successful login
				window.location.href = "/"
			}
		} catch (error) {
			console.error("Login failed:", error.response?.data?.message || error.message);
			setError(error.response?.data?.message || "Login failed. Please try again."); // Set error message
		}
	};

	return (
		<div className="space-y-4 w-full max-w-md">
			<form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
				<h2 className="text-2xl font-bold mb-4">Login</h2>
				{error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}
				<div className="mb-4">
					<label className="block text-gray-700" htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						placeholder="Enter your username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className="border rounded w-full py-2 px-3 text-gray-700"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700" htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						placeholder="Enter your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="border rounded w-full py-2 px-3 text-gray-700"
					/>
				</div>
				<button type="submit" className="bg-red-500 text-white rounded py-2 px-4">
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginForm;

const handleLogin = async (email, password) => {
    try {
        const response = await axiosInstance.post("/auth/login", { email, password });
        localStorage.setItem("token", response.data.token);  // Save token in localStorage
        toast.success("Logged in successfully!");
    } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");
    }
};