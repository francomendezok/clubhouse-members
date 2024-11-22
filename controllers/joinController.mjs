import { validationResult } from 'express-validator';
import { validateJoin } from './validation.mjs';
import pool from '../db/pool.mjs';

const renderJoin = async (req, res) => {
    if (!req.user) {
        return res.redirect('/log-in'); // Redirige si no está logueado
    }
    res.render('join'); // Renderiza la vista para usuarios logueados
}

const joinClub = [
    validateJoin,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
 
            await pool.query(`UPDATE users SET membership_status = 'VIP' WHERE id = $1`, [req.user.id]);
            res.redirect('/?vip=true');
        } catch (error) {
            console.log('Error executing query:', error);
            return next(error);
        }
    }
]

export default { renderJoin, joinClub }