import {ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { signOutUser } from "../../utils/firebase/firebase.utils";

//StyleSheet
import {NavigationContainer, NavLinksContainer,  NavLink, LogoContainer} from "./navigation-bar.styles";
import { selectCurrentUser } from '../../store/user/user.selector';
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector';


const NavigationBar = () => {
    const currentUser =  useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);


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