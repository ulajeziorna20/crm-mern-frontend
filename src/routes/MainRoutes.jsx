import { Route, Routes } from "react-router-dom";
import AddClient from "../views/clientViews/AddClient";
import EditClient from "../views/clientViews/EditClient";
import SingleClient from "../views/clientViews/SingleClient";
import AddAction from "../views/actionViews/AddAction";


const MainRoutes = (props) => {

    return (
        <Routes>
            <Route path="/" element={<AddClient addClient={props.addClientMtd} errors={props.errors} />} />
            <Route path="/:id" element={<SingleClient clients={props.clients} />} />
            <Route path="/:id/edit" element={<EditClient />} />
            <Route path="/:id/addAction" element={<AddAction />} />
        </Routes>
    )
}
export default MainRoutes;