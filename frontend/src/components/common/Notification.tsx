import { Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Notification() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nova promoção disponível!", read: false },
    { id: 2, message: "Seu pedido foi enviado.", read: false },
  ]);

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleNotifications = () => {
    setIsNotifOpen((prev) => !prev);
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  return (
    <Link href="#">
      <div className="relative flex items-center gap-0 py-2 px-4 text-tx-on-primary hover:bg-gray-100 hover:text-primary rounded-md transition duration-300">
        <button onClick={toggleNotifications} className="relative focus:outline-none">
          <Bell size={20} />
          {unreadCount > 0 && (
            <>
              <span className="absolute top-0 right-0 inline-flex h-2 w-2 bg-red-500 rounded-full"></span>
              <span className="absolute top-0 right-0 inline-flex h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
            </>
          )}
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
