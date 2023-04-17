import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";



const Sidebar = () => {
  
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }} >
          <span className="logo">Northline</span>  
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
          <Link to="/" style={{ textDecoration: "none" }}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LISTS</p>
          <Link to="/taxi" style={{ textDecoration: "none" }}>
            <li>
              <LocalTaxiIcon className="icon" />
              <span>taxi driver</span>
            </li>
          </Link>
          <Link to="/bus" style={{ textDecoration: "none" }}>
            <li>
              <DirectionsBusIcon className="icon" />
              <span>bus driver</span>
            </li>
          </Link>
          <Link to='/customers' style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Customers</span>
          </li>
          </Link>

          <Link to='/message' style={{ textDecoration: "none" }} >
          <li>
            <LocalShippingIcon className="icon" />
            <span>Message</span>
          </li>
         </Link>


          <p className="title">SERVICES</p>
          

          <Link to='/PromoCode' style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Promo Code</span>
          </li>
          </Link>


          <p className="title">SERVICE</p>
          <Link to="/Analytics" style={{ textDecoration: "none" }}>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Analytics</span>
          </li>
          </Link>
          


          <p className="title">USER</p>
          
          

          <li>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;