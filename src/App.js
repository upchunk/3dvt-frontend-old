import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import Segmentasi from "./pages/segmentasi/segmentasi";
import Rekonstruksi3d from "./pages/rekonstruksi3d/rekonstruksi3d";
import Feedback from "./pages/feedback/feedback";
import PersistentDrawerLeft from "./components/navigation/navigation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistentDrawerLeft />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/segmentasi" element={<Segmentasi />} />
          <Route path="/rekonstruksi" element={<Rekonstruksi3d />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
