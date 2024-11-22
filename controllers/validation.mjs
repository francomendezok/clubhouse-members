import { body } from "express-validator"

const alphaErr = "must only contain letters."
const lengthErr = "must be between 1 and 255 characters."
const emailErr = "must be an email"
const passLengthErr = "must be between 8 and 255 characters"

const validateCreateUser = [
    body("first_name").trim()
        .isAlpha().withMessage(`First Name ${alphaErr}`)
        .isLength({ min: 1, max: 255 }).withMessage(`First Name ${lengthErr}`),
    body("last_name").trim()
        .isAlpha().withMessage(`Last Name ${alphaErr}`)
        .isLength({ min: 1, max: 255 }).withMessage(`Last Name ${lengthErr}`),
    body("email").trim()
        .isEmail().withMessage(`Email ${emailErr}`)
        .isLength({ min: 1, max: 100 }).withMessage(`Email should have less than 100 characters`),
    body("password").trim()
        .isLength({ min: 8, max: 255 }).withMessage(`Password ${passLengthErr}`),
    body("confirm_password").trim()
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),    
];

const validateLogUser = [
    body("log-email").trim()
        .isLength({ min: 1, max: 100 }).withMessage(`Email ${emailErr}`)
        .isEmail().withMessage(`Email ${emailErr}`),
    body("log-password").trim()
        .isLength({ min: 8, max: 255 }).withMessage(`Password ${passLengthErr}`)
]

const validateJoin = [
    body("passcode").trim()
        .equals("vipmember2024").withMessage("Incorrect passcode")
]

const validateMessage = [
    body("title").trim()
        .isLength({ min: 1, max: 255 }).withMessage(`Title ${lengthErr}`),
    body("content")
        .isLength({ min: 1, max: 255 }).withMessage(`Content ${lengthErr}`)
]


export { validateCreateUser, validateLogUser, validateJoin, validateMessage }