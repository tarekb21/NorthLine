import "./table.scss";
import * as React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popup from "../Popup";
import { useState } from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';




const List = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
    const rows = [
        {
          id: 1143155,
          customer: "John Smith",
          date: "1 March",
          amount: 785,
          method: "Cash on Delivery",
          status: "Approved",
        },
        {
          id: 2235235,
          customer: "Michael Doe",
          date: "1 March",
          amount: 900,
          method: "Online Payment",
          status: "Pending",
        },
        {
          id: 2342353,
          customer: "John Smith",
          date: "1 March",
          amount: 35,
          method: "Cash on Delivery",
          status: "Pending",
        },
        {
          id: 2357741,
          customer: "Jane Smith",
          date: "1 March",
          amount: 920,
          method: "Online Payment",
          status: "Approved",
        },
        {
          id: 2342355,
          customer: "Harold Carol",
          date: "1 March",
          amount: 2000,
          method: "Online Payment",
          status: "Pending",
          
        },
      ];
    const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
        },
      ];
      const [value, setValue] = React.useState(4);
    return ( 
        <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellAction">
                  <div className="viewButton">
                    <div onClick={() => setButtonPopup(true)}>view</div>
                  </div>
                </div>
                    <Popup className="Popup" trigger={buttonPopup} setTrigger={setButtonPopup} >
                    
                      <img className="PopupImage" style={{justifyContent:'center', alignItems:'center'}} src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_BSXPlBjoBeJruSaCamv7kQuMNjoIIWX0CITXUVoapFCbRM9g"
                             width="200" height="250" 
                      >
                      </img>
                      

                      <h1>Jhon Smith</h1>
                      <Typography component="legend">Ratings:</Typography>
                      <Rating name="read-only" value={value} readOnly />
                           <br></br>
                           <Box
                            component="form"
                            sx={{'& .MuiTextField-root': { m: 1, width: '65ch' },}}
                            noValidate
                            autoComplete="off"
                           >
                             <TextField
                              id="standard-read-only-input"
                              label="Description"
                              defaultValue="I had a great time using NorthLine and I am really excited to use it again"
                              InputProps={{readOnly: true,}}
                              variant="standard"
                            />
                      </Box>
                    </Popup>
                    
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
                    
};
 
export default List;