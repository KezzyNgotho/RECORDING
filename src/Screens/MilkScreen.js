import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import { useNavigation } from '@react-navigation/native';

const CustomDropdown = ({ label, value, onValueChange, items }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}:</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          style={styles.picker}
          selectedValue={value}
          onValueChange={onValueChange}
        >
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const MilkScreen = () => {
  const navigation = useNavigation();
  const [timeOfDay, setTimeOfDay] = useState('');
  const [usage, setUsage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleTimeOfDayChange = (value) => {
    setTimeOfDay(value);
  };

  const handleUsageChange = (value) => {
    setUsage(value);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleRecordMilk = () => {
    if (timeOfDay === '') {
      Alert.alert('Error', 'Please select a time of day');
      return;
    }

    if (amount === '') {
      Alert.alert('Error', 'Please enter the amount');
      return;
    }

    // Perform the logic to record milk production based on the selected values
    console.log('Time of Day:', timeOfDay);
    console.log('Amount:', amount);
    console.log('Date:', date);

    // Clear the form fields
    setTimeOfDay('');
    setAmount('');
    setDate(new Date());

    // Show success message
    Alert.alert('Success', 'Milk production recorded successfully');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Milk Production</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={showDatepicker}
      >
        <Text style={styles.datePickerButtonText}>Select Date</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <CustomDropdown
        label="Time of Day"
        value={timeOfDay}
        onValueChange={handleTimeOfDayChange}
        items={[
          { label: 'Select Time of Day', value: '' },
          { label: 'Morning', value: 'Morning' },
          { label: 'Afternoon', value: 'Afternoon' },
          { label: 'Evening', value: 'Evening' },
        ]}
      />
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={handleAmountChange}
        placeholder="Amount (in liters)"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.recordButton} onPress={handleRecordMilk}>
        <Text style={styles.recordButtonText}>Record Milk</Text>
      </TouchableOpacity>
      <CustomDropdown
        label="Usage"
        value={usage}
        onValueChange={handleUsageChange}
        items={[
          { label: 'Select Usage', value: '' },
          { label: 'Cattle Feeding', value: 'Cattle Feeding' },
          { label: 'Selling', value: 'Selling' },
          { label: 'Home Consumption', value: 'Home Consumption' },
        ]}
      />
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={handleQuantityChange}
        placeholder="Quantity (in liters)"
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Statements')}
        style={styles.statementButton}
      >
        <Text style={styles.statementButtonText}>
          Generate Milk Statements
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
    marginHorizontal: 70,
    color: '#000000',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: 'black',
    fontWeight: '700',
  },
  picker: {
    borderWidth: 5,
    borderColor: '#CEF3CE',
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownContainer: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  datePickerButton: {
    backgroundColor: 'black',
    borderRadius: 100,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center', // Added to center the text
  },
  datePickerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  recordButton: {
    backgroundColor: '#000000',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center', // Added to center the text
    marginBottom: 10,
  },
  recordButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statementButton: {
    alignSelf: 'center',
    marginTop: 30,
  },
  statementButtonText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000000',
  },
});

export default MilkScreen;
