import '../../styles/addItem.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function AddItem() {
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAdding(true);

    const productId = event.target.productId.value;
    const name = event.target.name.value;
    const description = event.target.description.value;
    const company = event.target.company.value;
    const rating = event.target.rating.value;
    const featured = event.target.featured.checked;
    const file = event.target.file.files[0];
    const price = event.target.price.value;

    if (!productId || !name || !description || !company || !rating || !file || !price) {
      alert('Please fill all required fields and upload an image.');
      setAdding(false);
      return;
    }

    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('company', company);
    formData.append('rating', rating);
    formData.append('featured', featured); 
    formData.append('file', file);
    formData.append('price', price);

    try {
      const response = await axios.post('http://localhost:3000/api/products/add', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(response.data.message || 'Product added successfully!');
      navigate('/user/profile');
    } catch (error) {
      console.error(error);
      alert('Failed to add product. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="add-item-container">
      <div className="add-item-form-wrapper">
        <h2>Add New Product</h2>

        <form className="add-item-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productId">Product ID *</label>
            <input type="text" id="productId" name="productId" placeholder="Enter unique product ID" required disabled={adding} />
          </div>

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
            <label htmlFor="file">Upload Image *</label>
            <div className="file-upload-area">
              <input type="file" id="file" name="file" accept="image/*" required disabled={adding} />
              <div className="upload-placeholder">
                <p>Click to upload image</p>
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
              {adding ? 'Adding...' : 'Add Product'}
            </button>
            <button type="reset" className="btn-cancel" disabled={adding}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
