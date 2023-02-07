import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Container.css'

const Weather = () => {
    const [weatherData, setWeatherData] = useState();

    useEffect(() => {

        if (navigator.geolocation) {
            // console.log('i am here');
            navigator.geolocation.getCurrentPosition(showPosition)
        } else {
            console.log('geolocation is not supported');
        }

        function showPosition(data) {
            // console.log(data)
            let lat = data.coords.latitude;
            let long = data.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
            // api calling
            fetch(url, { method: 'GET' })
                // return promise
                .then((res) => res.json())
                // resolve promise
                .then((data) => {
                    // console.log(data)
                    let temp = data.list[0].temp.day;
                    setWeatherData(temp);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])



    return (
        <div className=' ' >
            <a href="/#" className=" imageBG flex  items-center justify-between sm:p-4  bg-white border rounded-lg shadow-xl md:flex-row md:max-w-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className='flex justify-center items-center w-[80%]'>
                <div className="flex flex-col justify-between   leading-normal">
                    <h5 className=" text-xl sm:text-4xl font-bold tracking-tight text-white dark:text-white">Weather</h5>
                    <p className="ml-20 mb-3 self-end text-3xl text-white font-bold dark:text-gray-400">{weatherData} °C</p>
                </div>
                </div>
            </a>
        </div>
    );
};

export default Weather;
