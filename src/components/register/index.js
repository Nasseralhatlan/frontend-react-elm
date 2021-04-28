import React,{Component} from 'react';
import './index.css';
import ilus from '../ilustrations/ilus.jpeg'; // with import
import {Link} from 'react-router-dom';
import API_CONFIG from '../../config/api';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
export default class Register extends Component{


    state = {
        Username: '@',
        Name: '',
        Password:'',
        UsernameError: null,
        NameError:null,
        PasswordError:null,
        Message:null,
        MessageType:null,
        redirect:false,
    }


    handelInputChange = (inputName,value) => {
        if(inputName ==="Username"){
            this.setState({
                Username:"@"+value.substring(1,value.length),
                UsernameError: null,
                NameError:null,
                PasswordError:null,
                Message:null,
                MessageType:null,
            })
        }else if(inputName ==="Password"){
            this.setState({
                Password:value,
                UsernameError: null,
                NameError:null,
                PasswordError:null,
                Message:null,
                MessageType:null,
            })
        }else if(inputName ==="Name"){
            this.setState({
                Name:value,
                UsernameError: null,
                NameError:null,
                PasswordError:null,
                Message:null,
                MessageType:null,
            })
        }
    }

    handelSubmit = e =>{
        e.preventDefault();

        this.setState({
          Username: this.state.Username ? this.state.Username.trim():this.state.Username,  
          Name: this.state.Name ? this.state.Name.trim():this.state.Name,  
          Password: this.state.Password ? this.state.Password.trim():this.state.Password,  
        })

        var flag = false;
        if(!this.state.Username){
            this.setState({
                UsernameError: 'Username cannot be empty'
            })
            flag = true;
        }else{
            if(!this.state.Username.replace(/\s/g, '').length){
                this.setState({
                    UsernameError: 'Username cannot be empty'
                })
                flag = true;
            }
        }
        if(!this.state.Name){
            this.setState({
                NameError: 'Name cannot be empty'
            })
            flag = true;
        }else{
            if(!this.state.Name.replace(/\s/g, '').length){
                this.setState({
                    NameError: 'Name cannot be empty'
                })
                flag = true;
            }
        }
        if(this.state.Password){
            if(this.state.Password.length <= 3){
                this.setState({
                    PasswordError: 'Password must be more than 3 characters'
                })
                flag = true;
            }else{
                if(!this.state.Password.replace(/\s/g, '').length){
                    this.setState({
                        PasswordError: 'Password cannot be empty'
                    })
                    flag = true;
                }
            }
        }else{
            this.setState({
                PasswordError: 'Password cannot be empty'
            })
            flag = true;
        }


        if(!flag){
        const data = {
            "username":this.state.Username.substring(1,this.state.Username.length),
            "name":this.state.Name,
            "password":this.state.Password,
            "avatar":"1"
        }

        axios.post(API_CONFIG.URL+API_CONFIG.ENDPOINT.POST.REGISTER,data).then(
            res => {
                if(res && res.data){
                    var code = res.data.body.code;
                    var message = res.data.body.message;
                    if(code ==="AR1"){
                        this.setState({
                            Message:message,
                            MessageType:'sucess',
                            redirect:true,
                        })
                       
                    }else if(code ==="AR2"){
                        this.setState({
                            Message:message,
                            MessageType:'danger',
                        })
                    }else{
                        this.setState({
                            Message:"Something went wrong try agin later!",
                            MessageType:'danger',
                        })
                    }
                }
            }
        ).catch(
            err => {
                console.log(err)
                this.setState({
                    Message:"Something went wrong try agin later!!",
                    MessageType:'danger',
                })
            }
        )
        }
    }

    render(){
        if(this.state.redirect){
            return <Redirect to={'/login'}/>
        }else{
        return(
            <div className="login-cont">
                <div className="left">
                    
                </div>
                <div className="right">
                    <form onSubmit={this.handelSubmit} className="form-card">
                                <div className="form-title"> Sign up </div>
                                <div className="form-input">
                                        {/* ERRORS */}
                                        {/* <label>Username <span> wrong user name</span></label> */}
                                        <label>Username {this.state.UsernameError ? (<span>{this.state.UsernameError}</span>) : "" }</label>
                                        <input onChange={e =>this.handelInputChange("Username",e.target.value)} value={this.state.Username} type="text"></input>
                                </div>
                                <div className="form-input">
                                        {/* ERRORS */}
                                        {/* <label>Username <span> wrong user name</span></label> */}
                                        <label>Name {this.state.NameError ? (<span> {this.state.NameError}</span>) : "" }</label>
                                        <input onChange={e =>this.handelInputChange("Name",e.target.value)} value={this.state.Name} type="text"></input>
                                </div>
                                <div className="form-input">
                                        <label>Password {this.state.PasswordError ? (<span>{this.state.PasswordError}</span>) : "" }</label>
                                        <input onChange={e =>this.handelInputChange("Password",e.target.value)} value={this.state.Password} type="password"></input>
                                </div>

                                <div className="form-input">
                                       <button onClick={this.handelSubmit}>Sign up</button>
                                       <div className="link">Have an account ? <Link className="link" to={'/login'}>Sign in</Link></div>
                                       
                                       {this.state.Message ? this.state.MessageType ==='danger' ? (<div className="message danger"> {this.state.Message}</div>) : (<div className="message success"> {this.state.Message}</div>) : ""}

            
                                       {/* <div className="message success"> Worng user name or password</div> */}
                                       {/* <div className="message danger"> Worng user name or password</div> */}
                                </div>
                    </form>
                </div>
            </div>
        )
        }
    }
}
