/**
 * A collection of colors used in the theme.
 * @type {Object}
 */
const themeColors = {
  primary: '#141414',
  secondary: '#F1C336',
  gray: '#7B7B7B',
  error: '#E53E3E',
  pink: '#BA25EB',
  orange: '#F39C3C',
  lightBlue: '#3787FC',
  red: '#DD2C2C',
  darkBlue: '#374dfc',
  transparent: 'transparent'
};

/**
 * A collection of common colors used in the theme.
 * @type {Object}
 */
const commonColors = {
  white: '#FFFFFF',
  black: '#000000',
  transparentBlack: '#00000000',
  transparentWhite: '#FFFFFF00'
};

/**
 * A light theme object.
 * @returns {ThemeColors}
 */
const light = {
  ...themeColors,
  black: commonColors.black,
  white: commonColors.white,
  transparentWhite: commonColors.transparentWhite,
  transparentBlack: commonColors.transparentBlack
};

/**
 * A dark theme object.
 * @returns {ThemeColors}
 */
const dark = {
  ...themeColors,
  black: commonColors.white,
  white: commonColors.black,
  transparentWhite: commonColors.transparentBlack,
  transparentBlack: commonColors.transparentWhite
};

export type ThemeMode = 'light' | 'dark';

export default { light, dark };
