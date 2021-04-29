import React from 'react';
import './index.css';
import Axios from 'axios';
import Post_login from './Post_login';
import {Link} from "react-router-dom"


export default class Forum_login extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            username:'',
            posts: [],
            title: '',
            context: '',
            link:'',
            has_posts: 'noPost',
            has_comments: 'noPost',
        }
    }

    componentDidMount() {

        
        Axios.get('/api/user/loggedIn')
             .then((response) =>{

                this.setState({
                    username : response.data,
                })
             })
             .then(()=>{
                const username = this.state.username
                //console.log(username) 
                return Axios.get(`/api/posts/findPost/${username}`)
             })
             .then((response) =>{

                console.log(response.data)
                if(response.data.length !== 0){
                    this.setState({
                        has_posts: 'hasPost'
                    })
                }else{
                    this.setState({
                        has_posts: 'noPost'
                    })
                }
             })

             .then(()=>{
                const username = this.state.username
                
                return Axios.get(`/api/posts/findComment/${username}`)
             })
             .then((response) =>{

                console.log(response.data)
                if(response.data.length !== 0){
                    this.setState({
                        has_comments: 'hasPost'
                    })
                }else{
                    this.setState({
                        has_comments: 'noPost'
                    })
                }
             })

             .catch(error => console.error(error));
        
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

        window.location.href = '/post_info/'+postId;   
        
    }

    handleLinkClick(link){

        window.location.href = link;  
        
    }


    logout(){
        Axios.post('/api/user/logOut')
        .then((response) =>{
            
            window.location.href = '/';
            
         })
         .catch(error => console.error(error));
    }

    render() {

        const renderedPosts = [];

        for(let i = 0; i < this.state.posts.length; i++ ){
            const post = this.state.posts[i];
            if(!post.link){
                renderedPosts.unshift(
                    <div className="post">
                        <Post_login title={post.title} context={post.context} username={post.username} time={post.time} 
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
                        <Post_login title={post.title} link={post.link} username={post.username} time={post.time} 
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
                        <div>

                        <button className="button_style"><Link exact to={"/posts_login/send_post"}>Post</Link></button>
                        <button className ={this.state.has_posts}><Link exact to={"/posts_login/my_post"}>My Posts</Link></button>
                        <button className ={this.state.has_comments}><Link exact to={"/posts_login/my_comment"}>My Comments</Link></button>
                        </div>
                    </div>

                    <div className = "box1">
                        <div>
                            <b className="username_style">{this.state.username}</b>
                        
                            <button className="button_style" onClick={() => this.logout()}>Logout</button>
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