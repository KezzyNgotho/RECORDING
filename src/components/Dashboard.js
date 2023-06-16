import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

const Dashboard = () => {
const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [] }] });
const [error, setError] = useState(null);

useEffect(() => {
const fetchProfitLossData = async () => {
try {
const response = await axios.get('http://192.168.0.101:4000/profit-loss');
setChartData(response.data);
} catch (error) {
console.log(error);
setError('Failed to fetch data');
}
};


fetchProfitLossData();
}, []);

const handleDownloadStatement = async () => {
try {
await axios.post('http://192.168.0.101:4000/profit-loss', {
salesData: chartData.datasets[0].data,
expensesData: chartData.datasets[0].data.map((profitLoss) => -profitLoss),
labels: chartData.labels,
});


  // Download statement logic
  // ...
} catch (error) {
  console.log(error);
}
};

return (
<View>
<Text style={styles.heading}>Profit/Loss Statistics</Text>
<LineChart
data={chartData}
width={350}
height={429}
chartConfig={{
backgroundColor: '#CEF3CE',
backgroundGradientFrom: '#CEF3CE',
backgroundGradientTo: '#CEF3CE',
decimalPlaces: 2,
color: (_opacity = 1) =>  "rgba(0, 0, 0, 0.5)",
labelColor: (_opacity = 1) =>  "rgba(0, 0, 0, 0.5)",
}}
style={styles.chart}
/>

  <TouchableOpacity
    style={styles.button}
    onPress={handleDownloadStatement}
  >
    <Text style={styles.buttonText}>Download Statement</Text>
  </TouchableOpacity>
</View>
);
};

const styles = StyleSheet.create({
heading: {
fontSize: 18,
fontWeight: 'bold',
textAlign: 'center',
color: 'black',
},
chart: {
marginVertical: 5,
},
button: {
backgroundColor: '#000000',
borderRadius: 4,
justifyContent: 'center',
alignItems: 'center',
paddingVertical: 12,
marginBottom: 16,
},
buttonText: {
color: '#FFFFFF',
fontSize: 16,
fontWeight: 'bold',
},
});

export default Dashboard;