import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import editIcon from '../Screens/assets/icons8-pen-64.png';
import milkIcon from '../Screens/assets/icons8-milk-16.png';
import userIcon from '../Screens/assets/account_circle_off_FILL0_wght400_GRAD0_opsz48.png';
import farmIcon from '../Screens/assets/wooow.png';
import helpIcon from '../Screens/assets/call_quality_FILL0_wght400_GRAD0_opsz48.png';
import inviteIcon from '../Screens/assets/icons8-friends-48.png';
import backIcon from '../Screens/assets/back-icon.png';
import SetMilkPricesForm from '../components/SetMilkPricesForm';// Import the form component

function SidebarDrawer() {
const navigation = useNavigation();

// Function to handle editing user details
const handleEditDetails = () => {
// Implement the logic for editing user details here
console.log('Edit Details');
};

// Function to navigate to the milk prices form
const handleSetMilkPrices = () => {
navigation.navigate('SetMilkPrices'); // Navigate to the milk prices form
};

return (
<View style={styles.container}>
<Text  style={{fontSize:20,marginHorizontal:140,fontWeight:"bold"}}>User Profile</Text>
<TouchableOpacity style={styles.menuItem} onPress={handleEditDetails}>
<Image source={editIcon} style={styles.icon} />
<Text style={styles.text}>Edit Details</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.menuItem} onPress={handleSetMilkPrices}>
<Image source={milkIcon} style={styles.icon} />
<Text style={styles.text}>Set Milk Prices</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.menuItem}>
<Image source={userIcon} style={styles.icon} />
<Text style={styles.text}>User Profile</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.menuItem}>
<Image source={farmIcon} style={styles.icon} />
<Text style={styles.text}>Farm Profile</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.menuItem}>
<Image source={helpIcon} style={styles.icon} />
<Text style={styles.text}>Help Centre</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.menuItem}>
<Image source={inviteIcon} style={styles.icon} />
<Text style={styles.text}>Invite a Friend</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.menuItem}>
<Image source={backIcon} style={styles.icon} />
<Text style={styles.text}>Back</Text>
</TouchableOpacity>


  {/* Milk Prices Form */}
  <SetMilkPricesForm />
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
paddingVertical: 20,
paddingHorizontal: 10,
},
menuItem: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 10,
marginTop: 30,
},
icon: {
width: 24,
height: 24,
marginRight: 10,
},
text: {
fontSize: 17,
color:"black"
},
});

export default SidebarDrawer;