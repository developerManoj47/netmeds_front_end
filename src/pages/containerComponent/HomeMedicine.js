import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const HomeMedicine = ({ medicineData, beautyData }) => {

    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem("user"));

    let cartArr = []

    // add in cart collection 
    const addToCart = async (productId) => {
        if(user){
            try {
                const res = await axios.get(`https://api-netmeds-in.onrender.com/api/details/${productId}`);
                let productDetails = res.data;
    
                let data = {
                    category: productDetails[0].category,
                    sub_cate_name: productDetails[0].sub_cate_name,
                    cate_id: productDetails[0].cate_id,
                    prod_name: productDetails[0].prod_name,
                    company_name: productDetails[0].company_name,
                    cost: productDetails[0].cost,
                    img: productDetails[0].img,
                    prod_id: productDetails[0].prod_id,
                    uid: user._id,
                }
    
                const config = {
                    headers: {
                        token: `Bearer ${user.accessToken}`
                    }
                }
    
                axios.post(`https://api-netmeds-in.onrender.com/api/cart/addincart/${user._id}`, data, config)
                    .then((res) => {
                        console.log(res);
                        cartArr.push(res.data);
                        localStorage.setItem("cartArr", JSON.stringify(cartArr));
                    })
                    .catch((err) => {
                        console.log("you recive an errror", err.response.data);
                        if(err.response.data === "token is not valid "){
                            let goToLogin  = window.confirm("Your session is expired please log in again");
                            if(goToLogin){
                                navigate('/signin')
                            }
                        }
                    })
    
            }
            catch (err) {
                console.log(`error hi error hn jindgi me `, err)
            }
        }else {
            let goSignin = window.confirm(`You haven't log in, Login first or create accont`)
            if(goSignin){
                navigate('/signin')
            }
        }
    }


    return (
        <div>
            <div className='container mx-auto mt-4'>
                <div>
                    <h2 className="text-4xl my-5 font-extrabold dark:text-white">Medicines</h2>

                    <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
                        {
                            medicineData.map((obj) => {

                                let productName = obj.prod_name.replaceAll('_', ' ')
                                productName = productName.charAt(0).toUpperCase() + productName.substring(1)
                                productName = productName.substring(0, 60)

                                return (
                                    // <Link to={`/details/${obj.prod_id}`} key={obj.prod_id}>
                                    <div key={obj.prod_id} className="w-full max-w-sm md:h-[350px]  lg:h-[400px] p-1 bg-white border-2 border-gray-200 hover:border-[#32aeb1] rounded-lg shadow-md sm:p-3 md:p-5 dark:bg-gray-800 dark:border-gray-700">
                                        <Link to={`/details/${obj.prod_id}`}>
                                            <div className='flex justify-center items-center mb-2 sm:mb-5'>
                                                <img src={`${obj.img}`} alt="" className=' sm:w-28 sm:h-32 lg:w-36 lg:h-40' />
                                            </div>
                                        </Link>
                                        <div className="md:h-[150px] lg:h-[180px] grid grid-cols-1 content-between" >
                                            <Link to={`/details/${obj.prod_id}`}>
                                                <h5 className=" sm:text-lg font-medium text-gray-900 dark:text-white">{productName}</h5>
                                            </Link>
                                            <p className="mb-3 text-green-500 font-bold dark:text-gray-400">MRP - {obj.cost}</p>
                                            <button onClick={() => addToCart(obj.prod_id)} type="button" className="w-full text-white bg-[#32aeb1]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add To Cart</button>
                                        </div>
                                    </div>
                                    // </Link>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl my-5 font-extrabold dark:text-white">Beauty Products</h2>

                    <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
                        {
                            beautyData.map((obj) => {

                                let productName = obj.prod_name.replaceAll('_', ' ')
                                productName = productName.charAt(0).toUpperCase() + productName.substring(1)
                                productName = productName.substring(0, 70)

                                return (
                                    <Link to={`/details/${obj.prod_id}`} key={obj.prod_id}>
                                        <div className="w-full max-w-sm md:h-[350px]  lg:h-[400px] p-1 bg-white border border-gray-200 rounded-lg shadow-md sm:p-3 md:p-5 dark:bg-gray-800 dark:border-gray-700">
                                            <div className='flex justify-center items-center mb-2 sm:mb-5'>
                                                <img src={`${obj.img}`} alt="" className=' sm:w-28 sm:h-32 lg:w-36 lg:h-40' />
                                            </div>
                                            <div className="md:h-[150px] lg:h-[180px] grid grid-cols-1 content-between" >
                                                <h5 className=" sm:text-lg font-medium text-gray-900 dark:text-white">{productName}</h5>
                                                <p className="mb-3 text-green-500 font-bold dark:text-gray-400">MRP - {obj.cost}</p>
                                                <button type="button" className="w-full text-white bg-[#32aeb1]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add To Cart</button>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomeMedicine
