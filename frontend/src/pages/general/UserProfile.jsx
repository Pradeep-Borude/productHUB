import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/userProfile.css';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        await fetchUserProfile();
        await fetchMyProducts();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/auth/me', {
        withCredentials: true,
        validateStatus: () => true,
      });

      if (res.data?.success) {
        setUser(res.data.user);
      } else {
        navigate('/user/login');
      }
    } catch (err) {
      console.error('User auth failed:', err);
      navigate('/user/login');
    }
  };

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get(
        'http://localhost:3000/api/products/my-products',
        {
          withCredentials: true,
          validateStatus: () => true,
        }
      );

      console.log('My Products Response:', res.data.products);

      if (Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setProducts([]);
    }
  };

const deleteProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/products/delete/${productId}`,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    if (res.data?.success) {
      setProducts((prev) =>
        prev.filter((p) => p.productId !== productId)
      );
    } else {
      alert(res.data?.message || 'Failed to delete product');
    }
  } catch (err) {
    console.error('Error deleting product:', err);
    alert('Something went wrong');
  }
};


  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout', {
        withCredentials: true,
      });
      navigate('/');
    } catch (err) {
      alert('Logout failed');
    }
  };

  // ================= UI =================
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
<>
<Navbar />

    
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Your Profile</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Profile */}
      {user && (
        <section className="profile-section">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <img
                  src={
                    user.profilePhoto ||
                    'https://i.pinimg.com/736x/36/80/34/3680348b64995e6c2b7f36461e1404ab.jpg'
                  }
                  alt={user.fullName}
                />
              </div>

              <div className="profile-info">
                <h2>{user.fullName}</h2>
                <p>{user.email}</p>
                <p>{user.contact || 'No contact info'}</p>
                <p>{user.address || 'No address provided'}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products */}
      <section className="products-section">
        <div className="products-header">
          <h3>Your Products</h3>
          <button
            className="btn-primary"
            onClick={() => navigate('/products/add')}
          >
            + Add New Product
          </button>
        </div>

        {products.length === 0 ? (
          <div className="no-products">
            <p>No products yet.</p>
            <button
              className="btn-primary"
              onClick={() => navigate('/products/add')}
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="products-grid">
  {products.map((product) => (
    <ProductCard
      key={product._id}
      product={product}
      onEdit={(productId) =>
        navigate(`/products/edit/${productId}`)
      }
      onDelete={(productId) =>
        deleteProduct(productId)
      }
      showActions={{ edit: true, delete: true }}
    />
  ))}
</div>
        )}
      </section>
    </div>

    </>
  );
}
