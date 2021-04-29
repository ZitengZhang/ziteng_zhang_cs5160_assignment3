import React from 'react';
import './index.css';
import Axios from 'axios';



export default class SendPostUpdate extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            username:'',
            posts: [],
            postId:'',
            title: '',
            context: '',
            link:'',

            makePost_result:''

        }
    }


    componentDidMount() {

        const postId = this.props.match.params.postId
        console.log(postId)
        this.setState({
            postId: postId
        })
        Axios.get('/api/user/loggedIn')
             .then((response) =>{
                console.log(response.data)
                this.setState({
                    username : response.data,
                })
             })
             .catch(error => console.error(error));

        Axios.get(`/api/posts/${postId}`)
        .then((response) =>{
            console.log(response.data)
            this.setState({
                title: response.data[0].title,
                context: response.data[0].context,
                link: response.data[0].link,
            })
         })
         .catch(error => console.error(error));
    }


    onClick() {
        if((this.state.context && this.state.link) || (!this.state.context && !this.state.link)){
            this.setState({
                        
                makePost_result : 'Post fail. Choose body or link to fill in.'
            })
            return;
        }
        
        if(!this.state.link){         
        
            const newPost = {
                //post: this.state.postId,
                title: this.state.title,
                context: this.state.context,
            };

            console.log(newPost)
            Axios.put(`/api/posts/update/${this.state.postId}`, newPost)
                .then(() => {
                    return Axios.get('/api/posts/all')
                })
                .then(response => 
                    this.setState({
                        posts: response.data,
                        makePost_result: 'success.'
                }))
                .then(() => {
                    window.location.href = '/posts_login/my_post';
                })
                .catch(error => {
                    
                    this.setState({
                        
                        makePost_result : 'Post fail. '
                    })
                    console.error(error)
                })

        }
        else{
                const newPost = {
                    //post: this.state.postId,
                    title: this.state.title,
                    link: this.state.link,
                };
    
                console.log(newPost);
                Axios.put(`/api/posts/update/${this.state.postId}`, newPost)
                    .then(() => {
                        return Axios.get('/api/posts/all')
                    })
                    .then(response => 
                        this.setState({
                            posts: response.data,
                            makePost_result: 'success.'
                    }))
                    .then(() => {
                        window.location.href = '/posts_login';
                    })
                    .catch(error => {
                        
                        this.setState({
                            
                            makePost_result : 'Post fail. '
                        })
                        console.error(error)
                    })
            
            
        }
        
            
    }

    goBack(){
        window.location.href = '/posts_login/my_post'
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



    render(){

        return(

            <div>
                <div className ="container">
                    
                    <div className = "box2">
                    <b className="page_title">Update Post</b>
                    </div>

                    <div className = "box1">
                        <div><b className="username_style">{this.state.username}</b></div>
                    </div>
                
                    <div className = "box3">
                        <div className = "post_container">
                           
                        <div className ="center">
                            <div>
                            <label className="signup" for="title">Title:</label>
                            <input className="enterbar" id="title" type="text" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}></input>
                            </div>
                            <div>
                            <label className="signup" for="context">Body:</label>
                            <input className="enterbar_large" id="context" type="text" value={this.state.context} onChange={(e) => this.setState({context: e.target.value})}></input>
                            </div>
                            <div>
                            <label className="signup" for="link">Link:</label>
                            <input className="enterbar" id="link" type="text" value={this.state.link} onChange={(e) => this.setState({link: e.target.value})}></input>
                            </div>
                            
                            <div>
                            <button className="button_style" onClick={() => this.onClick()}>Update</button>
                            </div>
                            <div>
                            <button className="button_style" onClick={() => this.goBack()}>Cancle</button>
                            </div>
                            </div>
                            <div className="signup">{
                            this.state.makePost_result}
                            </div>
                            
                        
                        </div>
                    </div>
                    <div className ="box4">
                        <div></div>
                    </div>
                </div> 
            </div>
        )
    }


}