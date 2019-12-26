import React, { Component } from 'react'

export default class contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
          formType: '',
          formSendTo: '',
          formTargetLoaded: false,
        };
      }
    renderForm = (e) =>{
       if(e.target.value.toLowerCase() === 'payroll'){
        this.setState({
            formType: e.target.value,
            formSendTo: 'payroll@inktel.com',
            formTargetLoaded: true,
        })
       }
       if(e.target.value.toLowerCase() === 'human resources'){
        this.setState({
            formType: e.target.value,
            formSendTo: 'hr@inktel.com',
            formTargetLoaded: true,
        })
       }
    }
    displayForm = () =>{
      
       if(this.state.formTargetLoaded){
           return (
            <form>
            <div className="form-group">
                <h2 className="mt-4">Contacting {this.state.formType} ({this.state.formSendTo})</h2>
              <label for="exampleFormControlInput1">Email address</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>
           
           
            <div className="form-group">
              <label for="exampleFormControlTextarea1">Example textarea</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
          </form>
           )
       }
    }
    render() {
        return (
            <div className="contact">
               <div className="container">
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
