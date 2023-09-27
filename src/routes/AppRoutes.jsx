import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Home from "../views/Home";
import Main from "../views/Main";
import Login from "../views/userViews/Login";
import SignUp from "../views/userViews/Signup";

const AppRoutes = (props) => {

    const [errors, setErrors] = useState([]);

    const replaceEl = <Login setToken={props.setToken} errors={errors} setErrors={setErrors} />;

    return (
        <Routes>
            {<Route path="/customer/" element={props.token ? <Home token={props.token} /> : replaceEl} />}
            {<Route path="/customer/add/*" element={props.token ? <Main token={props.token} errors={errors} setErrors={setErrors} /> : replaceEl} />}
            {<Route path="/signup/" element={props.token ? <SignUp token={props.token} errors={errors} setErrors={setErrors} /> : replaceEl} />}

            {!props.token && <Route path="/login/" element={<Login setToken={props.setToken} errors={errors} setErrors={setErrors} />} />}

        </Routes>
    )
}
export default AppRoutes;