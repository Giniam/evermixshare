import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { Button, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginTest() {
  //TODO externalise this!
  const discovery = useAutoDiscovery('https://id.evermix.io/realms/oth_dev');
  const [request, result, promptAsync] = useAuthRequest(
    {
      clientId: 'oth_users',
      clientSecret: 'YRq6SHGqP5wQI4DOI5O6HAw3E9SARqfL',
      redirectUri: makeRedirectUri({ native: 'evermix:/authorize' }),
      scopes: ['openid', 'profile'],
    },
    discovery
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Login!" disabled={!request} onPress={() => promptAsync()} />
      {result && <Text>{JSON.stringify(result, null, 2)}</Text>}
    </View>
  );
}
