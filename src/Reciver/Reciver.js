import React from 'react';
import Message from './Message.js';
import Joined from './Joined.js';
import Left from './Left.js';
import './Reciver.css';
var $ = require("jquery");

class Reciver extends React.Component 
{
    setup_reciver=()=>
    {
        this.props.connection.onmessage = (rcv) => 
        {
            var recived=null;
            console.log(rcv.data);
            try
            {
                recived=JSON.parse(rcv.data);
            }
            catch(e)
            {
                console.log(e,rcv);
            }
            if(recived!=null)
            {
                if(recived.replay==null)
                {
                    $(".Reciver").stop().animate({ scrollTop: $(".Reciver")[0].scrollHeight}, 1000);
                }
                if(recived.message!=null)
                {
                    
                    this.setState({messages:[...this.state.messages,<Message msg={recived}/>]});
                }
                if(recived.joined!=null)
                {
                    this.setState({messages:[...this.state.messages,<Joined msg={recived}/>]});
                }
                if(recived.disconnected!=null)
                {
                    this.setState({messages:[...this.state.messages,<Left msg={recived}/>]});
                }
            }
        }
    }

    state={messages:[],currentConnection:null}
    
    render()
    {
        
       
        if(this.props.connection!=null)
        {
            if(this.props.connection!==this.state.currentConnection)
            {
                this.setState({currentConnection:this.props.connection});
                this.setup_reciver();
            }
        }
        return (
            <div className="Reciver border border-primary rounded-lg">

                    { (this.props.name!=null && this.props.name!=="" )?
                    this.state.messages.map((msg,index)=>
                    {
                        return msg;
                    })
                    :
                    <div class="alert alert-info" role="alert">
                    To connect to the chat you need to choose a name.
                    </div>
                    }
                   
            </div>
        );
    }
}

export default Reciver;
