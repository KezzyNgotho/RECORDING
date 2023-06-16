import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Sidebar = () => {
  // Function to handle editing user details
  const handleEditDetails = () => {
    // Implement the logic for editing user details here
    console.log('Edit Details');
  };

  // Function to handle setting up milk prices
  const handleSetMilkPrices = () => {
    // Implement the logic for setting up milk prices here
    console.log('Set Milk Prices');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuItem} onPress={handleEditDetails}>
        <Text>Edit Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleSetMilkPrices}>
        <Text>Set Milk Prices</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text>User Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text>Farm Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text>Help Centre</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text>Invite a Friend</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    marginBottom: 10,
  },
});

export default Sidebar;
