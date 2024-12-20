import express from 'express';
import indexController from '../controllers/indexController.mjs'

const router = express.Router()

router.get('/', indexController.renderIndex)

export default router