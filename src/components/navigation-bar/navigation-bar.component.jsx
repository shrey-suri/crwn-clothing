import {ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

//StyleSheet
import {NavigationContainer, NavLinksContainer,  NavLink, LogoContainer} from "./navigation-bar.styles";


const NavigationBar = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);


    return(
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className="logo" />
            </LogoContainer>
            <NavLinksContainer>
                <NavLink to='/shop'>Shop</NavLink>
                <CartIcon />
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
                    ): (
                        <NavLink to='/auth'>Sign In</NavLink>
                    )
                }
                
            </NavLinksContainer>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>        
    )
}

export default NavigationBar;