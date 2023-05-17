import express from 'express';
import mongoose from 'mongoose';
import emplyeeAcc from '../models/emplyee.js';

import emplyees from '../models/emplyee.js';


const router = express.Router();

export const login = async (req, res) => {
    try {

        const {email, password} = req.body;
        const emplyee = await emplyees.findOne({emplyee_email: email});

        if (emplyee == null) throw new Error('invalid email');

        if (emplyee.emplyee_password === password) {
            emplyee.emplyee_password = '';
            res.status(200).json(emplyee);
            return;
        }
        res.status(401).json({message: 'password is incorrect'});

    } catch (error) {
        console.log('ERROR OCCURRED WHILE LOGGING')
        console.error(error);
        res.status(404).json({message: error.message});
    }
}

export const getemplyees = async (req, res) => {
    try {
        const emplyee = await emplyeeAcc.find();

        res.status(200).json(emplyee);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getemplyee = async (req, res) => {
    const {id} = req.params;

    try {
        const emplyee = await emplyeeAcc.findById(id);

        res.status(200).json(emplyee);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const addemplyee = async (req, res) => {
    const {emplyee_name, emplyee_id, emplyee_designation, emplyee_type,experience} = req.body;

    const newemplyees = new emplyeeAcc(req.body)

    try {
        await newemplyees.save();

        res.status(201).json(newemplyees);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}


export const updateemplyee = async (req, res) => {
    const {id} = req.params;
    const {emplyee_name, emplyee_id, emplyee_designation, emplyee_type,experience} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedemplyee = {emplyee_name, emplyee_id, emplyee_designation, emplyee_type,experience, _id: id};

    await emplyeeAcc.findByIdAndUpdate(id, updateemplyee, {new: true});

    res.json(updatedemplyee);
}

export const deleteemplyee = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await emplyees.findByIdAndRemove(id);

    res.json({message: "emplyee Removed successfully."});
}


// export const getemplyeesFromGroup = async (req, res) => {
//     const {id} = req.params;
//     try {
//         const result = await emplyees.find({emplyee_groups: id}).select('_id emplyee_email emplyee_Fname emplyee_Lname emplyee_designation emplyee_avatar');
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(404).json({message: error.message});
//     }
// }



export default router;