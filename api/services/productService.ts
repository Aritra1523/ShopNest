import axiosInstance from "../baseUrl/url";
import endpoints from "../Endpoints/Endpoints";
import type { Product, ProductResponse } from "../../types/product/product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get<ProductResponse>(endpoints.products, {
    params: { limit: 100 },
  });

  return response.data.products;
};
