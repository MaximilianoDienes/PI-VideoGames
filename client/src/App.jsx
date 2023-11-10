import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Landing from "./views/landing/Landing";
import Home from "./views/home/Home";
import Form from "./views/create/Create";
import Detail from "./views/detail/Detail";


function App() {

  const location = useLocation().pathname;

  const isSlash = (location === "/")

  return (
    <div className="App">
      {isSlash ? null : <Navbar/>}
      <Routes>
      <Route path={"/"} element={<Landing></Landing>}></Route>
      <Route exact path={"/home"} element={<Home></Home>}></Route>
      <Route path={"/home/:id"} element={<Detail></Detail>}></Route>
      <Route path={"/create"} element={<Form></Form>}></Route>
      </Routes>
    </div>
  );
}

export default App;
