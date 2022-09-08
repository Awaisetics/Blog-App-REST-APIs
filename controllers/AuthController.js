const User = require('../model/UserSchema');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerUserValidation, loginUserValidation } = require('../validations/userValidation');
const { json } = require('body-parser');


const register = async (req, res, next) => {
    const errors = registerUserValidation.validate(req.body, { abortEarly: false })
    if (errors.error) {
        const allErrors = errors.error.details.map(err => err.message);
        next({ status: 500, message: allErrors });
        return;
    }

    const {name , email , password} = req.body;

    let emailExists = await User.findOne({ email });

    if (emailExists) {
        return res.status(400).send('Email already Exists.');
    }
    const encPassword = bcryptjs.hashSync(password , 15);
    try {
        const user = await User.create({ name, email, password : encPassword });
        res.status(201).json({ user, message: 'User Registered' });
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
};

const login = async (req, res, next) => {

    const errors = loginUserValidation.validate(req.body, { abortEarly: false })
    if (errors.error) {
        const allErrors = errors.error.details.map(err => err.message);
        return next({ status: 400, message: allErrors });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next({
                status: 404, message: "This Email Doesn't Exist" });
        }
        const dbPassword = user.password;
        const isSamePassword = await bcryptjs.compare(password , dbPassword);
        if (isSamePassword) {
            const JsonPayLoad = { id : user._id , name : user.name, email : user.email };
            const token = jwt.sign(JsonPayLoad, process.env.SECRET_KEY ,{ expiresIn : '3d'});
            res.json({ token ,  message : 'Logged In Successfully' });
        } else {
            next({ status: 404, message: 'Password is Incorrect' })
        }
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
};

module.exports = { register , login }























