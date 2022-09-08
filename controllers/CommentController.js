const Blog = require('../model/BlogSchema');
const Comment = require('../model/CommentSchema');

const postComment = async (req, res, next) => {
    const comment = {
        comment: req.body.comment,
        userId: req.user.id,
        userName: req.user.name,
    }
    const blogID = req.body.blogID;
    try {
        const blog = await Blog.findByIdAndUpdate( blogID, { 
            $push: { 
                comments: {
                    $each: [comment],
                    $position: 0
                }
            },

        }, { new: true })
        res.status(201).json({ blog, message: "Comment Added" })
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
}

module.exports = { postComment }