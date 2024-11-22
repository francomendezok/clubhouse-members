import pool from "../db/pool.mjs"
import { format } from "date-fns"

const renderIndex = async (req, res) => {
    // get messages //
    const { rows } = await pool.query(`
        SELECT messages.*, users.first_name, users.last_name, users.email
        FROM messages
        JOIN users ON messages.user_id = users.id;`)
        rows.forEach(msg => msg.created_at = format(msg.created_at, 'dd/MM/yyyy HH:mm'))
    
        res.render("index", { 
            messages: rows
        });
}

export default { renderIndex }