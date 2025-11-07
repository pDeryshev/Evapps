import { IPosts } from "@/types/api/posts";
import PostCard from "../postCard/postCard";
import "./postsList.scss";

interface PostsListProps {
  posts: IPosts[]
}

export default function PostsList({ posts }: PostsListProps) {
  return (
    <ul className="posts__list">
      {posts.map((post) => (
        <li key={post.id} className="posts__item">
          <PostCard post={post}/>
        </li>
      ))}
    </ul>
  )
}