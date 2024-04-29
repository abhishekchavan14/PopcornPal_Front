import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationProvider";
import { AuthContext } from "../contexts/AuthProvider";

export const useNotification = () => useContext(NotificationContext)
export const useAuth = () => useContext(AuthContext)