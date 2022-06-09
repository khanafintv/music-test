import { MainLayout } from "../layouts/MainLayout";

import { TrackList } from "../components/TrackList";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTracks } from "../store/actions-creators/track";

export const TracksPage = () => {
  const { tracks, error } = useTypedSelector((state) => state.track);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTracks());
  }, [tracks]);

  return (
    <MainLayout>
      <Grid>
        <h1>Список треков</h1>
        <Button onClick={() => navigate("/create")}>Загрузить</Button>
        <TrackList tracks={tracks} />
      </Grid>
    </MainLayout>
  );
};
