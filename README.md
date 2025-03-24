# Welcome to the Evermix user facing app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

0. PreReqs

If odd, navtive/linking errors happen during iOS builds, its almost certinally the ruby version and then reinstall cocoapods 

Modern Ruby (3.2+)
Cocoapods
Node/Yarn

If you want to manipulate images, on Mac inkscape is very usable
```
brew install inkscape
```

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app 

   a. iOS simulator

   ```bash
    yarn ios
   ```
   b. Android
   ```bash
   yarn android
   ```
   c. iOS device

   ```bash
    npx expo run:ios --device
   ```

## If changing things in app.json

npx expo prebuild

## Native Audio Dependencies (shouldnt need to install manually any more)
npx expo install expo-av react-native-reanimated react-native-gesture-handler
npx expo install expo-audio

## Image Conversion
/Applications/Inkscape.app/Contents/MacOS/inkscape --export-type png --export-filename evermix-logo-200.png -w 200 evermix-logo.svg


/Applications/Inkscape.app/Contents/MacOS/inkscape --export-type png --export-filename evermix-logo-banner.svg evermix-logo-banner.png

