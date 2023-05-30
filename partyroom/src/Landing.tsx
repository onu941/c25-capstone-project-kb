import React from "react";
import { FullScreen } from "./components/Containers";
import { AppHeader, BodyHeader } from "./components/Header";

export default function Landing() {
  return (
    <FullScreen>
      <AppHeader></AppHeader>
      <BodyHeader title="Your next booking:"></BodyHeader>
    </FullScreen>
  );
}
