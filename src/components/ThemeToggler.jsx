"use client";

import { useTheme } from "next-themes";
import { DarkModeSwitch } from "react-toggle-dark-mode";
const DarkModeSwitchCustom = () => {
  const { setTheme, theme } = useTheme();
  return (
    <DarkModeSwitch
      onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      checked={theme === "dark"}
      size={24}
      sunColor="#040404"
      moonColor="#EFECEC"
    />
  );
};

export default DarkModeSwitchCustom;
