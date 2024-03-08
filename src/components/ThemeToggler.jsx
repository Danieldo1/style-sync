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
      sunColor="#F0F065"
      moonColor="#CECFD2"
      style={{
       marginBottom: "0.25rem",
      }}
    />
  );
};

export default DarkModeSwitchCustom;
