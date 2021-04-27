import React,{Component} from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import Account from './components/account'


class App extends Component{
  

  logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('is_logged_in');
  }
  login = (token) => {
    sessionStorage.setItem('token',token);
    sessionStorage.setItem('is_logged_in',true);
  }

  
  
  render(){

    return(  

    <BrowserRouter>
      <Switch>
          <Route exact path="/Account" component={() => <Account logout={this.logout}  login={this.login}  />}/>
          <Route exact path="/" component={() => <Home logout={this.logout}  login={this.login}  />}/>
          <Route exact path="/Home" component={() => <Home logout={this.logout}  login={this.login}  />}/>
          <Route exact path="/Login" component={()=> <Login logout={this.logout}  login={this.login} />}/>
          <Route exact path="/Register" component={()=> <Register logout={this.logout}  login={this.login} />}/>
      </Switch>
    </BrowserRouter>

    );
  }          

}

export default App;
