import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs,customerInputs, couponInputs } from "./formSource";
import "./style/dark.scss";
import List2 from "./pages/list2/List2";
import SignUp from "./pages/signup/SignUp";
import List3 from "./pages/list3/List3";

import Message from "./pages/message/Message";
import PromoCode from "./pages/promoCode/PromoCode";
import NewCoupon from "./pages/newCoupon/NewCoupon";
import Profile from "./pages/profile/Profile";
import Analytics from "./pages/analytics/Analytics";




function App() {
  

  return (
    <div className={"app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            
            <Route path="taxi">
              <Route index element={<List />} />
              <Route path=":taxiId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Taxi" />}
              />
            </Route>

            <Route path="bus">
              <Route index element={<List2 />} />
              <Route path=":busId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Bus" />}
              />
            </Route>

            <Route path="customers">
              <Route index element={<List3 />} />
              <Route path=":customerId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={customerInputs} title="customers" />}
              />
            </Route>
            
            

            <Route path="message">
              <Route index element={<Message />} />
            </Route>

            <Route path="promoCode">
              <Route index element={<PromoCode />} />
              <Route
                path="newCoupon"
                element={<NewCoupon inputs={couponInputs} title="coupon"/>}
              />
            </Route>

            <Route path="Analytics" element={<Analytics />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="signup" element={<SignUp />} />
            
            
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
