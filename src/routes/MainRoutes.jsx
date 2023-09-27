import { Route, Routes } from "react-router-dom";
import AddClient from "../views/clientViews/AddClient";
import EditClient from "../views/clientViews/EditClient";



const MainRoutes = (props) => {

    return (
        <Routes>
            <Route path="/" element={<AddClient addClient={props.addClientMtd} errors={props.errors} />} />
         
            <Route path="/:id/edit" element={<EditClient />} />
            <Route path="/:id/addAction" element={<AddAction />} />
        </Routes>
    )
}
export default MainRoutes;