import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import parentRoute from "./routes/parents/parent";

const app = express();

// body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) =>
  res.status(200).json({
    status: 200,
    data: [
      {
        message: "Welcome to NANNY SCHEDULER"
      }
    ]
  })
);

app.use("/api/parent", parentRoute);

app.all("*", (req, res) =>
  res.status(404).json({
    status: 404,
    error: "Route does not exist"
  })
);

// Define application port number
const port = process.env.PORT || 5000;

// Start server
app.listen(port);

// expose app to be use in another file
export default app;