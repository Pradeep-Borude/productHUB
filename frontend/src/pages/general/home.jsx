import { useEffect, useState } from "react";
import "../../styles/home.css";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ProductCard from '../../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    price_lt: "",
    rating_gt: "",
    company: "",
    featured: false,
  });

  // Fetch products with optional filters
  const fetchProducts = async () => {
    try {
      let query = [];

      if (filters.price_lt) query.push(`price_lt=${filters.price_lt}`);
      if (filters.rating_gt) query.push(`rating_gt=${filters.rating_gt}`);
      if (filters.company) query.push(`company=${filters.company}`);
      if (filters.featured) query.push(`featured=true`);

      const queryString = query.length ? "?" + query.join("&") : "";

      const response = await axios.get(
        `http://localhost:3000/api/products${queryString}`,
        { withCredentials: true }
      );
      setProducts(response.data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <Navbar />
    <div className="home-container">
      <div className="main-content">
        {/* Filter Sidebar designing pending*/}
        <aside className="filter-sidebar">
          <h3>Filter Products</h3>

          <div className="filter-group">
            <label>Max Price</label>
            <input
              type="number"
              name="price_lt"
              value={filters.price_lt}
              onChange={handleInputChange}
              placeholder="Enter max price"
              min="0"
            />
          </div>

          <div className="filter-group">
            <label>Min Rating</label>
            <input
              type="number"
              name="rating_gt"
              value={filters.rating_gt}
              onChange={handleInputChange}
              placeholder="Enter minimum rating"
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          <div className="filter-group">
            <label>Company</label>
            <select
              name="company"
              value={filters.company}
              onChange={handleInputChange}
            >
              <option value="">All Companies</option>
              <option value="samsung">Samsung</option>
              <option value="apple">Apple</option>
              <option value="xiaomi">Xiaomi</option>
            </select>
          </div>

          <div className="filter-group checkbox">
            <label>
              <input
                type="checkbox"
                name="featured"
                checked={filters.featured}
                onChange={handleInputChange}
              />
              Featured Only
            </label>
          </div>

          <button onClick={fetchProducts} className="apply-filter-btn">
            Apply Filters
          </button>
        </aside>

        {/* Products Grid */}
         <section className="products-section">
        
            {products.length === 0 ? (
          <div className="no-products">
            <p>No products yet.</p>
            
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={(p) => navigate(`/products/edit/${p.productId}`)}
                onDelete={(p) => deleteProduct(p.productId)}
                showActions={{ edit: false, delete: false }}
              />
            ))}
          </div>
        )}
        
                
              </section>
      </div>
    </div>
    </>
  );
}
