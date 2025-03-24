// app/index.tsx
import { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    CircularStdBlack: require('@/assets/fonts/circular_std_black.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      if (!fontsLoaded) return;

      const onboarded = await AsyncStorage.getItem('hasOnboarded');
      const userToken = await AsyncStorage.getItem('userToken');

      if (userToken) {
        router.replace('/(tabs)');
      } else if (onboarded === 'true') {
        router.replace('/subscription');
      } else {
        router.replace('/onboard');
      }

      SplashScreen.hideAsync();
    }

    prepare();
  }, [fontsLoaded]);

  return <View style={{ flex: 1, backgroundColor: '#000' }} />;
}
