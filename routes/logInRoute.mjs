import express from 'express';
import logInController from '../controllers/logInController.mjs'

const router = express.Router()

router.get('/', logInController.renderLogIn)

router.post('/', logInController.logIn)

export default router