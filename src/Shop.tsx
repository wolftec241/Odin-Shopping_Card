import { useState, useEffect } from 'react';
import axios from 'axios';


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
  description: string;
  price: number;
  category: string;
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
  return(
    <div className="product-card">
      <div className="product-card-top">
        <div className='product-image'>
          <img src={data.image} alt={data.title} />
        </div>
        <h3 className='product-title'>{data.title}</h3>
      </div>

      <div className='product-card-bottom'>
        <p className='product-price'>{'$' + data.price}</p>
        <button className='product-add-button'>Add to Cart</button>
      </div>
    </div>
  );
}


export default Shop;