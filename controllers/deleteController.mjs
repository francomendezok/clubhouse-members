import pool from '../db/pool.mjs'

const deleteMessage = async (req, res, next) => {
        
        const SQL = `DELETE FROM messages WHERE id = $1`;
    
        await pool.query(SQL, [req.body.message_id])
    
        res.redirect('/')
}

export default { deleteMessage }