import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

  const [isUser , setIsUser ] = useState()

  const navigate = useNavigate()
  useEffect(() => {
    // let user = JSON.parse(localStorage.getItem("user"));
    setIsUser(JSON.parse(localStorage.getItem('user')))
  }, [])
  if (isUser === null || isUser === undefined || !isUser) {
    return  navigate('/signin');
  }

  return children
  
}

export default PrivateRoute
