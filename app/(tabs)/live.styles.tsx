import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  container: {
    flex: 1,
  },
  publisher_camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  footer_container: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
  },
  mute_container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  stream_container: {
    flex: 1,
    alignItems: 'center',
  },
  controller_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});