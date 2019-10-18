import React from 'react';
import './joined.css';
class Joined extends React.Component
{

    render()
    {
        
        return(
            <span className="joined alert alert-success">
                <span className="time">
                [{new Date(this.props.msg.joined.date).toLocaleString()}] 
                </span>
                <span className="name">
                {" "+this.props.msg.joined.name+" "}
                </span>
                <span className="content">
                has joined.
                </span>
                
            </span>
        );
    }
}
export default Joined;