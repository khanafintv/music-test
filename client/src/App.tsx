import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Create } from "./pages/create";

import { Home } from "./pages/home";
import { SingleTrackPage } from "./pages/singletrack";
import { Test } from "./pages/test";
import { TracksPage } from "./pages/tracks";
import { fetchTracks } from "./store/actions-creators/track";

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTracks());
  // }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracks" element={<TracksPage />} />
        <Route path="/tracks/:id" element={<SingleTrackPage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
};

export default App;
