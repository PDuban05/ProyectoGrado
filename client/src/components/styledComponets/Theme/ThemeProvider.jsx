import GlobalStyles from "./GlobalStyles";
import { ThemeContext } from "./themeContext";
import { themes } from "./themes";
import { useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <StyledThemeProvider theme={themes[theme]}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
