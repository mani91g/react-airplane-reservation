import * as React from 'react';
// import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
// import { Toolbar, IconButton, Typography } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter, RouteComponentProps} from 'react-router'


class MenuItems extends React.Component <IProps & RouteComponentProps<any>>{
    /**
     *
     */
    constructor(props) {
        super(props);
        this.state= {
            showMenu: false
        }
        
    }

    navigateTo = (link: string) => {
        this.setState({showMenu: false})
        this.props.toggleMenu()
        this.props.history.push(link)
    }

    render() {
        const { showMenu } = this.props
        return (
            <div>
                <div>
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={showMenu}  
                    className={"nav-bar"}                  
                >
                    <List className={"list-style"}>
                        <ListItem button onClick={()=>this.navigateTo('/task')}>
                            <ListItemText primary="Task" />
                        </ListItem>
                        <ListItem button onClick={()=>this.navigateTo('/user')}>
                            <ListItemText primary="User" />
                        </ListItem>
                    </List>
                </Drawer>
                </div>
            </div>)
    }
}
export default withRouter(MenuItems)

interface IProps{
    showMenu: boolean;
    toggleMenu:() => void;
}