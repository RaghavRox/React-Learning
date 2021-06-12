import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';


class Wa extends React.Component{
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


ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Wa />,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
