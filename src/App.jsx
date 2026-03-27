import { useEffect } from 'react';
import { useCart } from './hooks/useCart';
import { useFilter } from './hooks/useFilter';
import { products } from './data/products';
import { Header } from './components/layout/Header';
import { FilterBar } from './components/layout/FilterBar';
import { ProductList } from './components/products/ProductList';
import { CartBar } from './components/cart/CartBar';

export default function App() {
  const { cart, totalItems, getQuantity, updateQuantity } = useCart();
  const { category, setCategory, variant, setVariant, subcategory, setSubcategory, filteredProducts } = useFilter();

  const visible = filteredProducts(products);

  // Determinar variantes disponibles y autoseleccionar si la actual no es válida
  const categoryProducts = products.filter(p => p.category === category && (subcategory === 'all' || p.subcategory === subcategory));
  const availableVariantsSet = new Set(categoryProducts.map(p => p.variant));
  const availableVariants = [];
  if (availableVariantsSet.has('unidad')) availableVariants.push('unidad');
  if (availableVariantsSet.has('bulto')) availableVariants.push('bulto');
  if (availableVariantsSet.has('granel')) availableVariants.push('granel');

  useEffect(() => {
    if (availableVariants.length > 0 && !availableVariants.includes(variant)) {
      setVariant(availableVariants[0]);
    }
  }, [availableVariants.join(','), variant, setVariant]);

  return (
    <div className="min-h-screen pb-20">
      <Header />
      <FilterBar
        category={category}
        onCategoryChange={setCategory}
        variant={variant}
        onVariantChange={setVariant}
        subcategory={subcategory}
        onSubcategoryChange={setSubcategory}
        availableVariants={availableVariants}
      />

      <main className="max-w-xl mx-auto">
        {visible.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-16">Sin productos en esta categoría</p>
        ) : (
          <ProductList
            products={visible}
            getQuantity={getQuantity}
            onUpdate={updateQuantity}
          />
        )}
      </main>

      <CartBar cart={cart} totalItems={totalItems} />
    </div>
  );
}