import express from "express";
import { router } from "./routes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}`);
});
