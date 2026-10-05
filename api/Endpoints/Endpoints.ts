const endpoints = {
  products: "/products",
  details: (id: number) => `/products/${id}`,
};

export default endpoints;
