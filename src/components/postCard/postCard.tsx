import Image from "next/image";
import Link from "next/link";
import "./postCard.scss";
import { IPosts } from "@/types/api/posts";

interface PostCardProps {
  post: IPosts;
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = post.photo.startsWith('http') 
    ? post.photo 
    : `${process.env.NEXT_PUBLIC_API_URL || 'https://travelblog.skillbox.cc'}${post.photo}`;

  return (
        <div className="post-card">
          <Image
            className="post-card__image"
            src={imageUrl}
            alt="Фото из путешествия"
            width={370}
            height={288}
          />
          <div className="post-card__inner">
            <div className="post-card__description">
              <h2 className="post-card__title">{post.title}</h2>
              <p className="post-card__text">{post.excerpt}</p>
            </div>
            <div className="post-card__bottom">
              <span className="post-card__country">{post.county},{post.city}</span>
              <Link className="post-card__link" href={`/post/${post.id}`}>
                Подробнее
              </Link>
            </div>
          </div>
        </div>
  )
}