"use client"

import { Button } from "@/components/buttons/button";
import Image from "next/image";
import "./profile.scss";
import { useAuth } from "@/utils/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RemoveIcon from "../../../public/icon/RemoveIcon";
import Link from "next/link";
import AddPhotoIcon from "../../../public/icon/AddPhotoIcon";

export default function UserProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div className="profile__loading">Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }
  console.log(user);

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
              type="button"
            >
              <AddPhotoIcon className="user-profile__photo-icon" />
              Изменить фото
            </Button>
          </div>
          <div className="user-profile__description">
            <div className="user-profile__info">
              <div className="user-profile__user-info">
                <h1 className="user-profile__name">{user?.full_name}</h1>
                <Link href="/profile/edit"
                >
                  <RemoveIcon 
                  className="user-profile__rename-icon"/>
                </Link>
              </div>
              <div className="user-profile__city">
                <span className="user-profile__city-descr">Город:</span>
                <span className="user-profile__city-name">{user?.city}</span>
              </div>
            </div>
            <div className="user-profile__about">
              <span className="user-profile__about-me">О себе:</span>
              <p className="user-profile__about-descr">{user?.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}