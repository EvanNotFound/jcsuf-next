'use client'
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {IconButton} from '@primer/react'
import { useTheme as GHuseTheme } from '@primer/react';
import { SunIcon, MoonIcon } from '@primer/octicons-react';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { setColorMode } = GHuseTheme();

  const toggleTheme = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark');
      setColorMode('night');
    } else {
      setTheme('light');
      setColorMode('day');
    }
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <IconButton aria-label="Search" icon={resolvedTheme === 'light' ? MoonIcon : SunIcon} onClick={toggleTheme} />
    </div>
  );
}