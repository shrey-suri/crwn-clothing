import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.route";
import Navigation from "./routes/navigation/navigation.route";
import Authentication from "./routes/authetication/authentication.route";
import Shop from "./routes/shop/shop.route";
import Checkout from "./routes/checkout/checkout.route";

function App() {
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
