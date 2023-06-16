import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  styles,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

const Dashboard = () => {
  // Dummy data for demonstration
  const salesData = [100, 150, 200, 300, 250, 300]; // Sample sales data
  const expensesData = [50, 75, 220, 150, 325, 200]; // Sample expenses data

  // Calculate profit/loss for each month
  const profitLossData = salesData.map(
    (sale, index) => sale - expensesData[index],
  );

  // Generate labels for the x-axis (months)
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']; // Sample month labels

  // Prepare dataset for the chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: profitLossData,
      },
    ],
  };

  const handleDownloadStatement = async () => {
    const csvData = ['Month,Profit/Loss']; // CSV header
    labels.forEach((month, index) => {
      csvData.push(`${month},${profitLossData[index]}`);
    });

    const csvString = csvData.join('\n');
    const fileUri = RNFS.CachesDirectoryPath + '/profit_loss_statement.csv';

    try {
      await RNFS.writeFile(fileUri, csvString, 'utf-8');
      RNFetchBlob.fs.openFile(fileUri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center',color:'black'}}>
        Profit/Loss Statistics
      </Text>
      <LineChart
        data={chartData}
        width={350}
        height={429}
        chartConfig={{
          backgroundColor: '#CEF3CE',
          backgroundGradientFrom: '#CEF3CE',
          backgroundGradientTo: '#CEF3CE',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{marginVertical: 5}}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#000000',
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
          marginBottom: 16,
        }}
        onPress={handleDownloadStatement}>
        <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: 'bold'}}>
          Download Statement
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;