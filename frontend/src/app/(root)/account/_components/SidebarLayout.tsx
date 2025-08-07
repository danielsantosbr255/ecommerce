"use client";

import { useAuth } from "@/providers/AuthContext";
import { Sidebar, SidebarItem } from "./Sidebar";
import {
  FaAddressBook,
  FaHeart,
  FaShieldAlt,
  FaShoppingBasket,
  FaSignOutAlt,
  FaThumbsUp,
  FaUserAstronaut,
  FaWindowClose,
} from "react-icons/fa";

export default function SidebarLayout() {
  const { signOut } = useAuth();

  return (
    <Sidebar>
      <SidebarItem href="/account" icon={<FaUserAstronaut size={27} />} text="Minha Conta" />
      <SidebarItem href="/account/security" icon={<FaShieldAlt size={27} />} text="Acesso e segurança" />
      <SidebarItem href="/account/orders" icon={<FaShoppingBasket size={27} />} text="Meus Pedidos" />
      <SidebarItem href="/account/address" icon={<FaAddressBook size={27} />} text="Meus Endereços" />
      <SidebarItem href="/account/reviews" icon={<FaThumbsUp size={27} />} text="Avaliações" />
      <SidebarItem href="/account/favorites" icon={<FaHeart size={27} />} text="Meus Favoritos" />
      <SidebarItem href="/account/sessions" icon={<FaWindowClose size={27} />} text="Sessões" />
      <SidebarItem onClick={signOut} icon={<FaSignOutAlt size={27} />} text="Sair" />
    </Sidebar>
  );
}
