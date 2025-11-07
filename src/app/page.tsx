import { postsServerAPI } from "@/api/posts-server";
import { Button } from "@/components/buttons/button";
import PostsList from "@/components/postsList/postsList";
import Link from "next/link";

export default async function Home() {
  const posts = await postsServerAPI.getPosts()

  return (
      <div className="posts">
        <h1 className="visually-hidden">Evapps - приложение для путешественников</h1>
        <div className="container">
          <PostsList posts={posts} />
          <Link className="posts__link" href="/create-post">
            <Button
              className="btn btn--acсent posts__btn"
              text="Добавить мое путешествие"
              type="button"
            />
          </Link>
        </div>
      </div>
  );
}
