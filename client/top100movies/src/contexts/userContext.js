import { createContext, useState } from "react";

const UserContext = createContext();
export default UserContext;

// export function useUser() {
//   const user = useContext(UserContext);
//   const updateUser = useContext(UserUpdateContext);

//   return { user, setUser: updateUser };
// }

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
