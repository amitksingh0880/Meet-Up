import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { users, posts } from "./data/index.js";


// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//storing assets locally
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


// ROUTES WITH FILES
app.post("/auth/register", register);
app.post("/posts", verifyToken, upload.single('image'), createPost);


// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);



// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => { console.log(`Server is live at port ${PORT}`); })

    // ADD DATA ONLY ONE TIME(nodemon will run again and again and add data again and again so comment this out after adding data once)
    // User.insertMany(users);
    // Post.insertMany(posts);

}).catch(
    (error) => {
        console.log(`${error} did not connect`);
    }
);




