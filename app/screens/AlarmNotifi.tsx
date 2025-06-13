import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { styles } from '../styles/alarmnotifi'; // Importa los estilos

// Define the interface for items
interface Item {
  id: string;
  type: string;
  name: string;
  description: string;
  timestamp: string;
  repeat: 'none' | 'daily' | 'custom';
  customInterval?: number; // in minutes
}

const NotificationsScreen = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    time: new Date(),
    repeat: 'none' as 'none' | 'daily' | 'custom',
    customInterval: '60',
    type: 'Alarma' as 'Alarma' | 'Notificación',
  });

  const showEditModal = (item?: Item, type?: 'Alarma' | 'Notificación') => {
    if (item) {
      setEditingItem(item);
      setForm({
        name: item.name,
        description: item.description,
        time: new Date(item.timestamp),
        repeat: item.repeat,
        customInterval: item.customInterval?.toString() || '60',
        type: item.type as 'Alarma' | 'Notificación',
      });
    } else {
      setEditingItem(null);
      setForm({
        name: '',
        description: '',
        time: new Date(),
        repeat: 'none',
        customInterval: '60',
        type: type || 'Alarma',
      });
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    const newItem: Item = {
      id: editingItem?.id || Date.now().toString(),
      type: form.type,
      name: form.name || 'Sin nombre',
      description: form.description,
      timestamp: form.time.toLocaleString(),
      repeat: form.repeat,
      customInterval: form.repeat === 'custom' ? parseInt(form.customInterval) : undefined,
    };

    if (editingItem) {
      setItems(items.map(item => (item.id === editingItem.id ? newItem : item)));
    } else {
      setItems([...items, newItem]);
    }
    setModalVisible(false);
  };

  const addAlarm = () => {
    showEditModal(undefined, 'Alarma');
  };

  const addNotification = () => {
    showEditModal(undefined, 'Notificación');
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity onPress={() => showEditModal(item)}>
      <View style={styles.listItem}>
        <Ionicons 
          name={item.type === 'Alarma' ? 'alarm' : 'notifications'} 
          size={24} 
          color={item.type === 'Alarma' ? '#EF4444' : '#3B82F6'} 
        />
        <View style={styles.itemContent}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <Text style={styles.itemTimestamp}>{item.timestamp}</Text>
          <Text style={styles.itemRepeat}>
            {item.repeat === 'daily' ? 'Repite diario' : 
             item.repeat === 'custom' ? `Repite cada ${item.customInterval} min` : 'Sin repetición'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.alarmButton]} 
          onPress={addAlarm}
        >
          <Text style={styles.buttonText}>Crear Alarma</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.notificationButton]} 
          onPress={addNotification}
        >
          <Text style={styles.buttonText}>Crear Notificación</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {editingItem ? 'Editar' : 'Crear'} {form.type}
          </Text>
          
          <Text style={styles.inputLabel}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={text => setForm({ ...form, name: text })}
            placeholder="Nombre del evento"
          />

          <Text style={styles.inputLabel}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={form.description}
            onChangeText={text => setForm({ ...form, description: text })}
            placeholder="Descripción"
            multiline
          />

          <Text style={styles.inputLabel}>Hora</Text>
          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => setTimePickerVisibility(true)}
          >
            <Text>{form.time.toLocaleTimeString()}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            date={form.time}
            onConfirm={(date) => {
              setForm({ ...form, time: date });
              setTimePickerVisibility(false);
            }}
            onCancel={() => setTimePickerVisibility(false)}
          />

          <Text style={styles.inputLabel}>Repetir</Text>
          <View style={styles.repeatOptions}>
            <TouchableOpacity
              style={[styles.repeatButton, form.repeat === 'none' && styles.repeatButtonSelected]}
              onPress={() => setForm({ ...form, repeat: 'none' })}
            >
              <Text style={styles.modalButtonText}>Ninguno</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.repeatButton, form.repeat === 'daily' && styles.repeatButtonSelected]}
              onPress={() => setForm({ ...form, repeat: 'daily' })}
            >
              <Text style={styles.modalButtonText}>Diario</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.repeatButton, form.repeat === 'custom' && styles.repeatButtonSelected]}
              onPress={() => setForm({ ...form, repeat: 'custom' })}
            >
              <Text style={styles.modalButtonText}>Personalizado</Text>
            </TouchableOpacity>
          </View>

          {form.repeat === 'custom' && (
            <View>
              <Text style={styles.inputLabel}>Intervalo (minutos)</Text>
              <TextInput
                style={styles.input}
                value={form.customInterval}
                onChangeText={text => setForm({ ...form, customInterval: text })}
                keyboardType="numeric"
                placeholder="Intervalo en minutos"
              />
            </View>
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NotificationsScreen;