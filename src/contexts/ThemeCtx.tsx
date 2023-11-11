import React from "react";

//INIT interface
interface IThemeContext {
  theme: string;
}

const INIT_THEME_CONTEXT = {
  theme: "light",
};

//create Context
export const themeCtx = React.createContext<IThemeContext>({
  ...INIT_THEME_CONTEXT,
});

//init interface Provider
interface IProviderTheme {
  children: JSX.Element;
}

//Provider
export default function ThemeProvider(props: IProviderTheme): JSX.Element {
  const [theme, setTheme] = React.useState(INIT_THEME_CONTEXT.theme);

  const setters = {
    setTheme,
  };

  return (
    <themeCtx.Provider value={{ theme, ...setters }}>
      {props.children}
    </themeCtx.Provider>
  );
}
