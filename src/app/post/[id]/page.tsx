import { notFound } from 'next/navigation';
import { postsServerAPI } from '@/api/posts-server';
import PostDetailClient from '@/components/postDetails/PostDetailClient';

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {

  const { id } = await params;
  const postId = Number(id);
  
  if (isNaN(postId)) {
    console.log('PostPage: invalid post ID');
    notFound();
  }

  try {
    const post = await postsServerAPI.getPost(postId);

    if (!post) {
      console.log('PostPage: post not found');
      notFound();
    }

    return <PostDetailClient post={post} />;
  } catch (error) {
    console.error('PostPage: error fetching post:', error);
    notFound();
  }
}