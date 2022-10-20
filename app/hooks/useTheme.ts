import { useCallback, useMemo } from 'react';
import { useColorScheme, type ColorSchemeName } from 'react-native';
import { useStorage } from '../services';
import { type ThemeMode } from '../theme';
/**
 * A theme hook that returns the current theme and whether it is dark.
 * @param {(theme: ThemeMode) => T} styleSheetFn? - A function that returns a style sheet for the theme.
 * @returns An object with the following properties:
 * - isDark: boolean - flag for whether the theme is dark or not.
 * - theme: ThemeMode - current theme mode.
 * - styles?: T - current theme mode based styles.
 * - changeTheme: (value: ThemeMode) => void - if do you want to need to change current theme mode.
 */
const useTheme = <T>(
  styleSheetFn?: (theme: ThemeMode) => T
): {
  isDark: boolean;
  theme: ThemeMode;
  styles: T;
  changeTheme: (value: ThemeMode) => void;
} => {
  const theme: ColorSchemeName = useColorScheme();
  const currentThemeMode: ThemeMode = theme ?? 'light';
  const [themeMode, setThemeMode] = useStorage<string>('themeMode', currentThemeMode);
  const isDark = themeMode === 'dark';
  const styles = useMemo<T>(
    () => styleSheetFn?.(themeMode as ThemeMode) ?? ({} as T),
    [styleSheetFn, themeMode]
  );
  const changeTheme = useCallback<(value: ThemeMode) => void>(
    (value: ThemeMode) => {
      setThemeMode(value as string);
    },
    [setThemeMode]
  );
  return { isDark, theme: themeMode as ThemeMode, styles, changeTheme };
};
export default useTheme;
