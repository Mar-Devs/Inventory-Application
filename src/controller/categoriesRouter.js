const { Router } = require("express");
const q = require("../db/queries.js");
const express = require("express");
const r = require("../controller/form.js");
const s = require("../controller/update.js");

const catRouter = Router();

catRouter.use(express.json())

async function displayData(category) {
  const data = await q.getData(category);
  return data;
}

async function updateData(tableName, quantity, id) {
  const data = await q.alterItems(tableName, quantity, id);
  return data;
}

catRouter.get("/:category", async (req, res) => {
  const data = await q.getCategories();
  const cat = req.params.category;
  for (let i = 0; i < data.length; i++) {
    let temp = data[i]["category"];
    temp = temp.toLowerCase();
    if (temp === cat) {
      const content = await q.getData(cat);
      console.log(`This is content: ${data[i]["category"]}`);
      res.render("category", { content: content, cat: data[i]["category"]});
    } else if (temp !== cat && i === data.length) {
      res.status(404).send("Category Not Found");
    }
  }
});


module.exports = catRouter;
