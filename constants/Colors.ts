/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4'
const tintColorDark = '#fff'

export const Colors = {
  light: {
    text: '#FFF',
    button: '#000000',
    background: '#000',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    recorderBackground: '#000',
    recorderProgress: 'rgba(121, 135, 160, 0.2)',
    recorderTimeline: 'rgba(0, 0, 0, 0.5)',
    recorderTint: tintColorLight,
    recorderWaveformInactive: '#687076',
    recorderSheet: '#000',
    recorderIcon: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    button: '#1D3D47',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    recorderBackground: '#20242c',
    recorderProgress: 'rgba(13, 14, 17, 0.5)',
    recorderTimeline: 'rgba(255, 255, 255, 0.5)',
    recorderTint: tintColorLight,
    recorderWaveformInactive: '#7987a0',
    recorderSheet: '#282e37',
    recorderIcon: tintColorDark,
  },
}