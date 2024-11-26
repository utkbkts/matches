import express from "express";
import dotenv from "dotenv";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import compression from "compression";
import errorMiddleware from "./middleware/error.middleware.js";
import bodyParser from "body-parser";

//SOCKET IO

//DB
import { ConnectedDatabase } from "./db/connected.db.js";
//ROUTES
import authRoutes from "./routes/auth.routes.js";
import subscriptionRoutes from "./routes/subscription.route.js";
import membersRoutes from "./routes/members.route.js";
import messagesRoutes from "./routes/message.routes.js";
import { stripeWebhook } from "./controllers/stripe.webhooks.js";

//path
const __dirname = path.resolve();
//dotEnv config
dotenv.config();
const app = express();
//parse json request url
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ extended: true, limit: "150mb" }));

//sanitize request data
app.use(mongoSanitize());

//compress response
app.use(compression());

//enable cookie parser
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//api v1 routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/subscription", subscriptionRoutes);
app.use("/api/v1/members", membersRoutes);
app.use("/api/v1/messages", messagesRoutes);
app.use(
  "/api/v1/webhooks",
  bodyParser.raw({ type: "application/json" }),
  stripeWebhook
);

app.use(errorMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const server = app.listen(process.env.PORT, () => {
  ConnectedDatabase();
  console.log(`server is running PORT:${process.env.PORT}`);
});

const unexpectedErrorHandler = (error) => {
  console.error("Unexpected Error:", error);
  server.close(() => {
    console.log("Server closed due to an unexpected error.");
    process.exit(1);
  });
};

const gracefulShutdown = () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", gracefulShutdown);
