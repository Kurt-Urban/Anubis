import { createContext, useEffect, useState } from "react";

interface NotificationContextProps {}

export const NotificationContext = createContext<NotificationContextProps>({});

const NotificationProvider: React.FC = ({ children }) => {
  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
