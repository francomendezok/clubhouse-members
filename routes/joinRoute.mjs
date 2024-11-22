import express from 'express';
import joinController from '../controllers/joinController.mjs'

const router = express.Router()

router.get('/', joinController.renderJoin)

router.post('/', joinController.joinClub)

export default router