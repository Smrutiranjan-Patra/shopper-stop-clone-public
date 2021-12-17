const express = require("express");
const Product = require("../models/product.model");
const Cat = require("../models/category.model");
const User= require("../models/user.model");
const router = express.Router();
var jwt = require('jsonwebtoken');
require('dotenv').config()

const newToken =(user)=>{
    return  jwt.sign({ user:user }, process.env.JsonWebToken);
}


router.post('/createaccount', async function (req, res) {


        let user
    try{
        user= await User.findOne({ email: req.body.email}).lean().exec()
        if(user) {
            return res.status(400).json({ 
                status:"failed",
                message: 'Email already exists'
            })
        }

        user= await User.create(req.body)
        const token = newToken(user);
        return res.cookie('token', token).json({user})
    }
    
     catch (e) {
        res.status(500).send({
            message:e.message
        })

    }

})

router.post('/login', async function (req, res) {

    try {
        let user
        user= await User.findOne({ email: req.body.email});
        if(!user) {
           return res.status(400).json({ 
                status:"failed",
                message: "Email dont exists"
            })
        }
        const match = await user.checkPassword(req.body.password);
        if(!match){
            return res.status(400).json({ 
                status:"failed",
                message: "Password not correct"
        })
    }
    const token = newToken(user);
    return res.cookie('token', token).json({user})

    } catch (e) {
        res.status(500).json({
            status: e,
            message:e
        })
    }

})

router.post('', async function (req, res) {

    try {
        const product = await Product.create(req.body);
        res.status(201).send(product)
    } catch (e) {
        res.status(500).json({
            status: "failed",message: e.message
        })

    }

})



router.post("/search/suggestion", async (req, res) => {
    try {
        let search= req.body.search;
        
       Product.find({

              Product_Brand: {$regex: search,  $options: 'i' } 
       
       }, function(err, result){
           if(err){
               console.log('err:', err)
               return res.status(500).json({err:err})
           }

            return res.status(200).json({result: result})
       
         });

    } catch (e) {

        return res.render("error", ({
            status: "failed",message: e.message
        }));
    }
})

router.get("/", async (req, res) => {
    try {
        return res.render('products/index')
    } catch (e) {

        return res.render("error", ({
            status: "failed",message: e.message
        }));
    }
})
// router.get("/:id", async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id).populate("Category").lean().exec();
//         return res.send({product})
//     } catch (e) {
//         res.status(500).json({
//             status: e.message
//         })

//     }

//   })
router.get("/search", async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 12;
        const skip = (page - 1) * size;
        let search = req.query.search;
        const product = await Product.find({
            $or: [{
                Product_Category: {
                    $eq: search
                }
            }, {
                Product_Type: {
                    $eq: search
                }
            }, {
                Product_Brand: {
                    $eq: search
                }
            }, {
                Product_Color: {
                    $eq: search
                }
            }, {
                Gender: {
                    $eq: search
                }
            }]
        }).skip(skip).limit(size).lean().exec();

        const totalPages = Math.ceil(await Product.find({
            $or: [{
                Product_Category: {
                    $eq: search
                }
            }, {
                Product_Type: {
                    $eq: search
                }
            }, {
                Product_Brand: {
                    $eq: search
                }
            }, {
                Product_Color: {
                    $eq: search
                }
            }, {
                Gender: {
                    $eq: search
                }
            }]
        }).countDocuments() / size)


        return res.render('products/search', {
            product,
            search,
            totalPages,
            page
        })
    } catch (e) {
        return res.render("error", ({
            e
        }));
       

    }

})

router.get("/wishlist", async (req, res) => {
    try {
        return res.render('products/wishlist')
    } catch (e) {
       return res.render("error", ({
            e
        }));
    }
})

router.get("/cart", async (req, res) => {
    try {
        let user= false;
        return res.render('products/cart', {user})
    } catch (e) {
        return res.render("error", ({
            e
        }));
    }
})

router.get("/cart/address", async (req, res) => {
    try {
        return res.render('products/address')
    } catch (e) {
        return res.render("error", ({
            e
        }));
    }
})
router.get("/cart/payment", async (req, res) => {
    try {
        return res.render('products/payment')
    } catch (e) {
        return res.render("error", ({
            e
        }));
    }
})

router.get("/category", async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 12;
        const skip = (page - 1) * size;
        let type = req.query.items;
        type = type.toUpperCase()
        const product = await Product.find({
            Product_Category: {
                $eq: type
            }
        }).skip(skip).limit(size).lean().exec();
        const totalPages = Math.ceil(await Product.find({
            Product_Category: {
                $eq: type
            }
        }).countDocuments() / size)
        type = type.toLowerCase()
        return res.render(`products/${type}`, {
            product,
            type,
            totalPages,
            page
        })
    } catch (e) {
        console.log('e:', e)
        return res.render("error", ({
            e
        }));
    }
})


router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).lean().exec();
        return res.render('products/pro_description', {
            product
        })
    } catch (e) {
        return res.render("error", ({
            e
        }));
        res.status(500).json({

            status: e.message
        })


    }

})


router.get("/category/type", async (req, res) => {
    try {
        let type = req.query.items;
        type = type.toUpperCase()
        const product = await Product.find({
            Product_Category: {
                $eq: type
            }
        }).lean().exec();
        console.log(product);
        type = type.toLowerCase();
        if (type == "mens" || type == "kids" || type == "beauty") {
            return res.render(`products/${type}`, {
                product
            })
        }

    } catch (e) {
        return res.render("error", ({
            status:"failed",message: e.message
        }));
    }
})









module.exports = router;