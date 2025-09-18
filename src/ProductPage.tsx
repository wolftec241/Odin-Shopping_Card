import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import minusIcon from './assets/minus-circle.svg';
import plusIcon from './assets/plus-circle.svg';

interface Data {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

function ProductPage(){ 
    const { id } = useParams();
    const [product, setProduct] = useState<Data | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [addedCount, setAddedCount] = useState<number>(0);

  const handleAddToCart = () => { 
    if(addedCount < 30){
      setAddedCount(addedCount + 1);
    }
  };

  const handleRemoveFromCart = () => {
    if (addedCount > 0) {
      setAddedCount(addedCount - 1);
    }
  }

    useEffect(() => {
        const fetchProduct = async () => {
            try{
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to fetch product. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();

    }, [id]);
    if (loading) return <p>Loading product...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>No product found.</p>;
    
    return(
        <>
            <Link to="/shop" className="back-to-shop-link">← Back to Shop</Link>
            <div className="product-page-container">
                <div className="product-page-container-left">
                    <div className='product-page-image'>
                        <img src={product.image} alt={product.title} />
                    </div>
                </div>
                <div className="product-page-container-right">
                    <h3 className='product-page-title'>{product.title}</h3>
                    <p className='product-page-description'>{product.description}</p>
                    <p className='product-page-category'><strong>Category:</strong> {product.category}</p>
                    <p className='product-page-price'><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                    {addedCount>0 ? (
                      <div className='added-to-cart-row' style={{justifyContent: 'center'}}>
                        <button className='decrease-product' onClick={handleRemoveFromCart}>
                          <img src={minusIcon} alt='Decrease item' />
                        </button>
                        <input className='added-to-cart-text' value={addedCount}></input>
                        <button className='increase-product' onClick={handleAddToCart}>
                          <img src={plusIcon} alt='Increase item' />
                        </button>
                      </div>
                    ) : (
                        <button className='add-to-cart-button' onClick={handleAddToCart}>Add to Cart</button>
                    )
                    }
                </div>
                
            </div>
        </>
    );
}



export default ProductPage;