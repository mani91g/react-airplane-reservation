import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom'

class Header extends React.Component <IProps>{
    /**
     *
     */
    constructor(props) {
        super(props);
        this.state= {
            showMenu: false
        }
        
    }

    render() {
        return (
           
                <AppBar className={"app-bar"}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon 
                            //onClick={this.props.toggleMenu}
                            />
                        </IconButton>
                        <Typography variant="h6">
                            Airplane Reservation
                        </Typography>
                    </Toolbar>
                </AppBar>)
    }
}
export default Header

interface IProps{
    toggleMenu:() => void;
}