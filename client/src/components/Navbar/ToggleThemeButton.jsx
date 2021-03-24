import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SunIcon from "@material-ui/icons/Brightness7";
import MoonIcon from "@material-ui/icons/Brightness4";
import { useTheme } from "@material-ui/core";
import { useDispatch } from "react-redux";

function ToggleThemeButton() {
  const themeType = useTheme().palette.type;
  const dispatch = useDispatch();

  return (
    <div>
      <IconButton
        style={{ color: "black" }}
        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      >
        {themeType === "dark" ? <SunIcon /> : <MoonIcon />}
      </IconButton>
    </div>
  );
}

export default ToggleThemeButton;
