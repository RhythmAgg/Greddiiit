import Layout from './Components/Layout';
import Home from './Components/Home';
import Missing from './Components/Missing';
import Dashboard from './Components/Dashboard';
import MySubGreddiiits from './Components/MySubGreddiiits';
import AllSubGreddiiits from './Components/AllSubGreddiiits';
import SubGreddiiitPage from './Components/SubGreddiiitPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='home' element={<Home />} />
        <Route path='mySubGreddiiits' element={<MySubGreddiiits />} />
        <Route path='AllSubGreddiiits' element={<AllSubGreddiiits />} />
        <Route path='SubGreddiiitPage/:sub/:logged_in' element={<SubGreddiiitPage />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
