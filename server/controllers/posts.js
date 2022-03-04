import  mongoose  from "mongoose";
import PostMessage from "../models/postMessage.js";


export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    } catch(error) {
        res.send("Post Creation");
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch(error){
        res.status(400).json({ message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    try{
        if (mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send("No post with that id");
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true});
        res.json(updatedPost);
    } catch(error) {
        res.status(400).json({ message: error.message});
    }
    
}

export const deletePost = async (req, res) => {
    const { id: _id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }

    try {
        await PostMessage.findByIdAndRemove(_id);
        res.json({message: "Post deleted successfully"});
    } catch(error) {
        res.status(400).json({ message: error.message});
    }
}


export const likePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    // check whether pass the middleware or not 
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    // if yes, check whether existing thise id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id");
    }
    try{
        //  find this id record
        const post = await PostMessage.findById(id);
        const index = post.likes.findIndex((id) => id ===String(req.userId));
        if (index === -1) {
            // like the post
            post.likes.push(req.userId);
          } else {
            // dislike the post
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost)
    } catch(error) {
        res.status(400).json({ message: error.message});
    }
    
}

 
