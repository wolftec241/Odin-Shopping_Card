import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import minusIcon from './assets/minus-circle.svg';
import plusIcon from './assets/plus-circle.svg';
import {useCart} from './CartProvider';


function Shop() {
  return (
    <>
      <h1>Shop Page</h1>
      <p className='description'>Browse our products and add them to your cart.</p>
      <ProductList />
    </>
  )
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

function ProductList(){
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();  
  }, []);
  
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return(
    <div>
      <h2>Product List</h2>
      <ul className='product-list'>
        {products.map(product => (
          <li key={product.id}>
            <ProductCard data={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductCard({ data }: { data: Product }){
  const [addedCount, setAddedCount] = useState<number>(0);
  const { addToCart ,removeFromCart, updateQuantity } = useCart();

  const handleAddToCart = () => { 
    if(!data) return;
    if(addedCount < 30){
      setAddedCount(addedCount + 1);
    }

    if(addedCount === 0){
      addToCart({
      id: data.id,
      title: data.title,
      price: data.price,
      image: data.image,
      quantity: 1});
    } 
    else { 
      updateQuantity && updateQuantity(data.id, addedCount + 1);
    }
  }
      

  const handleRemoveFromCart = () => {
    if(!data) return;
    if (addedCount > 0) {
      setAddedCount(addedCount - 1);
    }
    if(addedCount === 1){
      removeFromCart(data.id);
    }
    else {
      updateQuantity && updateQuantity(data.id, addedCount - 1);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) {
      value = 0;
    } else if (value >= 30) {
      value = 30;
    }
    setAddedCount(value);
  }


  return(
    <div className="product-card">
      <div className="product-card-top">
        <div className='product-image'>
          <img src={data.image} alt={data.title} />
        </div>
        <Link to={`/product/${data.id}`} className='product-title'>{data.title}</Link>
      </div>

      <div className='product-card-bottom'>
        <p className='product-price' onClick={handleAddToCart}>{'$' + data.price}</p>
        {addedCount>0 ? (
          <div className='added-to-cart-row'>
            <button className='decrease-product' onClick={handleRemoveFromCart}>
              <img src={minusIcon} alt='Decrease item' />
            </button>
            <input className='added-to-cart-text'
            value={addedCount}
            type='number'
            min={0}
            max={29}
            onChange={handleInputChange}/>
            <button className='increase-product' onClick={handleAddToCart}>
              <img src={plusIcon} alt='Increase item' />
            </button>
          </div>
        ): (
        <button className='product-add-button' onClick={handleAddToCart}>Add to Cart</button>
        )}
      </div>
    </div>
  );
}


export default Shop;