import { useState } from 'react';
import { ShoppingCart, Send, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { COMPANY_PHONE } from '../../config/app';

export function CartBar({ cart, totalItems }) {
  const [open, setOpen] = useState(false);

  if (totalItems === 0) return null;

  const handleSubmit = () => {
    const url = buildWhatsAppUrl(cart, COMPANY_PHONE);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20">
      {/* Checkout panel */}
      {open && (
        <div className="bg-white border-t border-gray-200 px-4 pt-5 pb-4 shadow-2xl">
          <div className="max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Confirmar Pedido</h2>
              <button onClick={() => setOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {/* Cart summary */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4 max-h-40 overflow-y-auto no-scrollbar">
              {cart.map((item) => (
                <div key={item.code} className="flex justify-between text-sm py-0.5">
                  <span className="text-gray-700">{item.quantity}× {item.name}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-accent-green text-white font-semibold py-4 rounded-xl hover:bg-accent-hover active:scale-95 transition-all flex justify-center items-center gap-2 shadow-lg shadow-accent-green/30 text-base"
            >
              <Send size={18} fill="currentColor" />
              Enviar pedido por WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Sticky bottom bar */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-accent-green text-white flex items-center justify-between px-5 py-4 hover:bg-accent-hover active:scale-[0.99] transition-all shadow-lg"
      >
        <div className="flex items-center gap-3 max-w-xl mx-auto w-full">
          <div className="bg-white/20 rounded-full p-1.5">
            <ShoppingCart size={18} />
          </div>
          <span className="font-semibold">{totalItems} {totalItems === 1 ? 'ítem' : 'ítems'}</span>
          <span className="ml-auto font-medium text-white/90">
            {open ? 'Cerrar ↓' : 'Confirmar pedido →'}
          </span>
        </div>
      </button>
    </div>
  );
}
