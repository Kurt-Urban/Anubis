import { useContext } from "react";
import {
  NotificationContext,
  NotificationContextProps,
} from "../context/NotificationContext";

const useNotifications = (): NotificationContextProps =>
  useContext(NotificationContext);

export default useNotifications;
