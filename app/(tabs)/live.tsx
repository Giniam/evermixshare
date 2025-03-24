import React, { useRef, useState} from 'react'

import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/Button';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedButton } from '@/components/ThemedButton';
import MicrophoneSelectModal from '@/components/MicrophoneSelect';
import LiveBadge from '@/components/LiveBadge';

import usePermissions from '@/hooks/usePermissions';
import styles from './live.styles';

import RTMPPublisher, {
  RTMPPublisherRefProps,
  StreamState,
  AudioInputType,
  BluetoothDeviceStatuses,
} from 'react-native-rtmp-publisher';


// const STREAM_URL = 'YOUR_STREAM_URL'; // ex: rtmp://a.rtmp.youtube.com/live2
// const STREAM_NAME = 'YOUR_STREAM_NAME'; // ex: abcd-1234-abcd-1234-abcd

const MC_STREAM_KEY = '457628a8cb5d41359e6c1c2d4baaf5a4';
// const MC_STREAM = `rtmp://rtmp.mixcloud.com/broadcast/${MC_STREAM_KEY}`;
const MC_STREAM = `rtmp://rtmp.mixcloud.com/broadcast`;
const MC_STREAM_NAME = 'test-stream';

export default function LiveTabScreen() {

  const publisherRef = useRef<RTMPPublisherRefProps>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasBluetoothDevice, setHasBluetoothDevice] = useState<boolean>(false);
  const [microphoneModalVisibility, setMicrophoneModalVisibility] =
    useState<boolean>(false);

  const { permissionGranted } = usePermissions();

  const handleOnConnectionFailed = (data: String) => {
    console.log('Connection Failed: ' + data);
  };

  const handleOnConnectionStarted = (data: String) => {
    console.log('Connection Started: ' + data);
  };

  const handleOnConnectionSuccess = () => {
    console.log('Connected');
    setIsStreaming(true);
  };

  const handleOnDisconnect = () => {
    console.log('Disconnected');
    setIsStreaming(false);
  };

  const handleOnNewBitrateReceived = (data: number) => {
    console.log('New Bitrate Received: ' + data);
  };

  const handleOnStreamStateChanged = (data: StreamState) => {
    console.log('Stream Status: ' + data);
  };

  const handleUnmute = () => {
    publisherRef.current && publisherRef.current.unmute();
    setIsMuted(false);
  };

  const handleMute = () => {
    publisherRef.current && publisherRef.current.mute();
    setIsMuted(true);
  };

  const handleStartStream = () => {
    publisherRef.current && publisherRef.current.startStream();
  };

  const handleStopStream = () => {
    publisherRef.current && publisherRef.current.stopStream();
  };

  const handleSwitchCamera = () => {
    publisherRef.current && publisherRef.current.switchCamera();
  };

  const handleToggleMicrophoneModal = () => {
    setMicrophoneModalVisibility(!microphoneModalVisibility);
  };

  const handleMicrophoneSelect = (selectedMicrophone: AudioInputType) => {
    publisherRef.current &&
      publisherRef.current.setAudioInput(selectedMicrophone);
  };

  const handleBluetoothDeviceStatusChange = (
    status: BluetoothDeviceStatuses
  ) => {
    switch (status) {
      case BluetoothDeviceStatuses.CONNECTED: {
        setHasBluetoothDevice(true);
        break;
      }

      case BluetoothDeviceStatuses.DISCONNECTED: {
        setHasBluetoothDevice(false);
        break;
      }

      default:
        break;
    }
  };



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
        <ThemedText type="title">Go Live!</ThemedText>
      </ThemedView>
      <ThemedText>Will start a YT live stream.</ThemedText>
      {/* <ThemedButton title="Live" onPress={() => goLive()} /> */}

      {permissionGranted && (
        <RTMPPublisher
          ref={publisherRef}
          streamURL={MC_STREAM}
          streamName={MC_STREAM_KEY}
          style={styles.publisher_camera}
          onDisconnect={handleOnDisconnect}
          onConnectionFailed={handleOnConnectionFailed}
          onConnectionStarted={handleOnConnectionStarted}
          onConnectionSuccess={handleOnConnectionSuccess}
          onNewBitrateReceived={handleOnNewBitrateReceived}
          onStreamStateChanged={handleOnStreamStateChanged}
          onBluetoothDeviceStatusChanged={handleBluetoothDeviceStatusChange}
        />
      )}
      <ThemedView style={styles.footer_container}>
        <ThemedView style={styles.mute_container}>
          {isMuted ? (
            <Button type="circle" title="🔇" onPress={handleUnmute} />
          ) : (
            <Button type="circle" title="🔈" onPress={handleMute} />
          )}
        </ThemedView>
        <ThemedView style={styles.stream_container}>
          {isStreaming ? (
            <Button type="circle" title="🟥" onPress={handleStopStream} />
          ) : (
            <Button type="circle" title="🔴" onPress={handleStartStream} />
          )}
        </ThemedView>
        <ThemedView style={styles.controller_container}>
          <Button type="circle" title="📷" onPress={handleSwitchCamera} />
          {(Platform.OS === 'ios' || hasBluetoothDevice) && (
            <Button
              type="circle"
              title="🎙"
              onPress={handleToggleMicrophoneModal}
            />
          )}
        </ThemedView>
      </ThemedView>
      {isStreaming && <LiveBadge />}
      <MicrophoneSelectModal
        onSelect={handleMicrophoneSelect}
        visible={microphoneModalVisibility}
        onClose={handleToggleMicrophoneModal}
      />


    </ParallaxScrollView>
  );
}

