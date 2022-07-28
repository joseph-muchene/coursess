import React, { useRef } from 'react';
import '../firebaseconfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function Login() {
  let navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  function SignInUser() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    //run firebase stuff here
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log("successful login")

        //if (user == student){
        navigate("/sdashboard")
        //}else{
        // navigate("/dashboard")
        //}

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage)
      });
  }

  return (
    <div>
      <Navbar />
      <h1> Sign in</h1>
      <p>Learn new languages today!</p>

      <div className='main'>
        <input type="text" placeholder='Enter your email' ref={emailRef} /><br></br>
        <input type="password" placeholder='Enter your password' ref={passwordRef} /><br></br>

        <Button variant="primary" size="lg" w="75" onClick={SignInUser} >
          Log In
        </Button>
        <br></br>

        <p >Don't have an account?<br></br><Link to="register">Sign up as a student</Link> <br></br>or 
      
        <Link to="inRegister">Sign up as an instructor</Link></p>
        <p></p>
        <p></p>
      </div>
    </div>
  )
}

export default Login