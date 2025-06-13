import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const SettingsScreen = () => {
  const settingsData: SettingItem[] = [
    { 
      id: '1', 
      title: 'Configuración de Usuario', 
      description: 'Gestiona tu perfil y preferencias personales',
      icon: 'person-outline'
    },
    { 
      id: '2', 
      title: 'Configuración de Seguridad', 
      description: 'Controla la privacidad y seguridad de tu cuenta',
      icon: 'shield-outline'
    },
    { 
      id: '3', 
      title: 'Configuración de Notificaciones', 
      description: 'Personaliza alertas y mensajes del sistema',
      icon: 'notifications-outline'
    },
    { 
      id: '4', 
      title: 'Configuración Avanzada', 
      description: 'Opciones técnicas y de desarrollador',
      icon: 'settings-outline'
    },
    { 
      id: '5', 
      title: 'Configuración de Tema', 
      description: 'Personaliza la apariencia de la aplicación',
      icon: 'color-palette-outline'
    },
  ];

  const renderSettingItem: ListRenderItem<SettingItem> = ({ item }) => (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Ionicons name={item.icon} size={24} color="#6366F1" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Configuraciones</Text>
      <FlatList
        data={settingsData}
        keyExtractor={(item) => item.id}
        renderItem={renderSettingItem}
        style={styles.settingsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
    textAlign: 'center',
  },
  settingsList: {
    width: '100%',
    marginTop: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
});

export default SettingsScreen;