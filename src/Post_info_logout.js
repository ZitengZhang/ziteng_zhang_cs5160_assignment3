import React from 'react';
import './index.css';
import Axios from 'axios';
import {Link} from "react-router-dom"


export default class Post_info_logout extends React.Component {


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
                        <button className="button_style"><Link exact to={'/'}>back</Link></button>
                    
                    </div>
                </div>

                <div className = "box1">
                    
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
                    

                    
                </div>
            </div> 
            </div>

            
               
        )

    }
        
    

}