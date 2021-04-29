import React from 'react'
import Axios from 'axios';
import './index.css';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            login_result:''
        }
    }

    onSubmit() {
        Axios.post('/api/user/login', this.state)
            .then(function (response) {
                window.location.href = '/posts_login';

            
            })
            .catch(error=> {
                this.setState({
                    
                    login_result : 'Login fail. Please varify your username and password.'
                })
                console.error(error)
            })

    }


    render() {

        return(


            <div>
            <div className ="container">
                
            

                <div className = "box2">
                    <div >
                        <b className="page_title">Login</b>
                    {/* <Link exact to={"/posts_login/send_post"}>Post</Link> */}

                    </div>
                </div>

                <div className = "box1">
                    
                </div>
            
                <div className = "box3">
                    <div className = "post_container">
                        <div className ="center">

                            
                        <div>
                            <div>
                            <label className="signup" for="username">
                                Username
                            </label>
                            <input className="enterbar"  id="username" type="text" onChange={(e) => this.setState({username: e.target.value})}/>
                            </div>
                            <div>
                            <label className="signup" for="password">
                                Password
                            </label>
                            <input className="enterbar"  id="password" type="password" onChange={(e) => this.setState({password: e.target.value})}/>
                            </div>
                            <div>
                            <button className="button_style" onClick={() => this.onSubmit()} >Login</button>
                            </div>
                            <div className="signup">
                                {this.state.login_result}
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