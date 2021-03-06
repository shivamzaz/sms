import React from 'react';
import axios from 'axios';
import * as config from './../../../config/app';
import * as Form from './../../../utils/form';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

var Login = React.createClass({
  getInitialState : function(){
    return {
      email: "",
      password: "",
      errors : {},
      error_message : ""
    }
  },

  componentWillMount: function(){
    // you won't let to go login if you are already login
    if(JSON.parse(localStorage.getItem('auth_user'))){
      browserHistory.push('/app/admin/students');}
  },

  // update input state onChange
   _onChange: function(e) {
       var new_state = Form.inputOnChange(e, this.state);
       this.setState(new_state);
   },

  _onSubmit: function(e){
      let _this = this;
      e.preventDefault();
      axios.post(config.base_url + '/api/v1/login', {  //this.props.routeParams.studentId
        email : this.state.email,
        password : this.state.password,
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('auth_user', JSON.stringify(response.data.data.user));
        browserHistory.push('/app/admin/students');
      })
      .catch(error => {
        if(error.response.status == 422){
        let errors = Form.getFormErrors(error.response.data);
        _this.setState({
          errors : errors
        });
       }
       if(error.response.status == 401){
        _this.setState({
          error_message : error.response.data.errors.message
        });
       }
      });
  },
  render: function(){
    return(
      <div id="signin">
        <h3>Welcome back in SMS!</h3>
        <div className="content" id="signin" >
          <form className="form" method="post" action="#" role="form" onSubmit={this._onSubmit} >
            { this.state.error_message != "" ? (
              <div className="alert alert-danger">{this.state.error_message}</div>
            ) : false}
            <div className="fields">
            <div className={Form.formGroupClass(this.state.errors.email)}>
             <strong><p>Email address</p></strong>
              <input className="form-control" type="text" placeholder="email"  name="email" onChange={this._onChange} value={this.state.email}/>
              <span className="help-block">{this.state.errors.email}</span>
            </div>
          </div>
          <div className="fields">
            <div className={Form.formGroupClass(this.state.errors.password)}>
              <strong><p>Password</p></strong>
              <input className="form-control" type="password" style={{ marginRight : '10px'}} placeholder="password" name="password" onChange={this._onChange} value={this.state.password}/>
              <span className="help-block">{this.state.errors.password}</span>
            </div>
          </div>
            <div className="actions">
              <button type="submit" className="btn btn-success">Login </button>
             </div>
            <div className="text-center">

              <Link to={'/app/register'} style={{ marginRight : '10px'}}>
               Register
             </Link>
               <Link to={'/app/forgot-password'}>
                 Forgot Password ?
             </Link>
            </div>
        </form>
      </div>
      </div>
    );
 	}
 });
 export default Login;
