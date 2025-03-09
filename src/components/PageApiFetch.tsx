"use client"
import { useEffect, useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchPosts } from "@/services/postService"
import Post from "@/components/Post"

interface PostType {
  userId: number
  id: number
  title: string
  body: string
}


const PageApiFetch = () => {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1
    },
    initialPageParam: 1,
  })

  // Ref for observing the last element
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 } // Trigger when the element is fully in view
    )

    // Save the current ref value before using it in the cleanup function
    const currentElement = observerRef.current

    if (currentElement) observer.observe(currentElement)

    return () => {
      if (currentElement) observer.unobserve(currentElement)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.pages.map((group) =>
          group.map((post: PostType) => (
            <Post key={post.id} title={post.title} body={post.body} userId={post.userId} />
          ))
        )}
      </div>

      {/* Invisible div that acts as a trigger for IntersectionObserver */}
      <div ref={observerRef} className="h-10"></div>

      {
        isFetchingNextPage && <p className="text-center">Loading more...</p>
      }
    </div>
  )
}

export default PageApiFetch
