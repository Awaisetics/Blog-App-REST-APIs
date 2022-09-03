const express = require('express');
const blogController = require('../controllers/BlogController');
const commentController = require('../controllers/CommentController');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authMiddleWare = (req , res , next) => {
    const secretKey = process.env.SECRET_KEY;
    const token = req.header('Authorization') || '';
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    const decode = jwt.decode(token, secretKey);
    if (!decode) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    req.user = decode;
    next();
}

router.get('/blogs/all', authMiddleWare, blogController.getAllBlogs);
router.get('/blogs/myblogs', authMiddleWare , blogController.getMyBlogs);
router.post('/blog/create', authMiddleWare , blogController.create);
router.put('/blog/comment/add', authMiddleWare, commentController.postComment);
router.put('/blog/update', authMiddleWare , blogController.update);
router.delete('/blog/destroy/:blogID?', authMiddleWare , blogController.destroy);

module.exports = router;