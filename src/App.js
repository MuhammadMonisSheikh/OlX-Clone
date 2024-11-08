
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import Product from './components/product';
import Productssss from './components/productssss';
import BikeProducts from './components/productsssss';
import Footer from "./components/Footer";
import Mobile from './components/mobile';
import Car from './components/car';
import Bike from './components/bikes';
import Signup from './components/signup';
import Signin from './components/signin';
import Cart from './components/cart';
import AddPost from './components/addpost';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/product/:id' element={<Product />}/>
        <Route path='/mobile' element={<Mobile />}/>
        <Route path='/car' element={<Car />}/>
        <Route path='/bike' element={<Bike />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/addpost' element={<AddPost />}/>
        <Route path='/productssss/:id' element={<Productssss />}/>
        <Route path='/productsssss/:id' element={<BikeProducts />}/>
      </Routes>
      <Footer />
      
    </>
  );
}

export default App;
