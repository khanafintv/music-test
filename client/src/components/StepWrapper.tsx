import { Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";

interface StepWrapperProps {
  activeStep: number;
  children: any;
}
const steps = ["Информация о треке", "Загрузка обложки", "Загрузка аудио"];

export const StepWrapper: React.FC<StepWrapperProps> = ({
  activeStep,
  children,
}) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid>
        <Card style={{ padding: 8, marginTop: 16 }}>{children}</Card>
      </Grid>
    </Container>
  );
};
