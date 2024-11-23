import { FC } from "react";
import { CardHeader } from "@mui/material";

interface AuthFormHeaderProps {
  title: string;
}

export const AuthFormHeader: FC<AuthFormHeaderProps> = (props) => {
  return (
    <CardHeader
      title={props.title}
      titleTypographyProps={{
        fontSize: "1.9rem",
        fontWeight: 600,
        fontFamily: "Radio Canada Big",
      }}
    />
  );
};
