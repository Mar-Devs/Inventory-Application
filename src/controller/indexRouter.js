const { Router } = require("express");
const q = require("../db/queries.js");
const weapon = "/sci-fi-weaponry.jpeg";
const aid = "/sci-fi-first aid.jpeg";
const clothing = "/sci-fi-clothing.jpeg";
const food ="/sci-fi-food.jpeg";


const indexRouter = Router();


const imgArray = [weapon, clothing, aid, food];
indexRouter.get("/", async (req, res) => {
  const data = await q.getCategories();
  res.render("index", { arr: data , imageArray: imgArray });
});

module.exports = indexRouter;
