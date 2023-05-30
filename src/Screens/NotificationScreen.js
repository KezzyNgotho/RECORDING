import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNotification, setNewNotification] = useState({
    id: '',
    title: '',
    description: '',
    datetime: '',
  });
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  useEffect(() => {
    // Simulating fetching notifications from an API
    fetchNotifications()
      .then((data) => setNotifications(data))
      .catch((error) => console.log('Error fetching notifications:', error));
  }, []);

  const fetchNotifications = () => {
    // Simulated API call to fetch notifications
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = [
          {
            id: '1',
            title: 'Notification 1',
            description: 'This is the first notification.',
            datetime: '2023-05-20 10:00',
          },
          {
            id: '2',
            title: 'Notification 2',
            description: 'This is the second notification.',
            datetime: '2023-05-21 14:30',
          },
          {
            id: '3',
            title: 'Notification 3',
            description: 'This is the third notification.',
            datetime: '2023-05-22 19:45',
          },
          {
            id: '4',
            title: 'Notification 4',
            description: 'This is the fourth notification.',
            datetime: '2023-05-23 08:15',
          },
          {
            id: '5',
            title: 'Notification 5',
            description: 'This is the fifth notification.',
            datetime: '2023-05-24 16:00',
          },
        ];
        resolve(data);
      }, 1000);
    });
  };

  const renderNotificationItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.notificationItem}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
        <Text style={styles.notificationDatetime}>{item.datetime}</Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item) => item.id;

  const openDateTimePicker = () => {
    setShowDateTimePicker(true);
  };

  const handleDateTimeChange = (event, selectedDateTime) => {
    setShowDateTimePicker(false);
    if (selectedDateTime) {
      const formattedDateTime = selectedDateTime.toLocaleString();
      setNewNotification({ ...newNotification, datetime: formattedDateTime });
    }
  };

  const handleAddNotification = () => {
    if (newNotification.title && newNotification.description && newNotification.datetime) {
      const id = (notifications.length + 1).toString();
      setNotifications([...notifications, { ...newNotification, id }]);
      setNewNotification({ id: '', title: '', description: '', datetime: '' });
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.notificationList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyListText}>No notifications found.</Text>}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Notification</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Notification</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newNotification.title}
              onChangeText={(text) => setNewNotification({ ...newNotification, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newNotification.description}
              onChangeText={(text) => setNewNotification({ ...newNotification, description: text })}
            />
            <TouchableOpacity style={styles.datetimeButton} onPress={openDateTimePicker}>
              <Text style={styles.datetimeButtonText}>Select Date & Time</Text>
            </TouchableOpacity>
            <Text style={styles.selectedDatetime}>{newNotification.datetime}</Text>
            {showDateTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="datetime"
                is24Hour={false}
                display="default"
                onChange={handleDateTimeChange}
              />
            )}
            <TouchableOpacity style={styles.saveButton} onPress={handleAddNotification}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  notificationList: {
    flexGrow: 1,
  },
  notificationItem: {
    backgroundColor: '#F2F6F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'black',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  notificationDescription: {
    fontSize: 16,
    color: '#555555',
  },
  notificationDatetime: {
    fontSize: 14,
    marginTop: 8,
    color: '#888888',
  },
  emptyListText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    color: '#555555',
  },
  addButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333333',
  },
  input: {
    borderColor: '#CEF3CE',
    borderWidth: 3,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    color: '#333333',
  },
  datetimeButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  datetimeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDatetime: {
    fontSize: 14,
    marginTop: 8,
    color: '#CEF3CE',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#CCCCCC',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
