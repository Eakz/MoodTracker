import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {MoodOptionType} from '../types';
import {theme} from '../theme';
const imageSrc = require('../../assets/butterflies.png');

const moodOptions: MoodOptionType[] = [
  {emoji: '🧑‍💻', description: 'studious'},
  {emoji: '🤔', description: 'pensive'},
  {emoji: '😊', description: 'happy'},
  {emoji: '🥳', description: 'celebratory'},
  {emoji: '😤', description: 'frustrated'},
];

type MoodPickerProps = {
  handleSelectMood: (moodOption: MoodOptionType) => void;
};

export const MoodPicker: React.FC<MoodPickerProps> = ({handleSelectMood}) => {
  const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = useState(false);
  const handleSelect = useCallback(() => {
    if (selectedMood?.emoji) {
      console.log('PEZDA');
      handleSelectMood(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [handleSelectMood, selectedMood]);

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.image} />

        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonText}>Choose another!</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map(option => {
          const isSelected = selectedMood?.emoji === option.emoji;
          return (
            <View key={option.emoji}>
              <Pressable
                onPress={() =>
                  setSelectedMood(
                    selectedMood?.emoji === option.emoji ? undefined : option,
                  )
                }
                key={option.emoji}
                style={[
                  styles.moodItem,
                  isSelected ? styles.selectedMoodItem : undefined,
                ]}>
                <View style={isSelected ? styles.highlightedEmoji : {}}>
                  <Text style={styles.moodText}>{option.emoji}</Text>
                </View>
              </Pressable>
              <Text style={styles.descriptionText}>
                {isSelected ? option.description : ' '}
              </Text>
            </View>
          );
        })}
      </View>
      <Pressable style={styles.button} onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlightedEmoji: {
    borderRadius: 24,
    backgroundColor: '#ccc',
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontSize: 10,
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },
  container: {
    height: 250,
    borderWidth: 2,
    borderColor: theme.colorPurple,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    color: theme.colorWhite,
    fontFamily: theme.fontFamilyBold,
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
    fontFamily: theme.fontFamilyBold,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    alignSelf: 'center',
  },
});
