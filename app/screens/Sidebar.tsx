import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

// Type definitions
interface SidebarButton {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

interface SidebarProps {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentScreen, setCurrentScreen }) => {
  const buttons: SidebarButton[] = [
    { id: 'Screen1', icon: 'home-outline', label: 'Inicio' },
    { id: 'Screen2', icon: 'calculator-outline', label: 'Contador' },
    { id: 'Screen3', icon: 'settings-outline', label: 'Config' },
  ];

  return (
    <View style={styles.sidebar}>
      {/* Logo/Brand */}
      <View style={styles.brandContainer}>
        <View style={styles.brandIcon}>
          <Text style={styles.brandText}>A</Text>
        </View>
      </View>
      
      {/* Navigation Buttons */}
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
      
      {/* Help/Info Button */}
      <View style={styles.helpContainer}>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-outline" size={18} color="#B0B7C3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sidebar;