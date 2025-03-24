// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FlagProvider } from '@nunogois/unleash-react-native';

const featureConfig = {
  url: 'https://features.evermix.io/api/frontend',
  clientKey: 'default:development.unleash-insecure-frontend-api-token',
  refreshInterval: 15,
  appName: 'evermix-app'
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
        <FlagProvider config={featureConfig}>
          <Stack>
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </FlagProvider>
      </ThemeProvider>
    </Provider>
  );
}
