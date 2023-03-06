import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const AddToCart = () => {
    
    let user = JSON.parse(localStorage.getItem("user"));
    let carts = JSON.parse(localStorage.getItem("cartArr"));
    

    const [cartItems, setCartItems] = useState([]);
    const [ deleteCart , setDeleteCart ] = useState(0)

    let totalCart = 0
    let totalCost = 0
    // console.log(`arct array form localstorage`, carts);

    // get the carts from database 
    useEffect(() => {
        const foo = async () => {
            if(user){
                try {
                    let res = await axios.get(`https://api-netmeds-in.onrender.com/api/cart/${user._id}`);
                    let carts = res.data;
                    setCartItems(carts);
                }
                catch (err) {
                    console.log(`error while getting carts `, err);
                }
            }
        }
        foo();
    }, [ deleteCart, ])

    const removeCart = async (productId) => {
        try {
            let res = await axios.delete(`https://api-netmeds-in.onrender.com/api/cart/delete/${productId}`);
            let carts = res.data;
            console.log(carts);
            setDeleteCart(deleteCart + 1);
        }
        catch (err) {
            console.log(`error while deleting cart `, err);
        }
    }


    useEffect(()=> {
        const foo = () => {
            let totalCart = 0
            let totalAmmount = 0
            let totalItem = []
            cartItems.map((obj) => {
                totalCart++;
                totalAmmount += obj.cost;
                totalItem.push(obj.prod_id)
            })
            let orderItems = {
                totalCart : totalCart,
                totalAmmount: totalAmmount,
                totalItem: totalItem
            }
            localStorage.setItem("orderItems", JSON.stringify(orderItems));
        }
        foo();
    }, [cartItems, deleteCart])
    

    // displaye cart result 
    const renderCart = (cartItems) => {
      
        if (cartItems.length > 0) {

            return (
                <div>
                    <div className=" flex flex-col sm:gap-5 lg:flex-row justify-between  mt-5 w-full max-w-5xl p-6 dark:bg-gray-800 dark:border-gray-700">

                        <div className='flex-1 flex  justify-center items-center order-2 xl:order-1' >
                            <div className='grid grid-cols-1'>
                                {
                                    cartItems.map((obj) => {

                                        let productName = obj.prod_name.replaceAll('_', ' ')
                                        productName = productName.charAt(0).toUpperCase() + productName.substring(1)
                                        productName = productName.substring(0, 60)
                                       

                                        // total cost 
                                        totalCost += obj.cost
                                        totalCart++;
                                       

                                        return (
                                            
                                            <div key={obj._id} className=" flex flex-col sm:flex-row justify-between mt-5 w-full max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

                                                <div className='flex flex-2 justify-center items-center' >
                                                    <img className="h-auto max-w-lg rounded-lg" src={`${obj.img}`} alt="description" />
                                                </div>
                                                <div className='flex-1'>

                                                    <h6 className=" mb-4 text-lg font-medium dark:text-white">{productName}</h6>
                                                    <hr />
                                                    <h6 className=" my-4 text-lg font-normal dark:text-white">Best Price* <span className='text-pink-600'>&nbsp;₹{obj.cost}</span> </h6>
                                                    <p className="text-xs leading-6 text-gray-600 dark:text-white">* Mkt:{obj.company_name} </p>
                                                    <p className="text-xs leading-6 text-gray-600 dark:text-white">(Inclusive of all taxes)</p>
                                                    <p className="text-xs leading-6 text-gray-600 dark:text-white">* Delivery charges if applicable will be applied at checkout</p>
                                                    <div className='my-5'>
                                                        <hr />
                                                    </div>
                                                    {/* buttons */} 
                                                    <div className='flex gap-3'>    
                                                        <div className='ml-auto'>
                                                            <button onClick={() => removeCart(obj._id)} className="mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-[#32aeb1]  dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md ">
                                                                    Remonve
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='flex-1 order-1 xl:order-2 grid grid-cols-1 place-items-center h-[150px]'>

                            <div className="w-full max-w-sm p-4 mt-5 bg-white border border-gray-200 rounded-lg shadow-md sm:p-1 md:p-2 dark:bg-gray-800 dark:border-gray-700">
                                <div>
                                    <h6 className=" my-4 text-lg font-normal dark:text-white">Best Price* <span className='text-pink-600'>&nbsp;₹{totalCost}</span> </h6>
                                </div>
                                <div>
                                    <Link to='/placeorder'>
                                    <button type="button" className="w-full text-white bg-[#32aeb1]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">PROCEED</button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='flex justify-center items-center'>
                    <div className="w-full max-w-sm  dark:bg-gray-800 dark:border-gray-700">
                        <a href="/#">
                            <img className="p-8 rounded-t-lg" src="https://www.netmeds.com/msassets/images/emptycart.svg" alt="product " />
                        </a>
                        <div className="px-5 pb-5 flex flex-col justify-center items-center">
                            <p className="text-lg text-gray-900 dark:text-white">Your Cart is empty!</p>
                            <p className="text-xs text-gray-900 dark:text-white">You have no items added in the cart.</p>
                            <p className="text-xs text-gray-900 dark:text-white">Explore and add products you like!</p>
                            <div className="mt-3 w-full">
                                <Link to="/">
                                <button type="button" className="text-white bg-[#32aeb1] hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Add items  
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
    }



    return (
        <div className='container mx-auto'>
            <p className="text-4xl my-3 font-extrabold dark:text-white">My Cart</p>
            <div className='grid grid-cols-1 place-items-center'>
                <div className='w-full max-w-5xl'>
                    {renderCart(cartItems)}
                </div>
            </div>
        </div>
    )
}

export default AddToCart
