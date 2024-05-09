import React, { createContext, useState } from "react";
import { Link } from "react-router-dom";

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  const [notificationURL, setNotificationURL] = useState("");
  const [notificationClass, setNotificationClass] = useState("");

  const updateNotification = (type, value, url = "") => {
    switch (type) {
      case "error":
        setNotificationClass("bg-red-500");
        break;
      case "success":
        setNotificationClass("bg-green");
        break;
      case "warning":
        setNotificationClass("bg-orange-400");
        break;
      default:
        setNotificationClass("bg-red-500");
    }
    setNotification(value);
    setNotificationURL(url);
    setTimeout(() => {
      setNotificationClass("hidden");
    }, 3000);
  };

  // Positioning logic
  const isMobile = window.innerWidth <= 768; // Assuming mobile breakpoint at 768px

  const notificationStyle = isMobile
    ? { top: "10%", left: "50%", transform: "translateX(-50%)" }
    : { bottom: "5%", right: "5%", marginBottom: "20px" };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      <div className="fixed z-[3]" style={notificationStyle}>
        <div className={`p-4 ${notificationClass} rounded-xl z-50`}>
          <p>{notification}</p>
          {notificationURL && (
            <Link to={notificationURL} className="text-blue underline">
              Click Here
            </Link>
          )}
        </div>
      </div>
    </NotificationContext.Provider>
  );
}
