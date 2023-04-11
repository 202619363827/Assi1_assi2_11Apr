import React, { useState, useEffect } from "react";

const UserTable = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleRemovePost = (postId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE",
    })
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Body</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.body}</td>
            <td>
              <button onClick={() => handleRemovePost(post.id)}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;


