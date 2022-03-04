import React , {useState, UseEffect, useEffect }from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";


import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

// GET THE CURRENT ID 


const Form = ({ currentId, setCurrentId}) => {
    const classes = useStyles();

    // data hodlers
    const [postData, setPostData] = useState({
        title: "", message: "", tags: "", selectedFile: ""
    });

    // fetch data from one post 
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null );
    const dispatch = useDispatch();
    // get user information
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        console.log(post);
        if (post) setPostData(post);
    }, [post])

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: "", message: "", tags: "", selectedFile: ""});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
          } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }      
    }

    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own memories and like other's memories.
            </Typography>
          </Paper>
        );
    }

    return (
        <>
        {(!user?.result?.name) ? (
            <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own memories and like other's memories.
            </Typography>
          </Paper>
        ): (       
            <Paper className={classes.paper}> 
                <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                    <Typography variant="h5">{ currentId ? "Editing" : "Creating"} a Memory</Typography>

                    <TextField 
                        name="title" 
                        variant="outlined" 
                        label="Title" 
                        fullWidth 
                        value={postData.title}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                    
                    <TextField 
                        name="message" 
                        variant="outlined" 
                        label="Message" 
                        fullWidth 
                        value={postData.message}
                        onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                    
                    <TextField 
                        name="tags" 
                        variant="outlined" 
                        label="Tags" 
                        fullWidth 
                        value={postData.tags}
                        onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}/>

                    <div className={classes.fileInput}>
                        <FileBase 
                            type="file"
                            multiple={false}
                            onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}
                        />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth sx={{margin: "10px 0"}}>Clear</Button>
                </form>
            </Paper>
        )}

        </>

    )
}


export default Form;