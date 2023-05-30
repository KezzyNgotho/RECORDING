import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from '@react-native-community/datetimepicker';
import { saveExpenseStatement } from '../components/expense';


const ExpenseScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    date: new Date() // Initialize with default date
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.date) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ description: '', amount: '', date: new Date() }); // Reset date to default
    }
  };

  const handleGenerateStatement = () => {
    saveExpenseStatement(expenses);
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  const handleDateButtonPress = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setNewExpense({ ...newExpense, date });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.headerText}>Track my expenses</Text>
        </View>
        <View style={styles.expenseForm}>
          <Text style={styles.formLabel}>Description</Text>
          <TextInput
            style={styles.formInput}
            value={newExpense.description}
            onChangeText={(text) => setNewExpense({ ...newExpense, description: text })}
          />
          <Text style={styles.formLabel}>Amount</Text>
          <TextInput
            style={styles.formInput}
            value={newExpense.amount}
            onChangeText={(text) => setNewExpense({ ...newExpense, amount: text })}
            keyboardType="numeric"
          />
          <View style={styles.datePickerContainer}>
            <Text style={styles.formLabel}>Date</Text>
            <TouchableOpacity style={styles.dateButton} onPress={handleDateButtonPress}>
              <Text style={styles.dateButtonText}>{newExpense.date.toDateString()}</Text>
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DatePicker
              value={newExpense.date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
          <View style={styles.profile}>
          <Image
            source={require('../../src/Screens/assets/icons8-add-48.png')}
            style={styles.profileImage}
          />
           </View>
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.expenseSummary}>
          <Text style={styles.summaryTitle}>Expense Summary</Text>
          <Text style={styles.summaryText}>Total Expenses:</Text>
          <Text style={styles.summaryText}>${calculateTotalExpenses()}</Text>
        </View>
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateStatement}>
          <Text style={styles.generateButtonText}>Generate Expense Statement</Text>
        </TouchableOpacity>
      </ScrollView>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
    marginTop: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  expenseForm: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333333',
  },
  formInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  dateButtonText: {
    color: '#CEF3CE',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
  },
  addButtonIcon: {
    marginRight: 8,
  },
  addButtonText: {
    color: '#CEF3CE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseSummary: {
    backgroundColor: '#CEF3CE',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  summaryText: {
    fontSize: 16,
    color: '#333333',
    marginTop: 8,
  },
  generateButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  generateButtonText: {
    color: '#CEF3CE',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpenseScreen;
