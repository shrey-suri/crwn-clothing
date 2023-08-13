import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.route";
import Navigation from "./routes/navigation/navigation.route";
import Authentication from "./routes/authetication/authentication.route";
import Shop from "./routes/shop/shop.route";
import Checkout from "./routes/checkout/checkout.route";
import { useDispatch } from "react-redux";
import { createUserDocumentFromAuth, onAuthStateChangedListerner } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useEffect } from "react";

function App() {

  const dispatch = useDispatch();

    useEffect(() => {
        const unsubsribe =  onAuthStateChangedListerner((user) => {
          if(user){
              createUserDocumentFromAuth(user);
          }
          dispatch(setCurrentUser(user));
        });
  
        return unsubsribe;
      },[
        //Not necessary to add - Adding just to remove React Warning
        dispatch
      ]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
