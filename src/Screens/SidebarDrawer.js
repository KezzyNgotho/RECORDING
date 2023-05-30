import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';

const SidebarDrawer = () => {
const navigation = useNavigation();
const [language, setLanguage] = useState('English');

const handleLogout = () => {
// Perform logout logic here
};

const handleBackToHome = () => {
navigation.navigate('Home');
};

const handleEditImage = () => {
// Perform edit image logic here
};

const handleLanguageSwitch = () => {
setLanguage(language === 'English' ? 'Spanish' : 'English');
};

const renderSection = (title, content, icon) => (
<View style={styles.sectionContainer}>
<View style={styles.sectionHeader}>
<View style={styles.profile}>
<Image source={icon} style={styles.profileImage} />
</View>
<Text style={styles.sectionTitle}>{title}</Text>
</View>
<Text style={styles.sectionContent}>{content}</Text>
</View>
);

return (
<View style={styles.container}>
<ScrollView contentContainerStyle={styles.sidebarContainer}>
<View style={styles.profileContainer}>
<TouchableOpacity onPress={handleEditImage}>
<Image
source={require('../../src/Screens/assets/prof.png')}
style={styles.profileImage}
/>
</TouchableOpacity>
<Text style={styles.title}>ZOE ZOE</Text>
<View style={styles.qrCodeContainer}>
<QRCode value="User Profile QR Code" size={50} />
<Text style={{ color: 'black', fontSize: 16 }}>Scan Qr</Text>
</View>
</View>

    {renderSection(
      language === 'English' ? 'Registered Farm' : 'Granja Registrada',
      language === 'English' ? 'Farm Name: Zoe Farm\nLocation: Thika, Kenya' : 'Nombre de la Granja: Zoe Farm\nUbicación: Thika, Kenya',
      require('../../src/Screens/assets/icons8-pen-64.png')
    )}

    {renderSection(
      language === 'English' ? 'Contacts' : 'Contactos',
      language === 'English' ? 'Email: zoedairies@gmail.com\nPhone: +254716304517' : 'Correo Electrónico: zoedairies@gmail.com\nTeléfono: +254716304517',
      require('../../src/Screens/assets/icons8-call-50.png')
    )}

    <TouchableOpacity style={styles.helpCenterButton}>
      <View style={styles.profile}>
        <Image
          source={require('../../src/Screens/assets/icons8-help.gif')}
          style={styles.profileImage}
        />
      </View>
      <Text style={{ fontSize: 16, color: 'black' }}>Help Centre</Text>
    </TouchableOpacity>

    <View style={styles.friendContainer}>
      <View style={styles.profile}>
        <Image
          source={require('../../src/Screens/assets/icons8-friends-48.png')}
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.sectionTitle}>{language === 'English' ? 'Invite a Friend' : 'Invita a un Amigo'}</Text>
    </View>
    <Text style={styles.sectionContent}>{language === 'English' ? 'Share the app with your friends.' : 'Comparte la aplicación con tus amigos.'}</Text>

    <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
      <Text style={styles.backButtonText}>{language === 'English' ? 'Back to Home' : 'Volver a Inicio'}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutButtonText}>{language === 'English' ? 'Logout' : 'Cerrar Sesión'}</Text>
    </TouchableOpacity>
  </ScrollView>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: 'white',
},
sidebarContainer: {
flexGrow: 1,
padding: 20,
},
profileContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 20,
},
profileImage: {
width: 50,
height: 50,
borderRadius: 25,
marginRight: 10,
backgroundColor: '#CEF3CE',
},
qrCodeContainer: {
marginLeft: 150,
marginTop: 20,
backgroundColor: '#CEF3CE',
},
title: {
fontSize: 22,
fontWeight: 'bold',
color: 'black',
},
sectionContainer: {
marginBottom: 20,
},
sectionHeader: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 10,
},
sectionIcon: {
marginRight: 10,
},
sectionTitle: {
fontSize: 18,
fontWeight: 'bold',
color: 'black',
},
sectionContent: {
fontSize: 16,
marginBottom: 5,
color: 'black',
},
helpCenterButton: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 20,
color: 'black',
backgroundColor: '#CEF3CE',
},
helpCenterButtonText: {
fontSize: 16,
marginLeft: 10,
color: 'black',
},
friendContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 20,
},
backButton: {
backgroundColor: '#000000',
borderRadius: 2,
padding: 14,
marginBottom: 20,
borderBottomColor: '#CEF3CE',
},
backButtonText: {
color: 'white',
fontWeight: 'bold',
textAlign: 'center',
fontSize: 16,
},
logoutButton: {
backgroundColor: '#CEF3CE',
borderRadius: 5,
padding: 12,
marginTop: 'auto',
marginBottom: 20,
marginLeft: 'auto',
marginRight: 20,
width: '25%',
},
logoutButtonText: {
color: 'black',
fontWeight: 'bold',
textAlign: 'center',
fontSize: 16,
},
});

export default SidebarDrawer;