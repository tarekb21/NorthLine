import React from 'react'
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable3 from '../../components/datatable3/Datatable3';
import "./list3.scss"

const List3 = () => {
  return (
    <div className="list3">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable3/>
        
      </div>
    </div>
  )
}

export default List3;