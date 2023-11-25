import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Room from './pages/room';
import Test from './pages/Test';

const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/room/:roomID' element={<Room />} />
    </Routes>
  );
};

export default App;
