import {NavLink} from "react-router-dom";
import './Layout.css';

function Navbar({setSearchValue}) {

    return (
        <nav>
            <NavLink
                to="/"
                className={({isActive, isPending}) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
            >
                Home
            </NavLink>
            <input className="search-bar" placeholder="search a movie ..."
                   onInput={(e) => setSearchValue(e.target.value)}/>
        </nav>
    );
}

export default Navbar;
