import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import CustomDropdown from '../components/CustomDropdown';

const MilkScreen = () => {
  const navigation = useNavigation();
  const [timeOfDay, setTimeOfDay] = useState('');
  const [usage, setUsage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeOfDayOptions, setTimeOfDayOptions] = useState([]);
  const [usageOptions, setUsageOptions] = useState([]);

  useEffect(() => {
    fetchTimeOfDayOptions();
    fetchUsageOptions();
  }, []);

  const fetchTimeOfDayOptions = () => {
    axios
      .get('http://192.168.0.103:4000/timeOfDayOptions')
      .then((response) => {
        setTimeOfDayOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchUsageOptions = () => {
    axios
      .get('http://192.168.0.103:4000/usageOptions')
      .then((response) => {
        setUsageOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

    axios
      .post('http://192.168.0.103:4000/recordMilkProduction', {
        timeOfDay,
        amount,
        date,
      })
      .then((response) => {
        console.log(response.data);
        setTimeOfDay('');
        setAmount('');
        setDate(new Date());
        Alert.alert('Success', 'Milk production recorded successfully');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Failed to record milk production');
      });
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

    axios
      .post('http://192.168.0.103:4000/recordMilkUsage', {
        usage,
        quantity,
      })
      .then((response) => {
        console.log(response.data);
        setUsage('');
        setQuantity('');
        Alert.alert('Success', 'Milk usage recorded successfully');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Failed to record milk usage');
      });
  };

  const handleGenerateStatements = () => {
    axios
      .get('http://192.168.0.103:4000/generateMilkStatements')
      .then((response) => {
        console.log(response.data);
        Alert.alert('Success', 'Milk statements generated successfully');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Failed to generate milk statements');
      });
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
        items={timeOfDayOptions}
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
        items={usageOptions}
      />
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={handleQuantityChange}
        placeholder="Quantity (in liters)"
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.recordButton}
        onPress={handleRecordUsage}
      >
        <Text style={styles.recordButtonText}>Record Usage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.statementButton}
        onPress={handleGenerateStatements}
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
    textAlign: 'center',
    color: '#000000',
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
  input: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    fontSize: 16,
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
