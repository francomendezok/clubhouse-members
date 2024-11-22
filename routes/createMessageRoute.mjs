import express from 'express';
import createMessageController from '../controllers/createMessageController.mjs'

const router = express.Router()

router.get('/', createMessageController.renderCreateMessage)

router.post('/', createMessageController.createMessage)

export default router