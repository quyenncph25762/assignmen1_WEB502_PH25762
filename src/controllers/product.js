import Product from "../model/product"
import joi from "joi";
const productValidate = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string(),
    status: joi.boolean(),
})

export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        if (products == 0) {
            res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(201).json(products);
    } catch (error) {
        res.status(404).json({
            message: "Product not found"
        })
    }
}
export const getOne = async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id });
        if (!product) {
            res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(201).json({
            message: "Product found",
            product
        });
    } catch (error) {
        res.status(404).json({
            message: "Product not found"
        })
    }
}
export const create = async (req, res) => {
    const { error } = productValidate.validate(req.body);
    try {
        if (error) {
            res.status(401).json({
                message: error.details[0].message
            })
        }
        const products = await Product.create(req.body);
        res.status(201).json({
            message: "Product created successfully",
            products
        });
    } catch (error) {
        res.status(404).json({
            message: "Product not found"
        })
    }
}
export const update = async (req, res) => {
    const { error } = productValidate.validate(req.body);
    try {
        if (error) {
            res.status(404).json({
                message: error.details[0].message
            })
        }
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!product) {
            res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(201).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(404).json({
            message: "Product not found"
        })
    }
}
export const remove = async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.params.id });
        res.status(201).json({
            message: "Product removed successfully",
        });
    } catch (error) {
        res.status(404).json({
            message: "Product not found"
        })
    }
}