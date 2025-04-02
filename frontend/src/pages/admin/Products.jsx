import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { useProductStore } from "../../data/products.js";

const Products = () => {
  const products = useProductStore((state) => state.products);
  const addNewProduct = useProductStore((state) => state.addNewProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const [searchParams] = useSearchParams();
  const productIdParam = searchParams.get("_id");

  const [productList, setProductList] = useState([...products]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    inventory: 0,
    featured: false,
  });

  useEffect(() => {
    if (productIdParam) {
      const product = products.find((p) => p._id === parseInt(productIdParam));
      if (product) {
        setCurrentProduct({ ...product });
        setShowForm(true);
      }
    }
  }, [productIdParam]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === "") {
      setProductList([...products]);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          product.category.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setProductList(filtered);
    }
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCurrentProduct({
      ...currentProduct,
      [e.target.name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!currentProduct._id) {
      try {
        const newProduct = await addNewProduct(currentProduct);
        setProductList([...products], newProduct);
      } catch (error) {
        console.error("Error adding product:", error.message);
      }
    } else {
      try {
        const updatedProduct = await updateProduct(
          currentProduct._id,
          currentProduct
        );
        console.log("Updated product:", updatedProduct);
        const index = products.findIndex((p) => p._id === currentProduct._id);
        if (index !== -1) {
          products[index] = updatedProduct;
          console.log(products)
          setProductList([...products]);
        }
      } catch (error) {
        console.error("Error updating product:", error.message);
      }
    }

    // Reset form
    setShowForm(false);
    setCurrentProduct({
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "",
      inventory: 0,
      featured: false,
    });
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    await deleteProduct(_id);

    const index = products.findIndex((p) => p._id === _id);
    if (index !== -1) {
      products.splice(index, 1);
      setProductList([...products]);
    }
  };

  const handleAddNew = () => {
    setCurrentProduct({
      name: "",
      description: "",
      price: 0,
      image: "https://picsum.photos/id/1/500/500",
      category: "",
      inventory: 0,
      featured: false,
    });
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct({ ...product });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentProduct({
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "",
      inventory: 0,
      featured: false,
    });
  };

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
                {currentProduct._id === 0 ? "Add New Product" : "Edit Product"}
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSave}>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
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
                  <div className="col-md-4 mb-3 mb-md-0">
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
                  <div className="col-md-4 mb-3 mb-md-0">
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
                      Image URL
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      name="image"
                      value={currentProduct.image}
                      onChange={handleInputChange}
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
                    placeholder="Search products by name or category..."
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
                              src={product.image}
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
