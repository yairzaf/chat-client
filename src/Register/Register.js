import React from 'react';
import '../form.css';
var $ = require("jquery");
class Register extends React.Component 
{
  state={registered:false};
  checkName = ()=>
  {
    var name=$("#name").val();
    if(name!=="" && name!=null && typeof name==="string")
    {
      this.props.setName(name);
      this.setState({registered:true});
    }
    else
    {
      alert("please enter a valid name.");
    }
  }
  render()
  {
    return(
      <div className="Register container form-inline">
        <div className="input-group mb-3 col-sm-6 offset-sm-3 text-center">
          <input type="text" id="name" placeholder="Enter Your Nickname" className="form-control " />
          
          <div class="input-group-append">
          <input type="button" value=" Done " className="btn btn-success" onClick={this.checkName} />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;