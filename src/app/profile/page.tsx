import { Button } from "@/components/buttons/button";
import Image from "next/image";
import "./profile.scss";

export default function UserProfilePage() {
  return (
    <div className="user-profile">
      <div className="container">
        <div className="user-profile__wrapper">
          <div className="user-profile__avatar">
           <Image
            className="user-profile__img"
            src="/"
            alt="Фото пользователя"
            width={240}
            height={240}
           />
           <Button 
           className="user-profile__remove-img"
           text="Изменить фото"
           type="button"
           />
          </div>
          <div className="user-profile__description">
            <div className="user-profile__info">
              <div className="user-profile__user-info">
                <h1 className="user-profile__name">Боярская Варвара Михайловна</h1>
                <Button
                  className="user-profile__rename"
                  text="Ик"
                  type="button"
                >
                </Button>
              </div>
              <div className="user-profile__city">
                <span className="user-profile__city-descr">Город:</span>
                <span className="user-profile__city-name">Вышний Волчёк</span>
              </div>
            </div>
            <div className="user-profile__about">
              <span className="user-profile__about-me">О себе:</span>
              <p className="user-profile__about-descr">Я обожаю путешествовать. Мне нравится открывать для себя новые места, знакомиться с разными культурами и традициями. Я всегда готова отправиться в путь, даже если это означает покинуть зону комфорта. В дороге я встречаю новых людей, учусь новому и наслаждаюсь красотами природы. Путешествия дают мне возможность расширить свой кругозор и узнать больше о мире вокруг меня.
                Я уверена, что каждый новый опыт делает меня сильнее и мудрее.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}