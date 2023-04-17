import React, { useState } from 'react'
import "./coupon.scss"

import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";

const columns = [
  { field: 'name', headerName: 'Name', width: 100 },
  { field: 'code', headerName: 'Code', width: 130 },
  { field: 'discount', headerName: 'Discount(USD)', width: 130 },
  {
    field: 'duration',
    headerName: 'Duration',
    
    width: 90,
  },
  
];

const rows = [
  { id: 1, name: 'BlackFriday', code: 'BFriday', discount: 10,duration: 'Single Use', },
  { id: 2, name: 'BlueMonday', code: 'BMonday', discount: 5,duration: 'Single use', },
  { id: 3, name: 'GreenTuesday', code: 'GTuesday', discount: 2,duration: 'Unlimited', },
  { id: 4, name: 'PurpleWednesday', code: 'PWednesday', discount: 20,duration: 'Unlimited', },
  { id: 5, name: 'OrangeThursday', code: 'OThursday', discount: 3,duration: 'Unlimited', },
  
];



const Coupon = () => {
  
  const[coupon, setCoupon] = useState();
  const [addData, setAddData] = useState({
    name:'',
    code:'',
    discount:'',
    duration:'',
    
  })
    return (
      <div className='Coupon'>
      <div className="PromoContainer">
          
          <h1>Promo Code</h1>
          <Link to="/PromoCode/NewCoupon" className="link">
                Add New
          </Link>
          </div>
          <br/>
          <h2>Redeemable coupons</h2>
          <div style={{ height: 400, width: '50%' }}>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            />
          </div>
          <br/>
          <h2>Expired Coupons</h2>
          <div style={{ height: 400, width: '50%' }}>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            />
          </div>
          
      
      </div>
    )
  }

export default Coupon