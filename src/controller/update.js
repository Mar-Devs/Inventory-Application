const { body, validationResult, matchedData } = require("express-validator");
const q = require("../db/queries.js");

const notEmpty = "cannot be empty."
const numErr = "must only contain numbers."
const notNegative = "cannot be negative."
const isNumber = "must be a number"

const validation = [
    body("quantity").trim()
    .notEmpty().withMessage(`Quantity ${notEmpty}`).bail()
    .isNumeric().withMessage(`Quantity ${isNumber}`).bail()
    .isInt({min:0}).withMessage(`Quantity ${notNegative}`),

    body("id"),
    body("category").toLowerCase()

]

exports.updateItem = [
    validation,
    (req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render("category.ejs",{
                title: "Update Item",
                errors: errors.array(),
            })
        }
        else{
        q.alterItems(category,quantity, id)
        res.redirect(`/categories/${category}`)
        }
    }
    
]