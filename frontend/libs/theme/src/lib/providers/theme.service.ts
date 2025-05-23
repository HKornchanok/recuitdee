import { Injectable } from "@angular/core";

const THEME_KEY = 'theme-preference';

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  public getStoredTheme(): boolean {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === 'dark' ? true : false;
  }

  public storeTheme(isDarkMode: boolean): void {
    localStorage.setItem(THEME_KEY, isDarkMode ? 'dark' : 'light');
  }

  public setTheme(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  
  public toggleTheme(isDarkMode: boolean): boolean {
    const newIsDarkMode = !isDarkMode;
    if (newIsDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    this.storeTheme(newIsDarkMode);
    return newIsDarkMode;
  }
}
