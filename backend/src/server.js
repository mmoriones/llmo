import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import chatRoutes from "./routes/chat.routes.js";
import abortRoutes from "./routes/abort.routes.js";
import embedRoutes from "./routes/embed.routes.js";
import pdfRoutes from "./routes/pdf.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", chatRoutes);
app.use("/api/ai", abortRoutes);
app.use("/api/ai", embedRoutes);
app.use("/api/pdf", pdfRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
