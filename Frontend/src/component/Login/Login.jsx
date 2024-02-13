import  { useState } from 'react'
import "./Login.css"
import { useDispatch } from 'react-redux';
import { getUserAction, userLoginAction } from '../../Action/UserAction';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch=useDispatch();
    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(userLoginAction(email,password));
        dispatch(getUserAction())
        
    }
    return (
        <div className="login-container">
            <form onSubmit={submitHandler} className="login-form">
                <input placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className='Button_Login'>
                    <button type='submit'>Login</button>
                    {/* <a href='/register'>Register</a> */}
                    <Link to={"/register"}>Register</Link>
                </div>

            </form>

        </div>
    )
}

export default Login