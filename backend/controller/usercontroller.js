const { response } = require('express');
const usermodel = require('../model/usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.insert = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        const data = await usermodel.create({ name, email, password: hashedPassword }); // Store hashed password
        return res.status(201).json({
            status:"Success",
            data:data
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error !!!"
        });
    }
}

exports.get_data = async (req, res) => {
    try {
        const data = await usermodel.find();
        return res.status(201).json({
            status:"Success",
            data:data
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error !!!"
        });
    }
}

exports.update_data = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await usermodel.findByIdAndUpdate(id, req.body);
        return res.status(200).json({
            status: "Data Updated !!!"
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error !!!"
        });
    }
}

exports.delete_data = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await usermodel.findByIdAndDelete(id);
        return res.status(200).json({
            status: "Data Deleted !!!"
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error !!!"
        });
    }
}

exports.get_single = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await usermodel.findById(id);
        res.status(200).json({
            status:"Success",
            data:data
        });
    } catch (error) {
        res.status(500).json({
            status: "Error !!!"
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email }); // Find user by email
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password); // Compare hashed password
            if (isPasswordValid) {
                const token = jwt.sign({ id: user.id }, "cdmi");
                return res.status(200).json({
                    status: "Success",
                    data: user, 
                    token
                });
            } else {
                return res.status(401).json({
                    status: "Check Your Email And Password"
                });
            }
        } else {
            return res.status(401).json({
                status: "Check Your Email And Password"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "Error !!!"
        });
    }
}
