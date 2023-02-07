import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css'




const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [searchList, setSearchList] = useState([])
    const [categoryArr, setCategoryArr] = useState([]);

    const [inputValue, setInputValue] = useState('')
    const [isFocused, setIsFocused] = useState(false);
    const [isSecondFocused, setIsSecondFocused] = useState(false);

    const navigate = useNavigate();

    let user = JSON.parse(localStorage.getItem("user"));
    // hamburger funciton 
    const handleClick = () => {
        setShowMenu(!showMenu)
    }

    // search bar item fatching 

    // list fatch from database 
    useEffect(() => {
        const getSearchList = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/list');
                const listData = res.data;
                setSearchList(listData);
                // console.log(searchList)
            } catch (err) {
                console.error('Error retrieving data: ', err);
            }
        };
        getSearchList();

    }, []);

    // render search List 
    const renderSearchList = (listData) => {
        // console.log(listData)
        if (listData) {
            // console.log(Array.isArray(listData))
            return listData.map((obj) => {
                if (obj.prod_name.includes(inputValue)) {
                    let productName = obj.prod_name.replaceAll('_', ' ')
                    productName = productName.charAt(0).toUpperCase() + productName.substring(1)
                    return (
                        <>
                            <p key={obj.prod_id}><Link to={`/details/${obj.prod_id}`}  className="text-sm text-gray-900 dark:text-white">{productName}</Link></p>

                        </>
                    )
                }

            })
        }
    }

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


    return (
        <div>

            <nav className="fixed top-0 left-0 z-50 w-full bg-[#32aeb1] border-gray-200 px-2 sm:px-4 sm:py-2.5  dark:bg-gray-900">
                <div className="h-10 sm:h-12 md:h-14 container flex flex-wrap items-center justify-between mx-auto lg:px-20">
                    <Link to="/" className="flex items-center">
                        <img src="https://nms-assets.s3-ap-south-1.amazonaws.com/images/cms/aw_rbslider/slides/1663609483_netmeds-new-logo.svg" className="h-12 w-40 mr-3 sm:h-14 sm:w-48" alt="Flowbite Logo" />
                        {/* <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
                    </Link>
                    <div className="flex md:order-1">
                        {/* <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Search</span>
                        </button> */}

                        {/*  MIDDILE INPUT  */}
                        <div className="relative hidden xl:block ">
                            <div className="absolute inset-y-0  left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onClick={(e) => setIsFocused(!isFocused)}
                                // onFocus={() => setIsFocused(true)}
                                // onBlur={() => setIsFocused(false)}
                                type="text" id="search-navbar"
                                className="hidden xl:block md:w-[200px] lg:w-[300px] xl:w-[400px] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search for Medicine and Wallness..."
                            />
                            {/* dynamic list */}
                            {
                                isFocused &&
                                <div className="absolute top-11  w-full max-w-sm h-48 p-2 divide-y-2  overflow-y-scroll  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                    {renderSearchList(searchList)}
                                </div>
                            }

                        </div>
                        <button onClick={() => handleClick()} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                            <span className="sr-only">Open menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className={` ${showMenu ? `block relative z-50 hamburger mt-5` : `hidden`} block xl:hidden 2xl:block items-center justify-between border-[3px] border-[#32aeb1]  md:border-none  rounded-md mt-3 md:mt-0 w-full md:flex md:w-auto md:order-2 bg-gray-300 md:bg-transparent`} id="navbar-search">
                        <div className="relative  mt-3  md:hidden">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onClick={(e) => setIsSecondFocused(!isSecondFocused)}
                                // onFocus={() => setIsSecondFocused(true)}
                                // onBlur={() => setIsSecondFocused(false)}
                                type="text" id="responsivesearch-navbar"
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search for Medicine and Wallness..."
                            />
                            {/* dynamic list  */}
                            {
                                isSecondFocused &&
                                <div className="absolute top-11  z-50 w-full  h-48 p-2 divide-y-2  overflow-y-scroll  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                    {renderSearchList(searchList)}
                                </div>
                            }
                        </div>
                        <ul className="flex flex-col gap-2 lg:gap-1 xl:gap-3 md:gap-0 p-4 mt-4   md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li className='flex flex-wrap justify-center items-center gap-4 sm:gap-0 bg-gray-400 hover:bg-[#32aeb1] rounded-xl md:rounded-none md:bg-transparent opacity-75'>
                                <img src="https://www.netmeds.com/assets/gloryweb/images/icons/upload_rx.svg" className="  sm:h-7 sm:w-14" alt="Flowbite Logo" />
                                <a href="/#" className="block py-2  pr-4 text-white  rounded md:bg-transparent  md:p-0 dark:text-white" aria-current="page" aria-disabled>Uploads</a>
                            </li>
                            <li className='flex  flex-wrap justify-center items-center gap-4 sm:gap-0 bg-gray-400 hover:bg-[#32aeb1] rounded-xl md:rounded-none md:bg-transparent'>
                                <div className='relative'>
                                    <span className='w-6 h-4 p-2 absolute -top-[2px] md:-top-2 left-[16px] sm:left md:left-6 rounded-2xl bg-pink-600 flex justify-center items-center'>
                                        <img src='https://cdn-icons-png.flaticon.com/512/545/545682.png' />
                                    </span>
                                    <div className=' flex gap-4 sm:gap-0'>
                                        <img src="https://www.netmeds.com/assets/gloryweb/images/icons/cart_icon.svg" className="  sm:h-7 sm:w-14" alt="Flowbite Logo" />
                                        <Link to="/cart" className="block py-2 pr-4 text-white rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Add to Cart</Link>
                                    </div>
                                </div>
                            </li>
                            {
                                !user ? <li className='flex flex-wrap justify-center items-center gap-4 sm:gap-0  bg-gray-400 hover:bg-[#32aeb1] rounded-xl md:rounded-none md:bg-transparent'>
                                    <img src="https://www.netmeds.com/assets/gloryweb/images/icons/profile_icon.svg" className="  sm:h-7 sm:w-14" alt="Flowbite Logo" />
                                    <Link to="/signin" className="block py-2  pr-4 text-white rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">SingIn </Link>
                                    /
                                    <Link to="/signup" className="block py-2  pr-4 text-white rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">  SignUp</Link>
                                </li>
                                    :
                                    <div onClick={() => navigate('/useraccount')} className="flex items-center space-x-4 bg-[#32aeb1] md:bg-transparent p-2 md:p-0 rounded-xl">
                                        {
                                            !user.profilePic ?
                                                <img className="w-10 h-10 rounded-full" src="https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg" alt="" />
                                                :
                                                <img className="w-10 h-10 rounded-full" src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png" alt="" />

                                        }
                                        {/* <img className="w-10 h-10 rounded-full" src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png" alt="" /> */}
                                        <div className="font-medium text-white dark:text-white">
                                            <div>{user.username}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                            }
                        </ul>
                    </div>
                </div>
            </nav>

            <nav className="mt-[75px] px-2 bg-[#32aeb1] border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                <div className="container flex flex-wrap items-center justify-center mx-auto">
                    <div className="hidden w-full md:w-[800PX] lg:w-[1000px] xl:w-[1200px] md:block" id="navbar-dropdown">
                        <ul className="flex flex-col p-4 mt-4 border  md:flex-row md:justify-evenly md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li
                                className=' flex justify-center items-center relative'
                                onMouseEnter={() => setIsHovered1(true)}
                                onMouseLeave={() => setIsHovered1(false)}
                            >
                                <img src="https://www.netmeds.com/assets/version1672831684/gloryweb/images/icons/medicine.svg" className="  sm:h-7 sm:w-14" alt="Flowbite Logo" />
                                <a href="/#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent  md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Medicien</a>
                                <img src="https://www.netmeds.com/assets/version1672831684/gloryweb/images/icons/white-arrow-drop-down.svg" className="  sm:h-7 sm:w-14" alt="Flowbite Logo" />
                                {isHovered1 && (
                                    <ul className='absolute z-50 top-7 left-24 bg-white p-3 flex flex-col gap-1 rounded-xl w-32'>
                                        {
                                            categoryArr.map((obj) => {
                                                if (obj.category === "medicine") {
                                                    return (
                                                        <Link to={`/list/${obj.cate_id}`} key={obj.cate_id}>
                                                            <li className='p-1 bg-gray-400 text-white hover:bg-gray-500 rounded' >{obj.sub_cate_name.charAt(0).toUpperCase() + obj.sub_cate_name.substring(1)}</li>
                                                        </Link>
                                                    )
                                                }
                                            })
                                        }
                                    </ul>
                                )}
                            </li>
                            <li
                                className=' flex justify-center items-center '
                            >
                                <img src="https://www.netmeds.com/assets/gloryweb/images/icons/wellness.svg" className="  sm:h-7 sm:w-14" alt="Flowbite Logo" />
                                <a href="/#" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Wallness</a>

                            </li>
                            <li
                                className=' flex justify-center items-center relative'
                                onMouseEnter={() => setIsHovered3(true)}
                                onMouseLeave={() => setIsHovered3(false)}
                            >
                                <img src="https://www.netmeds.com/assets/gloryweb/images/icons/beauty.svg" className="  sm:h-7 sm:w-14" alt="Flowbite Logo" />
                                <a href="/#" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Beauty</a>
                                <img src="https://www.netmeds.com/assets/version1672831684/gloryweb/images/icons/white-arrow-drop-down.svg" className="  sm:h-7 sm:w-14" alt="Flowbite Logo" />
                                {isHovered3 && (
                                    <ul className='absolute z-50 top-7 left-24 bg-white p-3 flex flex-col gap-1 rounded-xl w-32'>
                                        {
                                            categoryArr.map((obj) => {
                                                if (obj.category === "beauty") {
                                                    return (
                                                        <Link to={`/list/${obj.cate_id}`} key={obj.cate_id}>
                                                            <li className='p-1 bg-gray-400 text-white hover:bg-gray-500 rounded' >{obj.sub_cate_name.charAt(0).toUpperCase() + obj.sub_cate_name.substring(1)}</li>
                                                        </Link>
                                                    )
                                                }
                                            })
                                        }
                                    </ul>
                                )}
                            </li>
                            <li className=' flex justify-center items-center opacity-75'>
                                <img src="https://www.netmeds.com/assets/gloryweb/images/icons/diagnostics.svg" className="  sm:h-7 sm:w-14" alt="Flowbite Logo" />
                                <a href="/#" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Lab test</a>
                            </li>
                            <li className=' flex justify-center items-center opacity-75'>
                                <img src="https://www.netmeds.com/assets/version1672831684/gloryweb/images/icons/health-library.svg" className="  sm:h-7 sm:w-14" alt="Flowbite Logo" />
                                <a href="/#" className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Health Corner</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>

            </div>

        </div>
    )
}

export default Navbar
