import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icon
import { Picker } from '@react-native-picker/picker'; // Import Picker
  
export default function SignupScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('username');
  const [fullName, setFullName] = useState('Tạ Long Khánh');
  const [email, setEmail] = useState('khanhltalong07@gmail.com');
  const [password, setPassword] = useState('abc2004'); // Mật khẩu gốc
  const [phoneNumber, setPhoneNumber] = useState('0125989231');
  const [gender, setGender] = useState('Nam');
  const [day, setDay] = useState('1'); // State cho ngày
  const [month, setMonth] = useState('Tháng 1'); // State cho tháng
  const [year, setYear] = useState('2004'); // State cho năm
  const [address, setAddress] = useState('Bạch Mai-Hai Bà Trưng-Hà Nội');
  const [showPassword, setShowPassword] = useState(false); // State để hiển thị/ẩn mật khẩu
  const [showDayPicker, setShowDayPicker] = useState(false); // State để hiển thị picker Ngày
  const [showMonthPicker, setShowMonthPicker] = useState(false); // State để hiển thị picker Tháng
  const [showYearPicker, setShowYearPicker] = useState(false); // State để hiển thị picker Năm

  // Hàm để che một phần mật khẩu
  const maskPassword = (pass: string) => {
    if (!pass) return '';
    const visibleLength = 4; // Hiển thị 4 ký tự cuối
    const maskedLength = pass.length - visibleLength;
    if (maskedLength <= 0) return pass; ``
    return '*'.repeat(maskedLength) + pass.slice(-visibleLength);
  };

  const handleEdit = () => {
    Alert.alert('Thông báo', 'Chức năng chỉnh sửa đã được kích hoạt!');
  };

  const handleLogout = () => {
    Alert.alert('Thông báo', 'Đăng xuất thành công!');
    router.push('/');
  };

  // Tạo danh sách ngày (1-31)
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  // Tạo danh sách tháng (Tháng 1 - Tháng 12)
  const months = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);
  // Tạo danh sách năm (từ 1900 đến năm hiện tại)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (1900 + i).toString());

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#003087" />
        </TouchableOpacity>

        <Image source={require('../../assets/images/anh3.png')} style={styles.logo} />

        <Text style={styles.title}>Hồ sơ của tôi</Text>
        <Text style={styles.subtitle}>Quản lý thông tin hồ sơ để bảo mật tài khoản</Text>

        <Text style={styles.label}>Tên đăng nhập</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          editable={false}
          placeholder="username"
        />

        <Text style={styles.label}>Tên</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          editable={false}
          placeholder="Tạ Long Khánh"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={false}
          keyboardType="email-address"
          placeholder="khanhltalong07@gmail.com"
        />

        <Text style={styles.label}>Mật khẩu</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputWithIcon}
            value={showPassword ? password : maskPassword(password)}
            onChangeText={setPassword}
            editable={false}
            secureTextEntry={false}
            placeholder="***2004"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          editable={false}
          keyboardType="phone-pad"
          placeholder="0125989231"
        />

        <Text style={styles.label}>Giới tính</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
          editable={false}
          placeholder="Nam"
        />

        {/* Ngày sinh với 3 ô và picker */}
        <Text style={styles.label}>Ngày sinh</Text>
        <View style={styles.dateContainer}>
          {/* Ô Ngày */}
          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => setShowDayPicker(!showDayPicker)}
          >
            <Text style={styles.dateText}>{day}</Text>
            <Icon name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          {showDayPicker && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={day}
                onValueChange={(itemValue) => {
                  setDay(itemValue);
                  setShowDayPicker(false);
                }}
                style={styles.picker}
              >
                {days.map((d) => (
                  <Picker.Item key={d} label={d} value={d} />
                ))}
              </Picker>
            </View>
          )}

          {/* Ô Tháng */}
          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => setShowMonthPicker(!showMonthPicker)}
          >
            <Text style={styles.dateText}>{month}</Text>
            <Icon name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          {showMonthPicker && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={month}
                onValueChange={(itemValue) => {
                  setMonth(itemValue);
                  setShowMonthPicker(false);
                }}
                style={styles.picker}
              >
                {months.map((m) => (
                  <Picker.Item key={m} label={m} value={m} />
                ))}
              </Picker>
            </View>
          )}

          {/* Ô Năm */}
          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => setShowYearPicker(!showYearPicker)}
          >
            <Text style={styles.dateText}>{year}</Text>
            <Icon name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
          {showYearPicker && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={year}
                onValueChange={(itemValue) => {
                  setYear(itemValue);
                  setShowYearPicker(false);
                }}
                style={styles.picker}
              >
                {years.map((y) => (
                  <Picker.Item key={y} label={y} value={y} />
                ))}
              </Picker>
            </View>
          )}
        </View>

        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          editable={false}
          placeholder="Bạch Mai-Hai Bà Trưng-Hà Nội"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  logo: {
    width: 200,
    height: 60,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputWithIcon: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15, // Tăng padding để chứa nội dung dài hơn
    width: '32%', // Điều chỉnh chiều rộng để vừa với nội dung
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1, // Cho phép văn bản thu nhỏ nếu cần
  },
  pickerContainer: {
    position: 'absolute',
    top: 50, // Đặt picker ngay dưới ô nhập liệu
    width: '32%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    zIndex: 10, // Đảm bảo picker hiển thị trên các thành phần khác
  },
  picker: {
    height: 150,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#2b4380',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});