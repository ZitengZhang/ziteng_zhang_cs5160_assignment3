import React from 'react'
import Axios from 'axios';
import './index.css';

export default class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email:'',
            register_result: ''
        }
    }

    componentDidMount() {
        
      }


    onSubmit() {
        Axios.post('/api/user/register', this.state)
            .then(()=>{
                return Axios.post('/api/user/login', this.state)
            })
            .then(function (response) {          
                    window.location.href = '/posts_login';
       
            })
            .catch(error => {
                
                this.setState({
                    register_result : 'register fail'
                })
                    console.error(error.response.data)
            })
  
    }

    goBack(){
        window.location.href = '/'
    }

    gotoLoginPage(){

        window.location.href = '/login';
    }

    render() {

        return(


            <div>
            <div className ="container">
                
            

                <div className = "box2">
                    <div >
                        <b className="page_title">Register New User</b>
                    {/* <Link exact to={"/posts_login/send_post"}>Post</Link> */}

                    </div>
                </div>

                <div className = "box1">
                    
                </div>
            
                <div className = "box3">
                    <div className = "post_container">
                        <div className ="center">

                            <div>
                            <label className="signup" for="username">
                                Username
                            </label>
                            <input className="enterbar" id="username" type="text" onChange={(e) => this.setState({username: e.target.value})}/>
                            </div>
                            <div>
                            <label  className="signup" for="password">
                                Password
                            </label>
                            <input className="enterbar" id="password" type="password" onChange={(e) => this.setState({password: e.target.value})}/>
                            </div>
                            <div>
                            <label  className="signup" for="email">
                                Email
                            </label>
                            <input className="enterbar" id="email" type="text" onChange={(e) => this.setState({email: e.target.value})}/>
                            </div>
                            <div>
                            <button  className="button_style" onClick={() => this.onSubmit()} >Create User</button>
                            <button className="button_style" onClick={() => this.goBack()}>Cancle</button>
                            </div>
                            <div  className="signup">
                            Already a member?
                            <button className="button_style" onClick={() => this.gotoLoginPage()} >Login</button>   
                            </div>
                            <div>
                            <div  className="signup">
                            {this.state.register_result}
                            </div>
                    </div>

                </div>
                    </div>
                </div>
                <div className ="box4">
                    
                </div>
            </div>
        </div>


            
        
        )


    }


}
