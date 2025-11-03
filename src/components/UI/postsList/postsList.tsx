import PostCard from "../postCard/postCard";
import "./postsList.scss";

export default function PostsList() {
  return (
    <ul className="posts__list">
      <li className="posts__item">
        <PostCard />
      </li>
      <li className="posts__item">
        <PostCard />
      </li>
      <li className="posts__item">
        <PostCard />
      </li>
      <li className="posts__item">
        <PostCard />
      </li>
      <li className="posts__item">
        <PostCard />
      </li>
      <li className="posts__item">
        <PostCard />
      </li>
    </ul>
  )
}