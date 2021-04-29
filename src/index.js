import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './Register.js'
// import { NameContextComponent } from './NameContext.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './Login.js';
import Forum_login from './Forum.login.js';
import Post_info from './Post_info';
import SendPost from './SendPost';
import Forum_logout from './Forum.logout';
import Post_info_logout from './Post_info_logout';
import MyPost from './MyPosts';
import MyComments from './MyComments';
import SendPostUpdate from './SendPostUpdate';
import SendCommentUpdate from './SendCommentUpdate';


//PROVIDER
// -> state
// -> dispatch function

ReactDOM.render(
        
        <Router>

        <Switch>
          <Route exact path="/">
            <Forum_logout/>
            </Route>
          <Route exact path="/signup">
            <Register/>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>          
          <Route exact path="/posts_login">
            <Forum_login />
          </Route>
          <Route exact path="/post_info/:postId" component={Post_info} />
          <Route exact path="/post_info_logout/:postId" component={Post_info_logout} /> 
          <Route exact path="/posts_login/send_post" component={SendPost} />
          <Route exact path="/posts_login/my_post" component={MyPost} />
          <Route exact path="/posts_login/my_comment" component={MyComments} />
          <Route exact path="/posts_login/updatePost/:postId" component={SendPostUpdate} />
          <Route exact path="/posts_login/updateComment/:commentId" component={SendCommentUpdate} />
          
          <Route render={() => <h1>Not found!</h1>} />
        </Switch>
      
    </Router>
        
        , document.getElementById('root'));
