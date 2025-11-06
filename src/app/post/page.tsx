"use client"

import Image from "next/image";
import "./post.scss";
import "./comments.scss";
import { Button } from "@/components/buttons/button";
import { useNavigation } from "@/utils/hooks/useNavigation";

export default function PostDetailPage() {

  const { handleBack } = useNavigation();

  return (
    <div className="post">
      <div className="container">
        <div className="post__wrapper">
          <Image
            src="/header-background.jpg"
            alt="Фото из путешествия"
            width={1172}
            height={450}
            className="post__image"
          />
          <div className="post__inner">
            <div className="post__content">
              <h1 className="post__title">Фуншал. Расслабленный и броский</h1>
              <p className="post__description">Столичные города всегда полны достопримечательностей, даже если это маленькая столица совсем небольшого острова.
                Не всегда хватает времени, чтобы увидеть всё интересное, но даже то, что успели, трудно уместить в один рассказ.<br /><br />
                Кое-о чем я написала ранее: о катании на тобогане и канатной дороге, о красочном рынке Фуншала, о магнолиях в городском саду и о восхитительном парке на горе Монте Палас.
                Всё это основные развлечения из разряда «маст-ту-си», но в городе ещё много туристических локаций и атмосферных мест.<br /><br />
                Ближе к вечеру, когда мы возвращались с экскурсий по Мадейре, как правило оставалось время, чтобы погулять по Фуншалу самостоятельно и исследовать его в своем ритме.
                Город довольно симпатичный, не Лиссабон, конечно, но колоритности ему не занимать.<br /><br />
                По пути из отеля в исторический центр и обратно, мы каждый раз проходили мимо оживленной кольцевой развязки, украшенной прелестным фонтаном Ротонда-ду-Инфанте (Rotunda do Infante).
                Получилось, что именно встречей с этим фонтаном начинались и заканчивались все наши вечерние прогулки.
                Он стал для меня своеобразным символом и визитной карточкой Фуншала.<br /><br />
                Кольцевая развязка, пограничная между старой и более новой частями города, была спроектирована в 1945 году архитектором Фариа да Кошта, а скульптор Антониу Дуарте создал Ротонду.
                Оценить её вполне получилось в тот единственный раз, когда фонтан не работал: композиция представляет собой земной шар, заключенный в армиллярную сферу, из-под которой выпрыгивают четыре морских коня.
                Не знаю, почему не сфотографировала, наверно, на тот момент мысленно уже отдыхала в отеле.<br /><br />
                Пару слов о нашем отеле. The Views Baia, оправдывая свое название, радовал роскошными видами на залив Фуншала, которые открывались из окон ресторана, а балкон в нашем номере «смотрел» на город и форт Пику, посвященный Иоанну Крестителю.<br /><br />
                Интерьер, в оформлении которого присутствовали элементы бохо, был еще одной изюминкой отеля.
                Тем, кто любит предметы ручной работы из натуральных материалов, скорее всего, знаком этот термин.
              </p>
            </div>
            <ul className="comments">
              <li className="comments__item">
                <div className="comments__wrapper">
                  <h2 className="comments__author">Алексей</h2>
                  <span className="comments__date">22.12.2023</span>
                </div>
                <p className="comments__description">Интересный городок, узоры брусчатки, разрисованные двери, панно из плитки, вроде незначительные детали,
                  а придают его лицу особый шарм завершенного образа. Сразу видно, какое место у памятника Роналду натирают на удачу
                </p>
              </li>
              <li className="comments__item">
                <div className="comments__wrapper">
                  <h2 className="comments__author">Ольга</h2>
                  <span className="comments__date">22.12.2023</span>
                </div>
                <p className="comments__description">Португальские черты, конечно, угадываются легко. Можно не читать текст, но фото понять о какой стране идёт речь. А то, что Роналду из этого городка, это круто
                </p>
              </li>
              <li className="comments__item">
                <div className="comments__wrapper">
                  <h2 className="comments__author">Ксения</h2>
                  <span className="comments__date">22.12.2023</span>
                </div>
                <p className="comments__description">Игорь, я в футболе и игроках разбираюсь на уровне "зеро" )) И памятник мне совсем не понравился. Слышала, что местным также, далеко не всем нравится и построенный Роналду отель. Как бы гордятся выходцем, с одной стороны, но его выпендрёж их коробит
                </p>
              </li>
              <li className="comments__item">
                <div className="comments__wrapper">
                  <h2 className="comments__author">Олеся</h2>
                  <span className="comments__date">22.12.2023</span>
                </div>
                <p className="comments__description">Очень типичный, узнаваемо португальский!
                </p>
              </li>
              <li className="comments__item">
                <div className="comments__wrapper">
                  <h2 className="comments__author">Иван</h2>
                  <span className="comments__date">22.12.2023</span>
                </div>
                <p className="comments__description">Квартал разрисованных дверей - интересное место! И как украшает улицы!
                </p>
              </li>
            </ul>
            <div className="post__buttons">
              <Button
                className="btn post__btn"
                text="Назад"
                type="button"
                onClick={handleBack}
              />
              <Button
                className="btn btn--accent post__btn"
                text="Ваше впечатление об этом месте"
                type="button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}