import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {VictoryPie} from 'victory-native';
import {useAppContext} from '../App.provider';

type TpieData = {
  x: string;
  y: number;
}[];

export const Anaylytics: React.FC = () => {
  const {moodList} = useAppContext();
  const [delayedData, setDelayedData] = useState<TpieData>([]);
  const [endAngle, setEndAngle] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      const data = moodList.reduce((acc, e) => {
        const indexOfValue = acc.findIndex(v => v.x === e.mood.emoji);
        if (acc.length && indexOfValue !== -1) {
          acc[indexOfValue] = {x: e.mood.emoji, y: acc[indexOfValue].y + 1};
        } else {
          acc.push({x: e.mood.emoji, y: 1});
        }
        return acc;
      }, [] as TpieData);
      setDelayedData(data);
      setEndAngle(360);
    }, 1000);
  }, [moodList]);
  // console.log({moodList: moodList.map(e => e.mood)});
  return (
    <View style={styles.container}>
      <VictoryPie
        data={delayedData}
        endAngle={endAngle}
        animate={{
          duration: 1000,
          easing: 'circleOut',
        }}
        colorScale="qualitative"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
