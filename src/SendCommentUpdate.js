import React from 'react';
import './index.css';
import Axios from 'axios';



export default class SendCommentUpdate extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            username:'',
            comments: [],
            commentId:'',
            context: '',
           

            makePost_result:''

        }
    }


    componentDidMount() {

        const commentId = this.props.match.params.commentId
        console.log(commentId)
        this.setState({
            commentId: commentId
        })
        Axios.get('/api/user/loggedIn')
             .then((response) =>{
                console.log(response.data)
                this.setState({
                    username : response.data,
                })
             })
             .catch(error => console.error(error));

        Axios.get(`/api/posts/findCommentById/${commentId}`)
        .then((response) =>{
            console.log(response.data)
            this.setState({
                context: response.data[0].context,
            })
         })
         .catch(error => console.error(error));
    }


    onClick() {
           
        
            const newPost = {
                context: this.state.context,
            };

            console.log(newPost);
            Axios.put(`/api/posts/updateComment/${this.state.commentId}`, newPost)
                .then(response => 
                    this.setState({
                        comments: response.data,
                        makePost_result: 'success.'
                }))
                .then(() => {
                    window.location.href = '/posts_login/my_comment';
                })
                .catch(error => {
                    
                    this.setState({
                        
                        makePost_result : 'Post fail. '
                    })
                    console.error(error)
                })
            
    }

    // checkURL(){
    //     urlExists(this.state.link, function(err, exists) {
    //         if(exists){
    //             return true;
    //         }
    //         else{
    //             return false;
    //         }
    //     });

        
    // }

    goBack(){
        window.location.href = '/posts_login/my_comment'
    }

    render(){

        return(

            <div>
                <div className ="container">
                    
                    <div className = "box2">
                        <b className="page_title">Update Comment</b>
                    </div>

                    <div className = "box1">
                    <div><b className="username_style">{this.state.username}</b></div>
                    </div>
                
                    <div className = "box3">
                        <div className = "post_container">
                           
                        <div className ="center">
                            <div>
                            <label className="signup" for="context">body:</label>
                            
                            <input className="enterbar" id="context" type="text" value={this.state.context} onChange={(e) => this.setState({context: e.target.value})}></input>
                            </div>
                            <div>
                            <button className="button_style" onClick={() => this.onClick()}>New Comment</button>
                            </div>
                            <div>
                            <button className="button_style" onClick={() => this.goBack()}>Cancle</button>
                            </div>
                            </div>
                             <div>{this.state.makePost_result}</div>
                            </div>
                    </div>
                    <div className ="box4">
                        <div>hi</div>
                    </div>
                </div> 
            </div>
        )
    }


}