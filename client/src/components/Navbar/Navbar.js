import React, {useEffect, useState} from 'react'
import {AppBar, Typography, Button, Avatar, Toolbar} from "@mui/material";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from "jwt-decode";

import useStyles from './Style';
import memories from "../../images/memories.png";



export default function Navbar() {

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: "LOGOUT"});
        navigate("/");
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        // if the token expire, set to logout
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.branContainer}>
            <Typography className={classes.heading} variant="h2" algin="center">
                Memories 
            </Typography>
            <img className={classes.image} src={ memories } alt="memories" height="60"/>
            </div>

            <Toolbar className={classes.toolbar}>
                { user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>
                            {user?.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6"> {user?.result.name} </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
  )
}


