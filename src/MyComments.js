import React from 'react';
import './index.css';
import Axios from 'axios';
//import Post_login from './Post_login';
import {Link} from "react-router-dom"


export default class MyComments extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            username:'',
            comments: [],
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
                return Axios.get(`/api/posts/findComment/${username}`)
             })
             .then((response) =>{

                console.log(response.data)
                if(response.data.length !== 0){
                    this.setState({
                        comments : response.data
                    })
                }
             })
             .catch(error => console.error(error));
        
        // Axios.get('/api/posts/all')
        //     .then((response) => {
                
        //         this.setState({
        //             posts: response.data,
        //     })})
        //     .catch(error => console.error(error));

       
        
    }

    componentDidUpdate() {

    }


    handlePostClick(postId){

        window.location.href = '/post_info/'+postId;   
        
    }

    handleLinkClick(link){

        window.location.href = link;  
        
    }

    handleDelete(commentId){
        Axios.delete(`/api/posts/delete/comment/${commentId}`)
        .then(()=>{
            const username = this.state.username
            //console.log(username) 
            return Axios.get(`/api/posts/findComment/${username}`)
         })
         .then((response) =>{

            console.log(response.data)
            if(response.data.length !== 0){
                this.setState({
                    comments : response.data
                })
            }
         })
         .catch(error => console.error(error));

    }

    handleUpdate(commentId){

        return window.location.href = '/posts_login/updateComment/'+commentId;  

   }


    logout(){
        Axios.post('/api/user/logOut')
        .then((response) =>{
            
            window.location.href = '/';
            
         })
         .catch(error => console.error(error));
    }

    render() {

        const renderedComments = [];

        for(let i = 0; i < this.state.comments.length; i++ ){
            const comment = this.state.comments[i];
            
                renderedComments.unshift(
                    <div className="post">
                         
                            <b className="signup">{comment.context} ---- {comment.username} ----{comment.time} </b>
                            <button className="button_style"  onClick={()=> this.handleDelete(comment.commentId)}>delete</button>
                            <button className="button_style" onClick={()=> this.handleUpdate(comment.commentId)}>update</button>
                    </div>


                )
            
            
        }

        return (
            <div>
                <div className ="container">
                    
                

                    <div className = "box2">
                        <div>
                        <button className="button_style"><Link exact to={'/posts_login'}>back all posts</Link></button>

                        {/* <button><Link exact to={"/posts_login/send_post"}>Post</Link></button> */}

                        
                        </div>
                    </div>

                    <div className = "box1">
                        <div>
                            {this.state.username}
                        
                            <button className="button_style" onClick={() => this.logout()}>Logout</button>
                        </div>
                        
                    </div>
                
                    <div className = "box3">
                        <div className = "post_container">
                            {renderedComments}
                        </div>
                    </div>
                    <div className ="box4">
                        
                    </div>
                </div>
            </div>
        )
    }






}