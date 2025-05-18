import express from "express";
import helmet from "helmet";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import expressReactViews from "express-react-views";
import { COOKIE_PARSER_SECRET } from "./const.ts";
import IndexRouter from "./routes/IndexRouter.ts";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(helmet());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_PARSER_SECRET));

app.use(express.static(path.join(__dirname, "public")));
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", expressReactViews.createEngine());

app.use("/", IndexRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
