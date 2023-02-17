import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const PlaceOrder = () => {

    // const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(0);
    // const [fname, setFname] = useState('');
    const [address, setAddress] = useState('');
    // const [orderId, setOrderId] = useState(Math.floor(Math.random() * 10000))
    // setOrderId(Math.floor(Math.random() * 10000))
    const [isPlaced, setIsPlaced] = useState(false)
    let extra = Math.floor(Math.random() * 90000) + 10000;

    const navigate = useNavigate();

    let user = JSON.parse(localStorage.getItem('user'));

    let orderItems = JSON.parse(localStorage.getItem('orderItems'));
    console.log(` order items object `, orderItems);

    function isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    function isObj(val) {
        return typeof val === 'object'
    }

    function stringifyValue(val) {
        if (isObj(val) && !isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    function buildForm({ action, params }) {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', stringifyValue(params[key]))
            form.appendChild(input)
        })

        return form
    }

    function post(details) {
        const form = buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    const getData = async () => {

        
        const data = {
            amount: orderItems.totalAmmount,
            name: user.username,
            email: user.email,
            phone_number: phone,
            order_id: "order_" + extra,
            number: extra
        }

        // const checksum = await axios.post()
        return axios(`http://localhost:8000/api/payment/paytm`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: data
        })
        .then(response => response)
        .catch(error => {
            if (error.response) {
                console.log({msg: "error response ", err: error})
              }
              else if (error.request) {
                console.log({msg: "error request ", err: error})
              }
              else {
                console.log({msg: "error common ", err: error})
              }
        })
    }

    const makePayment = (event) => {
        event.preventDefault()

        let data = {
            total_payment: orderItems.totalAmmount,
            total_item: orderItems.totalCart,
            phone: phone,
            name: user.username,
            email: user.email,
            uid: user._id,
            order_id: "order_" + extra
        }

        const axiosConfig = {
            headers: {
                token: `Bearer ${user.accessToken}`
            }
        }

        axios.post(`http://localhost:8000/api/order/${user._id}`, data, axiosConfig)
            .then((res) => {
                console.log(`new order `, res);
                setIsPlaced(true);
            })
            .catch((err) => {
                console.log("you recive an errror", err.response.data);
                if (err.response.data === "token is not valid ") {
                    let goToLogin = window.confirm("Your session is expired please log in again");
                    if (goToLogin) {
                        navigate('/signin')
                    }
                }
            })

        getData().then(response => {

            navigate('/vieworders')
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: response
            }
            post(information)

        })
    }

    if (!isPlaced) {
        return (
            <div className='container mx-auto grid place-items-center'>
                <div className='mt-9 w-full max-w-6xl border border-gray-300 p-7 rounded-xl'>

                    <form action='http://localhost:4100/paynow' method='POST'>
                        <input type="hidden" name='cost' value={orderItems.totalAmmount} id="" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
                        {/* <input type="hidden" name='id' value={orderId} id="" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required /> */}
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            {/* <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@xyz.com" required /> */}
                            <input
                                value={user.email}
                                // onChange={(e) => setEmail(e.target.value)}
                                type="email" id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@xyz.com"
                                required
                            />
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone No.</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" maxLength={10} id="mobile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2******356" required />
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                {/* <input value={fname} onChange={(e) => setFname(e.target.value)} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required /> */}
                                <input value={user.username} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 my-7'>
                            <div>
                                <h1 className="text-3xl font-semibold dark:text-white">Total Item -- <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">{orderItems.totalCart}</small></h1>
                            </div>
                            <div>
                                <h1 className="text-3xl font-semibold dark:text-white">Total Price -- <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">₹{orderItems.totalAmmount}</small></h1>
                            </div>
                        </div>

                        <button onClick={makePayment} type="submit" className="text-white bg-[#32aeb1] hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Place Order </button>
                    </form>

                </div>
            </div>
        )
    }
    else {
        return (
            <div className='h-[500px] flex justify-center items-center'>
                <h2 className='text-4xl font-medium'>Order Placed Succesfully. </h2>
            </div>
        )
    }
}


export default PlaceOrder
