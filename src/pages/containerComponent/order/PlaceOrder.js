import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const PlaceOrder = () => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(0);
    const [fname, setFname] = useState('');
    const [address, setAddress] = useState('');
    const [orderId, setOrderId] = useState(Math.floor(Math.random() * 10000))
    // setOrderId(Math.floor(Math.random() * 10000))
    const [isPlaced, setIsPlaced] = useState(false)

    const navigate = useNavigate();

    let user = JSON.parse(localStorage.getItem('user'));

    let orderItems = JSON.parse(localStorage.getItem('orderItems'));
    console.log(` order items object `, orderItems);


        // PAYTM 
    // CREATING SCRIPT FOR PAYTM  
    const loadCheckoutScript = (mid, config) => {
        
        const url = 'https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/';
        const scriptElement = document.createElement('script');
        scriptElement.async = true;
        scriptElement.src = url.concat(mid);
        scriptElement.type = 'application/javascript';
        scriptElement.onload = () => {
            onScriptLoad(config)
        };
        scriptElement.onerror = error => {
          console.error("USE_EXISTING_CHECKOUT_INSTANCE" + 'script load fail!');
        }
        document.body.appendChild(scriptElement);
      }


    // FUNCTION TO OPEN THE PAYTM WINDOW 
    function onScriptLoad(config) {

        if (window.Paytm && window.Paytm.CheckoutJS) {
            window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
                // initialze configuration using init method
                // window.Paytm.CheckoutJS.init({
                //     style:{
                //       "themeColor":"#7400b8"    
                //     }
                //   });
                window.Paytm.CheckoutJS.init(config)
                    .then(function onSuccess(result) {
                        // after successfully updating configuration, invoke JS Checkout
                        window.Paytm.CheckoutJS.invoke();
                        console.log(`info after payment proceed`,result);
                    }).catch(function onError(error) {
                        console.log("error => ", error);
                    });
            });
        }
    }


    // form submit for Place order 
    const checkOut = async (event) => {

        event.preventDefault()

        // order_id:Math.floor(Math.random()*10000)
        let data = {
            total_payment: orderItems.totalAmmount,
            total_item: orderItems.totalCart,
            phone: phone,
            name: fname,
            email: email,
            uid: user._id,
            order_id: orderId
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

        // paytm redirect process 
        try {
            const response = await axios.post('http://localhost:8000/payment/paytm', {
                amount: orderItems.totalAmmount
            });

            const { mid, order_id, amount } = response.data
            const txnToken = response.data.body.txnToken;

            var config = {
                "root": "",
                "flow": "DEFAULT",
                "data": {
                    "orderId": order_id, /* update order id */
                    "token": txnToken, /* update token value */
                    "tokenType": "TXN_TOKEN",
                    "amount": amount, /* update amount */
                    "userDetail": {
                        "mobileNumber": 7073549519,
                        "name": user?.displayName
                    }
                },
                "merchant": {
                    "redirect": false
                },
                // payMode:{
                //     "order": ['UPI', 'NB','CARD']
                //   },
                /*
                    hello bhai logo kya tum muje jante ho kya agar nahi to me tumhe mar dunga smaj me aaya kya ya nahi salo me tumhe mar dunga 
                    manoj bhatt ka nam nahi to me tumhe nahi marunga 
                */
                "handler": {
                    "notifyMerchant": function (eventName, data) {
                        // console.log("notifyMerchant handler function called");
                        // console.log("eventName = > ", eventName);
                        if (eventName === 'SUCCESS') {
                            console.log('Transaction successful!')
                        } else if (eventName === 'ERROR') {
                            console.log('Transaction failed!')
                        }
                        console.log("data => ", data);
                    },
                    transactionStatus: function (data) {
                        console.log("payment status ", data);

                    }
                }
            };

            loadCheckoutScript(mid, config)
            // onScriptLoad(config)
        } catch (error) {
            console.log(`error while getting the configration of user `);
        }

    }



    if (!isPlaced) {
        return (
            <div className='container mx-auto grid place-items-center'>
                <div className='mt-9 w-full max-w-6xl border border-gray-300 p-7 rounded-xl'>

                    <form action='http://localhost:4100/paynow' method='POST'>
                        <input type="hidden" name='cost' value={orderItems.totalAmmount} id="" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
                        <input type="hidden" name='id' value={orderId} id="" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            {/* <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@xyz.com" required /> */}
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                <input value={fname} onChange={(e) => setFname(e.target.value)} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
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

                        <button onClick={checkOut} type="submit" className="text-white bg-[#32aeb1] hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Place Order </button>
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
