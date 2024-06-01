import React from 'react';
import Hero from "./components/Hero/Hero";
import Navbar from './components/navbar/Navbar';
import BestBook from './components/BestBook/BestBook';
import OrderPopup from './components/OrderPopup/OrderPopup';
import Banner from './components/Banner/Banner';
import AppStoreBanner from './components/appStoreBanner/AppStoreBanner';
import AllBooks from './components/AllBooks/AllBooks';
import Testimonial from './components/Testimonial/Testimonial';
import Footer from './components/Footer/Footer';
import AOS from 'aos'; // Ensure AOS is installed and imported correctly
 // Import AOS CSS for animations
 import "aos/dist/aos.css";

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      easing: 'ease-in-sine',
      duration: 800,
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Navbar handleOrderPopup={handleOrderPopup} />
      <Hero handleOrderPopup={handleOrderPopup} />
      <AllBooks/>
       
      <Banner/>
      <AppStoreBanner/>
      <BestBook/>
      <Testimonial/>
      <Footer/>
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
};

export default App;
