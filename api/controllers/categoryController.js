const Category = require("../models/Category");

// * CREATE A CATEGORY *
module.exports.create_POST = async (req, res) => {
    const newCategory = new Category(req.body)
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory)
    } catch (err) {
        res.status(500).json(err)
    }
}

// * GET A CATEGORY (BY ID OR BY SLUG) *
module.exports.findOne_GET = async (req, res) => {
    // Query strings :
    const categoryId = req.query.categoryId;    // .../categories?categoryId=61f1115d86f7e859e1e2f2c7
    const slug = req.query.slug;                // .../categories?slug=cafe
    try {
        const category = categoryId ?
            await Category.findById(categoryId) // Je fetch la catégorie soit par son ID...
            :
            await Category.findOne({ slug: slug }); // ...soit par son slug.

        !category && res.status(404).json("No category was found."); // Si la requête ne renvoit aucune catégorie
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json(err);
    }
}

// * GET ALL CATEGORIES *
module.exports.findAll_GET = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json(err);
    }
}