import express, { Response, Request } from "express";
import dotenv from "dotenv";
import { prisma } from "./libs/client";
import subjectRoutes from "./routes/subject.routes";
import noteTopicRoutes from "./routes/noteTopic.routes";
import noteItemRoutes from "./routes/noteItem.routes";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api/subjects", subjectRoutes);
app.use("/api/note-topics", noteTopicRoutes);
app.use("/api/note-items", noteItemRoutes);

// home route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Backend running..." });
});

// Catch unregistered routes
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
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
