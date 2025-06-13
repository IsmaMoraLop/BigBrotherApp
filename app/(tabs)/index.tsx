import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import SettingsScreen from '../screens/AlarmNotifi';
import CounterScreen from '../screens/Screen2';
import WelcomeScreen from '../screens/Screen3';

interface SidebarButton {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

interface SidebarProps {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
}

const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.2;

const Sidebar: React.FC<SidebarProps> = ({ currentScreen, setCurrentScreen }) => {
  const buttons: SidebarButton[] = [
    { id: 'WelcomeScreen', icon: 'home-outline', label: 'Inicio' },
    { id: 'CounterScreen', icon: 'calculator-outline', label: 'Contador' },
    { id: 'SettingsScreen', icon: 'settings-outline', label: 'Config' },
  ];

  return (
    <View style={styles.sidebar}>
      <View style={styles.brandContainer}>
        <View style={styles.brandIcon}>
          <Text style={styles.brandText}>A</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        {buttons.map((button) => {
          const isActive = currentScreen === button.id;
          
          return (
            <TouchableOpacity
              key={button.id}
              style={[
                styles.button,
                isActive && styles.activeButton
              ]}
              onPress={() => setCurrentScreen(button.id)}
            >
              <Ionicons 
                name={button.icon} 
                size={22} 
                color={isActive ? '#fff' : '#B0B7C3'} 
              />
              <Text style={[
                styles.buttonText,
                isActive && styles.activeButtonText
              ]}>
                {button.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      <View style={styles.helpContainer}>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-outline" size={18} color="#B0B7C3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('WelcomeScreen');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'WelcomeScreen':
        return <WelcomeScreen />;
      case 'CounterScreen':
        return <CounterScreen />;
      case 'SettingsScreen':
        return <SettingsScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appContainer}>
        <Sidebar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        <View style={styles.content}>
          {renderScreen()}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  appContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: '#1F2937',
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  brandIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginVertical: 8,
    paddingVertical: 8,
  },
  activeButton: {
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#B0B7C3',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  activeButtonText: {
    color: '#fff',
  },
  helpContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  helpButton: {
    width: 32,
    height: 32,
    backgroundColor: '#374151',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});

export default App;