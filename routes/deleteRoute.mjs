import express from 'express';
import deleteController from '../controllers/deleteController.mjs'

const router = express.Router()

router.post('/', deleteController.deleteMessage)

export default router