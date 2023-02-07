import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {

    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError , serPasswordError ] = useState(false)

    const navigate = useNavigate()

    // form submit function 
    const handleSubmit = (event) => {
        event.preventDefault();
        // validation functioin call 
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        // send the form data to the server or do 
        let data = {
            "email": email,
            "password": password
        }
        axios.post('http://localhost:8000/api/auth/login', data)
            .then((res) => {
                localStorage.setItem("user" , JSON.stringify(res.data))
                // console.log(`this data is coming from localstorage `)
                // console.log(JSON.parse(localStorage.getItem("user")));
                navigate('/')
            })
            .catch((err) => {
                // console.log(err.response.data)
                let errRes = err.response.data;
                if(errRes.includes("Wrong password or username") || errRes.includes("null")){
                    serPasswordError(true);
                }
            })

    }

    // defining form validation function 
    const validateForm = () => {
        const errors = {};
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is not valid';
        }
        return errors;
    }

    return (
        <div className='grid place-items-center'>
            <div className='mt-9 w-[300px] sm:w-[500px] border border-gray-300 p-7 rounded-xl'>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="loginemail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="loginemail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@xyz.com" required />
                        {
                            errors.email &&
                            <div className="mt-3 text-sm font-medium">
                                <a href="/#" className="  font-semibold underlin text-red-600 hover:text-blue-800 dark:hover:text-blue-900">**{errors.email}</a>
                            </div>
                        }
                    </div>
                    <div className="mb-6">
                        <label htmlFor="loginpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="loginpassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        {
                            passwordError &&
                            <div className="mt-3 text-sm font-medium">
                                <a href="/#" className="  font-semibold underlin text-red-600 hover:text-blue-800 dark:hover:text-blue-900">Wrong Password and Username Please try agian!</a>
                            </div>
                        }
                    </div>
                    <button type="submit" className="text-white bg-[#32aeb1] hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
                        Not registered? <Link to="/signup" className="text-red-700 hover:underline dark:text-red-500">Create account</Link>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login
