import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutContainer from "../components/layout-container";
import DetailCharacter from "../pages/detail-character";
import DetailEpisode from "../pages/detail-episode";
import Main from "../pages/main";


function Router() {
  return (
    <Routes>
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<Main/>} />
        <Route path="personagem/:id" element={<DetailCharacter />} />
        <Route path="episodio" element={<Main />} />
        <Route path="episodio/:id" element={<DetailEpisode />} />
        <Route path="localizacao" element={<Main />} />
        <Route path="localizacao/:id" element={<Main />} />
      </Route>
    </Routes>
  );
}

export default Router;
