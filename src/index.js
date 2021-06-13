import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



// class Wa extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {number : null};

//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);

//   }

  

//   handleSubmit(event){
//     window.location.href = "https://wa.me/91"+this.state.number;
//     event.preventDefault();
//   } 

//   handleChange(event){
//     this.setState({number : event.target.value});
//   }

//   render(){
//     return (
//       <form onSubmit = {this.handleSubmit}>
//           <label>
//             number : <input type ="text" value = {this.state.number} onChange = {this.handleChange}/>
//           </label>
//           <input type = "submit" value = "chat in whatsapp"/>
//       </form>
//     );
//   }
// }



let localStream = null;

class MyVideo extends React.Component{
  constructor(props){
    super(props);
    this.startStream = this.startStream.bind(this);
    this.vidRef = React.createRef();
  }

  async startStream(){
    localStream = await navigator.mediaDevices.getUserMedia({
      video : true,
      audio : false
    });
    this.vidRef.current.srcObject = localStream;
    this.vidRef.current.play();
  }

  render(){
    return(
      <div>
        <video ref={this.vidRef} width="360" height ="240" ></video>
        <button onClick ={this.startStream} >Start webcam</button>
      </div>
    );
  }
}



ReactDOM.render(
  <MyVideo />,
  document.getElementById('root')
);




