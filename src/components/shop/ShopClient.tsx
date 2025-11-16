"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import ProductCard from "./ProductCard";

const categories = ["All", "Bins", "Composting", "Accessories", "Bags"];

export default function ShopClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <AnimatedWrapper className="text-center mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </AnimatedWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <AnimatedWrapper key={product.id} delay={index * 0.05}>
              <ProductCard product={product} />
            </AnimatedWrapper>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
