import express from "express";
import dotenv from "dotenv";
import { prisma } from "./libs/client";
import subjectRoutes from "./routes/subjectRoutes";
import noteTopicRoutes from "./routes/noteTopicRoutes";
import noteItemRoutes from "./routes/noteItemRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/subjects", subjectRoutes);
app.use("/api/noteTopics", noteTopicRoutes);
app.use("/api/noteItems", noteItemRoutes);

// home route
app.get("/", (req, res) => {
  res.json("Backend running...");
});

const startServer = async () => {
  try {
    await prisma?.$connect();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    await prisma?.$disconnect();
    process.exit(1);
  }
};

startServer();
