import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ViewOrder = () => {

  const [orderedItems, setOrderedItems] = useState([]);

  let user = JSON.parse(localStorage.getItem('user'));

  // fatching the order data 
  useEffect(() => {
    const foo = async () => {
      try {
        let res = await axios.get(`http://localhost:8000/api/order/${user._id}`);
        let orderList = res.data;
        setOrderedItems(orderList);
      }
      catch (err) {
        console.log(`error while fatching orders `, err);
      }
    }
    foo();
  }, [])

  // render list of previos orders 
  const renderOrderList = (orderList) => {

    if (orderedItems.length > 0) {

      return (
        <div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    OrderId
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total item
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cost
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    BankName
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  orderedItems.map((obj) => {
                    return (
                      <tr key={obj._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {obj.order_id}
                        </th>
                        <td className="px-6 py-4">
                          {obj.total_item}
                        </td>
                        <td className="px-6 py-4">
                          {obj.name}
                        </td>
                        <td className="px-6 py-4">
                          {obj.phone}
                        </td>
                        <td className="px-6 py-4">
                          {obj.email}
                        </td>
                        <td className="px-6 py-4">
                          {obj.total_payment}
                        </td>
                        <td className="px-6 py-4">
                          {obj.delivery_date}
                        </td>
                        <td className="px-6 py-4">
                          {obj.status}
                        </td>
                        <td className="px-6 py-4">
                          {obj.bank_name}
                        </td>
                        
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
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
              <p className="text-lg text-gray-900 dark:text-white">No order placed!</p>
              <div className="mt-3 w-full">

              </div>
            </div>
          </div>

        </div>
      )
    }
  }




  return (
    <div>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 place-items-center'>
          <p className="text-4xl my-3 font-extrabold dark:text-white">Previous Orders</p>
          <div className='w-full max-w-[1400px]'>
            {renderOrderList(orderedItems)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewOrder
