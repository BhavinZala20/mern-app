const express = require('express');
const ErrorHandler = require("./Middleware/error.js");
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./Config/db');
const authRoutes = require('./Routes/authRoute.js');
const conversationRoutes = require('./Routes/ConversationRoute.js');
const messageRoutes = require('./Routes/MessageRoute.js');
const categoryRoutes = require('./Routes/CategoryRoute.js');
const productRoutes = require('./Routes/ProductRoute.js');
const shopRoutes = require('./Routes/ShopRoute.js');
const eventRoutes = require('./Routes/EventRoute.js');
const coupounCodeRoutes = require('./Routes/CoupounCodeRoute.js');
const orderRoutes = require('./Routes/OrderRoute.js');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors');

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true,
}));

//middelwares
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));
// Use bodyParser middleware for parsing application/json content type
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/conversation", conversationRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/shop", shopRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/coupounCode", coupounCodeRoutes);

app.use(ErrorHandler);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to review app</h1>");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
});

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgYellow);
});