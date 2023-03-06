import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const DisplayDetails = () => {

  const navigate = useNavigate();

  let user = JSON.parse(localStorage.getItem("user"));
  let cartArr = []

  const [product, setProduct] = useState([]);
  const params = useParams();

  useEffect(() => {
    const foo = async () => {
      try {
        const prodDetailsRef = await axios.get(`https://api-netmeds-in.onrender.com/api/details/${params.prod_id}`)
        let prodDetails = prodDetailsRef.data;
        setProduct(prodDetails);
      }
      catch (err) {
        console.log(`err while fatching the data of product `, err);
      }
    }
    foo();
  }, [])

  // add in cart collection 
  const addToCart = async (productId) => {
    if (user) {
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
            if (err.response.data === "token is not valid ") {
              let goToLogin = window.confirm("Your session is expired please log in again");
              if (goToLogin) {
                navigate('/signin')
              }
            }
          })

      }
      catch (err) {
        console.log(`error hi error hn jindgi me `, err)
      }
    }
    else {
      let goSignin = window.confirm(`You haven't log in, Login first or create accont`)
      if (goSignin) {
        navigate('/signin')
      }
    }
  }

  // render product details function 
  const renderProduct = (item) => {
    // console.log(item);
    if (item) {
      if (item.length > 0) {
        return item.map((obj) => {

          let productName = obj.prod_name.replaceAll('_', ' ')
          productName = productName.charAt(0).toUpperCase() + productName.substring(1)
          productName = productName.substring(0, 60)

          return (
            <>
              <div key={obj.prod_id} className=" flex flex-col sm:flex-row justify-between mt-5 w-full max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

                <div className='flex flex-1 justify-center items-center' >
                  <img className="h-auto max-w-lg rounded-lg" src={`${obj.img}`} alt="image description" />
                </div>
                <div className='flex-1'>

                  <h6 className=" mb-4 text-lg font-medium dark:text-white">{productName}</h6>
                  <hr />
                  <h6 className=" my-4 text-lg font-normal dark:text-white">Best Price*<span className='text-pink-600'>&nbsp;₹{obj.cost}</span> </h6>
                  <p className="text-xs leading-6 text-gray-600 dark:text-white">(Inclusive of all taxes)</p>
                  <p className="text-xs leading-6 text-gray-600 dark:text-white">*This product cannot be returned for a refund or exchange. </p>
                  <p className="text-xs leading-6 text-gray-600 dark:text-white">* Mkt: {obj.company_name}</p>
                  <p className="text-xs leading-6 text-gray-600 dark:text-white">* Delivery charges if applicable will be applied at checkout</p>
                  <div className='my-5'>
                    <hr />
                  </div>
                  <button onClick={() => addToCart(obj.prod_id)} type="button" className="w-full text-white bg-[#32aeb1]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add To Cart</button>

                </div>
              </div>
            </>
          )
        })
      } else {
        return (
          <div>
            No any product
          </div>
        )
      }
    } else {
      return (
        <div>
          <p className="my-4 text-4xl text-gray-900 dark:text-white">Loding...</p>

        </div>
      )
    }
  }

  return (
    <div className='container mx-auto'>
      <div className='grid place-items-center'>
        <p className="my-4 text-4xl text-gray-900 dark:text-white">Details about Product</p>
        {/* <div className=" flex flex-col sm:flex-row justify-between mt-5 w-full max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"> */}
        {
          renderProduct(product)
        }
        {/* </div> */}
      </div>
    </div>
  )
}

export default DisplayDetails
