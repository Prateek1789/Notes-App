"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes";

const ThemeProvider = ({
  children, 
  ...props
}: React.ComponentProps<typeof NextThemeProvider>) => {
  return (
    <NextThemeProvider {...props}>
      { children }
    </NextThemeProvider>
  )
};

export default ThemeProvider