"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import React, { useState } from "react";

const CouponInput = () => {
  const [coupon, setCoupon] = useState("");

  const onApply = () => {
    console.log(coupon);
  };

  return (
    <div className="bg-bg-secondary hidden md:flex w-full gap-4 shadow-xs py-5 px-6 rounded-lg">
      <Input
        id="coupon"
        type="text"
        label="Cupom de desconto"
        placeholder="Insira o cupom"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        className="w-full"
      />
      <Button onClick={onApply} className="w-full font-semibold">
        Aplicar Cupom
      </Button>
    </div>
  );
};

export default CouponInput;
