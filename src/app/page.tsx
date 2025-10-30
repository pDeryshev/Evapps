import PostsList from "@/components/UI/postsList/postsList";

export default function Home() {
  return (
    <main>
      <div className="posts">
        <h1 className="visually-hidden">Evapps - приложение для путешественников</h1>
        <div className="container">
          <PostsList />
        </div>

      </div>

    </main>

  );
}
