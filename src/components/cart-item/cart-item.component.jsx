import { CartItemContainer, CartItemImageContainer, ItemDetails, CartItemName } from "./cart-item.styles";

const CartItem = ({cartItem}) => {
    const { name, quantity, imageUrl, price } = cartItem;
    return(
        <CartItemContainer>
            <CartItemImageContainer src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <CartItemName>{name}</CartItemName>
                <span>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;