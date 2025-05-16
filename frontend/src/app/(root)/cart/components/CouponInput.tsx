// src/components/cart/CouponInput.tsx
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import React from "react";

interface CouponInputProps {
  coupon: string;
  setCoupon: (value: string) => void;
  onApply: () => void;
}

const CouponInput: React.FC<CouponInputProps> = ({ coupon, setCoupon, onApply }) => {
  return (
    <div className="bg-bg-secondary w-full flex gap-4 shadow-xs py-5 px-6 rounded-lg">
      <Input
        type="text"
        placeholder="Cupom de desconto"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
      />
      <Button onClick={onApply} className="w-full font-semibold">
        Aplicar Cupom
      </Button>
    </div>
  );
};

export default CouponInput;
