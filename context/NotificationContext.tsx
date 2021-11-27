import { createContext, useCallback, useState } from "react";
import { Alert } from "reactstrap";
import { v4 as uuid } from "uuid";
export interface NotificationContextProps {
  notification: (message: string, color: string, timeout?: number) => void;
  notifications: object[];
}

export const NotificationContext = createContext<NotificationContextProps>({
  notification: ({}) => {},
  notifications: [],
});

const NotificationProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<object[]>([]);

  const notification = useCallback(
    (message: string, color: string, timeout = 5000, _id?: string): void => {
      if (color === "error") {
        color = "danger";
      }
      const id = `${_id ? `${_id}-` : ``}${uuid()}`;
      const dismiss = (): void =>
        setNotifications((currentNotifications) =>
          currentNotifications.filter((n: any) => n.id !== id)
        );

      setNotifications(
        notifications.concat([
          {
            color,
            dismiss,
            id,
            message,
          },
        ])
      );
      setTimeout(() => {
        dismiss();
      }, timeout);
    },
    [notifications, setNotifications]
  );

  return (
    <NotificationContext.Provider
      value={{
        notification,
        notifications,
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 16,
          zIndex: 1051,
        }}
      >
        {notifications.map((n: any) => (
          <Alert
            className={`bg-${n.color} border-light text-lighter`}
            style={{ opacity: 0.92 }}
            id={n.id}
            color={n.color}
            key={n.id}
            toggle={n.dismiss}
          >
            {n.message}
          </Alert>
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
