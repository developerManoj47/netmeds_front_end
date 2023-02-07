import React from 'react'
import { Link } from 'react-router-dom'
import WeatherApp from './WeatherApp'



const SaveUpTo = () => {


    return (
        <div className=''>
            <div className='container mx-auto'>
                <div className='flex flex-col md:flex-row mt-7 gap-2'>
                    <div className=' flex flex-col sm:flex-row gap-2 sm:gap-6 '>
                        <div className=''>
                            <Link to={`/list/m1`} className="flex  items-center justify-between p-1 sm:p-2 md:p-4  bg-white border rounded-lg shadow-xl md:flex-row md:max-w-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className='flex gap-3'>
                                    <img className="object-cover mt-2 h-14 w-20 sm:h-20 sm:w-30 rounded-t-lg  md:h-auto md:w-32ś md:rounded-none md:rounded-l-lg" src="https://www.netmeds.com/assets/gloryweb/images/icons/Wellnessnew.svg" alt="" />
                                    <div className="flex flex-col justify-between p-2 leading-normal">
                                        <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Medicine</h5>
                                        <p className="mb-3  text-green-500 font-bold dark:text-gray-400">Save Upto 25% off</p>
                                    </div>
                                </div>
                                <img src="https://www.netmeds.com/assets/version1672831684/gloryweb/images/icons/expand_more.svg" className=" hidden xl:block  sm:h-7 sm:w-14" alt="Flowbite Logo" />
                            </Link>
                        </div>
                        <div>
                            <Link to={`/list/w1`} className="flex  items-center justify-between p-1 sm:p-2 md:p-4  bg-white border rounded-lg shadow-xl md:flex-row md:max-w-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className='flex gap-3'>
                                    <img className="object-cover mt-2 h-12 w-20 sm:h-20 sm:w-30 rounded-t-lg  md:h-auto md:w-32ś md:rounded-none md:rounded-l-lg" src="https://www.netmeds.com/assets/gloryweb/images/icons/ordermedicinnew.svg" alt="" />
                                    <div className="flex flex-col justify-between p-2 leading-normal">
                                        <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Walless</h5>
                                        <p className="mb-3 text-green-500 font-bold dark:text-gray-400">Save Upto 70% off</p>
                                    </div>
                                </div>
                                <img src="https://www.netmeds.com/assets/version1672831684/gloryweb/images/icons/expand_more.svg" className="hidden xl:block  sm:h-7 sm:w-14" alt="Flowbite Logo" />
                            </Link>
                        </div>
                    </div>
                    <div className='w-[300px] sm:w-[300px] md:w-[400px]'>
                        <WeatherApp />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>

                    <div className=" flex justify-between mt-5 w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className='flex flex-col justify-between'>
                            <div>
                                <a href="/#">
                                    <h5 className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Previous Orders</h5>
                                </a>
                                <p className="mb-3 text-green-500 font-bold dark:text-gray-400">Your previously ordered products</p>
                            </div>
                            <Link to="/vieworders" className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 text-sm font-medium text-center text-white bg-[#32aeb1] rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                             View orders
                                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </Link>
                        </div>
                        <div>
                            <img className="object-cover w-full rounded-t-lg  md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://www.netmeds.com/assets/gloryweb/images/icons/new-icons/previous_orders.svg" alt="" />
                        </div>
                    </div>
                    <div className=" flex justify-between mt-5 w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className='flex flex-col justify-between'>
                            <div>
                                <a href="/#">
                                    <h5 className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Beauty Products</h5>
                                </a>
                                <p className="mb-3 text-green-500 font-bold dark:text-gray-400">Save Upto 70% off</p>
                            </div>
                            <Link to={`/list/b1`} className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 text-sm font-medium text-center text-white bg-[#32aeb1] rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Explore Beauty
                                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </Link>
                        </div>
                        <div>
                            <img className="object-cover w-full rounded-t-lg  md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://www.netmeds.com/assets/gloryweb/images/icons/Beautynew.svg" alt="" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SaveUpTo
