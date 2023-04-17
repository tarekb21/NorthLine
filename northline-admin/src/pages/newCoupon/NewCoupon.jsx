import React from 'react'
import "./newcoupon.scss"
import Navbar from "../../components/navbar/Navbar"
import { useState } from "react";
import Sidebar from '../../components/sidebar/Sidebar';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Single use',
  'Unlimited',
  
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const NewCoupon = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <div className="newC">
      <Sidebar />
      <div className="newCContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
             {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                  
                </div>
                
              ))}

              {/* <div className='select'>
              <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Duration</InputLabel>
              <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
              >
              {names.map((name) => (
              <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
              >
              {name}
              </MenuItem>
              ))}
              </Select>
              </FormControl>
              </div> */}
              
              <button>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default NewCoupon