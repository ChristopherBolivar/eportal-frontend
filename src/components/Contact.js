import React, { Component } from 'react'
import axios from 'axios';

export default class contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
          formType: '',
          formSendTo: '',
          formTargetLoaded: false,
          formNo: '',
          names: '',
          email: '',
          subject: '',
          message: '',
        };
      }
    renderForm = (e) =>{
       if(e.target.value.toLowerCase() === 'payroll'){
        this.setState({
            formType: e.target.value,
            formSendTo: 'payroll@inktel.com',
            formNo: '142',
            formTargetLoaded: true,
            
        })
       }
       if(e.target.value.toLowerCase() === 'human resources'){
        this.setState({
            formType: e.target.value,
            formSendTo: 'hr@inktel.com',
            formNo: '137',
            formTargetLoaded: true,
        })
       }
    }
    displayForm = () =>{
      
       if(this.state.formTargetLoaded){
           return (
<form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">

<h2 className="mt-4">Contacting {this.state.formType} ({this.state.formSendTo})</h2>
    <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" className="form-control" value={this.state.name} onChange={this.onNameChange.bind(this)} />
    </div>
    <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
    </div>
    <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input id="subject" type="text" className="form-control" aria-describedby="emailHelp" value={this.state.subject} onChange={this.onSubjectChange.bind(this)} />
    </div>
    <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    <div id={`${this.state.formType.split(" ").join("")}-alert`} className="alert alert-success deactive" role="alert">
      
    </div>
    </form>
           )
       }
    }
    onNameChange(event) {
      this.setState({names: event.target.value})
      console.log(this.state.names)
      }
    
      onEmailChange(event) {
      this.setState({email: event.target.value})
      }
    
      onMessageChange(event) {
      this.setState({message: event.target.value})
      }
      onSubjectChange(event) {
        this.setState({subject: event.target.value})
        }
      handleSubmit(e){
        console.log('hello')
        e.preventDefault();
// Create new instance
let bodyFormData = new FormData()
// Set key:value pair according to your input:value form's fields
bodyFormData.set( 'names', this.state.names )
bodyFormData.set( 'email', this.state.email )
bodyFormData.set( 'subject', this.state.subject )
bodyFormData.set( 'message', this.state.message )

// Request containing url, data, Object (containing headers for example)
axios.post(`https://www.staging-space.bvdpartners.com/portal/wp-json/contact-form-7/v1/contact-forms/${this.state.formNo}/feedback`,
bodyFormData,
{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
.then((res) => {
console.log(res.data)
if(res.data.status === "validation_failed"){

document.getElementById(`${this.state.formType.split(" ").join("")}-alert`).classList.remove("deactive")
document.getElementById(`${this.state.formType.split(" ").join("")}-alert`).classList.remove("alert-success")
document.getElementById(`${this.state.formType.split(" ").join("")}-alert`).classList.add("alert-danger")
document.getElementById(`${this.state.formType.split(" ").join("")}-alert`).append(res.data.message)
}else if (res.data.status === "mail_sent"){
  document.getElementById(`${this.state.formType.split(" ").join("")}-alert`).classList.remove("deactive")
  document.getElementById(`${this.state.formType.split(" ").join("")}-alert`).append(res.data.message)
}
this.resetForm()
})
      
       
}
    
      resetForm(){
        
         this.setState({names: '', email: '', message: '',subject: ''})

         document.getElementById("name").value = null
         document.getElementById("subject").value = null
      }
      
    render() {
        return (
            <div className="contact">
               <div className="contact-container container-fluid">
               <h1 className="lead-title">Contact Human Resources</h1>
                <div className="contact-form">
                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1">Choose who to contact</label>
                      <select onChange={e=>{this.renderForm(e)}} className="form-control" id="exampleFormControlSelect1">
                        <option>Select Department</option>
                        <option>Human Resources</option>
                        <option>Payroll</option>
                      </select>
                    {this.displayForm()}
                </div>
                </div>
               </div>
            </div>
        )
    }
}
