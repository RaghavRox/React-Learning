import React from 'react';

export default class Wa extends React.Component{
  constructor(props){
    super(props);
    this.state = {number : null};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  

  handleSubmit(event){
    window.location.href = "https://wa.me/91"+this.state.number;
    event.preventDefault();
  } 

  handleChange(event){
    this.setState({number : event.target.value});
  }

  render(){
    return (
      <form onSubmit = {this.handleSubmit}>
          <label>
            number : <input type ="text" value = {this.state.number} onChange = {this.handleChange}/>
          </label>
          <input type = "submit" value = "chat in whatsapp"/>
      </form>
    );
  }
}