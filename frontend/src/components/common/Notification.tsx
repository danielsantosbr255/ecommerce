import { Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Alert from "../ui/Alert";

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

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleNotifications = () => {
    setIsNotifOpen((prev) => !prev);
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  return (
    <Link href="#">
      <div className="relative flex items-center gap-0 py-2 px-4 text-tx-secondary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300">
        <button onClick={toggleNotifications} className="relative focus:outline-none">
          <Bell size={25} />
          {unreadCount > 0 && <Alert onTop />}
        </button>

        {isNotifOpen && (
          <div className="absolute right-0 top-8 mt-2 w-64 bg-bg-primary shadow-xs rounded-md border border-lines z-50">
            <div className="p-4">
              {notifications.length === 0 ? (
                <p className="text-sm text-tx-on-primary">Sem notificações</p>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} className="text-sm text-tx-primary py-1 border-b last:border-b-0">
                    {notif.message}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
