"use client"

import { useEffect, useState } from "react";
import { MoonStar, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import {
  FieldSet, 
  FieldLegend, 
  FieldLabel,
} from "./field";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const themes = [
  { theme: 'light', icon: Sun }, 
  { theme: 'system', icon: Monitor}, 
  { theme: 'dark', icon: MoonStar},
];

const ThemeToggle = ({ className }: React.ComponentProps<"fieldset">) => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <FieldSet className={`w-auto h-auto rounded-full flex items-center ${className}`}>
      <FieldLegend className="sr-only">Chose color theme preference</FieldLegend>
      <RadioGroup
        value={theme}
        onValueChange={setTheme}
        orientation="horizontal" 
        className="w-auto h-auto p-px flex items-center gap-px bg-card border rounded-full">
        {themes.map((th) => {
          return (
            <FieldLabel
              key={th.theme}
              htmlFor={`radio-${th.theme}`}
              className="relative size-6 p-0 flex items-center justify-center has-data-checked:bg-border dark:has-data-checked:bg-border rounded-full">
              <RadioGroupItem
                value={th.theme} 
                id={`radio-${th.theme}`} 
                className="absolute sr-only" />
              <span className="sr-only">Set theme preference: {th.theme}</span>
              {<th.icon size={14} aria-hidden={true} className="shrink-0 inline-block"/>}
            </FieldLabel>
          )
        })}
      </RadioGroup>
    </FieldSet>
  )
};

export default ThemeToggle