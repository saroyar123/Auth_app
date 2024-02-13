import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAction, userCreateAction } from '../../Action/UserAction';
import "./Register.css"
import { Link } from 'react-router-dom';

const Register = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const {message}=useSelector((state)=>state.User.data)
    console.log(message)
    const submitHandler=async(e)=>{
        e.preventDefault();
        await dispatch(userCreateAction(name,email,password));
        dispatch(getUserAction())

    }
  return (
    <div className="register-container">
        <form onSubmit={submitHandler} className="register-form">
 
            <input  placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>

            <input placeholder='Example@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)}/>
   
            <input placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        
            
            <div className="Button_Register">
            <button type='submit'>Register</button>
            {/* <a href='/'>
                Login
            </a> */}
            <Link to={"/"}>Login</Link>
            </div>
            {message!==null?
            <div className='alert'>
                <h1>{message}</h1>
           </div>:<></>}
           
            
        </form>
    </div>
  )
}

export default Register