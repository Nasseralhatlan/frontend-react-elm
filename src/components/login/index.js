import React,{Component} from 'react';
import './index.css';
import {Link} from 'react-router-dom';
import API_CONFIG from '../../config/api';
import axios from 'axios';
import {Redirect} from 'react-router-dom'

export default class Login extends Component{

    state = {
        Username: '',
        Password:'',
        UsernameError: null,
        PasswordError:null,
        Message:null,
        MessageType:null,
        redirect:false,
    }

    handelInputChange = (inputName,value) => {
        if(inputName === "Username"){
            this.setState({
                Username:value,
                UsernameError: null,
                PasswordError:null,
                Message:null,
                MessageType:null,
            })
        }else if(inputName === "Password"){
            this.setState({
                Password:value,
                UsernameError: null,
                PasswordError:null,
                Message:null,
                MessageType:null,
            })
        }
    }

    handelSubmit = e =>{
        e.preventDefault();

        var flag = false;
        if(!this.state.Username){
            this.setState({
                UsernameError: 'Username cannot be empty'
            })
            flag = true;
        }

        if(!this.state.Password){
            this.setState({
                PasswordError: 'Password cannot be empty'
            })
            flag = true;
        }

        if(!flag){
            const data = {
                "username":this.state.Username,
                "password":this.state.Password,
            }

            axios.post(API_CONFIG.URL+API_CONFIG.ENDPOINT.POST.LOGIN,data).then(
                res => {
                    if(res && res.data){
                        var code = res.data.body.code;
                        var message = res.data.body.message;
    
                        if(code === "AL1"){
                            this.setState({
                                Message:message,
                                MessageType:'sucess',
                            })

                            this.props.login(res.data.body.token);
                            this.setState({
                                redirect:true,
                            })

                        }else if(code === "AL2"){
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
            return <Redirect to={'/home'}/>
        }else{
        return(
            <div className="login-cont">
                <div className="left">
                    {/* <img alt="" src={ilus}/> */}
                </div>
                <div className="right">
                <form onSubmit={this.handelSubmit} className="form-card">
                                <div className="form-title"> Sign in </div>
                                <div className="form-input">
                                        
                                        {/* ERRORS */}
                                        {/* <label>Username <span> wrong user name</span></label> */}
                                        <label>Username {this.state.UsernameError ? (<span> {this.state.UsernameError}</span>) : "" }</label>
                                        <input onChange={e => this.handelInputChange("Username",e.target.value)} value={this.state.Username} type="text"></input>
                                </div>
                                <div className="form-input">
                                        
                                        <label>Password {this.state.PasswordError ? (<span> {this.state.PasswordError}</span>) : "" }</label>
                                        <input onChange={e => this.handelInputChange("Password",e.target.value)} value={this.state.Name} type="password"></input>
                                </div>
                                <div className="form-input">
                                        <button onClick={this.handelSubmit}>Sign in</button>
                                        <div className="link">Not regsterd ? <Link className="link" to={'/register'}>Sign up</Link></div>
                                        
{this.state.Message ? this.state.MessageType === 'danger' ? (<div className="message danger"> {this.state.Message}</div>) : (<div className="message success"> {this.state.Message}</div>) : ""}
            
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
