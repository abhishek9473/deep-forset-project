import React from "react";
import { Button, ButtonProps } from "@mui/material";
import style from "./ButtonSmall.module.css";
import { ButtonType, SmallButtonColor } from "../AllButtonProps";
// import LoaderDualX from "../../Loaders/LoaderDualX";
// import { ButtonType, SmallButtonColor } from "../AllButtonProps";

export interface ButtonSmallProps extends ButtonProps {
  colorVarient?: SmallButtonColor;
  label: string;
  types: ButtonType;
  loaderLogin?: boolean;
}

const ButtonSmall: React.FC<ButtonSmallProps> = React.memo(
  ({
    colorVarient = SmallButtonColor.Orange, // Default color variant
    label,
    types = ButtonType.Submit, // Default button type
    loaderLogin = false,
    sx,
    ...props
  }) => {
    // Runtime prop validation
    if (!label) {
      console.error("The 'label' prop is required for ButtonSmall component.");
    }

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
