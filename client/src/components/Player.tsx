import { PauseRounded, PlayArrowRounded } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";

import styles from "../styles/Player.module.scss";
import { TrackProgress } from "./TrackProgress";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import {
  pauseTrack,
  playTrack,
  setActiveTrack,
  setCurrentTime,
  setDuration,
  setVolume,
} from "../store/actions-creators/player";
import React, { useEffect } from "react";

let audio: any;

export const Player = () => {
  //let audio: any;
  const { pause, vol, active, duration, currentTime } = useTypedSelector(
    (state) => state.player
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      //dispatch(playTrack());
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      //audio.src = "http://localhost:5000/audio/1.mp3";
      audio.src = "http://localhost:5000/" + active.audio;
      audio.volume = vol / 100;

      audio.onloadedmetadata = () => {
        dispatch(setDuration(Math.ceil(audio.duration)));
      };

      audio.ontimeupdate = () => {
        dispatch(setCurrentTime(Math.ceil(audio.currentTime)));
      };
    }
  };

  const play: any = () => {
    if (pause) {
      dispatch(playTrack());
      audio.play();
    } else {
      dispatch(pauseTrack());
      audio.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    dispatch(setVolume(Number(e.target.value)));
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    dispatch(setCurrentTime(Number(e.target.value)));
  };

  if (!active) {
    return null;
  }

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {!pause ? <PauseRounded /> : <PlayArrowRounded />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{active.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{active.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
        //onChange={() => ({})}
      />
      <VolumeUpRounded style={{ marginLeft: "auto" }} />
      <TrackProgress left={vol} right={100} onChange={changeVolume} />
    </div>
  );
};
