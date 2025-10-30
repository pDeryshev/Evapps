import Image from "next/image";
import Link from "next/link";
import "./header.scss";

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
          <button className="btn header__button">Войти</button>
        </div>
        <h1 className="header__title">Там, где мир начинается с путешествий</h1>
      </div> 




    </header>
  )
}