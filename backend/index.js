import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoutes.js";
import companyRoute from "./routes/companyRoutes.js";
import jobRoute from "./routes/jobRoutes.js";
import applicationRoute from "./routes/applicationRoutes.js";

dotenv.config({});

const app = express();
const PORT = 8000;

await connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow cookies/auth headers
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

//  API Routes
app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the API",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
