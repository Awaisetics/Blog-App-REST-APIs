const express = require('express');
const blogController = require('../controllers/BlogController');
const commentController = require('../controllers/CommentController');


const router = express.Router();

router.get('/all' , blogController.getAllBlogs);
router.get('/myBlogs', blogController.getMyBlogs);
router.get('/:id' , blogController.getBlog);
router.post('/create' , blogController.create);
router.put('/comment/add', commentController.postComment);
router.put('/update' , blogController.update);
router.delete('/destroy/:blogID?' , blogController.destroy);

module.exports = router;