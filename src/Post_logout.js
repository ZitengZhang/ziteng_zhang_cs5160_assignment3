import React from 'react';


export default class Post_logout extends React.Component {


    constructor(props){
        super(props)
        this.state = {
        };
    }

    getThePost(){

        return(
            <div>
                <div className="title" 
                //onClick={()=> this.titleOnClick()}
                >
                    <b>{this.props.title}</b></div>
                 <div>
                 <b className="username">{this.props.username}</b>
                 <b className="space">{this.props.time}</b>
                 {/* <button onClick={()=> this.onClick()}>comment</button> */}
                 </div>
                <div className="context_hidden">
                    {this.props.context}
                    {this.props.link}
                    </div>
            </div>
            
        )

    }

    // titleOnClick(){
    //     if(this.props.context){
    //         window.location.href = '/post_info_logout/'+this.props.postId;
    //     }
    //     else{
    //         window.location.href = this.props.link;
    //     }
    // }

    // onClick(){
    //     window.location.href = '/post_info_logout/'+this.props.postId;
    // }



    render(){

        return(
    
            <div className="post"
                //onClick={()=>this.click()}
                //onClick={()=> this.props.onClick()}
            >
                {this.getThePost()}
            </div>
        )
    }

}