import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import API_CONFIG from '../../config/api';
import axios from 'axios'
import './index.css';
import './userloading.sass';

import avatar1 from '../ilustrations/avatars/1.png';
import avatar2 from '../ilustrations/avatars/2.png';
import avatar3 from '../ilustrations/avatars/3.png';
import avatar4 from '../ilustrations/avatars/4.png';
import avatar5 from '../ilustrations/avatars/5.png';
import avatar6 from '../ilustrations/avatars/6.png';
import avatar7 from '../ilustrations/avatars/7.png';
import avatar8 from '../ilustrations/avatars/8.png';

class Home extends Component{
  
    state = {
        is_logged_in: sessionStorage.getItem('is_logged_in'),
        avatar:avatar1,
        loading:true,
        user:null,
        users:null,
        searchText : null,
        redirectAccountPage:false,
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
                }        

                
        }).then(()=>{
            axios.get(API_CONFIG.URL+API_CONFIG.ENDPOINT.GET.GET_ALL_USERS,{ 
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then(
                res=>{
    
                    
                    var usersWithAvatar = res.data.users;
    
                    var myUserIndex = null
    
                    
                    for(var i = 0;i<usersWithAvatar.length;i++){
                        if(usersWithAvatar[i].username === this.state.user.username){
                            myUserIndex = i;
                        }
                        if(usersWithAvatar[i].avatar === 1){
                            usersWithAvatar[i].avatar = avatar1;
                        }else if(usersWithAvatar[i].avatar === 2){
                            usersWithAvatar[i].avatar = avatar2;
                        }else if(usersWithAvatar[i].avatar === 3){
                            usersWithAvatar[i].avatar = avatar3;
                        }else if(usersWithAvatar[i].avatar === 4){
                            usersWithAvatar[i].avatar = avatar4;
                        }else if(usersWithAvatar[i].avatar === 5){
                            usersWithAvatar[i].avatar = avatar5;
                        }else if(usersWithAvatar[i].avatar === 6){
                            usersWithAvatar[i].avatar = avatar6;
                        }else if(usersWithAvatar[i].avatar === 7){
                            usersWithAvatar[i].avatar = avatar7;
                        }else if(usersWithAvatar[i].avatar === 8){
                            usersWithAvatar[i].avatar = avatar8;
                        }else{
                            usersWithAvatar[i].avatar = avatar1;
                        }    
                    }
    
                    if(myUserIndex != null){
                        usersWithAvatar.splice(myUserIndex,1);
                    }
    
                    this.setState({
                            users:res.data.users,
                            loading:false,
                    }) 
    
                }
            ).catch(
                err=>{
                    console.log(err)
                }
            )
    
            this.setState({
                loading:false
            })
        }).catch(
            err=>{
                console.log(err)
            }
        )
    }

    getFilteredUsers = () => {
        if(this.state.searchText != null && this.state.searchText.length > 0){
            return this.state.users.filter(user => user.name.includes(this.state.searchText) || user.username.includes(this.state.searchText))

        }else{
            return this.state.users;
        }

    }

    search = (text) =>{
        this.setState({
            searchText: text
        })
    }

  render(){
      if(this.state.is_logged_in){
          if(this.state.redirectAccountPage){
            return <Redirect to={'/account'}/>
          }else{          
            return(  
            <div className="home-cont">
                <div className="navbar-cont">
                    <div className="buttons-cont">
                        <Link to={'/account'}><div className="user" ><img alt="" src={this.state.avatar}></img></div></Link> 
                        <div className="logout" onClick={this.logoutHOME}> Logout</div>

                    </div>
                    <div className="title-cont"> Welcome back @{this.state.user ? this.state.user.username : ''}</div>
                </div>



                <div className="search-cont">
                    <input type="text" placeholder="Search user" onChange={e => this.search(e.target.value)}/>
                    
                    
                      
                    
                        <div className="icon" onClick={()=>{this.setState({redirectAccountPage:true,})}}>                            
                                <svg onClick={()=>{this.setState({redirectAccountPage:true,})}} viewBox="0 0 24 24" width="21" height="21" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><circle onClick={()=>{this.setState({redirectAccountPage:true,})}} cx="11" cy="11" r="8"></circle><line onClick={()=>{this.setState({redirectAccountPage:true,})}} x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>

                    
                </div>

                <div className="users-list-cont">


                    
                    {this.state.users ? this.getFilteredUsers().length === 0 ? (
                        <div className="empty-user">
                                No users found
                        </div>
                    ): this.getFilteredUsers().map( user => 
                        
                                    (<div className="user" key={user.id}>
                                    <div className="avatar-cont">
                                            <img alt="" src={user.avatar}/>
                                    </div>
                                    <div className="info-cont">
                                        <div className="name">{user.name}</div>
                                        <div className="username"> @{user.username} </div>
                                    </div>
                                    </div>)
                                    
                                    )
                        : 
                           
                                    (<div>
                                        <div className="user post">
                                        <div className="avatar-cont">
                                                <div className="avatar"/>
                                        </div>
                                        <div className="info-cont">
                                            <div className="name"><div className="line"></div></div>
                                            <div className="username"> <div className="line" style={{
                                                'width':'50%'
                                            }}></div> </div>
                                        </div>
                                    </div>
                                    <div className="user post">
                                        <div className="avatar-cont">
                                                <div className="avatar"/>
                                        </div>
                                        <div className="info-cont">
                                            <div className="name"><div className="line"></div></div>
                                            <div className="username"> <div className="line" style={{
                                                'width':'50%'
                                            }}></div> </div>
                                        </div>
                                    </div>
                                    <div className="user post">
                                        <div className="avatar-cont">
                                                <div className="avatar"/>
                                        </div>
                                        <div className="info-cont">
                                            <div className="name"><div className="line"></div></div>
                                            <div className="username"> <div className="line" style={{
                                                'width':'50%'
                                            }}></div> </div>
                                        </div>
                                    </div>
                                    <div className="user post">
                                        <div className="avatar-cont">
                                                <div className="avatar"/>
                                        </div>
                                        <div className="info-cont">
                                            <div className="name"><div className="line"></div></div>
                                            <div className="username"> <div className="line" style={{
                                                'width':'50%'
                                            }}></div> </div>
                                        </div>
                                    </div>
                                    <div className="user post">
                                        <div className="avatar-cont">
                                                <div className="avatar"/>
                                        </div>
                                        <div className="info-cont">
                                            <div className="name"><div className="line"></div></div>
                                            <div className="username"> <div className="line" style={{
                                                'width':'50%'
                                            }}></div> </div>
                                        </div>
                                    </div>
                                    <div className="user post">
                                        <div className="avatar-cont">
                                                <div className="avatar"/>
                                        </div>
                                        <div className="info-cont">
                                            <div className="name"><div className="line"></div></div>
                                            <div className="username"> <div className="line" style={{
                                                'width':'50%'
                                            }}></div> </div>
                                        </div>
                                    </div>
                                    </div>
                                    )
                           
                    
                        }
                  
                </div>

                



            </div>
        );
        }
      }else{
        return <Redirect to={'/login'}/>
      }
  }          

}

export default Home;
