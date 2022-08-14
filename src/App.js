import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import PersistentDrawerLeft from "./components/navigation/navigation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistentDrawerLeft />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
