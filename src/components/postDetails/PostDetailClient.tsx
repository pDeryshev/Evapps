"use client"

import Image from "next/image";
import { Button } from "@/components/buttons/button";
import { useNavigation } from "@/utils/hooks/useNavigation";
import { IPostDetail } from "@/types/api/posts";
import { useRouter } from "next/navigation";
import "./post.scss";
import "./comments.scss";
import { useAuth } from "@/utils/hooks/useAuth";

interface PostDetailClientProps {
  post: IPostDetail;
}

export default function PostDetailClient({ post }: PostDetailClientProps) {
  const { handleBack } = useNavigation();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const getImageUrl = (photoPath: string) => {
    if (photoPath.startsWith('http')) {
      return photoPath;
    }
    // Используем базовый URL без /api для изображений
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://travelblog.skillbox.cc'}${photoPath}`;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="post__wrapper">
          <Image
            src={getImageUrl(post.photo)}
            alt="Фото из путешествия"
            width={1172}
            height={450}
            className="post__image"
            unoptimized={true}
          />
          <div className="post__inner">
            <div className="post__content">
              <h1 className="post__title">{post.title}</h1>
              <p className="post__description">{post.description}</p>
            </div>
            <ul className="comments">
              {post.comments && post.comments.map((comment, index) => (
                <li key={index} className="comments__item">
                  <div className="comments__wrapper">
                    <h2 className="comments__author">{comment.author_name}</h2>
                    <span className="comments__date">{formatDate(comment.created_at)}</span>
                  </div>
                  <p className="comments__description">{comment.comment}</p>
                </li>
              ))}
            </ul>

            <div className="post__buttons">
              <Button
                className="btn post__btn"
                text="Назад"
                type="button"
                onClick={handleBack}
              />
              {isAuthenticated ? (
                <Button
                  className="btn btn--accent post__btn"
                  text="Ваше впечатление об этом месте"
                  type="button"
                  onClick={() => router.push(`/post/${post.id}/create-review`)}
                />
              ) : (<></>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}