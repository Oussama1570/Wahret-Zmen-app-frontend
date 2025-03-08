import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddProductMutation } from "../../../redux/features/products/productsApi";
import Swal from "sweetalert2";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageFileName, setImageFileName] = useState("");
  const [addProduct, { isLoading }] = useAddProductMutation();

  // ✅ Handle Form Submission
  const onSubmit = async (data) => {
    const newProductData = { ...data, coverImage: imageFileName };

    try {
      await addProduct(newProductData).unwrap();
      Swal.fire("Success!", "Product added successfully!", "success");
      reset();
      setImageFileName("");
    } catch (error) {
      Swal.fire("Error!", "Failed to add product.", "error");
    }
  };

  // ✅ Handle Image Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFileName(file.name);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800">
      <h2 className="text-2xl font-bold text-center text-[#A67C52] mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 🔹 Product Details */}
        <input {...register("title")} className="w-full p-2 border rounded" placeholder="Product Name" required />
        <textarea {...register("description")} className="w-full p-2 border rounded" placeholder="Description" required />

        {/* 🔹 Category Selection */}
        <select {...register("category")} className="w-full p-2 border rounded" required>
          <option value="">Select Category</option>
          <option value="kaftan">Kaftan</option>
          <option value="jebba">Jebba</option>
          <option value="gandoura">Gandoura</option>
          <option value="safsari">Safsari</option>
          <option value="chachia">Chachia</option>
        </select>

        {/* 🔹 Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <input {...register("oldPrice")} type="number" className="w-full p-2 border rounded" placeholder="Old Price" required />
          <input {...register("newPrice")} type="number" className="w-full p-2 border rounded" placeholder="New Price" required />
        </div>

        {/* 🔹 Trending Checkbox */}
        <label className="flex items-center">
          <input type="checkbox" {...register("trending")} className="mr-2" />
          Trending Product
        </label>

        {/* 🔹 Upload Image */}
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
        {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}

        {/* 🔹 Submit Button */}
        <button type="submit" className="w-full py-2 bg-[#A67C52] text-white rounded-md hover:bg-[#8a5d3b] transition">
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
