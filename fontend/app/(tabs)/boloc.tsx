import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

export default function FilterScreen() {
  const router = useRouter();

  // State lưu bộ lọc đã chọn
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Danh sách bộ lọc
  const roomTypes = ["Phòng Đơn", "Phòng Đôi", "Phòng Thường"];
  const floors = ["Tầng 1", "Tầng 2", "Tầng 3", "Tầng 4", "Tầng 5"];
  const roomClasses = ["VIP", "Thường"];
  const priceRanges = [
    "Dưới 500.000 VNĐ",
    "500.000 - 1.000.000 VNĐ",
    "1.000.000 - 2.000.000 VNĐ",
    "Trên 2.000.000 VNĐ",
  ];
  const amenities = [
    "Wi-Fi miễn phí",
    "Bể bơi",
    "Phòng gym",
    "Bữa sáng miễn phí",
    "Đưa đón sân bay",
    "Điều hòa",
    "Máy giặt",
  ];

  // Xử lý chọn/bỏ chọn bộ lọc
  const toggleFilter = (filter: string) => {
    setSelectedFilters(
      (prev) =>
        prev.includes(filter)
          ? prev.filter((item) => item !== filter) // Bỏ chọn
          : [...prev, filter] // Chọn mới
    );
  };

  // Xử lý áp dụng bộ lọc và quay về trang searchResults
  const applyFilters = () => {
    router.push({
      pathname: "/(tabs)/timkiem",
      params: { filterCount: selectedFilters.length.toString() },
    });
  };

  // Xử lý nút Back để điều hướng về searchResults.tsx
  const handleBackPress = () => {
    router.push("/(tabs)/timkiem");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn lọc</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Nội dung bộ lọc */}
      <ScrollView contentContainerStyle={styles.filterContainer}>
        {/* Loại Phòng */}
        <Text style={styles.sectionTitle}>Loại Phòng</Text>
        {roomTypes.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.filterItem}
            onPress={() => toggleFilter(item)}
          >
            <Icon
              name={
                selectedFilters.includes(item)
                  ? "checkmark-outline"
                  : "square-outline"
              }
              size={24}
              color="#000"
            />
            <Text style={styles.filterText}>{item}</Text>
          </TouchableOpacity>
        ))}

        {/* Tầng */}
        <Text style={styles.sectionTitle}>Tầng</Text>
        {floors.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.filterItem}
            onPress={() => toggleFilter(item)}
          >
            <Icon
              name={
                selectedFilters.includes(item)
                  ? "checkmark-outline"
                  : "square-outline"
              }
              size={24}
              color="#000"
            />
            <Text style={styles.filterText}>{item}</Text>
          </TouchableOpacity>
        ))}

        {/* Cấp Phòng */}
        <Text style={styles.sectionTitle}>Cấp Phòng</Text>
        {roomClasses.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.filterItem}
            onPress={() => toggleFilter(item)}
          >
            <Icon
              name={
                selectedFilters.includes(item)
                  ? "checkmark-outline"
                  : "square-outline"
              }
              size={24}
              color="#000"
            />
            <Text style={styles.filterText}>{item}</Text>
          </TouchableOpacity>
        ))}

        {/* Khoảng giá */}
        <Text style={styles.sectionTitle}>Khoảng giá</Text>
        {priceRanges.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.filterItem}
            onPress={() => toggleFilter(item)}
          >
            <Icon
              name={
                selectedFilters.includes(item)
                  ? "checkmark-outline"
                  : "square-outline"
              }
              size={24}
              color="#000"
            />
            <Text style={styles.filterText}>{item}</Text>
          </TouchableOpacity>
        ))}

        {/* Tiện nghi */}
        <Text style={styles.sectionTitle}>Tiện nghi</Text>
        {amenities.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.filterItem}
            onPress={() => toggleFilter(item)}
          >
            <Icon
              name={
                selectedFilters.includes(item)
                  ? "checkmark-outline"
                  : "square-outline"
              }
              size={24}
              color="#000"
            />
            <Text style={styles.filterText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Nút áp dụng */}
      <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
        <Text style={styles.applyButtonText}>
          Áp dụng ({selectedFilters.length})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    backgroundColor: "#1E90FF",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  filterContainer: {
    padding: 20,
    paddingBottom: 100, // Thêm paddingBottom để đảm bảo nội dung không bị che bởi nút "Áp dụng"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  filterText: {
    fontSize: 16,
    marginLeft: 10,
  },
  applyButton: {
    backgroundColor: "#1E90FF",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
