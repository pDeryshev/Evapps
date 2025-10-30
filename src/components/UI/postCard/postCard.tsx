import Image from "next/image";
import Link from "next/link";
import "./postCard.scss";

export default function PostCard() {
  return (
    <div className="post-card">
      <Image
        src="/"
        alt="Фото из путешествия"
        width={370}
        height={288}
      />
      <div className="post-card__inner">
        <div className="post-card__description">
          <h2 className="post-card__title">Один зимний день в Венеции</h2>
          <p className="post-card__text">Говорят, что Венецию покинуло 70% местных жителей. Говорят, что это из-за сверх туризма. Еще говорят, что Венеци...</p>
        </div>
        <div className="post-card__bottom">
          <span className="post-card__country">Италия, Венеция</span>
          <Link className="post-card__link" href="#">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  )
}