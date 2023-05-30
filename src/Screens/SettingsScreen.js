import React, { useState } from 'react';
import { View, Text, Switch, Slider, TextInput, StyleSheet, SafeAreaView } from 'react-native';

const SettingsScreen = () => {
const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);
const [fontSize, setFontSize] = useState(16);
const [milkPrice, setMilkPrice] = useState('0.00');

const handleDarkModeToggle = () => {
setDarkModeEnabled(!isDarkModeEnabled);
};

const handleFontSizeChange = (value) => {
setFontSize(value);
};

const handleMilkPriceChange = (text) => {
setMilkPrice(text);
};

return (
<SafeAreaView style={[styles.container, { backgroundColor: isDarkModeEnabled ? '#121212' : '#CEF3CE' }]}>
<View style={styles.section}>
<Text style={[styles.sectionTitle, { color: isDarkModeEnabled ? 'white' : 'black' }]}>Dark Mode</Text>
<Switch
value={isDarkModeEnabled}
onValueChange={handleDarkModeToggle}
trackColor={{ false: 'black', true: '#888888' }}
thumbColor={isDarkModeEnabled ? 'grey' : '#FFFFFF'}
/>
</View>
<View style={styles.section}>
<Text style={[styles.sectionTitle, { color: isDarkModeEnabled ? 'white' : 'black' }]}>Font Size</Text>
<Slider
       style={styles.slider}
       value={fontSize}
       minimumValue={12}
       maximumValue={24}
       step={1}
       minimumTrackTintColor="#CEF3CE"
       maximumTrackTintColor="gray"
       thumbTintColor="#000000"
       onValueChange={handleFontSizeChange}
     />
<Text style={[styles.fontSizeText, { color: isDarkModeEnabled ? 'white' : 'black' }]}>{fontSize}</Text>
</View>
<View style={styles.section}>
<Text style={[styles.sectionTitle, { color: isDarkModeEnabled ? 'white' : 'black' }]}>Milk Price (per liter)</Text>
<TextInput
style={styles.textInput}
value={milkPrice}
onChangeText={handleMilkPriceChange}
keyboardType="decimal-pad"
placeholderTextColor={isDarkModeEnabled ? 'white' : 'black'}
/>
</View>
</SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
paddingHorizontal: 16,

},
section: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
marginBottom: 16,
},
sectionTitle: {
fontSize: 16,
fontWeight: 'bold',
},
slider: {
flex: 1,
},
fontSizeText: {
fontSize: 16,
},
textInput: {
flex: 1,
borderWidth: 1,
borderColor: 'gray',
borderRadius: 4,
padding: 8,
fontSize: 16,
},
});

export default SettingsScreen;