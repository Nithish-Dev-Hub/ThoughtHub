import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    return (
        <div>
            <AppHeader />
            <ToastContainer />
            <Outlet></Outlet>
        </div>
    )
};

export default Home;