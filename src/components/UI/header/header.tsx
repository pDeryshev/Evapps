"use client";

import Image from "next/image";
import Link from "next/link";
import "./header.scss";
import { HeaderTitle } from "../header-title/headerTitle";
import { useAuth } from "@/utils/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DownArrowIcon from "../../../../public/icon/DownArrowIcon";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Закрытие dropdown при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    router.push('/profile')
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo-link" href="/">
            <Image
              src="/logo-travel.png"
              alt="Логотип travel-блога"
              width={181}
              height={41}
              priority
            />
          </Link>
          <div className="header__auth" ref={dropdownRef}>
            {isAuthenticated && user ? (
              <div className="header__user-menu">
                <button
                  className="header__user-button"
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="header__user-name">
                    {user.full_name}
                  </span>
                  <DownArrowIcon className="header__user-icon" />
                </button>

                {isDropdownOpen && (
                  <div className="header__dropdown">
                    <button
                      className="header__dropdown-item"
                      onClick={handleProfileClick}
                    >
                      Профиль
                    </button>
                    <button
                      className="header__dropdown-item header__dropdown-item--logout"
                      onClick={handleLogout}
                    >
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <button className="header__button">Войти</button>
              </Link>
            )}
          </div>
        </div>
        <HeaderTitle />
      </div>
    </header>
  )
}