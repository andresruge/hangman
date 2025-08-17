import { useState, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const primaryColor = useMemo(
    () => (theme === "light" ? "black" : "white"),
    [theme]
  );

  const value = useMemo(
    () => ({ theme, toggleTheme, primaryColor }),
    [theme, toggleTheme, primaryColor]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
