import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { FileUpload } from "../components/FileUpload";
import { StepWrapper } from "../components/StepWrapper";
import { useInput } from "../hooks/useInput";
import { MainLayout } from "../layouts/MainLayout";

export const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState("");
  const [audio, setAudio] = useState("");
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");

  const next = () => {
    if (activeStep !== 2) {
      // setActiveStep((prev) => prev + 1);
      setActiveStep(activeStep + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("text", text.value);
      formData.append("picture", picture);
      formData.append("audio", audio);
      axios.post("http://localhost:5000/tracks", formData);
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };
  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container>
            <TextField
              {...name}
              label={"Название трека"}
              fullWidth
              style={{ marginTop: 8 }}
            />
            <TextField
              {...artist}
              label={"Имя исполнителя"}
              fullWidth
              style={{ marginTop: 8 }}
            />
            <TextField
              {...text}
              label={"Текст трека"}
              fullWidth
              multiline
              rows={4}
              style={{ marginTop: 8 }}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept={"image/*"}>
            <Button> Загрузите обложку</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept={"audio/*"}>
            <Button> Загрузите аудио</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Box paddingTop={4}>
        <Grid container justifyContent="space-between">
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={back}
          >
            Назад
          </Button>
          <Button
            variant="contained"
            // disabled={activeStep === 3}
            onClick={next}
          >
            Далее
          </Button>
        </Grid>
      </Box>
    </MainLayout>
  );
};
