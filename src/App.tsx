import React from 'react';
// import { Routes, Route } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <div>
      <Home />
      <About />
    </div>
  );
};

export default App;
