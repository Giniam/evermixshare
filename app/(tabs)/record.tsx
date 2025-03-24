import React, { useRef, useState, useEffect } from 'react'
import * as FileSystem from 'expo-file-system';

import { StyleSheet, Image, Platform, Button } from 'react-native';
import { Audio } from 'expo-av'
import {
  AndroidAudioEncoder,
  AndroidOutputFormat,
  IOSOutputFormat,
  Recording,
} from 'expo-av/build/Audio';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { Recorder, type RecorderRef } from '@lodev09/expo-recorder'
import { ThemedButton } from '@/components/ThemedButton';
import { uploadToEvermix } from '@/utils/uploadToEvermix';


export default function RecordTabScreen() {
  const [recording, setRecording] = useState<Recording>();
  const [update, setUpdate] = React.useState(false);
  // const uploadServer = `${process.env.EXPO_PUBLIC_API_URL}/dms/uploads`
  const uploadServer = `http://192.168.0.32:11044/dms/uploads`
  const recorder = useRef<RecorderRef>(null)
  const [uri, setUri] = React.useState("");

  useEffect(() => {
   
  }, [update]);

  // const record = async () => {
  //   await audioRecorder.prepareToRecordAsync();
  //   audioRecorder.record();
  // };

  // const stopRecord = async () => {
  //   // The recording will be available on `audioRecorder.uri`.
  //   await audioRecorder.stop();
  // };
  const openRecorder = async () => {
    const permissionStatus = await Audio.requestPermissionsAsync()
    if (!permissionStatus.granted) {
      console.log('permission grant required')
      return recorder.current
    } else {return recorder.current}
  }

  const startRecording = async () => {
    try {
      const currentRecorder = await openRecorder()
      if (currentRecorder) {
        const record = await currentRecorder.startRecording()
        console.log("Record result", record)
      } else {
        console.log('Cannot get current recorder')
      }
    } catch (exception) {
      console.error("Error", exception)
    }
  }

  const stopRecording = async () => {
    const record = await recorder.current?.stopRecording()
    if (record?.uri) {
      console.log(record.uri) // Save the uri somewhere! 🎉
      const fileName = record.uri.substring(record.uri.lastIndexOf("/"))
      const finalDestination = `${FileSystem.documentDirectory}/${fileName}`
      console.log(`Moving to finalDestination=${finalDestination}`)
      FileSystem.moveAsync({
        from: record.uri, 
        to: finalDestination
      });
    }
  }

  async function startRecordingWav() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync({
        isMeteringEnabled: true,
        android: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
          extension: '.wav',
          outputFormat: AndroidOutputFormat.DEFAULT,
          audioEncoder: AndroidAudioEncoder.DEFAULT,
        },
        ios: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
          extension: '.wav',
          outputFormat: IOSOutputFormat.LINEARPCM,
          numberOfChannels: 2
        },
        web: {
          mimeType: 'audio/wav',
          bitsPerSecond: 128000,
        },
      });
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecordingWav() {
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording?.getURI();
    console.log('Recording stopped and stored at', uri);
    if (uri) {
      try {
        uploadToEvermix(uploadServer, uri)
      } catch (err) {
        console.log(err);
      }
      setUri(uri);
      setUpdate(!update);
    }
  } 

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Record</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <Recorder ref={recorder} />
      <ThemedButton title="Record" onPress={startRecording} />
      <ThemedButton title="Stop" onPress={stopRecording} /> 
      <ThemedText>{uri}</ThemedText>
      <ThemedButton title="WAV Record" onPress={startRecordingWav} />
      <ThemedButton title="WAV Stop" onPress={stopRecordingWav} /> 
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
