import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, User, Send } from 'lucide-react';
import { products, COMPANY_PHONE } from './data/products';

export default function App() {
  const [cart, setCart] = useState([]);
  const [checkoutData, setCheckoutData] = useState({ name: '' });

  const getProductQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const updateQuantity = (product, delta) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      
      if (existing) {
        const newQuantity = existing.quantity + delta;
        if (newQuantity <= 0) {
          return prevCart.filter(item => item.id !== product.id);
        }
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else if (delta > 0) {
        return [...prevCart, { ...product, quantity: delta }];
      }
      return prevCart;
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    if (!checkoutData.name.trim() || totalItems === 0) return;

    let message = `*NUEVO PEDIDO* 🛒\n\n`;
    message += `*Cliente:* ${checkoutData.name}\n\n`;
    message += `*Detalle del Pedido:*\n`;
    
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name}\n`;
    });

    message += `\n¡Gracias por tu pedido!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${COMPANY_PHONE}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#fafafa]/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-medium tracking-tight text-gray-900">Catálogo.</h1>
          <div className="relative p-2 text-gray-900 flex items-center gap-2">
            <ShoppingBag strokeWidth={1.5} size={24} />
            <span className="font-medium">{totalItems}</span>
          </div>
        </div>
      </header>

      {/* Product List */}
      <main className="max-w-xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-4">
          {products.map((product) => {
            const quantity = getProductQuantity(product.id);
            return (
              <div key={product.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 group">
                <div className="pr-4">
                  <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                </div>
                
                <div className="flex items-center gap-4 bg-gray-50 rounded-full p-1.5 border border-gray-100 self-start sm:self-auto flex-shrink-0">
                  <button 
                    onClick={() => updateQuantity(product, -1)}
                    className="w-9 h-9 flex items-center justify-center bg-white rounded-full text-gray-900 shadow-sm hover:bg-gray-100 transition-colors disabled:opacity-50"
                    disabled={quantity === 0}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-base font-medium w-6 text-center">{quantity}</span>
                  <button 
                    onClick={() => updateQuantity(product, 1)}
                    className="w-9 h-9 flex items-center justify-center bg-black rounded-full text-white shadow-sm hover:bg-gray-800 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Checkout Form (In-page) */}
        {totalItems > 0 && (
          <div className="mt-12 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-medium mb-6">Confirmar Pedido</h2>
            <form id="checkout-form" onSubmit={handleWhatsAppOrder} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 whitespace-nowrap">
                  ¿A nombre de quién?
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-black focus:bg-white focus:ring-1 focus:ring-black transition-colors text-sm"
                    placeholder="Tu nombre completo"
                    value={checkoutData.name}
                    onChange={(e) => setCheckoutData({ name: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button 
                  type="submit"
                  className="w-full bg-accent-green text-white font-medium py-4 px-6 rounded-xl hover:bg-accent-hover transition-colors flex justify-center items-center gap-2 shadow-lg shadow-accent-green/20"
                >
                  <Send size={18} fill="currentColor" className="mr-1" />
                  Enviar pedido por WhatsApp
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}