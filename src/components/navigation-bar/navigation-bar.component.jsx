import { Link } from "react-router-dom";
import {ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import './navigation-bar.styles.scss';
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";


const NavigationBar = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);


    return(
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo className="logo" />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>Shop</Link>
                <CartIcon />
                {
                    currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>Sign Out</span>
                    ): (
                        <Link className="nav-link" to='/auth'>Sign In</Link>
                    )
                }
                
            </div>
            {isCartOpen && <CartDropdown />}
        </div>        
    )
}

export default NavigationBar;