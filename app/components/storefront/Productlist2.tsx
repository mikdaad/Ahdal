"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "../buildercomponents/home/ProductCard";
import {  Category } from "@prisma/client";

// Define Product Type (Based on Prisma Model)
interface Product {
  id: string;
  name: string;
  description: string;
  originalprice: number;
  discountprice: number;
  images: string[];
  category: Category;
  isFeatured: boolean;
  stars: number;
  reviews: number;
  status: string;
  createdAt: Date;
  ispremium: boolean; // Ensure this is in your Product type
}

// Props Interface for the Component
interface ProductListProps {
  category?: string;
  category1?: string;
  category2?: string;
  category3?: string;
  category4?: string;
  priceRange?: { min: number; max: number };
  ispremium?: string;
}

export default function ProductList({ category1,category2,category3,category4, category , priceRange, ispremium }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true); // Set loading true at the start of fetch

      try {
        // Build query parameters dynamically
        const params = new URLSearchParams();
       
        if (category) {
          params.append('category', category as string);
        }
        if (category1) {
          params.append('category1', category1 as string);
        }
        if (category2) {
          params.append('category2', category2 as string); 
        }
        if (category3) {
          params.append('category3', category3  as string);
        }
        if (category4) {
          params.append('category4', category4 as string);
        }
        if (ispremium !== undefined) { // Use the prop directly
          params.append('ispremium', ispremium as string);
        }

        // Add price range parameters if they exist
        if (priceRange) {
          params.append('minPrice', priceRange.min.toString());
          params.append('maxPrice', priceRange.max.toString());
        }
        console.log("ProductList - Props received:", { category1,category2,category3,category4, category, priceRange, ispremium });

        // Construct the URL safely
        const apiUrl = `/api/products?${params.toString()}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // Log the response status for debugging
          console.error(`Error fetching products: ${response.status} ${response.statusText}`);
          const errorBody = await response.text(); // Read error body if possible
          console.error("Error body:", errorBody);
          throw new Error("Failed to fetch products");
        }

        const res: Product[] = await response.json();

        // Convert Decimal fields to numbers - This seems redundant if API already does it, but safe to keep
        const formattedProducts: Product[] = res.map((product) => ({
          ...product,
          // Ensure the fields exist before trying to convert
          stars: typeof product.stars === 'object' && product.stars !== null && (product.stars as any)?.toNumber ? (product.stars as any).toNumber() : product.stars,
          discountprice: typeof product.discountprice === 'object' && product.discountprice !== null && (product.discountprice as any)?.toNumber ? (product.discountprice as any).toNumber() : product.discountprice,
          // Also format 'price' if it's Decimal and you need it as number
          originalprice: typeof product.originalprice === 'object' && product.originalprice !== null && (product.originalprice as any)?.toNumber ? (product.originalprice as any).toNumber() : product.originalprice,
        }));

        setProducts(formattedProducts); // Set all filtered products

      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Clear products on error
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
    // Add priceRange and ispremium to the dependency array
  }, [category1,category2,category3,category4, category, priceRange, ispremium]);

  return (
    <div className="grid grid-cols-2  lg:grid-cols-4 gap-x-4 gap-y-4">

      {loading ? (
        <div className="flex justify-center items-center ml-60">
          <div className="flex items-center justify-center gap-6 ml-20">
  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-300 to-white animate-ping"> </div>
  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-white to-yellow-300 animate-ping delay-200"></div>
  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-300 to-white animate-ping delay-400"></div>
  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-white to-yellow-300 animate-ping delay-600"></div>
</div>

        </div>
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            className="w-full"
            item={{
              id: product.id,
              name: product.name,
              description: product.description,
              discountprice: product.discountprice,
              images: product.images,
              originalprice: product.originalprice,
              stars: product.stars,
            }}
          />
        ))
      ) : (
        <p className="ml-[50%] text-white">No products found.</p>
      )}


    </div>

  );
}