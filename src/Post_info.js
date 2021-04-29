import React from 'react';
import './index.css';
import Axios from 'axios';
import {Link} from "react-router-dom"


export default class Post_info extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            username:'',
            posts:[],
            comments:[],
            comment_context:'',
            // logined: 'logouted',
            // post_direct : ''
            // title:'',
            // context:'',
            // author:'',
            // time:'',

        };
    }

    componentDidMount() {
      
        // const pathname = window.location.pathname.split('/')
        // const login_status = pathname[1];
        // console.log(login_status)
        const postId = this.props.match.params.postId
        console.log(postId)
        
        
        Axios.get('/api/user/loggedIn')
             .then((response) =>{
                console.log(response.data)
                this.setState({
                    username : response.data,
                    // logined : 'logined',
                    // post_direct:'posts_login'
                })
             })
             .catch(error => console.error(error));
        


        Axios.get(`/api/posts/${postId}`)
        .then((response) =>{
            console.log(response.data)
            this.setState({
                posts: response.data,
            })
         })
         .catch(error => console.error(error));


         Axios.get(`/api/posts/${postId}/allComments`)
        .then((response) =>{
            console.log(response.data)
            this.setState({
                comments: response.data,
            })
         })
         .catch(error => console.error(error));

        
    }


    onClick(){

        const newCommentPost = {
            context: this.state.comment_context
        };

        const postId = this.props.match.params.postId
        Axios.post(`/api/posts/${postId}/comment`, newCommentPost)
            .then(() => {
                return Axios.get(`/api/posts/${postId}/allComments`)
            })
            .then(response => 
                this.setState({
                    comments: response.data,
            }))
            
            .catch(error => console.error(error))


    }

    


    render(){

        const renderedPosts = [];
        const renderedComments = [];

        for(let i = 0; i < this.state.posts.length; i++ ){
            const post = this.state.posts[i];
            if(!post.link){
                renderedPosts.push(
                    <div>
                        <div className="page_title">
                        {post.title}
                        </div>
                        <div className="title">  
                        {post.context} 
                        </div> 
                        <div className="large_space">
                        -------{post.username} -----{post.time}
                        </div>
                    </div>


                )
            }
            else{
                renderedPosts.push(
                    <div>
                        <div>
                        <div className="page_title">
                        {post.title}
                        </div>
                        <div className="title">  
                        {post.link} 
                        </div> 
                        <div className="large_space">
                        -------{post.username} -----{post.time}
                        </div>
                    </div>
                    </div>
                )
            }
        }


        for(let i = 0; i < this.state.comments.length; i++ ){
            const comment = this.state.comments[i];
            
                renderedComments.push(
                    <div >
                        {comment.context} - {comment.username} - {comment.time}
                    </div>


                )
            }
     
        return(
    
            
               <div>
                <div className ="container">
                    
                

                    <div className = "box2">
                        <div>
                        <button className="button_style"><Link exact to={'/posts_login'}>back all posts</Link></button>
                        <button className="button_style"><Link exact to={'/posts_login/my_post'}>back my posts</Link></button>
                        </div>
                    </div>

                    <div className = "box1">
                        <b className="username_style">{this.state.username}</b>
                    </div>
                
                    <div className = "box3">
                        <div className = "post_container">
                            {renderedPosts}


                            <div className= "signup">
                            -----------Comments---------------
                            {renderedComments}
                            </div>
                        </div>

                        
                        
                    </div>
                    <div className ="box4">
                        
                        <div className={this.state.logined}>
                        
                        <label className="signup" for="context">body:</label>
                        <input id="context" type="text" value={this.state.context} onChange={(e) => this.setState({comment_context: e.target.value})}></input>
                        <button className="button_style"onClick={() => this.onClick()}>Post Comments</button>

                        </div>
                    </div>
                </div> 
            </div>
        )
    }

}