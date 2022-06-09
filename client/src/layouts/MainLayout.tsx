import { Container } from "@mui/material";
import Navbar from "../components/Navbar";

import { FC } from "react";

import { Player } from "../components/Player";

export const MainLayout: FC<any> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container style={{ paddingBottom: "70px" }}>{children}</Container>
      {/* <Player /> */}
    </>
  );
};
