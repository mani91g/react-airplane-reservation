import Header from './Components/layout/header'
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {routes} from './Components/layout/routes'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MenuItems from './Components/layout/menu'

class App extends React.Component<{}, ILocalState> {
  /**
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    }
    
  }

  toggleMenu = () => {
    const { showMenu } = this.state
    this.setState({showMenu: !showMenu})
  }
  render(){
    return (
      <div className="App">
        <div className="App-header">
          <Header 
          toggleMenu={this.toggleMenu}
          />         
          {/* <img className="App-logo" alt="logo" /> 
          
          <User />
    <TaskViewer/>*/}
        </div>
        <div className={"app-body"}>
        <Router>
        {
          routes && routes.map((r, index) => (<Route path ={r.path} component={r.component} exact={r.exact} key={index}/>))
        }
        <MenuItems
          showMenu={this.state.showMenu}
          toggleMenu={this.toggleMenu}
        />            
        </Router>
        </div>
      </div>
    );
  }
}
export default App;

interface ILocalState{
  showMenu: boolean;
}