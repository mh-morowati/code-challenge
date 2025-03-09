import React from "react"

type PostProps = {
  userId: number
  title: string
  body: string
}


const Post: React.FC<PostProps> = (props) => {

  const { title, body, userId } = props
  
  return (
    <div
      className="p-4 border rounded shadow bg-white dark:bg-gray-800"
    >
      <h3 className="text-lg font-bold text-zinc-950">
        
        {title}
      
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        
        {body}
      
      </p>
      <small className="text-zinc-950">

        user number of:
      
        {userId}

      </small>
    </div>
  )
}

export default Post
