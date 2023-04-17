import React from 'react'
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable2 from '../../components/datatable2/Datatable2';
import "./list2.scss"

const List2 = () => {
  return (
    <div className="list2">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable2/>
        
      </div>
    </div>
  )
}

export default List2;
