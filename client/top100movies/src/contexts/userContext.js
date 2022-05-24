import { createContext, useState } from "react";

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
