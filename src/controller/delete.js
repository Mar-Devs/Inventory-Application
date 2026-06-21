const { body, validationResult, matchedData } = require("express-validator");
const q = require("../db/queries.js");

const validation = [body("category").toLowerCase(), body("id")];

exports.deleteItem = [
  validation,
 async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("category.ejs", {
        title: "Delete Item",
        errors: errors.array(),
      });
    } else {
      const { category, id } = matchedData(req);
      const itemCount = await q.getData(category);
      console.log(`This is item count: ${itemCount}`)
      if (itemCount.length <= 3) {
        return ""
      } else {
        q.deleteItem(category, id);
        res.redirect(`/categories/${category}`);
      }
    }
  },
];
