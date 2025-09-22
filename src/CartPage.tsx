import { useCart } from "./CartProvider";

export default function CartPage() {
  const { cartItems: cart, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h1>Cart Page</h1>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} width={50} />
            <p>{item.title} - ${item.price} × {item.quantity} </p>
            <button onClick={() => updateQuantity && updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
            <button onClick={() => updateQuantity && updateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>
        <strong>
          Total: $
          {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
        </strong>
      </p>
      <div>
        <button onClick={clearCart}>Clear Cart</button>
        <button onClick={() => alert("Proceeding to checkout...")}>Checkout</button>
      </div>
    </div>
  );
}