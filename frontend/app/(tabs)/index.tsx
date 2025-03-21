import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';

const API_URL = "http://10.0.2.2:3002/api/users"; // Cập nhật đúng địa chỉ backend

const LoginScreen: React.FC = () => {
  const [taiKhoan, setTaiKhoan] = useState<string>('');
  const [matKhau, setMatKhau] = useState<string>('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!taiKhoan || !matKhau) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ tài khoản và mật khẩu!');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, {
        TaiKhoan: taiKhoan,
        MatKhau: matKhau
      });

      if (response.data.success) {
        Alert.alert('Thành công', 'Đăng nhập thành công!');
        router.push('/(tabs)/hoso'); // Điều hướng đến trang hồ sơ
      } else {
        Alert.alert('Lỗi', response.data.message || 'Sai thông tin đăng nhập');
      }
    } catch (error: any) {
      console.error('Lỗi đăng nhập:', error);
      Alert.alert('Lỗi', error.response?.data?.message || 'Không thể kết nối đến server.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/anh3.png')} style={styles.logo} />
      </View>

      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.subText}>Đăng nhập để tiếp tục</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Tài khoản"
          placeholderTextColor="#999"
          value={taiKhoan}
          onChangeText={setTaiKhoan}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#999"
          secureTextEntry
          value={matKhau}
          onChangeText={setMatKhau}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword} onPress={() => router.push('/(tabs)/quenmk')}>Quên Mật Khẩu</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng Nhập</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>hoặc</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/(tabs)/dangki')}>
        <Text style={styles.registerButtonText}>Tạo Tài Khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#1E90FF',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
  },
  registerButton: {
    borderWidth: 1,
    borderColor: '#1E90FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#1E90FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
