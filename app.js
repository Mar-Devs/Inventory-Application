const express = require("express");
const path = require("node:path");
const ejs = require("ejs");
const indexRouter = require("./src/controller/indexRouter.js");
const catRouter = require("./src/controller/categoriesRouter.js");
const { error } = require("node:console");
const q = require("./src/db/queries.js");
const r = require("./src/controller/form.js");
const s = require("./src/controller/update.js");
const d = require("./src/controller/delete.js");

const app = express();
app.use(express.json());
app.set("views", path.join(__dirname, "src", "view"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "src", "public");
const controllerPath = path.join(__dirname, "src", "controller");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.use(express.static(controllerPath));
app.use("/", indexRouter);

app.use("/categories", catRouter);


app.post("/categories/:category", d.deleteItem);

app.post("/create", r.createItem);

app.post("/", s.updateItem);



app.get("/success", (req, res) => {
  res.render("success");
});

const PORT = 8000
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`App is running on port: ${PORT}`);
});
