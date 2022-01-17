const express = require("express");
const Category=require("../models/category.model");
const router= express.Router();
router.post('', async function (req, res) {

    try {
        const category = await Category.create(req.body);
        res.status(201).send(category)
    } catch (e) {
        res.status(500).json({
            status:e.message
        })

    }

});
router.get("", async (req, res) => {
    try {
        console.log("hi")
        const category = await Category.find().exec();
        res.status(201).send({
            category
        });
    } catch (e) {
        res.status(500).json({
            status: e.message
        })

    }

})




router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).lean().exec();
        res.status(201).send({
            category
        });
    } catch (e) {
        res.status(500).json({
            status: e.message
        })

    }

})



router.patch("/:id", async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).lean().exec();
        res.status(201).send({
            category
        });
    } catch (e) {
        res.status(500).json({
            status: e.message
        })

    }

})
router.delete("/:id", async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send({
            category
        });
    } catch (e) {
        res.status(500).json({
            status: e.message
        })

    }

})// ************************category route****************



module.exports= router;