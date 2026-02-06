import '../../styles/addItem.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function EditItem() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAdding(true);

    const name = event.target.name.value;
    const description = event.target.description.value;
    const company = event.target.company.value;
    const rating = event.target.rating.value;
    const featured = event.target.featured.checked;
    const file = event.target.file.files[0];
    const price = event.target.price.value;

    if (!name || !description || !company || !rating || !price) {
      alert('Please fill all required fields.');
      setAdding(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('company', company);
    formData.append('rating', rating);
    formData.append('featured', featured);
    if (file) formData.append('file', file);
    formData.append('price', price);

    try {
      await axios.put(`http://localhost:3000/api/products/edit/${productId}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      alert('Product updated successfully!');
      navigate('/user/profile');
    } catch (error) {
      console.error(error);
      alert('Failed to update product.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="add-item-container">
      <div className="add-item-form-wrapper">
        <h2>Edit Product</h2>

        {/* Product ID - Read only from URL */}
        <div className="form-group">
          <label>Product ID</label>
          <input type="text" value={productId} disabled className="readonly-field" />
        </div>

        <form className="add-item-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input type="text" id="name" name="name" placeholder="Enter product name" required disabled={adding} />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea id="description" name="description" rows="5" placeholder="Enter product description" required disabled={adding}></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="company">Company *</label>
            <input type="text" id="company" name="company" placeholder="Enter company name" required disabled={adding} />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating *</label>
            <input type="number" id="rating" name="rating" min="0" max="5" step="0.1" placeholder="Enter product rating" required disabled={adding} />
          </div>

          <div className="form-group">
            <label htmlFor="featured">
              <input type="checkbox" id="featured" name="featured" disabled={adding} />
              Featured Product
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="file">Upload Image (Optional)</label>
            <div className="file-upload-area">
              <input type="file" id="file" name="file" accept="image/*" disabled={adding} />
              <div className="upload-placeholder">
                <p>Upload new image (optional)</p>
                <small>PNG, JPG, GIF up to 5MB</small>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input type="number" id="price" name="price" placeholder="Enter product price" required disabled={adding} />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={adding}>
              {adding ? 'Updating...' : 'Update Product'}
            </button>
            <button type="button" className="btn-cancel" onClick={() => navigate('/user/profile')} disabled={adding}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
