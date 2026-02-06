import "../styles/productCard.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  showActions = { edit: false, delete: false }
}) {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.image || "https://via.placeholder.com/200"}
          alt={product.name}
        />
        {product.featured && (
          <span className="status-badge available">Featured</span>
        )}
      </div>

      <div className="product-details">
        <h4>{product.name}</h4>
        <p className="product-desc">{product.description}</p>

        <div className="product-meta">
          <span className="price">₹{product.price}</span>
          <span>⭐ {product.rating}</span>
        </div>
      </div>

      {(showActions.edit || showActions.delete) && (
        <div className="product-actions">
          {showActions.edit && (
            <button
              className="btn-small btn-secondary"
              onClick={() => onEdit(product.productId)}
            >
              Edit
            </button>
          )}

          {showActions.delete && (
            <button
              className="btn-small btn-secondary"
              onClick={() => onDelete(product.productId)}
            >
              delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
