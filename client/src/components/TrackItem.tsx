import { Card, Grid, IconButton, IconButtonClasses } from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import { Delete, VolumeUpRounded } from "@mui/icons-material";

import { ITrack } from "../types/track";

import styles from "../styles/TrackItem.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  pauseTrack,
  playTrack,
  setCurrentTime,
  setDuration,
  setVolume,
} from "../store/actions-creators/player";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { TrackProgress } from "./TrackProgress";
import { useEffect } from "react";
import axios from "axios";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

let audio: any;
let srcActive: any;

export const TrackItem: React.FC<TrackItemProps> = ({
  track,
  active = false,
}) => {
  const { pause, duration, currentTime, vol } = useTypedSelector(
    (state) => state.player
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const play = (e: any) => {
  //   e.stopPropagation();
  //   dispatch(setActiveTrack(track));
  //   dispatch(playTrack());
  // };

  useEffect(() => {
    return () => {
      if (audio && srcActive) {
        audio.src = null;
        srcActive = null;
      }
    };
  }, []);

  let srcTrack = "http://localhost:5000/" + track.audio;

  const play2 = (e: any) => {
    e.stopPropagation();

    if (!audio) {
      audio = new Audio();
      srcActive = audio.src = "http://localhost:5000/" + track.audio;
      audio.volume = vol / 100;
    }

    audio.onloadedmetadata = () => {
      dispatch(setDuration(Math.ceil(audio.duration)));
    };

    audio.ontimeupdate = () => {
      dispatch(setCurrentTime(Math.ceil(audio.currentTime)));
    };

    if (srcActive === srcTrack) {
      if (pause) {
        dispatch(playTrack());
        audio.play();
      } else {
        dispatch(pauseTrack());
        audio.pause();
      }
    }

    if (srcActive !== srcTrack) {
      audio.src = null;
      srcActive = audio.src = "http://localhost:5000/" + track.audio;

      dispatch(playTrack());
      audio.play();
    }
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    dispatch(setCurrentTime(Number(e.target.value)));
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    dispatch(setVolume(Number(e.target.value)));
  };

  const deleteTrack = async (e: React.ChangeEvent<any>) => {
    e.stopPropagation();
    await axios.delete(`http://localhost:5000/tracks/${track._id}`);
  };

  return (
    <Card className={styles.track} onClick={() => navigate(`${track._id}`)}>
      <IconButton onClick={play2}>
        {srcActive === srcTrack && !pause ? (
          <PauseRounded />
        ) : (
          <PlayArrowRounded />
        )}
      </IconButton>
      <img
        src={`http://localhost:5000/${track.picture}`}
        style={{ width: "70px", height: "70px" }}
        alt={track.name}
      />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
      <Grid onClick={(e) => e.stopPropagation()}>
        {srcActive === srcTrack && (
          <TrackProgress
            left={currentTime}
            right={duration}
            onChange={changeCurrentTime}
          />
        )}
      </Grid>

      <Grid onClick={(e) => e.stopPropagation()} style={{ marginLeft: "auto" }}>
        {srcActive === srcTrack && (
          <div style={{ display: "flex" }}>
            <VolumeUpRounded />
            <TrackProgress left={vol} right={100} onChange={changeVolume} />
          </div>
        )}
      </Grid>

      <IconButton onClick={deleteTrack} style={{ marginLeft: "auto" }}>
        <Delete />
      </IconButton>
    </Card>
  );
};
