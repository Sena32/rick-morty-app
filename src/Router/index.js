import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutContainer from "../components/layout-container";
import DetailCharacter from "../pages/detail-character";
import DetailEpisode from "../pages/detail-episode";
import DetailLocation from "../pages/detail-location";
import ListEpisode from "../pages/list-episode";
import ListLocation from "../pages/list-location";
import Main from "../pages/main";


function Router() {
  return (
    <Routes>
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<Main/>} />
        <Route path="personagem/:id" element={<DetailCharacter />} />
        <Route path="episodio" element={<ListEpisode />} />
        <Route path="episodio/:id" element={<DetailEpisode />} />
        <Route path="localizacao" element={<ListLocation />} />
        <Route path="localizacao/:id" element={<DetailLocation />} />
      </Route>
    </Routes>
  );
}

export default Router;
