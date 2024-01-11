import express from "express";
import "dotenv/config";
const app = express();
import fileUpload from "express-fileupload";
import helmet from "helmet";
import cors from "cors";
import { limiter } from "./config/ratelimiter.js";
const PORT = process.env.PORT || 8000;

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());
app.use(helmet());
app.use(cors());
app.use(limiter);

app.get("/", (req, res) => {
  return res.json({ message: "Hello It's working.." });
});

// * Import routes
import ApiRoutes from "./routes/api.js";
app.use("/api", ApiRoutes);

// * Jobs import
import "./jobs/index.js";

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
