import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';



const UserAccount = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    // console.log(`my user object `, user);
    const navigate = useNavigate()

    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let image = event.target.files[0];
            setFile(image)
        }
        console.log(file);
        // set headers

        const config = {
            headers: {
                token: `Bearer ${user.accessToken}`
            }
        }
        // data that is going to send 
        const data = {
            "profilePic": file
        }
        // api call
        axios.put(`http://localhost:8000/api/users/${user._id}`, data, config).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(` kya error hn bhai`, err);
        })

        alert('Please Login again to see the Changes ')

    }


    // logout function
    const logout = () => {
        localStorage.removeItem("user");
        navigate("/")
    }


    return (
        <div>

            <div className='container mx-auto flex justify-center items-center '>
                <div className='w-full max-w-2xl'>
                    <div className="w-full max-w-2xl p-2 bg-white border rounded-lg shadow-md mt-2 sm:mt-4 sm:p-4 sm:px-6 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">User Name</h5>
                        </div>
                        <div className="flow-root">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-1 sm:py-2">
                                    <div className="flex items-center space-x-4">

                                        <div className="flex-1 min-w-0">
                                            <p className="text-xl font-light text-gray-700  truncate dark:text-white">
                                                {user.username}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full max-w-2xl p-2 bg-white border rounded-lg shadow-md mt-2 sm:mt-4 sm:p-4 sm:px-6 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">User E-mail Id</h5>
                        </div>
                        <div className="flow-root">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-1 sm:py-2">
                                    <div className="flex items-center space-x-4">

                                        <div className="flex-1 min-w-0">
                                            <p className="text-xl font-light text-gray-700  truncate dark:text-white">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full max-w-2xl p-2 bg-white border rounded-lg shadow-md mt-2 sm:mt-4 sm:p-4 sm:px-6 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">Logout</h5>
                        </div>
                        <div className="flow-root">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-1 sm:py-2">
                                    <div className="flex items-center space-x-4">

                                        <div className="mt-3 w-full">
                                            <button onClick={() => logout()} type="button" className="text-white bg-[#32aeb1] hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:text-xl w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Click to logout</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full max-w-2xl p-2 bg-white border rounded-lg shadow-md mt-2 sm:mt-4 sm:p-4 sm:px-6 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">Go to the Login page</h5>
                        </div>
                        <div className="flow-root">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-1 sm:py-2">
                                    <div className="flex items-center space-x-4">

                                        <div className="mt-3 w-full">
                                            <Link to="/signin" type="button" className="text-white text-sm sm:text-xl bg-[#32aeb1] hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login Page</Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserAccount
