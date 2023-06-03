import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';

import CustomDropdown from '../components/CustomDropdown';

const MilkScreen = () => {
  const navigation = useNavigation();
  const [timeOfDay, setTimeOfDay] = useState('');
  const [usage, setUsage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleTimeOfDayChange = value => {
    setTimeOfDay(value);
  };

  const handleUsageChange = value => {
    setUsage(value);
  };

  const handleQuantityChange = value => {
    setQuantity(value);
  };

  const handleAmountChange = value => {
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

  const handleRecordUsage = () => {
    if (usage === '') {
      Alert.alert('Error', 'Please select a usage');
      return;
    }

    if (quantity === '') {
      Alert.alert('Error', 'Please enter the quantity');
      return;
    }

    // Perform the logic to record milk usage based on the selected values
    console.log('Usage:', usage);
    console.log('Quantity:', quantity);

    // Clear the form fields
    setUsage('');
    setQuantity('');

    // Show success message
    Alert.alert('Success', 'Milk usage recorded successfully');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Milk Production</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={showDatepicker}>
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
          {label: 'Select Time of Day', value: ''},
          {label: 'Morning', value: 'Morning'},
          {label: 'Afternoon', value: 'Afternoon'},
          {label: 'Evening', value: 'Evening'},
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
      dropdownStyle={styles.dropdown}
      labelStyle={styles.label}
      itemStyle={styles.item}
    />
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={handleQuantityChange}
        placeholder="Quantity (in liters)"
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.recordButton} // Add a separate button style for usage
        onPress={handleRecordUsage} // Handle the record usage action
      >
        <Text style={styles.recordButtonText}>Record Usage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Statements')}
        style={styles.statementButton}>
        <Text style={styles.statementButtonText}>Generate Milk Statements</Text>
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
  dropdown: {
    borderWidth: 16,
    borderColor: 'black',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize:16,
    textColor:"red"
  },
  item: {
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize:20,
    textColor:"red"
  },

  title: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
    textAlign: 'center', // Center the text
    color: '#000000',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    fontSize: 16,
  },
  datePickerButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  datePickerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  recordButton: {
    backgroundColor: '#000000',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
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
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
  },
});

export default MilkScreen;
