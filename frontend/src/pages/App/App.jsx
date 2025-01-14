import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { getUser } from '../../services/authService';

import './App.css';

import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import MyPostListPage from '../MyPostListPage/MyPostListPage';
import NewPostPage from '../NewPostPage/NewPostPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';

import * as postService from '../../services/postService';

function App() {
  const [user, setUser] = useState(getUser());
  const [posts, setPosts] = useState([]);

  //const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPosts = async () => {
      const allPostsData = await postService.index();
      setPosts(allPostsData);
    };
    if (user) fetchAllPosts();
  }, [user]);

  return (
    <main id="react-app">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage posts={posts} user={user} />} />
            <Route path="/myposts" element={<MyPostListPage />} />
            <Route path="/posts/new" element={<NewPostPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </section>
    </main>
  );
}

export default App;
