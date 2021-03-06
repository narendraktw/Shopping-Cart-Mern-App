import express from "express";
import pkg from "body-parser";
const { urlencoded, json } = pkg;
import morgan from "morgan";
import "dotenv/config";
import mongoose from "mongoose";
import categoriesRoutes from "./routes/categories.js";
import productsRoutes from "./routes/products.js";
import usersRoutes from "./routes/users.js";
import ordersRoutes from "./routes/orders.js";
import cors from "cors";
import authJWT from "./helpers/jwt.js";
import errorHandler from "./helpers/error-handler.js";
import path from "path";
const __dirname = path.resolve();
const app = express();
const api = process.env.API_URL;

//Header settings
app.use(cors());
app.options("*", cors());

//middleware - backend understand the data format send from frontend
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(morgan("tiny"));
app.use(authJWT()); //secure APIs based on token
app.use("/public/uploads", express.static(__dirname + "/public/uploads")); //__dirname return a root path static path
app.use(errorHandler);

//API Routes
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Database establish app connection with db through mongoose library...
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: "eshop-Database",
  })
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log(`Express is working on Port ${port}`);
});
