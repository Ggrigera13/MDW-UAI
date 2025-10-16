import { Request, Response } from "express";
import User from "../../models/User";
import admin from "../../firebase";
import { refreshToken } from "firebase-admin/app";
import axios from "axios";

const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password, name, lastName } = req.body;
        const userRecord = await admin.auth().createUser({
            email,
            password
        });

        const user = new User({
            name,
            lastName,
            email,
            firebaseUid: userRecord.uid
        });

        await user.save();
        res.status(201).json({ 
            firebaseUser: userRecord, user 
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating User", error
        });
    }
};

const loginWithEmailPassword = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const apiKey = process.env.FIREBASE_API_KEY;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
        const response = await axios.post(url, {
            email,
            password,
            returnSecureToken: true
        });
        res.json({
            idToken: response.data.idToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
            localId: response.data.localId
        });
    } catch (error: any) {
        res.status(401).json({
            message: "Invalid email or password",
            error: error.response?.data || error.message
        });
    }
};

export default { registerUser, loginWithEmailPassword };