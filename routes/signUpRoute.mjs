import express from 'express';
import signUpController from '../controllers/signUpController.mjs'

const router = express.Router()

router.get('/', signUpController.renderForm)

router.post('/', signUpController.createUser)

export default router