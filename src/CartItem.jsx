import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const itemTotal = (item) => item.cost * item.quantity;
  const totalAmount = items.reduce((sum, item) => sum + itemTotal(item), 0);

  return (
    <div className="cart-container">
      <h2 className="cart-total">Total Cart Amount: ${totalAmount}</h2>

      {items.length === 0 && <p className="cart-empty">Your cart is empty.</p>}

      {items.map((item) => (
        <div className="cart-item" key={item.name}>
          <img className="cart-item-image" src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">Unit price: ${item.cost}</div>
            <div className="cart-item-quantity">
              <button
                className="cart-item-button"
                aria-label={`Decrease ${item.name} quantity`}
                onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))}
              >
                -
              </button>
              <span className="cart-item-quantity-value">{item.quantity}</span>
              <button
                className="cart-item-button"
                aria-label={`Increase ${item.name} quantity`}
                onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}
              >
                +
              </button>
            </div>
            <div className="cart-item-total">Total: ${itemTotal(item)}</div>
            <button className="cart-item-delete" onClick={() => dispatch(removeItem(item.name))}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="get-started-button1" onClick={() => alert('Checkout: Coming Soon!')}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
