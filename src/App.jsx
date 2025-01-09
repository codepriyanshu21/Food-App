import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Body from './components/Body.jsx';
import './index.css';
import Error from './pages/Error.jsx';
import RestaurantMenu from './components/RestaurantMenu.jsx';
import UserContext from './utils/UserContext.jsx';
import { useEffect, useState } from 'react';
import { Provider } from "react-redux";
import appStore from './utils/appStore.jsx';
import Cart from './components/Cart.jsx';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import PaymentSuccess from './components/PaymentSuccess.jsx';

// Layout Component: Wraps Header and Body
const Layout = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const data = {
      name: ""
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div>
          <Header />
          <div className='mt-[6%]'>
            <Outlet />  {/* Renders the matched route component */}
          </div>
        </div>
        <Footer/>
        <Toaster/>
      </UserContext.Provider>
    </Provider>
  );
};

// Define the routes
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Body />, 
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />
      },
      {
        path:"/cart",
        element:<Cart/>
      },
      {
        path: "/login", // Add login route here
        element: <Login />
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess/>,
      },
    ],
  },
]);

function App() {

  return <RouterProvider router={appRouter} />;
}

export default App;
