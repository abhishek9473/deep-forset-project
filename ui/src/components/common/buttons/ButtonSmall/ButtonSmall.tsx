import React from "react";
import { Button, ButtonProps } from "@mui/material";
import style from "./ButtonSmall.module.css";
import { ButtonType, SmallButtonColor } from "../AllButtonProps";

export interface ButtonSmallProps extends ButtonProps {
  colorVarient?: SmallButtonColor;
  label: string;
  types: ButtonType;
}

const ButtonSmall: React.FC<ButtonSmallProps> = React.memo(
  ({
    colorVarient = SmallButtonColor.Orange,
    label,
    types = ButtonType.Button,
    sx,
    ...props
  }) => {
    const buttonClass = `${style.ButtonSmall} ${
      style[`ButtonSmall--${colorVarient}`]
    }`;
    const disableRipple = colorVarient === SmallButtonColor.Transparent;

    return (
      <Button
        sx={{
          width: "75px",
          height: "30px",
          font: "normal normal 600 13px/17px Source Serif Pro",
          ...sx,
        }} // Default width with sx override
        className={buttonClass}
        variant="contained"
        type={types}
        {...props}
        disableRipple={disableRipple}
        disableElevation // Disable button shadow
        aria-label={label} // Improve accessibility
      >
        {label}
      </Button>
    );
  }
);

export default ButtonSmall;
