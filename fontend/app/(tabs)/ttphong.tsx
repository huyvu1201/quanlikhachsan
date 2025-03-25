import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function RoomDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Lấy thông tin phòng từ params
  const { id, name, type, price } = params;

  // Danh sách tiện nghi với icon
  const amenities = [
    { name: "Điều hòa nhiệt độ", icon: "snow-outline" },
    { name: "Wi-Fi miễn phí", icon: "wifi-outline" },
    { name: "TV màn hình phẳng", icon: "tv-outline" },
    { name: "Tủ lạnh", icon: "snow-outline" },
    { name: "Máy giặt", icon: "shirt-outline" },
    { name: "Bếp nấu ăn", icon: "flame-outline" },
    { name: "Ban công", icon: "sunny-outline" },
    { name: "Máy sấy tóc", icon: "hair-dryer-outline" },
  ];

  // Danh sách dịch vụ với icon và giá
  const services = [
    { name: "Bữa sáng", icon: "restaurant-outline", price: 50000 },
    { name: "Dọn phòng", icon: "bed-outline", price: 30000 },
    { name: "Giặt là", icon: "shirt-outline", price: 40000 },
    { name: "Đưa đón sân bay", icon: "airplane-outline", price: 200000 },
  ];

  // State để quản lý trạng thái chọn/bỏ chọn của từng dịch vụ
  const [selectedServices, setSelectedServices] = useState(
    services.reduce((acc, service) => {
      acc[service.name] = false; // Khởi tạo trạng thái ban đầu là chưa chọn
      return acc;
    }, {} as { [key: string]: boolean })
  );

  // Hàm xử lý khi chọn/bỏ chọn dịch vụ
  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceName]: !prev[serviceName],
    }));
  };

  // Tính tổng giá dịch vụ
  const totalServicePrice = services.reduce((total, service) => {
    return total + (selectedServices[service.name] ? service.price : 0);
  }, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/timkiem")}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đặt Phòng </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/anh4.jpg")}
            style={styles.roomImage}
          />
        </View>
        {/* Khung: Chi tiết phòng */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Chi tiết phòng</Text>
          <View style={styles.roomInfo}>
            <Text style={styles.roomType}>
              {type} - Tầng 1 - Phòng Thường {/* Thêm thông tin tầng */}
            </Text>
            <Text style={styles.roomPrice}>{price}</Text>
          </View>
        </View>

        {/* Khung: Dịch vụ */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Dịch vụ</Text>
          <View style={styles.servicesContainer}>
            {services.map((service, index) => (
              <TouchableOpacity
                key={index}
                style={styles.serviceItem}
                onPress={() => toggleService(service.name)}
              >
                <View style={styles.serviceInfo}>
                  <Icon name={service.icon} size={20} color="#666" />
                  <Text style={styles.serviceText}>
                    {service.name} ({service.price.toLocaleString()} VNĐ)
                  </Text>
                </View>
                <Icon
                  name={
                    selectedServices[service.name]
                      ? "checkmark-circle-outline"
                      : "ellipse-outline"
                  }
                  size={20}
                  color={selectedServices[service.name] ? "#1E90FF" : "#666"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Khung: Lưu ý (Tổng giá dịch vụ) */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Lưu ý</Text>
          <Text style={styles.noteText}>
            Tổng giá dịch vụ: {totalServicePrice.toLocaleString()} VNĐ
          </Text>
        </View>

        {/* Khung: Tiện nghi */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tiện nghi</Text>
          <View style={styles.amenitiesContainer}>
            {amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Icon name={amenity.icon} size={20} color="#666" />
                <Text style={styles.amenityText}>{amenity.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Khung: Mô tả về phòng */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Mô tả về phòng</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Đây là một phòng đơn rộng rãi và thoải mái, nằm ở tầng 1 của khách
              sạn. Phòng được trang bị đầy đủ tiện nghi hiện đại như điều hòa
              nhiệt độ, Wi-Fi miễn phí, TV màn hình phẳng, và tủ lạnh. Ngoài ra,
              phòng còn có ban công thoáng mát với tầm nhìn ra khu vườn xanh
              mát, mang lại cảm giác thư giãn và yên bình. Đây là lựa chọn lý
              tưởng cho những ai tìm kiếm một không gian nghỉ ngơi tiện nghi và
              gần gũi với thiên nhiên.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Đặt ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
  },
  roomImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  roomInfo: {
    marginBottom: 10,
  },
  roomType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  roomPrice: {
    fontSize: 16,
    color: "#1E90FF",
    fontWeight: "bold",
    marginTop: 5,
  },
  servicesContainer: {
    marginBottom: 10,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
  noteText: {
    fontSize: 16,
    color: "#FF8C00",
    fontStyle: "italic",
  },
  amenitiesContainer: {
    marginBottom: 10,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  amenityText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
  descriptionContainer: {
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  bookButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#8A2BE2",
    borderRadius: 5,
    alignItems: "center",
  },
  bookButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
