import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';


const SalesScreen = () => {
  const [salesData, setSalesData] = useState([]);
  const [searchDate, setSearchDate] = useState('');

  const handleCalculateSales = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const sales = calculateSales();
    const newSalesData = [...salesData, { date: currentDate, time: currentTime, sales }];
    setSalesData(newSalesData);
  };

  const calculateSales = () => {
    // Replace with your calculation logic
    const milkSold = 10; // Example value, replace with your actual data source
    const pricePerLiter = 5; // Example value, replace with your actual data source
    const sales = milkSold * pricePerLiter;
    return sales;
  };

  const handleSearchDate = () => {
    const selectedSales = salesData.find((item) => item.date === searchDate);
    if (selectedSales) {
      // Display sales for the selected date
      console.log(`Sales on ${searchDate}: ${selectedSales.sales}`);
    } else {
      console.log('No sales found for the selected date.');
    }
  };

  const calculateTotalSales = () => {
    const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
    return totalSales;
  };

  const renderSalesData = () => {
    return salesData.map((item, index) => (
      <View key={index} style={styles.salesCard}>
        <Text style={styles.salesDate}>Date: {item.date}</Text>
        <Text style={styles.salesTime}>Time: {item.time}</Text>
        <Text style={styles.salesAmount}>Sales: {item.sales}</Text>
      </View>
    ));
  };

  const handleGenerateStatement = () => {
    // Add your logic to generate the sales statement
    console.log('Generating sales statement...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Sales</Text>
      <TouchableOpacity style={styles.recordButton} onPress={handleCalculateSales}>
        <Text style={styles.recordButtonText}>Calculate Sales</Text>
      </TouchableOpacity>
      <Text style={styles.salesTotal}>Weekly Sales: {calculateTotalSales()}</Text>
      <Text style={styles.salesTotal}>Monthly Sales: {calculateTotalSales()}</Text>

      <Text style={styles.title}>Search by Date</Text>
      <TextInput
        onChangeText={setSearchDate}
        value={searchDate}
        placeholder="Enter date (DD/MM/YYYY)"
        style={styles.input}
      />
      <TouchableOpacity style={styles.recordButton} onPress={handleSearchDate}>
        <Text style={styles.recordButtonText}>Search</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Sales Statement</Text>
      <ScrollView>
        {renderSalesData()}
      </ScrollView>

      <TouchableOpacity style={styles.recordButton} onPress={handleGenerateStatement}>
        <Text style={styles.recordButtonText}>Generate Statement</Text>
      </TouchableOpacity>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white'
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
  },
  salesTotal: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  salesCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    borderBottomColor: '#CEF3CE',
    borderColor: '#CEF3CE',
  },
  salesDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  salesTime: {
    fontSize: 16,
  },
  salesAmount: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  recordButton: {
    backgroundColor: '#000000',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  recordButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SalesScreen;
