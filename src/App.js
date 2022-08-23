import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import Segmentasi from "./pages/dataSegmentasi/dataSegmentasi";
import Rekonstruksi3d from "./pages/rekonstruksi3d/rekonstruksi3d";
import Feedback from "./pages/feedback/feedback";
import PersistentDrawerLeft from "./components/navigation/navigation";
import Pengaturan from "./pages/pengaturan/pengaturan";
import DataSegmentasi from "./pages/dataSegmentasi/dataSegmentasi";
import DataRekonstruksi from "./pages/dataRekonstruksi/dataRekonstruksi";
import User from "./pages/user/user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistentDrawerLeft />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/segmentasi" element={<Segmentasi />} />
          <Route path="/segmentasi/data" element={<DataSegmentasi />} />
          <Route path="/rekonstruksi" element={<Rekonstruksi3d />} />
          <Route path="/rekonstruksi/data" element={<DataRekonstruksi />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/pengaturan" element={<Pengaturan />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
