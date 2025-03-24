import React, { useRef } from 'react'
import { Image, StyleSheet, Platform } from 'react-native';
import { Audio } from 'expo-av'

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedRecorderSheet, type ThemedRecorderSheetRef } from '@/components/ThemedRecorderSheet';
import { ThemedButton } from '@/components/ThemedButton';
import translations from '@/app/translations'
import { I18n } from 'i18n-js';
//TODO - this should be a hook or somethign centrally set...
const i18n = new I18n(translations);
import { useStatsigClient, StatsigProviderExpo } from "@statsig/expo-bindings";
import { useFlag } from '@nunogois/unleash-react-native';

export default function HomeScreen() {
  const recorderRef = useRef<ThemedRecorderSheetRef>(null)
  const { client } = useStatsigClient();

  const enabled = useFlag('evm.ui.index.cta');

  const openRecorder = async () => {
    const permissionStatus = await Audio.requestPermissionsAsync()
    if (!permissionStatus.granted) return
    recorderRef.current?.present()
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#000000', dark: '#000000' }}
      headerImage={
        <Image
          source={require('@/assets/images/evermix-logo-banner.png')}
          style={styles.evermixHeaderLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText>{client.checkGate('example_feature_flag') ? 'Feature Enabled!' : 'Hello, World!'}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{i18n.t('index.title')}</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{i18n.t('index.subtitle')}</ThemedText>
        <ThemedText>
          {i18n.t('index.cta')}
        </ThemedText>
        <ThemedText>
          { enabled ? 'Unleash the feature flags' : 'Feature flags aint enabled'}
        </ThemedText>
        <ThemedButton title={i18n.t('recorder.open')} onPress={() => openRecorder()} />
        <ThemedRecorderSheet ref={recorderRef} />
      </ThemedView> 
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  evermixHeaderLogo: {
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

