import React, { useRef, useState,useEffect } from 'react';
import '../App.css';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../firebaseconfig';
import { db } from '../firebaseconfig';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import { Line } from 'react-chartjs-2';



function Dashboard() {
    //modal ....
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const courseRef = useRef();
    const descRef = useRef();
    const priceRef = useRef();
    const phoneRef = useRef();


    const [user, setLoggedinUser] = useState("");
    const [coursename, setCourseName] = useState("");
    const [coursedesc, setCourseDesc] = useState("");
    const [email, setInEmail] = useState("");
    const [InName, setInname] = useState("");
    const [phone, setPhone] = useState("");
    const [courseprice, setPrice] = useState("");
  
    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
    
               setLoggedinUser(user.uid)
    
    
                const q = query(collection(db, 'courses'), where("userID", "==", uid));
    
                getDocs(q).then((QuerySnapshot) => {
                    QuerySnapshot.forEach((doc) => {
    
                        const username = doc.data.userName;
                        const CourseName = doc.data.CourseName;
                        const Coursedesc = doc.data.Coursedesc;
    
                        console.log(username);
                        //setLoggedInUser(userEmail);
                        setCourseName(CourseName);
                        setCourseDesc(Coursedesc);
                    })
                })
    
    
                const userEmail = user.email;
    
    
                // ...
                console.log(uid);
                console.log(userEmail)
            } else {
                // User is signed out
                // ...
            }
        });
    
    },[])
   
    function addCourse() {
       
            //const {coursename,coursedesc,courseprice,email,InName,phone,user} = current.value
            const cName = courseRef.current.value;
            const courseD = descRef.current.value;
            const priceAmount = priceRef.current.value;
            const useremail = emailRef.current.value;
            const inName = nameRef.current.value;
            const phoneD= phoneRef.current.value;
            
        
            addDoc(collection(db, "courses"), {
           
            CourseName: cName,
            Coursedesc: courseD,
            Price: priceAmount,
            UserEmail: useremail,
            InName:inName,
            phone:phoneD,
            userID:user
           

        }).then(() => {
            toast.success("course created")
            console.log("course created")
        }).catch((error)=>{
            const errorMessage = error.message;
            console.log(errorMessage);
        })
        ;
        // ...
    }
    console.log(user);
    function signOutUser() {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.

        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div className='Dashboard'>

            <Navbar />
            <Sidebar />

            <div className='courses'>
                <h2>Courses</h2>
                <Button className="btn btn-primary" onClick={handleShow}>
                    Add Courses
                </Button>

                <div className='container'>
                    <h2>Course</h2>
                    <p>{coursename}</p>
                    <hr></hr>
                    <p>{coursedesc}</p>
                </div>
            </div>



            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    <ToastContainer/>
                </Modal.Header>

                <Modal.Body>
                    <input type="text" ref={courseRef} placeholder='Enter your course' /><br></br><br></br>
                    <input type="text" placeholder='Enter course description' ref={descRef} /><br></br><br></br>
                    <input type="text" ref={nameRef} placeholder='Enter your username' /><br></br><br></br>
                    <input type="text" ref={priceRef} placeholder='Enter course price' /><br></br><br></br>
                    <input type="text" ref={phoneRef} placeholder='Enter phone number' /><br></br><br></br>
                    <input type="password" placeholder='Enter your password' ref={passwordRef} /><br></br><br></br>
                    <input type="email" placeholder='Enter your email' ref={emailRef} /><br></br><br></br>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addCourse}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Dashboard