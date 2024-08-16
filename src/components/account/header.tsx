"use client";

import { usePathname } from "next/navigation";
import React from "react";
import NavLink from "./nav-link";
import IconFeed from "./icons/feed-icon";
import IconEstatisticas from "./icons/estatisticas-icon";
import IconAdicionar from "./icons/adicionar-icon";
import IconSair from "./icons/sair-icon";
import useMedia from "@/hooks/use-media";
import logout from "@/actions/logout";
import { useUser } from "@/context/user-context";

export default function AccountHeader() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const { setUserState } = useUser();
  const mobile = useMedia("(max-width: 40rem)");

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const getTitle = (pathname: string) => {
    switch (pathname) {
      case "/conta/estatisticas":
        return "Estatísticas";
      case "/conta/postar":
        return "Poste Sua Foto";
      default:
        return "Minha conta";
    }
  };

  async function handleLogout() {
    await logout();
    setUserState(null);
  }

  return (
    <div className="relative mb-8 mt-4 grid grid-cols-[1fr_auto] items-center">
      <h1 className="title">{getTitle(pathname)}</h1>
      {mobile && (
        <button
          aria-label="Menu"
          data-active={mobileMenu}
          onClick={() => setMobileMenu(!mobileMenu)}
          className="mobileButton data-[active=true]:mobileButtonActive"
        ></button>
      )}
      <nav
        data-nav-mobile={mobile}
        data-nav-desktop={mobile === false}
        data-active-nav={mobileMenu}
        className="data-[active-nav=true]:navMobileActive navDesktop data-[nav-mobile=true]:navMobile grid grid-cols-4 gap-4"
      >
        <NavLink path="/conta">
          <IconFeed />
          {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink path="/conta/estatisticas">
          <IconEstatisticas />
          {mobile && "Estatísticas"}
        </NavLink>
        <NavLink path="/conta/postar">
          <IconAdicionar />
          {mobile && "Adicionar Foto"}
        </NavLink>
        <button onClick={handleLogout} className="navLink">
          <IconSair />
          {mobile && "Sair"}
        </button>
      </nav>
    </div>
  );
}
