import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Home from "../views/Home";

import Login from "../views/userViews/Login";

const AppRoutes = (props) => {

    const [errors, setErrors] = useState([]);

    const replaceEl = <Login setToken={props.setToken} errors={errors} setErrors={setErrors}  />;

    return (
        <Routes>
            {<Route path="/customer/" element={props.token ? <Home token={props.token} /> : replaceEl} />} 
       
            {!props.token && <Route path="/login/" element={<Login setToken={props.setToken} errors={errors} setErrors={setErrors}  />} />}
            
        </Routes>
    )
}
export default AppRoutes;