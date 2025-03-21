import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icon

const ForgotPassword = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  const handleResetPassword = () => {
    if (!phone || !code || !newPassword) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }
    Alert.alert('Thông báo', 'Mật khẩu đã được khôi phục thành công.');
  };

  return (
    <View style={styles.container}>
      {/* Nút Quay lại với icon */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-back" size={24} color="#003087" />
      </TouchableOpacity>

      {/* Header với logo ở giữa */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/anh3.png')} style={styles.logo} />
      </View>

      {/* Tiêu đề và nội dung */}
      <Text style={styles.title}>Khôi phục mật khẩu</Text>
      <Text style={styles.subtitle}>Số điện thoại sử dụng</Text>

      {/* Ô nhập liệu */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          placeholderTextColor="#aaa"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mã xác nhận"
          placeholderTextColor="#aaa"
          value={code}
          onChangeText={setCode}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu mới"
          placeholderTextColor="#aaa"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
        />
      </View>

      {/* Nút xác nhận */}
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40, // Tăng khoảng cách dưới logo
    marginTop: 100, // Điều chỉnh để logo nằm giữa màn hình (tùy chỉnh theo kích thước logo)
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30, // Tăng khoảng cách dưới tiêu đề
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40, // Tăng khoảng cách dưới subtitle
  },
  inputContainer: {
    marginBottom: 30, // Tăng khoảng cách giữa các ô nhập liệu
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#003087',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;