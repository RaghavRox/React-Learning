import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app'
import 'firebase/firestore';
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


//Global variables
const firebaseConfig = {
  apiKey: "AIzaSyBTp6wE7s53_l8p_NlK85MawnVkaE-Nskw",
  authDomain: "react-learning-b601c.firebaseapp.com",
  projectId: "react-learning-b601c",
  storageBucket: "react-learning-b601c.appspot.com",
  messagingSenderId: "204682177164",
  appId: "1:204682177164:web:feef8528c6d49558ef29a9",
  measurementId: "G-N7KP9MCCZ7"
};
const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};
let firestore = null;
let pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = new MediaStream();




class MyVideo extends React.Component{
  constructor(props){
    super(props);
    this.vidRef = React.createRef();
  }

  componentDidMount(){
    this.startStream();
  }

  async startStream(){
    localStream = await navigator.mediaDevices.getUserMedia({
      video : true,
      audio : false
    });
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });
    this.vidRef.current.srcObject = localStream;
    this.vidRef.current.play();
  }

  render(){
    return(
      <div>
        <video ref={this.vidRef} width="360" height ="240" ></video>
      </div>
    );
  }
}


class RemoteVideo extends React.Component{
  constructor(props){
    super(props);
    this.vidRef = React.createRef();
  }

  componentDidMount(){
    this.startStream();
  }

  async startStream(){
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    setInterval(()=>{this.vidRef.current.srcObject = remoteStream;
      this.vidRef.current.play();},1000);
  }

  render(){
    return(
      <div>
        <video ref={this.vidRef} width="360" height ="240" ></video>
      </div>
    );
  }
}

//for generating call
class GenerateCall extends React.Component{
  constructor(props){
    super(props);
    this.state = {output : null};
    this.generateCall = this.generateCall.bind(this);
  }

  async generateCall(){
    // Reference Firestore collections for signaling
    const callDoc = firestore.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');

    this.setState({ output : callDoc.id});

    // Get candidates for caller, save to db
  pc.onicecandidate = (event) => {
    event.candidate && offerCandidates.add(event.candidate.toJSON());
  };

  // Create offer
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  await callDoc.set({ offer });

  // Listen for remote answer
  callDoc.onSnapshot((snapshot) => {
    const data = snapshot.data();
    if (!pc.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  // When answered, add candidate to peer connection
  answerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });


  }

  render(){
    return (
       <div>
        <output>{this.state.output}</output>
        <button onClick={this.generateCall} > GenerateCall</button>
      </div>
    );
    }
}

//for joining a call
class JoinCall extends React.Component{
  constructor(props){
    super(props);
    this.state ={id : null};
    this.handleChange = this.handleChange.bind(this);
    this.answerCall = this.answerCall.bind(this);
  }

  handleChange(event){
    this.setState({id : event.target.value});
  }

  async answerCall(){
  const callId = this.state.id;
  const callDoc = firestore.collection('calls').doc(callId);
  const answerCandidates = callDoc.collection('answerCandidates');
  const offerCandidates = callDoc.collection('offerCandidates');

  pc.onicecandidate = (event) => {
    event.candidate && answerCandidates.add(event.candidate.toJSON());
  };

  const callData = (await callDoc.get()).data();

  const offerDescription = callData.offer;
  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  };

  await callDoc.update({ answer });

  offerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log(change);
      if (change.type === 'added') {
        let data = change.doc.data();
        pc.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
  }




  render(){
    return(
      <div>
        <input type ="text" value = {this.state.id} onChange = {this.handleChange} />
        <button onClick ={this.answerCall}>Answer call</button>
      </div>
    );
  }
}



class App extends React.Component{

  componentDidMount(){
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    firestore = firebase.firestore();
  }

  render(){
    return(
      <div>
        <MyVideo/>
        <br/>
        <RemoteVideo/>
        <br/>
        <GenerateCall/>
        <br/>
        <JoinCall/>
        
      </div>
    );
  }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);




