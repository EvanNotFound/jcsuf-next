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

  if (!mounted) return(
    <div className='gh-border dark:border-gh-darkborder px-[7px] py-[7px] items-center flex justify-center rounded-md '>
      <MoonIcon size={16}/>
    </div>
  ) ;

  return (
    <div>
      <IconButton aria-label="ChangeTheme" icon={resolvedTheme === 'light' ? MoonIcon : SunIcon} onClick={toggleTheme} />
    </div>
  );
}