import { ReactNode } from "react";

import { AppBar } from "@mui/material";

export default function Main(props: { children: ReactNode }) {
    return <AppBar>{props.children}</AppBar>
}