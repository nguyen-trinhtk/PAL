/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#828282';
const tintColorDark = '#dddddd';

export const Colors = {
  light: {
    text: '#4b4b4b',
    background: '#fcfcfc',
    tint: tintColorLight,
    emphasizedButton: '626262',
    secondaryButton: 'd9d9d9',
    tabIconDefault: '#fcfcfc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#f7f7f7',
    background: '#333333',
    tint: tintColorDark,
    emphasizedButton: 'f9f9f9',
    secondaryButton: '828282',
    tabIconDefault: '#fcfcfc',
    tabIconSelected: tintColorDark,
  },
};
