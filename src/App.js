import React, { Component } from 'react';
import './App.css';
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid=formErrors=>{
  let valid=true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid=false);
  });
  return valid;
};

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      firstName:null,
      lastName:null,
      email:null,
      password:null,
      
      formErrors:{
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }
  handleSubmit = e =>{
    e.preventDefault();
    if (formValid(this.state.formErrors)){
      console.log(`
      -----Submitting-----
      firstName: ${this.state.firstName}
      lastName: ${this.state.lastName}
      Email: ${this.state.email}
      Password: ${this.state.password}
      `)
    }
    else{
      console.error('Form Invalid');
      
    }
  };
  handleChange = e=>{
    e.preventDefault();
    const{name, value}=e.target;
    let formErrors = this.state.formErrors;
    console.log("Name: ", name);
    console.log("value: ", value);


    switch(name){
      case "firstName":
      formErrors.firstName = value.length < 3 && value.length > 0 
      ? "Minimum Character needed is 3" :"";
      break;
      case "lastName":
      formErrors.lastName = value.length < 3 && value.length > 0 
      ? "Minimum Character needed is 3" :"";
      break;
      case "email":
      formErrors.email = emailRegex.test(value) && value.length > 0 
      ? '' :'invalid email address';
      break;
      case "password":
      formErrors.password = value.length < 6 && value.length > 0 
      ? "Minimum Character needed is 6" :"";
      break;
      default:
      break;
    }
    this.setState({formErrors, [name]: value}, ()=> console.log(this.state));
  };

  render() {
    const { formErrors }=this.state;
    return (
      <div className="wrapper">
      <div className="form-wrapper">
      <h1>Create Account</h1>
      <form onSubmit={this.handleSubmit} noValidate> 
      <div className="firstName">
      <lable htmlFor="firstName">First Name</lable>
            <input 
            className={formErrors.firstName.length > 0 ? "error": null} 
            placeholder="First Name" 
            type="text" 
            name="firstName" 
            onChange={this.handleChange} 
            noValidate/>
            {formErrors.firstName.length > 0 && (
              <span className="errorMessage">{formErrors.firstName}</span>
            )}
      </div>
      <div className="lastName">
      <lable htmlFor="lastName">Last Name</lable>
            <input
            className={formErrors.lastName.length > 0 ? "error": null}
            placeholder="Last Name" 
            type="text" 
            name="lastName" 
            onChange={this.handleChange} 
            noValidate/>
            {formErrors.lastName.length > 0 && (
              <span className="errorMessage">{formErrors.lastName}</span>
            )}
      </div>
      <div className="email">
      <lable htmlFor="email">Email</lable>
            <input
            className={formErrors.email.length > 0 ? "error": null}
            placeholder="Email" 
            type="email" 
            name="email" 
            onChange={this.handleChange} 
            noValidate/>
            {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>
            )}
      </div>
      <div className="password">
      <lable htmlFor="password">Password</lable>
            <input 
            className={formErrors.password.length > 0 ? "error": null}
            type="Password" 
            placeholder="Password" 
            name="password" 
            onChange={this.handleChange} 
            noValidate/>
            {formErrors.password.length > 0 && (
              <span className="errorMessage">{formErrors.password}</span>
            )}
      </div>
      <div className="createAccount">
      <button type="submit">Create Account</button>
      <small>Already have an Account?</small>
      </div>
      </form>
      </div>
      <div className="footer-copyright">
            <p> &copy;	Powerd By JBS Technology
              </p>
        </div>
      </div>
    );
  }
}

export default App;
