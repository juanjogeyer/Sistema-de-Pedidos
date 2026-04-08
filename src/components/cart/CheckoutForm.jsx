import { Send } from 'lucide-react';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { COMPANY_PHONE } from '../../config/app';

export function CheckoutForm({ cart }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const url = buildWhatsAppUrl(cart, COMPANY_PHONE);
    window.open(url, '_blank');
  };

  return (
    <div className="mt-12 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-medium mb-6">Confirmar Pedido</h2>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="w-full bg-accent-green text-white font-semibold py-4 px-6 rounded-xl hover:bg-accent-hover active:scale-95 transition-all flex justify-center items-center gap-2 shadow-lg shadow-accent-green/30 text-base"
        >
          <Send size={18} fill="currentColor" />
          Enviar pedido por WhatsApp
        </button>
      </form>
    </div>
  );
}
