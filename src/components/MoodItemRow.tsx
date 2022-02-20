import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Pressable, LayoutAnimation} from 'react-native';
import format from 'date-fns/format';
import {MoodOptionWithTimestamp} from '../types';
import {theme} from '../theme';
import {useAppContext} from '../App.provider';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Reanimated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {screenWidth} from '../utils/screenUtils';

const maxSwipe = screenWidth * 0.3;

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({item}) => {
  const {handleDeleteMood} = useAppContext();
  const translateX = useSharedValue(0);
  const handleDelete = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    handleDeleteMood(item);
  }, [handleDeleteMood, item]);

  const deleteWithDelay = useCallback(() => {
    setTimeout(() => {
      handleDelete();
    });
  }, [handleDelete]);

  const onGestureEvent = useAnimatedGestureHandler(
    {
      onActive: event => {
        translateX.value = event.translationX;
      },
      onEnd: event => {
        if (Math.abs(event.translationX) > maxSwipe) {
          translateX.value = withTiming(1000 * Math.sign(event.translationX));
          runOnJS(deleteWithDelay)();
        } else {
          translateX.value = withTiming(0, {
            duration: 500,
            easing: Easing.bounce,
          });
        }
      },
    },
    [],
  );
  const cardStyle = useAnimatedStyle(
    () => ({
      transform: [{translateX: translateX.value}],
    }),
    [],
  );
  const cardToBeDeleted = useAnimatedStyle(
    () => ({
      backgroundColor:
        Math.abs(translateX.value) > maxSwipe
          ? theme.colorBlue
          : theme.colorWhite,
    }),
    [translateX.value],
  );
  return (
    <PanGestureHandler
      activeOffsetX={[-1, 1]}
      activeOffsetY={[-100, 100]}
      onGestureEvent={onGestureEvent}>
      <Reanimated.View style={[styles.moodItem, cardStyle, cardToBeDeleted]}>
        <View style={styles.iconAndDescription}>
          <Text style={styles.moodValue}>{item.mood.emoji}</Text>
          <Text style={styles.moodDescription}>{item.mood.description}</Text>
        </View>
        <Text style={styles.moodDate}>
          {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
        </Text>
        <Pressable onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </Reanimated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  moodValue: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
    fontFamily: theme.fontFamilyRegular,
  },
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodDescription: {
    fontSize: 18,
    color: theme.colorPurple,
    fontWeight: 'bold',
    fontFamily: theme.fontFamilyBold,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    fontFamily: theme.fontFamilyBold,
    color: theme.colorBlue,
  },
});
