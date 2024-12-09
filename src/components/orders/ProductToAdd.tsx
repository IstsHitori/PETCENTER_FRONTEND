import { Product } from "@/types/ProductTypes";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatMoney } from "@/helpers";
import { Button } from "../ui/button";
import wave from "/bg_product.png"
import { useVeterinarieStore } from "@/stores/useVeterinarieStore";
import { Package, ShoppingCart } from "lucide-react";
export default function ProductToAdd({ product }: { product: Product }) {
  const {_id, name, category, price, quantity } = product;

  const setModalDetailsProduct = useVeterinarieStore(
    (state) => state.setModalDetailsProduct
  );
  const setEditingProduct = useVeterinarieStore(
    (state) => state.setEditingProduct
  );

  const handleAddProductToCart = () => {
    alert(_id)
  }
  return (
    <Card className="overflow-hidden max-h-[360px] max-w-[270px]">
      <CardHeader className="p-1">
        <div className="aspect-video h-[150px] relative">
            
          <img src={wave} className=" mt-4 w-[66%] mx-auto" alt={name} />
          <Badge className="absolute top-2 right-2">{category.name}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-md font-bold">{formatMoney(price)}</span>
          <span className="text-sm text-gray-500">Stock: {quantity}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex space-y-2 flex-wrap">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setModalDetailsProduct(true);
            setEditingProduct(product);
          }}
        >
          <Package className="mr-2 h-4 w-4" /> Detalles
        </Button>
        <Button
          variant="outline"
          className="w-full bg-green-400 hover:bg-green-500"
          onClick={handleAddProductToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
