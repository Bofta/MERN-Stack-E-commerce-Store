import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation,
 } from "../../../redux/api/productApiSlice";

 import { useFetchCategoriesQuery } from "../../../redux/api/categoryApiSlice";
 import { toast } from "react-toastify";

 


const ProductUpdate = () => {
  return (
    <div>
      
    </div>
  )
}

export default ProductUpdate
