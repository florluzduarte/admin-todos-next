import { ItemCard, WidgetItem } from "@/components";
import { products, type Product } from "@/data/productsData";
import { cookies } from "next/headers";

export const metadata = {
  title: "Shopping Cart",
  description: "Carrito de Compras",
};

interface ProductsInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }) => {
  const productsInCart: ProductsInCart[] = [];

  for (const id of Object.keys(cart)) {
    const productSelected = products.find((product) => product.id === id);
    if (productSelected) {
      productsInCart.push({ product: productSelected, quantity: cart[id] });
    }
  }

  return productsInCart;
};

export default function CartPage() {
  const cookieStrore = cookies();
  const cart = JSON.parse(cookieStrore.get("cart")?.value ?? "{}") as {
    [id: string]: number;
  };
  const productsInCart = getProductsInCart(cart);

  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  );

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Productos en el carrito</h1>
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          {productsInCart.map((product) => (
            <ItemCard key={product.product.id} {...product} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full mt-4">
        <WidgetItem title="Total a pagar">
          <div>
            <div>
              <h3 className="text-xl font-bold text-gray-700 text-center">
                $ {(totalToPay * 1.15).toFixed(2)}
              </h3>
            </div>
            <span>Impuestos del 15%: {(totalToPay * 0.15).toFixed(2)}</span>
          </div>
        </WidgetItem>
      </div>
    </div>
  );
}
