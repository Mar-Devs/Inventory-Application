const { body, validationResult, matchedData } = require("express-validator");
const q = require("../db/queries.js");

const notEmpty = "cannot be empty."
const alphaErr = "must only contain letters."
const lengthErr = "must be longer than 2 characaters."
const numErr = "must only contain numbers."

const validateUser = [
    body("item-type").trim().notEmpty().withMessage(`Item type ${notEmpty}`).bail()
    .isAlpha('en-US',{ignore: ' '}).withMessage(`Item name ${alphaErr}`).bail()
    .isLength({min:3}).withMessage(`Item name ${lengthErr}`),

    body("quantity").trim().notEmpty().withMessage(`Quantity ${notEmpty}`).bail()
    .isNumeric().withMessage(`Quantity ${numErr}`).bail()
    .isInt({min:0}).withMessage(`Quantity cannot be less than zero.`),

    body("category").notEmpty().withMessage(`Category ${notEmpty}`)
];

exports.createItem = [
    validateUser,
    (req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render("create",{
                title: "Add Item",
                errors: errors.array(),
            })
        }
        else{
        const {"item-type":itemType, quantity , category} = matchedData(req)
        q.insertData(category,itemType,quantity)
        res.redirect(`/categories/${category}`)
        }
    }
    
]