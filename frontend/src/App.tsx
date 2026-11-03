import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/user/Register"
import { Provider } from "react-redux"
import store from "./store/store"
import Login from "./pages/user/Login"
import ForgotPassword from "./pages/user/ForgotPassword"
import Home from "./pages/home/Home"
import Product from "./pages/product/Product"
import Singleproduct from "./pages/Single-product/SingleProduct"
import MyCart from "./pages/cart/MyCart"
import Checkout from "./pages/checkout/Checkout"
import MyOrder from "./pages/my-orders/MyOrder"
import MyOrderDetail from "./pages/my-orders-details/MyOrderDetails"
import AdminStats from "./pages/admin/stats/AdminStats"
import Categories from "./pages/admin/categories/Categories"
import User from "./pages/admin/users/Users"
import AdminProduct from './pages/admin/products/Product'
import ProductDescription from './pages/admin/productDescription/ProductDescription'
import AdminOrder from "./pages/admin/orders/AdminOrder"
import AdminOrderDetail from "./pages/admin/order-details/AdminOrderDetails"
import AdminRoute from "./globals/components/AdminRoute"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<Singleproduct />} />
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/my-checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrder />} />
          <Route path="/my-orders/:id" element={<MyOrderDetail />} />
          <Route element={<AdminRoute />}>
            <Route path='/admin' element={<AdminStats />} />
            <Route path='/admin/categories' element={<Categories />} />
            <Route path='/admin/users' element={<User />} />
            <Route path='/admin/products' element={<AdminProduct />} />
            <Route path='/admin/products/:id' element={<ProductDescription />} />
            <Route path='/admin/orders' element={<AdminOrder />} />
            <Route path='/admin/orders/:id' element={<AdminOrderDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
