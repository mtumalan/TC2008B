"use strict";

import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import ratelimit from "express-rate-limit";
import fs from "fs";

import {dbRouter} from "./src/routes/databaseRoutes.js"; 

const app = express();
const port = process.env.PORT || 3000;

const limiter = ratelimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
});

// Middleware
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", dbRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
