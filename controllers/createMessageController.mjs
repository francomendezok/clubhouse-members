import pool from '../db/pool.mjs'
import { validateMessage } from './validation.mjs'
import { validationResult } from 'express-validator'

const renderCreateMessage = async (req, res) => {
    if (!req.user) {
        return res.redirect('/'); // Redirige si no está logueado
    }
    res.render("create-message")
}

const createMessage = [
    validateMessage,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            const { title, content } = req.body
            const values = [title, content, req.user.id]
            const SQL = `
                INSERT INTO messages (title, content, user_id) 
                VALUES ($1, $2, (SELECT id FROM users WHERE id= $3));`
            
            await pool.query(SQL, values)
            res.redirect('/')

        } catch (error) {
            console.log(error)
            return next(error)
        }
    }
]

export default { renderCreateMessage, createMessage }