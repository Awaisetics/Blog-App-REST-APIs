const Blog = require('../model/BlogSchema');
const { addBlogValidation , updateBlogValidation} = require('../validations/BlogValidation'); 



const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({}).populate('authorDetail', '-email -password').sort({'postedAt' : -1});
        res.json({ blogs });
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

const getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('authorDetail', '-email -password');
        res.json({ blog });
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

const getMyBlogs = async (req , res , next) => {
    const id = req.user.id;
    try {
        const blogs = await Blog.find({ authorDetail: id }).populate('authorDetail', '-email -password').sort({ 'postedAt': -1 });
        res.json({ blogs });
    } 
    catch (error) {
        next({ status : 404 , message : error.message})
    }
};


const create = async (req , res , next) => {
    const errors = addBlogValidation.validate(req.body , {abortEarly : false})
    if (errors.error){
        const allErrors = errors.error.details.map(err => err.message);
        next({ status : 500 , message : allErrors});
        return;
    }
    const data = {
        title : req.body.title,
        content : req.body.content,
        tags : req.body.tags,
        authorDetail : req.user.id,
    }
    try {
        const blog = await Blog.create(data);
        res.status(201).json({ blog , message : 'Blog Post Created Successfully'});
    } 
    catch (error) {
        next({ status: 500, message: error.message })
    }
};

const update = async (req , res , next) => {

    const id = req.body.id;
    if(!id) {
        return next({ status : 404 , message : 'ID Is Missing' })
    }
    
    const errors = updateBlogValidation.validate(req.body, { abortEarly: false })
    if (errors.error) {
        const allErrors = errors.error.details.map(err => err.message);
        return next({ status: 400, message: allErrors });
    }

    try {
        const blog = await Blog.findByIdAndUpdate(id , {
            $set : {
                title : req.body.title,
                content : req.body.content,
                tags: req.body.tags
            }
        }, {new : true})
        res.status(201).json({ blog , message: "Record Updated" })
    } 
    catch (error) {
        next({ status: 500, message: error.message })
    }
};

const destroy = async (req , res , next) => {
    const id = req.params.blogID;
    if (!id) {
        return next({ status: 404, message: 'ID Is Missing' })
    }

    try {
        const blog = await Blog.findByIdAndDelete(id)
        res.json({message : 'Blog Deleted'});
    } 
    catch (error) {
        next({ status: 500, message: error.message })
    }
};

module.exports = { getAllBlogs, create, update, destroy, getMyBlogs, getBlog }























