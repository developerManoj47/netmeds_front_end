import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListDisplay = () => {

    let params = useParams()
    const navigate = useNavigate();

    let user = JSON.parse(localStorage.getItem("user"));
    let cartArr = []

    const [firstIsHide, setFirstIsHide] = useState(false)
    const [secondIsHide, setSecondIsHide] = useState(false)
    const [categoryArr, setCategoryArr] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [listOfItem, setListOfItem] = useState([]);
    const [sortItem, setSortItem] = useState(false);

    // radio button value 
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // fatching category from database 
    useEffect(() => {
        const foo = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/category');
                const categroyList = res.data;
                setCategoryArr(categroyList);
                // console.log(searchList)
            } catch (err) {
                console.error('Error retrieving data: ', err);
            }
        };
        foo();
    }, []);


    // fatching the data WRT cate_id 
    useEffect(() => {
        const foo = async () => {

            if (sortItem) {
                try {
                    let highToLow = await axios.get(`http://localhost:8000/api/list/${params.cate_id}?sort=high`);
                    let sortItemList = highToLow.data;
                    setListOfItem(sortItemList);
                    // console.log(searchList)
                } catch (err) {
                    console.error('Error retrieving the items data WRT ID : ', err);
                }
            }
            else {
                try {
                    const dataRef = await axios.get(`http://localhost:8000/api/list/${params.cate_id}?sort=low`);
                    const listOfProducts = dataRef.data;
                    setListOfItem(listOfProducts);
                    // console.log(searchList)
                } catch (err) {
                    console.error('Error retrieving the items data WRT ID : ', err);
                }
            }

        }
        foo();
    }, [sortItem])

    // fatching the data filter cost 
    useEffect(() => {
        const foo = async () => {
            let filterUrl = ""
            if (selectedOption === "option1") {
                filterUrl = `http://localhost:8000/api/list/${params.cate_id}?lcost=10&hcost=1500`
            }
            else if (selectedOption === "option2") {
                filterUrl = `http://localhost:8000/api/list/${params.cate_id}?lcost=100&hcost=500`
            }
            else if (selectedOption === "option3") {
                filterUrl = `http://localhost:8000/api/list/${params.cate_id}?lcost=100&hcost=999`
            }
            else if (selectedOption === "option4") {
                filterUrl = `http://localhost:8000/api/list/${params.cate_id}?lcost=500&hcost=1000`
            }
            else if (selectedOption === "option5") {
                filterUrl = `http://localhost:8000/api/list/${params.cate_id}?lcost=1000&hcost=1500`
            }
            else {
                filterUrl = `http://localhost:8000/api/list/${params.cate_id}`
            }

            try {
                const dataRef = await axios.get(filterUrl);
                const listOfProducts = dataRef.data;
                setListOfItem(listOfProducts);
                // console.log(searchList)
            } catch (err) {
                console.error('Error retrieving the items data WRT ID : ', err);
            }
        }
        foo();
    }, [selectedOption, params.cate_id])

      // add in cart collection 
      const addToCart = async (productId) => {
        if(user){
            try {
                const res = await axios.get(`http://localhost:8000/api/details/${productId}`);
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
    
                axios.post(`http://localhost:8000/api/cart/addincart/${user._id}`, data, config)
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
        }
        else {
            let goSignin = window.confirm(`You haven't log in, Login first or create accont`)
            if(goSignin){
                navigate('/signin')
            }
        }

    }


    // render all item 
    const renderAllItem = (itemsList) => {
        if (itemsList) {
            if (itemsList.length > 0) {
                return (
                    listOfItem.map((obj) => {

                        let productName = obj.prod_name.replaceAll('_', ' ')
                        productName = productName.charAt(0).toUpperCase() + productName.substring(1)
                        productName = productName.substring(0, 60)

                        return (

                            <div key={obj.prod_id} className="w-full max-w-sm md:h-[350px]  lg:h-[400px] p-1 bg-white border-2  border-gray-200 hover:border-[#32aeb1] rounded-lg shadow-md sm:p-3 md:p-5 dark:bg-gray-800 dark:border-gray-700">
                                <Link to={`/details/${obj.prod_id}`} >
                                    <div className='flex justify-center items-center mb-2 sm:mb-5'>
                                        <img src={`${obj.img}`} alt="" className=' sm:w-28 sm:h-32 lg:w-36 lg:h-40' />
                                    </div>
                                </Link>
                                <div className="md:h-[150px] lg:h-[180px] grid grid-cols-1 content-between" >
                                    <Link to={`/details/${obj.prod_id}`} >
                                        <h5 className=" sm:text-lg font-medium text-gray-900 dark:text-white">{productName}</h5>
                                    </Link>
                                    <p className="mb-3 text-green-500 font-bold dark:text-gray-400">MRP - {obj.cost}</p>
                                    <button onClick={() => addToCart(obj.prod_id)} type="button" className="w-full text-white bg-[#32aeb1]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add To Cart</button>
                                </div>
                            </div>

                        )
                    })
                )
            }
            else {
                return (
                    <div className='flex justify-center items-center'>
                        <h2 className='text-black text-4xl font-medium'>No Data as Per filter</h2>
                    </div>
                )
            }
        } else {
            return (
                <div className='flex justify-center items-center'>
                    <h2 className='text-3xl  text-[#32aeb1] font-medium'>Loding...</h2>
                </div>
            )
        }

    }


    return (
        <div>
            <div className='container mx-auto'>
                <div className='mt-10 mx-2 flex flex-col md:flex-row gap-4'>
                    {/* filters  */}
                    <div className=' flex gap-4 md:flex-col '>

                        <aside className="w-64 mt-5" aria-label="Sidebar">
                            <div className="px-3 py-4 h-[400px] overflow-y-scroll border-[4px] border-[#32aeb1] rounded-xl bg-gray-50 dark:bg-gray-800">
                                <h2 className='py-4 px-2 text-2xl text-gray-800 font-semibold'>Categories</h2>
                                <ul className="space-y-2">
                                    <li>
                                        <button onClick={() => setFirstIsHide(!firstIsHide)} type="button" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                            <span className="flex-1 ml-3 text-left whitespace-nowrap" >Medicine</span>
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                        <ul className={` ${firstIsHide ? `block` : `hidden`} py-2 space-y-2`}>
                                            {
                                                categoryArr.map((obj) => {
                                                    if (obj.category === "medicine") {
                                                        return (
                                                            <Link to={`/list/${obj.cate_id}`} key={obj.cate_id}>
                                                                <li className='flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700' >
                                                                    {obj.sub_cate_name.charAt(0).toUpperCase() + obj.sub_cate_name.substring(1)}
                                                                </li>
                                                            </Link>
                                                        )
                                                    }
                                                })
                                            }


                                        </ul>
                                    </li>
                                    <li>
                                        <button onClick={() => setSecondIsHide(!secondIsHide)} type="button" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                            <span className="flex-1 ml-3 text-left whitespace-nowrap" >Beauty</span>
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                        <ul className={` ${secondIsHide ? `block` : `hidden`} py-2 space-y-2`}>
                                            {
                                                categoryArr.map((obj) => {
                                                    if (obj.category === "beauty") {
                                                        return (
                                                            <Link to={`/list/${obj.cate_id}`} key={obj.cate_id}>
                                                                <li className='flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700' >
                                                                    {obj.sub_cate_name.charAt(0).toUpperCase() + obj.sub_cate_name.substring(1)}
                                                                </li>
                                                            </Link>
                                                        )
                                                    }
                                                })
                                            }


                                        </ul>
                                    </li>
                                    <li>
                                        <Link >
                                            <button type="button" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                                <span className="flex-1 ml-3 text-left whitespace-nowrap" >Wellness</span>
                                            </button>
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </aside>
                        <aside className="w-64 mt-5" aria-label="Sidebar">
                            <div className="px-3 py-4 h-[400px] overflow-y-scroll border-[4px] border-[#32aeb1] rounded-xl bg-gray-50 dark:bg-gray-800">
                                <h2 className='py-4 px-2 text-2xl text-gray-800 font-semibold'>filters</h2>
                                <form>
                                    <div className="flex items-center mt-3">
                                        <input id="green-radio" type="radio"
                                            value="option1" name="options"
                                            // checked={selectedOption === 'option1'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="green-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 - 1500</label>
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <input id="green-radio" type="radio"
                                            value="option2" name="options"
                                            // checked={selectedOption === 'option1'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="green-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 - 500</label>
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <input id="green-radio" type="radio"
                                            value="option3" name="options"
                                            // checked={selectedOption === 'option2'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="green-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">0 - 1000</label>
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <input id="green-radio" type="radio"
                                            value="option4" name="options"
                                            // checked={selectedOption === 'option3'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="green-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">500 - 1000</label>
                                    </div>
                                    <div className="mb-4 flex items-center mt-3">
                                        <input id="green-radio" type="radio"
                                            value="option5" name="options"
                                            // checked={selectedOption === 'option4'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="green-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1000 - 1500</label>
                                    </div>
                                    <hr></hr>
                                </form>
                                <h2 className='py-2 px-2 text-xl text-gray-800 font-semibold'>Cost</h2>
                                <button onClick={() => setSortItem(true)} className="mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-[#32aeb1]  dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md ">
                                        High to Low
                                    </span>
                                </button>
                                <button onClick={() => setSortItem(false)} className="mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-[#32aeb1] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Low to High
                                    </span>
                                </button>


                            </div>
                        </aside>

                    </div>
                    {/* listing items here  */}
                    <div>
                        <div>
                            <h2 className="text-4xl my-5 font-extrabold dark:text-white">{listOfItem.category}</h2>

                            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
                                {renderAllItem(listOfItem)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListDisplay

