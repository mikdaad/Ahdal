import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "../components/storefront/ProductList";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = searchParams.toString();
      const response = await fetch(`/api/products?${queryParams}`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold">Search Results</h2>
      <ProductList products={products} />
    </div>
  );
};

export default ProductsPage;
