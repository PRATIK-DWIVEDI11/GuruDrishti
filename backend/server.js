// // import express from "express";
// // import dotenv from "dotenv";
// // import cookieParser from "cookie-parser";
// // import cors from "cors";
// // import path from "path";

// // import authRoutes from "./routes/auth.route.js";
// // import userRoutes from "./routes/user.route.js";
// // import postRoutes from "./routes/post.route.js";
// // import notificationRoutes from "./routes/notification.route.js";
// // import connectionRoutes from "./routes/connection.route.js";

// // import { connectDB } from "./lib/db.js";

// // dotenv.config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;
// // const __dirname = path.resolve();

// // if (process.env.NODE_ENV !== "production") {
// // 	app.use(
// // 		cors({
// // 			origin: "http://localhost:5173",
// // 			credentials: true,
// // 		})
// // 	);
// // }

// // app.use(express.json({ limit: "5mb" })); // parse JSON request bodies
// // app.use(cookieParser());

// // app.use("/api/v1/auth", authRoutes);
// // app.use("/api/v1/users", userRoutes);
// // app.use("/api/v1/posts", postRoutes);
// // app.use("/api/v1/notifications", notificationRoutes);
// // app.use("/api/v1/connections", connectionRoutes);

// // if (process.env.NODE_ENV === "production") {
// // 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// // 	app.get("*", (req, res) => {
// // 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// // 	});
// // }

// // app.listen(PORT, () => {
// // 	console.log(`Server running on port ${PORT}`);
// // 	connectDB();
// // });

// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";

// import authRoutes from "./routes/auth.route.js";
// import userRoutes from "./routes/user.route.js";
// import postRoutes from "./routes/post.route.js";
// import notificationRoutes from "./routes/notification.route.js";
// import connectionRoutes from "./routes/connection.route.js";

// import { connectDB } from "./lib/db.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// // ✅ Global CORS Middleware (Fixing blocked requests)
// app.use(
// 	cors({
// 		origin: "http://localhost:5173", // Allow frontend to access API
// 		credentials: true, // Allows cookies/session sharing
// 		methods: "GET, POST, PUT, DELETE, OPTIONS", // Allowed methods
// 		allowedHeaders: "Content-Type, Authorization", // Allowed headers
// 	})
// );

// // ✅ Handle Preflight Requests (Fixing OPTIONS request errors)
// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "http://localhost:5173");
// 	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
// 	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
// 	if (req.method === "OPTIONS") {
// 		return res.status(200).end();
// 	}
// 	next();
// });

// app.use(express.json({ limit: "5mb" })); // parse JSON request bodies
// app.use(cookieParser());

// // ✅ API Routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/posts", postRoutes);
// app.use("/api/v1/notifications", notificationRoutes);
// app.use("/api/v1/connections", connectionRoutes);

// // ✅ Serve Frontend in Production
// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

// // ✅ Start Server
// app.listen(PORT, () => {
// 	console.log(`🚀 Server running on port ${PORT}`);
// 	connectDB();
// });
// server.js

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";
import chatbotRoutes from "./routes/chatbot.route.js";
import appraisalRoutes from "./routes/appraisal.route.js"; // ✅ Correct name

import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ✅ CORS
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

// ✅ Preflight
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:5173");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	if (req.method === "OPTIONS") return res.status(200).end();
	next();
});

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// ✅ Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);
app.use("/api/v1/chatbot", chatbotRoutes);
app.use("/api/v1/analysis", appraisalRoutes); // ✅ Correct route path

// ✅ Production Frontend
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
	connectDB();
});
