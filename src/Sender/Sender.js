import React from 'react';
var $ = require("jquery");
class Sender extends React.Component 
{
    setup_sender = () =>
    {
        
        
        this.props.connection.onopen = (data) => 
        { 
            try
            {
                this.props.connection.send(data); 
                
            }
            catch(e)
            {
                console.log("tried to send: ",data," error: ",e);
                
            } 
        }

        //console.log(this.props.connection.OPEN);
        if(this.state.keepAlive!=null)
        {
            try
            {
                clearInterval(this.state.keepAlive);

            }
            catch(e)
            {
                console.log(e);
            }
            this.setState({keepAlive:null});
        }
        this.props.connection.onopen(JSON.stringify({connected:{date:Date.now(),name:this.props.name}}));
        this.setState({keepAlive:setInterval(
            ()=>
            {
                this.props.connection.onopen(JSON.stringify({connected:{date:Date.now(),name:this.props.name}}));
            }
        ,1000)})
        this.send = () =>
        { 
            if(this.state.message!=null && this.state.message!=="" && typeof this.state.message==="string")
            {
                this.props.connection.onopen(JSON.stringify({message:{date:Date.now(),name:this.props.name,content:this.state.message}}));
            }
            this.setState({message:""});
            $("#msg").val("");
        }
        
    }
    
    state={message:"",currentConnection:null,keepAlive:null};
    
    message = (event) =>
    {
        this.setState({message:event.target.value});
    }
    render()
    {
        if(this.props.connection!=null)
        {
            if(this.state.currentConnection!==this.props.connection)
            {
                this.setState({currentConnection:this.props.connection});
                this.setup_sender();
            }
        }
        return (
            <div className="Sender container form-inline">
                <div className="input-group mb-3 col-sm-6 offset-sm-3 text-center">
                    <input type="text" id="msg" placeholder="Message Content" className="form-control" onChange={this.message}/>
                    <div class="input-group-append">
                        <input type="button" value="Send" className="btn btn-secondary" onClick={this.send}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sender;
