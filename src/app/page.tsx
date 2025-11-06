import { Button } from "@/components/buttons/button";
import PostsList from "@/components/postsList/postsList";

export default function Home() {
  return (
    <main>
      <div className="posts">
        <h1 className="visually-hidden">Evapps - приложение для путешественников</h1>
        <div className="container">
          <PostsList />
          <Button 
            className="btn btn--acсent posts__btn"
            text="Добавить мое путешествие"
            type="button"
          />
        </div>

      </div>

    </main>

  );
}
