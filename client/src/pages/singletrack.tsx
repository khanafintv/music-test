import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

import "../styles/style.scss";

export const SingleTrackPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [track, setTrack]: any = useState({});

  const fetchTrack = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tracks/${id}`);
      setTrack(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTrack();
  }, [id]);

  //fetchTrack();

  return (
    <MainLayout>
      <Button
        style={{ marginBottom: 8 }}
        variant={"outlined"}
        onClick={() => navigate("/tracks")}
      >
        К списку треков
      </Button>

      <Grid container>
        {track.picture && (
          <img
            src={`http://localhost:5000/${track.picture}`}
            width={200}
            height={200}
            alt=""
          />
        )}
        <div className="track-info-card">
          <h1>Название трека - {track.name}</h1>
          <h3>Исполнитель - {track.artist}</h3>
          <h3>Кол-во прослушиваний - {track.listens}</h3>
        </div>
      </Grid>
      <h2>Слова к треку</h2>
      <p>{track.text}</p>
      <Grid container>
        <TextField label="Ваше Имя" fullWidth></TextField>
        <TextField label="Комментарий" fullWidth multiline rows={4}></TextField>
        <Button>Отправить</Button>
      </Grid>
    </MainLayout>
  );
};
