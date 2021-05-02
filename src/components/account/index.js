import React,{Component} from 'react';
import {Redirect,Link} from 'react-router-dom';
import API_CONFIG from '../../config/api';
import axios from 'axios'
import './index.css';

import avatar1 from '../ilustrations/avatars/1.png';
import avatar2 from '../ilustrations/avatars/2.png';
import avatar3 from '../ilustrations/avatars/3.png';
import avatar4 from '../ilustrations/avatars/4.png';
import avatar5 from '../ilustrations/avatars/5.png';
import avatar6 from '../ilustrations/avatars/6.png';
import avatar7 from '../ilustrations/avatars/7.png';
import avatar8 from '../ilustrations/avatars/8.png';



class Account extends Component{

    

    state = {
        is_logged_in: sessionStorage.getItem('is_logged_in'),
        avatar:avatar1,
        loading:true,
        user:null,
        NameError: null,
        PasswordError:null,
        Message:null,
        MessageType:null,
        redirect:false,
    }

    logoutHOME = () =>{
        this.setState({
            is_logged_in:false,
            user:null,
            users:null,
        })
        this.props.logout()
    }

    componentDidMount(){
        var token = sessionStorage.getItem('token')
        axios.get(API_CONFIG.URL+API_CONFIG.ENDPOINT.GET.GET_CURRENT_USER,{ 
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(
            res=>{

                if(!res.data){
                    this.logoutHOME();
                }

                this.setState({
                    user:res.data,
                })

                if(this.state.user.avatar === 1){
                    this.setState({
                        avatar:avatar1,
                    })
                }else if(this.state.user.avatar === 2){
                    this.setState({
                        avatar:avatar2,
                    })
                }else if(this.state.user.avatar === 3){
                    this.setState({
                        avatar:avatar3,
                    })
                }else if(this.state.user.avatar === 4){
                    this.setState({
                        avatar:avatar4,
                    })
                }else if(this.state.user.avatar === 5){
                    this.setState({
                        avatar:avatar5,
                    })
                }else if(this.state.user.avatar === 6){
                    this.setState({
                        avatar:avatar6,
                    })
                }else if(this.state.user.avatar === 7){
                    this.setState({
                        avatar:avatar7,
                    })
                }else if(this.state.user.avatar === 8){
                    this.setState({
                        avatar:avatar8,
                    })
                }else{
                    this.setState({
                        avatar:avatar1,
                    })
                }        

                
            }
        ).catch(
            err=>{
                this.logoutHOME();
                console.log(err)
            }
        )


        this.setState({
            loading:false
        })
    }


    handelInputChange = (inputName,value) => {
        if(inputName === "Name"){
            this.setState({
                NameError: null,
                user:{
                    ...this.state.user,
                    name:value
                } 
            })
        }else if(inputName === "Password"){
            this.setState({
                Password:value,
                user:{
                    ...this.state.user,
                    password:value
                }
            })
        }
    }

    chooseAvatar = (newAvatar) => {
        this.setState({
            user:{
                ...this.state.user,
                avatar:newAvatar
            }
        })
    }


    update = () => {

        var flag = false;
        if(!this.state.user.name){
            this.setState({
                NameError: 'Name cannot be empty'
            })
            flag = true;
        }

        if(!this.state.user.password){
            this.setState({
                PasswordError: 'Password cannot be empty'
            })
            flag = true;
        }

        if(this.state.user.password.length <=3 ){
            this.setState({
                PasswordError: 'Password must be greater than 3'
            })
            flag = true;
        }


        if(!flag){
            var token = sessionStorage.getItem('token');
            axios.put(API_CONFIG.URL+API_CONFIG.ENDPOINT.PUT.UPDATE_USER,
            {
                ...this.state.user,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then(
                res=>{
                    console.log(res);
                    this.setState({
                        MessageType:'success',
                        Message:'Updated successfuly',
                    })
                }    
            ).catch(
                err=>{
                    console.log(err);
                    this.setState({
                        MessageType:'danger',
                        Message:'Something went wrong try agin later !',
                    })
                    this.logoutHOME();
                }
            )
        }

       
    }

    delete = () => {
            var token = sessionStorage.getItem('token');
            axios.delete(API_CONFIG.URL+API_CONFIG.ENDPOINT.DELETE.DELETE_CURRENT_USER,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then(
                res=>{
                    console.log(res);
                    if(res.data.body.code === "UD1"){
                        this.setState({
                            MessageType:'success',
                            Message:'Deleted successfuly',
                        })
                        this.logoutHOME();
                    }else{
                        this.setState({
                            MessageType:'danger',
                            Message:'Something went wrong try agin later !',
                        })
                        this.logoutHOME();
                    }
                   
                }    
            ).catch(
                err=>{
                    console.log(err);
                    this.setState({
                        MessageType:'danger',
                        Message:'Something went wrong try agin later !',
                    })
                    this.logoutHOME();

                }
            )
    }
    
    render(){
        if(this.state.is_logged_in){
          return(  
              <div className="home-cont">
                  <div className="navbar-cont">
                      <div className="buttons-cont">

                         <Link to={'/home'}><div className="user" ><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div></Link> 
                          <div className="logout" onClick={this.logoutHOME}> Logout</div>
  
                      </div>
                      <div className="title-cont"> Welcome back @{this.state.user ? this.state.user.username : ''}</div>
                  </div>


                  <div className="account-cont">
                      <div className="form-title">@{this.state.user ? this.state.user.username: ''}</div>
                      <div className="avatars-list">

                                {this.state.user ? this.state.user.avatar === 1 ? <div className="my-avatar selected"> <img alt="" src={avatar1}></img></div>: <div className="my-avatar" onClick={()=>{this.chooseAvatar(1)}}> <img alt="" src={avatar1}></img></div> : ''}
                                {this.state.user ? this.state.user.avatar === 2 ? <div className="my-avatar selected"> <img alt=""src={avatar2}></img></div>: <div className="my-avatar" onClick={()=>this.chooseAvatar(2)}> <img alt=""src={avatar2}></img></div> : ''}
                                {this.state.user ? this.state.user.avatar === 3 ? <div className="my-avatar selected"> <img alt=""src={avatar3}></img></div>: <div className="my-avatar" onClick={()=>this.chooseAvatar(3)}> <img alt=""src={avatar3}></img></div> : ''}
                                {this.state.user ? this.state.user.avatar === 4 ? <div className="my-avatar selected"> <img alt=""src={avatar4}></img></div>: <div className="my-avatar" onClick={()=>this.chooseAvatar(4)}> <img alt=""src={avatar4}></img></div> : ''}
                                {this.state.user ? this.state.user.avatar === 5 ? <div className="my-avatar selected"> <img alt=""src={avatar5}></img></div>: <div className="my-avatar" onClick={()=>this.chooseAvatar(5)}> <img alt=""src={avatar5}></img></div> : ''}
                                {this.state.user ? this.state.user.avatar === 6 ? <div className="my-avatar selected"> <img alt=""src={avatar6}></img></div>: <div className="my-avatar" onClick={()=>this.chooseAvatar(6)}> <img alt=""src={avatar6}></img></div> : ''}
                                {this.state.user ? this.state.user.avatar === 7 ? <div className="my-avatar selected"> <img alt=""src={avatar7}></img></div>: <div className="my-avatar" onClick={()=>this.chooseAvatar(7)}> <img alt=""src={avatar7}></img></div> : ''}
                                {this.state.user ? this.state.user.avatar === 8 ? <div className="my-avatar selected"> <img alt=""src={avatar8}></img></div>: <div className="my-avatar" onClick={()=>this.chooseAvatar(8)}> <img alt=""src={avatar8}></img></div> : ''}
                                

                      </div>

                        <div className="form-input">
                                        {/* ERRORS */}
                                        {/* <label>Username <span> wrong user name</span></label> */}
                                        <label>Name {this.state.NameError ? (<span> {this.state.NameError}</span>) : "" }</label>
                                        <input onChange={e => this.handelInputChange("Name",e.target.value)} value={this.state.user ? this.state.user.name : ''} type="text"></input>
                        </div>
                        <div className="form-input">
                                        {/* ERRORS */}
                                        {/* <label>Username <span> wrong user name</span></label> */}
                                        <label>Password {this.state.PasswordError ? (<span> {this.state.PasswordError}</span>) : "" }</label>
                                        <input onChange={e => this.handelInputChange("Password",e.target.value)} value={this.state.user ? this.state.user.password : ''} type="text"></input>
                        </div>
                        {this.state.Message ? this.state.MessageType === 'danger' ? (<div className="message danger"> {this.state.Message}</div>) : (<div className="message success"> {this.state.Message}</div>) : ""}
            
                        <div className="form-buttons">
                            <div onClick={this.update}className="save">
                                Save
                            </div>
                            <div onClick={this.delete} className="delete">
                                    Delete
                            </div>
                        </div>

                  </div>
              </div>
          );
        }else{
          return <Redirect to={'/login'}/>
        }
    }    
}

export default Account;