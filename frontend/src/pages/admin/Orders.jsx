import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useProductStore } from "../../data/products.js";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <AdminNavbar />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Product Management</h1>
          <button className="btn btn-purple" onClick={handleAddNew}>
            Add New Product
          </button>
        </div>

        {showForm ? (
          <div className="card mb-4">
            <div className="card-header bg-purple text-white">
              <h5 className="mb-0">
                {currentProduct._id ? "Edit Product" : "Add New Product"}
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSave}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={currentProduct.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="category"
                      value={currentProduct.category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={currentProduct.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="price" className="form-label">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      id="price"
                      name="price"
                      value={currentProduct.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inventory" className="form-label">
                      Inventory
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inventory"
                      name="inventory"
                      value={currentProduct.inventory}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="image" className="form-label">
                      Product Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={handlePhotoUpload}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="featured"
                    name="featured"
                    checked={currentProduct.featured}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="featured">
                    Featured Product
                  </label>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-purple">
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <div className="card mb-4">
              <div className="card-body">
                <div className="input-group">
                  <span className="input-group-text bg-purple text-white">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search products by name..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header bg-purple text-white">
                <h5 className="mb-0">Product Inventory</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Inventory</th>
                        <th>Featured</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map((product) => (
                        <tr key={product._id}>
                          <td>{product._id}</td>
                          <td>
                            <img
                              src={`${BACKEND_URL}/${product.image}`}
                              alt={product.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                              className="rounded"
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td>${product.price.toFixed(2)}</td>
                          <td>
                            <span
                              className={
                                product.inventory < 10 ? "text-danger" : ""
                              }
                            >
                              {product.inventory}
                            </span>
                          </td>
                          <td>
                            {product.featured ? (
                              <span className="badge bg-success">Yes</span>
                            ) : (
                              <span className="badge bg-secondary">No</span>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-dark me-2"
                              onClick={() => handleEdit(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(product._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
