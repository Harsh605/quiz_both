import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen2() {
  const navigation = useNavigation()
  return (
    <View className="w-full h-full bg-white">
      <StatusBar style="light" backgroundColor='#000000' />
      <View className="w-full h-[50%] bg-sky-400 ">
        <Animated.View entering={FadeInUp.delay(200).duration(1000).springify().damping(3)} style={styles.container} >
          <Text style={styles.text} className="text-white text-center text-2xl font-bold">SignupScreen</Text>
        </Animated.View>
      </View>
      <View className="mt-2">
        <View className="mx-4 space-y-4 flex items-center mt-5">
          <Animated.View entering={FadeInDown.duration(1000).springify()} className="w-full bg-black/5 rounded-2xl p-5">
            <TextInput placeholder='Name' placeholderTextColor={'gray'} />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="w-full bg-black/5 rounded-2xl p-5">
            <TextInput placeholder='Email' placeholderTextColor={'gray'} />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full bg-black/5 rounded-2xl p-5 mb-3">
            <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="w-full ">
            <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl">
              <Text className="text-center text-xl font-bold text-white">Register</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="flex-row justify-center">
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push('Login')}>
              <Text className="text-sky-600 ml-1">Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '32%',
    // transform: [{ translateX: -50 }, { translateY: 0 }],
  },
});