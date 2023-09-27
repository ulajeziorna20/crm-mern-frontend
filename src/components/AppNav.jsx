import { Link, useNavigate } from "react-router-dom"
import "./AppNav.css";

const AppNav = (props) => {

    const navigate = useNavigate();

    return (
        <nav className="mainNav">
            <ul>
                <li id="logo">
                    {props.token ? <Link to="/customer/">📆CMR</Link> : <Link to="/login">📆CMR</Link>}
                </li>
                <li>
                    {props.token && <Link to="/customer/add">Dodaj Klienta</Link>}
                </li>
                <li>
                    {props.token && <Link to="/signup">Dodaj Użytkownika</Link>}
                </li>
                <li>
                    {props.token && <Link onClick={()=>{
                        localStorage.removeItem('jwt');
                        navigate('/login');
                        window.location.reload();
                        }}>Wyloguj</Link>}
                </li>
            </ul>
        </nav>
    )
}

export default AppNav;