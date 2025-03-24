import React, { useRef, useState } from 'react';
import {
  View, Text, StyleSheet, Dimensions,
  TouchableOpacity, Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Stack } from 'expo-router';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { completeOnboarding } from '@/redux/slices/onboardingSlice';
import { onboardingSlides as slides } from '@/constants/onboardingSlides';

const EvermixLogo = require('@/assets/images/evermix-logo-banner.png');

const { width, height } = Dimensions.get('window');

export default function OnboardScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const scrollX = useSharedValue(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      scrollViewRef.current.scrollTo({ x: width * (currentSlideIndex + 1), animated: true });
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = async () => {
    dispatch(completeOnboarding());
    await AsyncStorage.setItem('hasOnboarded', 'true');
    router.replace('/subscription');
  };

  const skipOnboarding = async () => {
    await finishOnboarding();
  };

  const renderDots = () => (
    <View style={styles.pagination}>
      {slides.map((_, index) => {
        const animatedDotStyle = useAnimatedStyle(() => ({
          width: withTiming(currentSlideIndex === index ? 32 : 8),
        }));

        return (
          <Animated.View
            key={index}
            style={[styles.dot, animatedDotStyle]}
          />
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        ref={scrollViewRef}
        onMomentumScrollEnd={(e) =>
          setCurrentSlideIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
      >
        {slides.map((slide, index) => {
          const animatedSlideStyle = useAnimatedStyle(() => ({
            opacity: interpolate(
              scrollX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [0, 1, 0],
              Extrapolate.CLAMP
            ),
          }));

          return (
            <View key={slide.key} style={[styles.slide, { width }]}>
              <Animated.View style={[styles.imageContainer, animatedSlideStyle]}>
                <View style={styles.imageWrapper}>
                  <Image source={slide.image} style={styles.image} resizeMode="cover" />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.fade}
                  />
                  <View style={styles.logoWrapper}>
                    <Image source={EvermixLogo} style={{ width: 150, height: 50 }} resizeMode="contain" />
                  </View>
                </View>
              </Animated.View>
              <Animated.View style={[styles.textContainer, animatedSlideStyle]}>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.text}>{slide.text}</Text>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>

      {renderDots()}

      <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={goToNextSlide}>
        <Text style={styles.nextButtonText}>➞</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.5,
  },
  imageWrapper: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  logoWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  textContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    right: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 16,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'left',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    padding: 10,
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
  },
  pagination: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 80,
    left: 20,
  },
  dot: {
    height: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
  nextButton: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    backgroundColor: '#00F5FA',
    padding: 14,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 55,
  },
  nextButtonText: {
    color: '#000',
    fontSize: 22,
    textAlign: 'center',
  },
});
