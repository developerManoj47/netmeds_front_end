import React, { useState, useEffect } from 'react'
import Slider from './Slider'
import SaveUpTo from './SaveUpTo'
import HomeMedicine from './HomeMedicine'
import axios from 'axios';

const ParentCompo = () => {

  const [ randomMedicine , setRandomMedicine ] = useState([]);
  const [ randomBeauty , setRandomBeauty ] = useState([]);

  
    // fatching the random data for home page of medicine and beauty both 
    useEffect(() => {
      const foo = async () => {
          try {
              const medicineRes = await axios.get(`https://api-netmeds-in.onrender.com/api/list/m1?category=medicine`);
              const medicineData = medicineRes.data;
              setRandomMedicine(medicineData);
              const res = await axios.get(`https://api-netmeds-in.onrender.com/api/list/b1?category=beauty`);
              const beautyData = res.data;
              setRandomBeauty(beautyData);
              // console.log(searchList)
          } catch (err) {
              console.error('Error retrieving medicine data: ', err);
          }
      }
      foo();
  }, [])

  return (
    <div className='mx-2 sm:mx-0'>
      <Slider />
      <SaveUpTo />
      <HomeMedicine medicineData={randomMedicine} beautyData={randomBeauty} />
    </div>
  )
}


export default ParentCompo
