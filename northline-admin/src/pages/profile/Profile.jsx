
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'


import "./profile.scss"


const Profile = () => {
  
   
  return (
    <div className='Profile'>
        <Sidebar/>
        <div className='ProfileContainer'>
          <Navbar/>
        </div>
       
      </div>
    
  )
}



export default Profile;