// hooks/useInitializeApp.ts
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export function useInitializeApp() {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    CircularStdBlack: require('@/assets/fonts/circular_std_black.ttf'),
  });

  const router = useRouter();

  useEffect(() => {
    async function prepare() {
      if (!fontsLoaded) return;

      const onboarded = await AsyncStorage.getItem('hasOnboarded');

      if (onboarded === 'true') {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboard');
      }

      setIsReady(true);
      SplashScreen.hideAsync();
    }

    prepare();
  }, [fontsLoaded]);

  return isReady;
}
