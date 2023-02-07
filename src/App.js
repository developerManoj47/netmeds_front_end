import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Router } from 'react-router-dom';
import Navbar from './pages/navbar/Navbar';
import ParentCompo from './pages/containerComponent/ParentCompo';
import Footer from './pages/Footer';
import AddToCart from './pages/navbar/AddToCart';
import Register from './pages/navbar/Register';
import Login from './pages/navbar/Login';
import UserAccount from './pages/navbar/UserAccount';
import PrivateRoute from './functionalComponent/PrivateRoute';
import ListDisplay from './pages/containerComponent/listning/ListDisplay';
import DisplayDetails from './pages/containerComponent/details/DisplayDetails';
import PlaceOrder from './pages/containerComponent/order/PlaceOrder';
import ViewOrders from './pages/containerComponent/order/ViewOrder'


function App() {
  return (
    <>
      {/* <BrowserRouter>  */}
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<ParentCompo />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
          {/* listning page  */}
          <Route path='/list/:cate_id' element={
            <PrivateRoute>
                <ListDisplay />
            </PrivateRoute>
          } />
          {/* details page  */}
          <Route path='/details/:prod_id' element={
            <PrivateRoute>
                <DisplayDetails />
            </PrivateRoute>
          } />
          {/* Cart page  */}
          <Route path='/cart' element={
            <PrivateRoute>
                <AddToCart />
            </PrivateRoute>
          } />
          {/* place order  */}
          <Route path='/placeorder' element={
            <PrivateRoute>
                <PlaceOrder />
            </PrivateRoute>
          } />
          {/* view orders  */}
          <Route path='/vieworders' element={
            <PrivateRoute>
                <ViewOrders />
            </PrivateRoute>
          } />
         {/* userAccount page  */}
          <Route path='/useraccount' element={
            <PrivateRoute>
                <UserAccount />
            </PrivateRoute>
          } />
        </Routes>
        </Router>
      {/* </BrowserRouter> */}
      <Footer />
    </>
  );
}

export default App;
