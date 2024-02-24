import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 'slide1',
    title: 'Create your own Quiz',
    text: 'Lorem Ipsum is simply dummy \ntext of the printing and \ntypesetting industry',
    image: require('../images/onboarding1.png'), // Replace with your own image
  },
  {
    key: 'slide2',
    title: 'Complete with your....',
    text: 'Lorem Ipsum is simply dummy \ntext of the printing and \ntypesetting industry',
    image: require('../images/onboarding2.png'), // Replace with your own image
  },
  {
    key: 'slide3',
    title: 'Watch Leaderboard',
    text: 'Lorem Ipsum is simply dummy \ntext of the printing and \ntypesetting industry',
    image: require('../images/onboarding3.png'), // Replace with your own image
  },
];

const IntroSlider = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const onDone = () => {
    
    navigation.navigate('Login');
  };

  const onNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onDone();
    }
  };

  const onSkip = () => {
    
    onDone();
  };

  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        showSkipButton={true}
        onSkip={onSkip}
        onNext={onNext}
        showNextButton={true}
        showDoneButton={false}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        onSlideChange={(index) => setCurrentIndex(index)}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.buttonText}>{currentIndex === slides.length - 1 ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '90%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  dotStyle: {
    backgroundColor: '#ccc',
  },
  activeDotStyle: {
    backgroundColor: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor:'#fff'
  },
  skipButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  nextButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IntroSlider;
