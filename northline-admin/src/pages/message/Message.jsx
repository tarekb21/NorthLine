import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./message.scss"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';







const Message = () => {

    const [age, setAge] = React.useState('Message');
    const handleChange = (event) => {
    setAge(event.target.value);
    }
    
    

  return (
    <div className='Message'>
        <Sidebar/>
      <div className="MessageContainer">
        <Navbar/>
        <h1>Message</h1>
        <br/>
            <div className='MessageSelector'>
                <h3>Select Driver</h3>
                
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <InputLabel id="demo-select-small">Select driver</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                            >
                    <MenuItem value={10}>Jhon doe</MenuItem>
                    <MenuItem value={20}>Messi</MenuItem>
                    <MenuItem value={30}>Ronaldo</MenuItem>
                    </Select>
                    </FormControl>
            </div>
            <div className='MessageField'>
                <form>
                    <h3>Message</h3>
                    <div className='textField'>
                    <TextField
                        rows={10}
                        multiline 
                        style={{ width:500, height: 300}}
                        fullWidth
                        />
                      </div>
                </form>
                
            </div>
            <button className='button' >send</button>
            
            
    </div>
    </div>
  )
}

export default Message