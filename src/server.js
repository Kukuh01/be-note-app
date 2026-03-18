import express from "express";
import notesRoute from "./routes/notesRoutes.js";
import productRoute from "./routes/productRoutes.js";
import authRoute from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import { authMiddleware } from "./middleware/authMiddleware.js";

dotenv.config();
// console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);
app.use("/api/auth", authRoute);
app.use(authMiddleware);
app.use("/api/notes", notesRoute);
app.use("/api/products", productRoute);

// Connect mongo db first, then start application
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on Port: 5001", PORT);
  });
});
