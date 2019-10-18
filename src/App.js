import React from 'react';
import './App.css';
import Sender from './Sender/Sender.js';
import Register from './Register/Register.js';
import Reciver from './Reciver/Reciver.js';

//const address="ws://127.0.0.1:4000/";
const address="ws://chat-backend-aws.herokuapp.com";
class App extends React.Component {

  
  setup_connection = () =>
  {
    
    if(this.connection!=null)
    {
      delete this.connection;
    }
    this.connection =  new WebSocket(address); 
    
    this.connection.onerror = (error) => 
    {
      console.log(`WebSocket error: ${error}`,"(",address,")");
      this.setState({reset:this.state.reset+1});
      //this.setup_connection();
    }
    this.connection.onclose = (error) =>
    {
      console.log(`WebSocket closed: ${error}`,"(",address,")");
      this.setState({reset:this.state.reset+1});
      //this.setup_connection();
    }
   
  }
  componentDidMount()
  {
    this.setup_connection();
  }
  
  state={name:null,reset:0}
  
  
  isRegistred = () =>
  {
      if(this.state.name===null)
      {
        return <Register setName={this.setName}/>;
      }
      else
      {
        return (<Sender name={this.state.name} connection={this.connection} />);
      }
  }
  setName = (name) =>
  {
      this.setState({name:name});
  }
  render()
  {
    return(
      <div className="App container">
        <div className="row">
        <div className="mb-3 col-sm-6 offset-sm-3">
            <h3>open a second instance and chat!</h3>
          </div>
        </div>
        <div className="row">
          
          <div className="mb-3 col-sm-6 offset-sm-3">
            <Reciver connection={this.connection} name={this.state.name}/>
          </div>
          
        </div>
        <div className="row">
          <div className="col">
            {this.isRegistred()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
