import React from 'react';
import './left.css';
class Left extends React.Component
{

    render()
    {
        
        return(
            <span className="left alert alert-danger">
                <span className="time">
                [{new Date(this.props.msg.disconnected.date).toLocaleString()}] 
                </span>
                <span className="name">
                {" "+this.props.msg.disconnected.name+" "}
                </span>
                <span className="content">
                has left.
                </span>
                
            </span>
        );
    }
}
export default Left;