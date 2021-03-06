import React from 'react';
import axios from 'axios';
import * as config from './../../../config/app';
import * as Form from './../../../utils/form';
//import * as localstorage from './../../../utils/localstorage';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';

var Register = React.createClass({

	  getInitialState : function(){
	    return {
	      full_name: "" ,
	      email: "",
	      password: "",
	      errors : {}
	    }
	  },
	  componentWillMount: function(){
	  	if(localStorage.getItem('smsAppApiToken')!=undefined){
    			browserHistory.push('/app/admin/students');
    	}
    	// cant let to go if oyu already logged in
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
	      axios.post(config.base_url + '/api/v1/register', {  //this.props.routeParams.studentId
	        full_name : this.state.full_name,
	        email : this.state.email,
	        password : this.state.password,
	      })
	      .then(response => {
	        // console.log(response.data);
					console.log(response.data.data.user);
					// console.log('shivamthedude', 'heistheDUUUUUDE');
					// //set function
					//localstorage.set('auth_user', response.data.data.user);
					localStorage.setItem('auth_user', JSON.stringify(response.data.data.user));
					browserHistory.push('/app/admin/students');
	      })
	      .catch(error => {
					console.log(error.response.status);
					console.log(error.response.data);
	        if(error.response.status == 422){
		        let errors = Form.getFormErrors(error.response.data);
		        _this.setState({
		          errors : errors
		        });
					}
	  })
	},

	render: function(){
    return (
			<div id="signin">
				<center><h3>Create Your Account Now in SMS</h3></center>
				<div className="content">
					<form className="form" method="post" action="#" role="form" onSubmit={this._onSubmit} >
									<div className={Form.formGroupClass(this.state.errors.full_name)}>
									<strong>Your information</strong>

									<input className="form-control" type="text" placeholder="full_name" name="full_name" onChange={this._onChange} value={this.state.full_name}/>
									<span className="help-block">{this.state.errors.full_name}</span>
								</div>
									<div className={Form.formGroupClass(this.state.errors.email)}>
									<strong>Email</strong>

									<input className="form-control" type="text" placeholder="email" name="email" onChange={this._onChange} value={this.state.email} />
									<span className="help-block">{this.state.errors.email}</span>
								</div>
								<div className={Form.formGroupClass(this.state.errors.password)}>
									<strong>Password</strong>
									<input className="form-control" type="password" placeholder="Password" name="password" onChange={this._onChange} value={this.state.password}/>
									<span className="help-block">{this.state.errors.password}</span>
								</div>
								 <div className="actions">
									<button type="submit" onClick={this.handlecli} className="btn btn-success">create acount </button>
								</div>
					</form>
				</div>
			</div>

   );
	}
});

export default Register;
