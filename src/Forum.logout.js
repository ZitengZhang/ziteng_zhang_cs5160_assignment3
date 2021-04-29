import React from 'react';
import './index.css';
import Axios from 'axios';
import Post_logout from './Post_login';
import {Link} from "react-router-dom";


export default class Forum_logout extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            username:'',
            posts: [],
            title: '',
            context: '',
            link:'',

        }
    }

    componentDidMount() {

        
        // Axios.get('/api/user/loggedIn')
        //      .then((response) =>{

        //         this.setState({
        //             username : response.data,
        //         })
        //      })
        //      .catch(error => console.error(error));
        
        Axios.get('/api/posts/all')
            .then((response) => {
                
                this.setState({
                    posts: response.data,
            })})
            .catch(error => console.error(error));
        
    }

    componentDidUpdate() {

    }


    handlePostClick(postId){

        window.location.href = '/post_info_logout/'+postId;
        
    }

    handleLinkClick(link){

        window.location.href = link;  
        
    }



    render() {

        const renderedPosts = [];

        for(let i = 0; i < this.state.posts.length; i++ ){
            const post = this.state.posts[i];
            if(!post.link){
                renderedPosts.unshift(
                    <div className="post" >
                        <Post_logout title={post.title} context={post.context} username={post.username} time={post.time} 
                                postId = {post.postId} 
                            onClick={()=> this.handlePostClick(post.postId)}
                            />
                         <button className="button_style" onClick={()=> this.handlePostClick(post.postId)}>comment</button>
                    </div>


                )
            }
            else{
                renderedPosts.unshift(
                    <div className="post">
                         <Post_logout title={post.title} link={post.link} username={post.username} time={post.time} 
                                postId = {post.postId} 
                            onClick={()=> this.handleLinkClick(post.link)}
                            />
                            <button className="button_style" onClick={()=> this.handlePostClick(post.postId)}>comment</button>
                    </div>
                )
            }
        }

        return (
            <div>
                <div className ="container">
                    
                

                    <div className = "box2">
                        <div >
                            <b className="page_title">Game News</b>
                        {/* <Link exact to={"/posts_login/send_post"}>Post</Link> */}

                        </div>
                    </div>

                    <div className = "box1">
                        <div>
                        <button className="button_style"><Link exact to={"/signup"}>Sign Up</Link></button>
                        <button className="button_style"><Link exact to={"/login"}>Log In</Link></button>
                        </div>
                    </div>
                
                    <div className = "box3">
                        <div className = "post_container">
                            {renderedPosts}
                        </div>
                    </div>
                    <div className ="box4">
                        
                    </div>
                </div>
            </div>
        )
    }






}