import { Routes, Route } from "react-router-dom";
import Landing from "./views/landing/Landing";
import Home from "./views/home/Home";
import Form from "./views/create/Create";
import Detail from "./views/detail/Detail";


function App() {
  return (
    <div>
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
