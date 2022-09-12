import { useContext } from 'react';
import { CartContext} from '../../contexts/cart.context';

import { CheckoutItemContainer, ImageContainer, SpanContainers, RemoveButton } from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
    const {imageUrl, name, quantity, price} = cartItem;
    const {addItemToCart, removeItemToCart, deleteItemToCart} = useContext(CartContext);

    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);
    const clearItemHandler = () => deleteItemToCart(cartItem);


    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <SpanContainers>{name}</SpanContainers>
            <SpanContainers className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </SpanContainers>
            <SpanContainers>{price}</SpanContainers>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;