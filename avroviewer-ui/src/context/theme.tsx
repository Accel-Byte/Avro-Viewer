import { createContext, useContext, useState, ReactNode } from "react";

type Theme = {
  primary: string;
  headerBg: string;
  hover: string;
  selectedBg: string;
  selectedText: string;
  headerBorder: string;
};

const themes: Record<string, Theme> = {
  indigo: {
    primary: "bg-indigo-600",
    headerBg: "bg-indigo-100",
    hover: "hover:bg-indigo-50",
    selectedBg: "bg-indigo-100",
    selectedText: "text-indigo-800",
    headerBorder: "bg-indigo-200",
  },
  blue: {
    primary: "bg-blue-600",
    headerBg: "bg-blue-100",
    hover: "hover:bg-blue-50",
    selectedBg: "bg-blue-100",
    selectedText: "text-blue-800",
    headerBorder: "bg-blue-200",
  },
  emerald: {
    primary: "bg-emerald-600",
    headerBg: "bg-emerald-100",
    hover: "hover:bg-emerald-50",
    selectedBg: "bg-emerald-100",
    selectedText: "text-emerald-800",
    headerBorder: "bg-emerald-200",
  },
  rose: {
    primary: "bg-rose-600",
    headerBg: "bg-rose-100",
    hover: "hover:bg-rose-50",
    selectedBg: "bg-rose-100",
    selectedText: "text-rose-800",
    headerBorder: "bg-rose-200",
  },
  purple: {
    primary: "bg-purple-600",
    headerBg: "bg-purple-100",
    hover: "hover:bg-purple-50",
    selectedBg: "bg-purple-100",
    selectedText: "text-purple-800",
    headerBorder: "bg-purple-200",
  },
};

type ThemeContextType = {
  currentTheme: string;
  theme: Theme;
  setTheme: (themeName: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<string>("indigo");

  const setTheme = (themeName: string) => setCurrentTheme(themeName);

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
