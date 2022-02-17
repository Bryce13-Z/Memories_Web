import React, { useEffect } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from "moment";
import { useDispatch } from "react-redux";

import useStyle from "./styles";
import { deletePost, likePost } from "../../../actions/posts";



const Post = ({ post, setCurrentId }) => {
    const classes = useStyle();
    const dispatch = useDispatch();




    return (
        <Card className={classes.card} >
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>
            <div className={classes.overlay}>
                <Typography variant="h6">{ post.creator}</Typography>
                <Typography variant="body2">{ moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: "white"}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default"/>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{ post.tags.map((tag) => `#${tag}`)}</Typography>
            </div>
            
            <CardContent>
                <Typography classeName={classes.title} variant="h5" gutterBottom>{ post.title}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{ post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpIcon fontSize="small"/>
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
            </CardActions>
        </Card>
        
    )
}

export default Post;