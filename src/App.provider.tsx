import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {MoodOptionType, MoodOptionWithTimestamp} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppData = {
  moodList: MoodOptionWithTimestamp[];
};

const key = 'mood-data';

const setAppData = async (appData: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(appData));
  } catch (e) {
    console.log(e);
  }
};
const getAppData = async (): Promise<AppData | null> => {
  try {
    const result = await AsyncStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};
type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};

const defaultValue: AppContextType = {
  moodList: [],
  handleSelectMood: () => {},
};

const AppContext = createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC = ({children}) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);
  const handleSelectMood = useCallback((selectedMood: MoodOptionType) => {
    if (selectedMood.emoji) {
      setMoodList(current => {
        const newMoodList = [
          ...current,
          {mood: selectedMood, timestamp: Date.now()},
        ];
        setAppData({moodList: newMoodList});
        return newMoodList;
      });
    }
    return [];
  }, []);
  useEffect(() => {
    const fetchAppData = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moodList);
      }
    };
    fetchAppData();
  }, []);
  return (
    <AppContext.Provider value={{moodList, handleSelectMood}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
