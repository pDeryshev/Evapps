"use client";

import Image from "next/image";
import Link from "next/link";
import "./header.scss";
import { HeaderTitle } from "../header-title/headerTitle";
import { useAuth } from "@/utils/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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

  // Функция для обрезки email если он слишком длинный
  const formatEmail = (email: string) => {
    if (email.length > 20) {
      return email.substring(0, 17) + '...';
    }
    return email;
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
                  <span className="header__user-email">
                    {formatEmail(user.email)}
                  </span>
                  <svg
                    className={`header__dropdown-arrow ${isDropdownOpen ? 'header__dropdown-arrow--open' : ''}`}
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="header__dropdown">
                    <button
                      className="header__dropdown-item"
                      onClick={handleProfileClick}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                          fill="currentColor"
                        />
                        <path
                          d="M8 9.5C4.6625 9.5 2 12.1625 2 15.5C2 15.7761 2.22386 16 2.5 16H13.5C13.7761 16 14 15.7761 14 15.5C14 12.1625 11.3375 9.5 8 9.5Z"
                          fill="currentColor"
                        />
                      </svg>
                      Профиль
                    </button>
                    <button
                      className="header__dropdown-item header__dropdown-item--logout"
                      onClick={handleLogout}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.6667 11.3333L14 8L10.6667 4.66667"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 8H6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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