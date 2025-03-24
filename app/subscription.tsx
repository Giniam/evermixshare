import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';


const EvermixLogo = require('@/assets/images/evermix-logo-banner.png');

export default function SubscriptionScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [hasEvermixBox, setHasEvermixBox] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Image source={EvermixLogo} style={styles.logo} resizeMode="contain" />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>
          Subscribe to Evermix to support further development and gain access to all the new features and subscriber benefits
        </Text>

        <View style={styles.benefitsBox}>
          {[
            'Record & edit in professional quality',
            'Link and share to your streaming platforms',
            'Livestream to major platforms',
            'Promo downloads and exclusive offers & discounts',
          ].map((item, index) => (
            <View key={index} style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={22} color="#00F5FA" style={{ marginRight: 8 }} />
              <Text style={styles.benefitText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.checkboxLabel}>I have an EvermixBox (discounted prices)</Text>
          <View style={styles.switchWrapper}>
            <Switch
              value={hasEvermixBox}
              onValueChange={setHasEvermixBox}
              trackColor={{ false: '#444', true: '#444' }}
              thumbColor={hasEvermixBox ? '#8FBE00' : '#444'}
            />
          </View>
        </View>


        <View style={styles.pricingContainer}>
          <TouchableOpacity
            style={[
              styles.planBox,
              selectedPlan === 'monthly' && styles.planBoxSelected,
            ]}
            onPress={() => setSelectedPlan('monthly')}
          >
            <Text style={styles.planTitle}>Monthly</Text>
            <Text style={styles.planPrice}>
              {hasEvermixBox ? '$4.99' : '$9.99'}/month
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.planBox,
              selectedPlan === 'yearly' && styles.planBoxSelected,
            ]}
            onPress={() => setSelectedPlan('yearly')}
          >
            <Text style={styles.planTitle}>Yearly</Text>
            <Text style={styles.planPrice}>
              {hasEvermixBox ? '$49.99' : '$99.99'}/year
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => {
            router.push(`/subscriptionFlow?evermixBox=${hasEvermixBox ? "Sim" : "Não"}`);
          }}
        >
          <Text style={styles.getStartedButtonText}>GET STARTED</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  logo: {
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  benefitsBox: {
    backgroundColor: '#1C1C1E',
    borderRadius: 25,
    padding: 20,
    marginBottom: 30,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  benefitText: {
    color: '#fff',
    fontSize: 14,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 30,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: '#00F5FA',
    borderColor: '#00F5FA',
  },
  checkboxLabel: {
    color: '#fff',
    fontSize: 15,
  },
  pricingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  planBox: {
    flex: 1,
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#444',
    alignItems: 'center',
  },
  planBoxSelected: {
    borderColor: '#8FBE00',
    backgroundColor: '#1C1C1E',
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
  getStartedButton: {
    backgroundColor: '#00F5FA',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    top: 200
  },
  getStartedButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
