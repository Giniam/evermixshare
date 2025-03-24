// services/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function checkUserLoggedIn() {
  const userToken = await AsyncStorage.getItem('userToken');
  return !!userToken;
}
