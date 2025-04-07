"use client";
import { useState } from "react";
import { FiSun, FiMoon, FiPlus, FiX } from "react-icons/fi";

interface Post {
  title: string;
  content: string;
  topic: string;
}

const Page = () => {
  const defaultPosts: Post[] = [
    { title: "Post 1", content: "Exploring new tech trends", topic: "tech" },
    { title: "Post 2", content: "Healthy morning habits", topic: "lifestyle" },
    { title: "Post 3", content: "Why TypeScript rocks", topic: "tech" },
  ];

  const [posts, setPosts] = useState<Post[]>(defaultPosts);
  const [featuredPosts] = useState<Post[]>(defaultPosts.slice(0, 3));
  const [topic, setTopic] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", topic: "" });
  const [isOpen, setIsOpen] = useState(false);

  const handleAddPost = () => {
    if (newPost.title && newPost.content && newPost.topic) {
      setPosts([...posts, newPost]);
      setNewPost({ title: "", content: "", topic: "" });
      setIsOpen(false);
    }
  };

  const handleFilter = (topic: string) => {
    setTopic(topic);
    if (topic) {
      setPosts(defaultPosts.filter((post) => post.topic === topic));
    } else {
      setPosts(defaultPosts);
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">📝 My Blog</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-white bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
              aria-label="Toggle Theme"
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <FiPlus /> Add Post
            </button>
          </div>
        </div>

        {/* Featured */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🌟 Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border dark:border-gray-700"
              >
                <h3 className="text-lg text-white font-semibold mb-2">
                  {post.title}
                </h3>
                <p className="text-white ">{post.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🧠 Filter by Topic</h2>
          <div className="flex gap-3 flex-wrap">
            {["tech", "lifestyle", ""].map((t, idx) => (
              <button
                key={idx}
                onClick={() => handleFilter(t)}
                className={`px-4 py-2 rounded-full border ${
                  topic === t
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                } hover:scale-105 transition`}
              >
                {t ? t.charAt(0).toUpperCase() + t.slice(1) : "All"}
              </button>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">🗃️ All Posts</h2>
          {posts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No posts available.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border dark:border-gray-700"
                >
                  <h3 className="text-lg text-white  font-semibold mb-2">
                    {post.title}
                  </h3>
                  <p className="text-white">{post.content}</p>
                  <span className="text-sm text-blue-500">{post.topic}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Create New Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Content"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <select
              value={newPost.topic}
              onChange={(e) =>
                setNewPost({ ...newPost, topic: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Topic</option>
              <option value="tech">Tech</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
            <button
              onClick={handleAddPost}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
