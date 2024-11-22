import { validationResult } from 'express-validator'
import { validateCreateUser } from './validation.mjs'
import pool from '../db/pool.mjs'
import bcrypt from 'bcrypt'

const renderForm = (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('sign-up')
}

const createUser = [
    validateCreateUser,
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {            
            return res.status(400).json({ errors: errors.array() });
        }
    const { first_name, last_name, email, password, isAdmin } = req.body
    
    const membershipStatus = isAdmin ? "ADMIN" : "REGULAR";

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
            
        const values = [
            first_name,
            last_name,
            email,
            hashedPassword,
            membershipStatus
        ]
        await pool.query("INSERT INTO users (first_name, last_name, email, password, membership_status) VALUES ($1, $2, $3, $4, $5)", values);

        res.redirect("/log-in?success=true");

    } catch (err) {
        console.error(err);
        return next(err);  
    }
    }
]


export default { renderForm, createUser }