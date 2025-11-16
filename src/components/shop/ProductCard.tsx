import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -4 },
};

const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
        className="h-full"
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
    >
        <Card className="h-full flex flex-col overflow-hidden group">
            <CardContent className="p-0">
                <div className="overflow-hidden">
                    <motion.div variants={imageVariants}>
                         <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="w-full object-cover aspect-square"
                            data-ai-hint={product.imageHint}
                        />
                    </motion.div>
                </div>
                <div className="p-4">
                    <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
                <p className="text-xl font-bold text-primary">₹{product.price}</p>
                <Button size="icon" variant="outline">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Add to cart</span>
                </Button>
            </CardFooter>
        </Card>
    </motion.div>
  );
}
