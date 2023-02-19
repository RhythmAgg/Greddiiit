import Layout from './Components/Layout';
import Home from './Components/Home';
import Missing from './Components/Missing';
import Dashboard from './Components/Dashboard';
import MySubGreddiiits from './Components/MySubGreddiiits';
import AllSubGreddiiits from './Components/AllSubGreddiiits';
import SubGreddiiitPage from './Components/SubGreddiiitPage';
import MySubGreddiiitPage from './Components/MySubGreddiiitPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SavedPosts from './Components/SavedPosts';
import ChatRoom from './Components/ChatRoom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='home' element={<Home />} />
        <Route path='mySubGreddiiits' element={<MySubGreddiiits />} />
        <Route path='AllSubGreddiiits' element={<AllSubGreddiiits />} />
        <Route path='SubGreddiiitPage/:sub/:logged_in' element={<SubGreddiiitPage />} />
        <Route path='MySubGreddiiitPage/:sub/:logged_in' element={<MySubGreddiiitPage />} />
        <Route path='SavedPosts' element={<SavedPosts />} />
        <Route path='ChatRoom' element={<ChatRoom />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
