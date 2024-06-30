import React from "react";
import { Button, ButtonProps } from "@mui/material";
import style from "./ButtonXLarge.module.css";
import { ButtonType, ButtonXLargeColor } from "../AllButtonProps";

interface ButtonXLargeProps extends ButtonProps {
  colorVarient?: ButtonXLargeColor;
  label: string;
  fullwidth?: boolean;
  types?: ButtonType;
  onClick?: (someValue: any) => void;
}

const ButtonXLarge: React.FC<ButtonXLargeProps> = React.memo(
  ({
    colorVarient = ButtonXLargeColor.Orange,
    label,
    fullwidth = true,
    types = ButtonType.Submit,
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
        {label}
      </Button>
    );
  }
);

export default ButtonXLarge;
