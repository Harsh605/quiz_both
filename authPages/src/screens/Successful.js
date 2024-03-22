import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import efs from "../images/7efs.gif";
import { Button } from 'react-native-paper';

const Successful = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={efs} style={styles.image} />
      <Text style={styles.text}>Exam Completed!</Text>
      <Button mode="contained" onPress={() => { navigation.navigate("MyExam") }}>
        Leaderboard
      </Button>
    </View>
  );
};

export default Successful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
