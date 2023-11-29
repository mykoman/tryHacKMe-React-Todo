import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import DenseAppBar from "./app-bar";
import StateTextFields from "./input";
import CheckboxList from "./list";

export default function SimpleContainer(props:any) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <DenseAppBar></DenseAppBar>
        <StateTextFields></StateTextFields>
        <CheckboxList></CheckboxList>
      </Container>
    </React.Fragment>
  );
}
