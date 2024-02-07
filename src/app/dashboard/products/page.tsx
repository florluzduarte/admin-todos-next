import { ProductCard } from "@/components";
import { products } from "@/data/productsData";

export const metadata = {
  title: "Products",
  description: "A page full of products",
};

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
