import React from "react";
import { Button, ButtonProps, CircularProgress } from "@mui/material";
import style from "./ButtonXLarge.module.css";
import { ButtonType, ButtonXLargeColor } from "../AllButtonProps";

interface ButtonXLargeProps extends ButtonProps {
  isLoading: boolean;
  colorVarient?: ButtonXLargeColor;
  label: string;
  fullwidth?: boolean;
  types: ButtonType;
  onClick?: (someValue: any) => void;
}

const ButtonXLarge: React.FC<ButtonXLargeProps> = React.memo(
  ({
    isLoading = false,
    colorVarient = ButtonXLargeColor.Orange,
    label,
    fullwidth = true,
    types = ButtonType.Button,
    onClick,
    ...props
  }) => {
    const buttonClass = `
    ${style.ButtonXLarge}
    ${style[`ButtonXLarge--default`]}
    ${style[`ButtonXLarge--${colorVarient}`]}
    ${fullwidth ? style["ButtonXLarge--fullwidth"] : ""}
  `;

    return (
      <Button
        disableElevation
        variant="contained"
        type={types}
        className={buttonClass}
        {...props}
        aria-label={label}
      >
        {isLoading ? <CircularProgress color="inherit" size={25} /> : label}
      </Button>
    );
  }
);

export default ButtonXLarge;
