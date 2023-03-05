import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Register = () => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState({});
    const [accountCreated, setAccountCreated] = useState(false)
    const [isExist , setIsExist ] = useState(false);

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
        let name = firstname + " " + lastname;
        let data = {
            "username": name,
            "email": email,
            "password": password
        }
        axios.post('http://localhost:8000/api/auth/register', data)
            .then((res) => {
                console.log(res)
                if(res.data._id){
                    setAccountCreated(true)
                }
            })
            .catch((err) => {
                if(err.response.data.error_code === "EMAIL_ALREADY_EXIST"){
                    setIsExist(true)
                    setTimeout(() => {
                        setIsExist(false)
                    }, 5000);
                }
            })

    }

    // defining form validation function 
    const validateForm = () => {
        const errors = {};
        if (!firstname) {
            errors.name = 'Name is required';
        }
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is not valid';
        }
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (!passwordConfirm) {
            errors.passwordConfirm = 'Please confirm the password';
        } else if (password !== passwordConfirm) {
            errors.passwordConfirm = 'Passwords do not match';
            setTimeout(() => {
                errors.passwordConfirm = null
            }, 3000);
        }
        return errors;
    }


    // navigate to login page 
    const navigateToLogin = () => {
        alert("Login to make your experince better ")
        navigate('/signin') 
    }
    

    return (
        <div className='grid place-items-center'>
            {
                !accountCreated ?

                    (<div className='mt-9 w-[300px] sm:w-[500px] border border-gray-300 p-7 rounded-xl'>

                        <form onSubmit={handleSubmit} >
                            <div className=" w-full mb-6 group">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@xyz.com" required />
                                {
                                    errors.email &&
                                    <div className="mt-3 text-sm font-medium">
                                        <a href="/#" className="  font-semibold underlin text-red-600 hover:text-blue-800 dark:hover:text-blue-900">**{errors.email}</a>
                                    </div>
                                }
                                {
                                    isExist && 
                                    <div className="mt-3 text-sm font-medium">
                                        <a href="/#" className="  font-semibold underlin text-red-600 hover:text-blue-800 dark:hover:text-blue-900">**Email id already exist please try with other email</a>
                                    </div>
                                }
                            </div>
                            <div className=" w-full mb-6 group">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                {
                                    errors.password &&
                                    <div className="mt-3 text-sm font-medium">
                                        <a href="/#" className="  font-semibold underlin text-red-600 hover:text-blue-800 dark:hover:text-blue-900">**{errors.password}</a>
                                    </div>
                                }
                            </div>
                            <div className=" w-full mb-6 group">
                                {/* <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label> */}
                                <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Confirm password</label>
                                <input value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} type="password" id="confirmpassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                {
                                    errors.passwordConfirm &&
                                    <div className="mt-3 text-sm font-medium">
                                        <a href="/#" className="  font-semibold underlin text-red-600 hover:text-blue-800 dark:hover:text-blue-900">**{errors.passwordConfirm}</a>
                                    </div>
                                }
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input value={firstname} onChange={(e) => setFirstName(e.target.value)} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                                </div>
                            </div>

                            <button type="submit" className="text-white bg-[#32aeb1] hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
                                Alredy have an account -- <Link to="/signin" className="text-red-700 hover:underline dark:text-red-500">Log In</Link>
                            </div>
                        </form>

                    </div>)

                    :

                    <div className='flex justify-center items-center h-[400px]'>
                        Account created succesfully. 
                        <p className='text-lg text-gray-700'>
                            <Link to="/signin"> <span className='text-xl text-pink-600'>Login</span></Link>
                        </p>
                    </div>
            }
        </div>
    )
}

export default Register
