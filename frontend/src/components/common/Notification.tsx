"use client";

import Alert from "../ui/Alert";
import { useRef, useState, useEffect } from "react";
import { FaRegBell } from "react-icons/fa";

export default function Notification() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nova promoção disponível!", read: false },
    { id: 2, message: "Seu pedido foi enviado.", read: false },
    { id: 3, message: "Seu pedido foi entregue.", read: false },
    { id: 4, message: "Novo comentário em seu post.", read: false },
    { id: 5, message: "Você recebeu uma nova mensagem.", read: false },
    { id: 6, message: "Seu perfil foi atualizado.", read: false },
    { id: 7, message: "Nova atualização disponível.", read: false },
    { id: 8, message: "Seu pagamento foi processado.", read: false },
    { id: 9, message: "Novo seguidor!", read: false },
    { id: 10, message: "Seu pedido foi cancelado.", read: false },
  ]);

  const notifRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleNotifications = () => {
    setIsNotifOpen((prev) => !prev);
    if (!isNotifOpen) {
      setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notifRef.current &&
      !notifRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsNotifOpen(false);
    }
  };

  useEffect(() => {
    if (isNotifOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isNotifOpen]);

  return (
    <button
      ref={buttonRef}
      className="relative flex items-center gap-0 py-2 px-4 text-tx-primary hover:bg-gray-100 hover:text-primary cursor-pointer rounded-md transition duration-300 focus:outline-none"
      onClick={toggleNotifications}
    >
      <div className="relative">
        <FaRegBell size={24} />
        {unreadCount > 0 && <Alert className="absolute top-0 right-0" />}
      </div>

      <div
        ref={notifRef}
        className={`absolute right-0 top-12 w-72 bg-bg-primary shadow-xs rounded-lg border border-t-0 border-lines/50 z-50 transition-opacity duration-300 ease-in-out ${
          isNotifOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-1 p-2">
          {notifications.length === 0 ? (
            <p className="text-sm text-tx-primary">Sem notificações</p>
          ) : (
            notifications.map((notif) => (
              <li
                key={notif.id}
                className="bg-bg-secondary flex gap-2 rounded-lg shadow-xs text-tx-primary py-4 px-4 text-sm cursor-pointer transition hover:bg-primary/10"
              >
                <FaRegBell size={20} className="text-primary shrink-0" />
                <span className="truncate">{notif.message}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </button>
  );
}
