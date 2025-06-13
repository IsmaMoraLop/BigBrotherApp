import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const CounterScreen = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Contador Interactivo</Text>
      
      <View style={styles.counterCard}>
        <Text style={styles.counterLabel}>Cuenta Actual:</Text>
        <Text style={styles.counterValue}>{count}</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.incrementButton]}
            onPress={() => setCount(count + 1)}
          >
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.buttonText}>Incrementar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.resetButton]}
            onPress={() => setCount(0)}
          >
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.buttonText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.decrementButton]}
          onPress={() => setCount(count - 1)}
        >
          <Ionicons name="remove" size={20} color="#fff" />
          <Text style={styles.buttonText}>Decrementar</Text>
        </TouchableOpacity>
      </View>
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
  counterCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
    maxWidth: 350,
  },
  counterLabel: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 10,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  incrementButton: {
    backgroundColor: '#10B981',
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: '#F59E0B',
    marginLeft: 10,
  },
  decrementButton: {
    backgroundColor: '#EF4444',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CounterScreen;