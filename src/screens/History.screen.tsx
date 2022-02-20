import React from 'react';
import {FlatList, View} from 'react-native';
import {useAppContext} from '../App.provider';
import {MoodItemRow} from '../components/MoodItemRow';

export const History: React.FC = () => {
  const {moodList} = useAppContext();
  return (
    <View>
      <FlatList
        data={[...moodList].reverse()}
        renderItem={({item}) => {
          if (item) {
            return <MoodItemRow item={item} />;
          }
          return null;
        }}
        keyExtractor={item => item.timestamp.toString()}
      />
    </View>
  );
};
