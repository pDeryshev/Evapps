import Image from "next/image";
import Link from "next/link";
import "./header.scss";
import { HeaderTitle } from "../header-title/headerTitle";

export default function Header() {

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
          <Link href="/login">
          <button className="header__button">Войти</button>
          </Link>
        </div>
        <HeaderTitle />
      </div> 




    </header>
  )
}