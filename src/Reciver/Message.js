import React from 'react';
import './message.css';
class Message extends React.Component
{

    render()
    {
        
        return(
            <span className="message alert alert-info">
                <span className="time">
                [{new Date(this.props.msg.message.date).toLocaleString()}] 
                </span>
                <span className="name">
                {" "+this.props.msg.message.name}:
                </span>
                <span className="content">
                {" "+this.props.msg.message.content}
                </span>
            </span>
        );
    }
}
export default Message;