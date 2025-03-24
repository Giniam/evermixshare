// app/subscriptionFlow.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';

export default function SubscriptionFlowScreen() {
  const { evermixBox } = useLocalSearchParams();
  const router = useRouter();

  if (evermixBox === 'Sim') {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.infoText}>EvermixBox: Sim</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Image
        source={require('@/assets/images/subscription_page_1.png')}
        style={styles.topImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Subscribe to Evermix
        </Text>

        <View style={styles.pricingContainer}>
          <TouchableOpacity style={styles.planBox}>
            <Text style={styles.planTitle}>Monthly</Text>
            <Text style={styles.planPrice}>$9.99/month</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.planBox}>
            <Text style={styles.planTitle}>Yearly</Text>
            <Text style={styles.planPrice}>$99.99/year</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={() => {
            router.replace('/(tabs)');
          }}
        >
          <Text style={styles.subscribeButtonText}>SUBSCRIBE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    fontSize: 24,
  },
  topImage: {
    width: '100%',
    height: '50%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  pricingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  planBox: {
    flex: 1,
    paddingVertical: 16,
    marginHorizontal: 8,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#444',
    alignItems: 'center',
  },
  planTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  planPrice: {
    color: '#00F5FA',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subscribeButton: {
    backgroundColor: '#00F5FA',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  subscribeButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
