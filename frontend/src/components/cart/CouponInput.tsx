// src/components/cart/CouponInput.tsx
import React from "react";

interface CouponInputProps {
  coupon: string;
  setCoupon: (value: string) => void;
  onApply: () => void;
}

const CouponInput: React.FC<CouponInputProps> = ({ coupon, setCoupon, onApply }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <input
        type="text"
        placeholder="Cupom de desconto"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
      />
      <button onClick={onApply} className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600">
        Aplicar Cupom
      </button>
    </div>
  );
};

export default CouponInput;
