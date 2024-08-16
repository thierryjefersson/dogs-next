"use client";

import logout from "@/actions/logout";
import validateToken from "@/actions/validate-token";
import React from "react";

type User = {
  id: number;
  username: string;
  nome: string;
  email: string;
};

type IUserContext = {
  user: User | null;
  setUserState: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = React.createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context)
    throw new Error("useUser precisa está dentro do UserContextProvider");
  return context;
};

export const UserContextProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  const [userState, setUserState] = React.useState<User | null>(user);

  React.useEffect(() => {
    async function validate() {
      const { ok } = await validateToken();
      if (!ok) logout();
    }
    if (userState) validate();
  }, [userState]);

  return (
    <UserContext.Provider value={{ user: userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};
