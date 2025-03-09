"use client";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/services/postService";
import Post from "@/components/Post";

interface PostType {
  id: number;
  title: string;
  body: string;
}
const PageApiFetch = () => {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    {
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        // If the last page is empty, don't try to fetch the next page
        return lastPage.length === 0 ? undefined : allPages.length + 1;
      },
      // Add `initialPageParam` here
      initialPageParam: 1, // Add this to avoid missing initial page param
    }
  );

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.pages.map((group) =>
          group.map((post: PostType) => <Post key={post.id} title={post.title} body={post.body} />)
        )}
      </div>

      {isFetchingNextPage && <p className="text-center">Loading more...</p>}
    </div>
  );
};

export default PageApiFetch;
