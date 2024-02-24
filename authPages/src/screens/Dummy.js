// // components/ProgressRing.js
// import React from 'react';
// import { View, Text } from 'react-native';
// import { ProgressChart } from 'react-native-chart-kit';
// import { Svg } from 'react-native-svg';

// const Dummy = ({ progress }) => {
//   const data = {
//     labels: ['Progress'],
//     data: [[progress]],
//   };

//   const chartConfig = {
//     backgroundGradientFrom: '#1E2923',
//     backgroundGradientTo: '#08130D',
//     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//   };

//   return (
//     <View style={{alignSelf:'center',justifyContent:'center',marginTop:100,backgroundColor:'#fff'}}>
//       <ProgressChart style={{backgroundColor:'#fff'}}
//         data={data}
//         width={200}
//         height={200}
//         strokeWidth={16}
//         radius={80}
//         chartConfig={chartConfig}
//         hideLegend={true}
//         color={"blue"}
//       />
//       <Svg style={{ position: 'absolute', alignSelf: 'center', marginTop: 65 }}>
//         <Text
//           x="50%"
//           y="50%"
//           fontSize="20"
//           fontWeight="bold"
//           fill="#ffffff"
//           textAnchor="middle"
//         >
//           {`${Math.round(progress * 100)}%`}
//         </Text>
//       </Svg>
//     </View>
//   );
// };

// export default Dummy;

import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

const Dummy = () => {
  const widthAndHeight = 250;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00'];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Basic</Text>
        <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} /> */}
        <Text style={styles.title}>Doughnut</Text>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.45}
          coverFill={'#FFF'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});

export default Dummy;
