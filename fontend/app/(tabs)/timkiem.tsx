import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

// Định nghĩa kiểu Room trực tiếp trong file
interface Room {
  id: string;
  name: string;
  type: string;
  price: string;
  image: any;
}

export default function SearchResults() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      name: "P101",
      type: "Phòng Đơn",
      price: "500.000 VNĐ/ngày",
      image: require("../../assets/images/anh4.jpg"),
    },
    {
      id: "2",
      name: "P102",
      type: "Phòng Đôi",
      price: "600.000 VNĐ/ngày",
      image: require("../../assets/images/anh4.jpg"),
    },
    {
      id: "3",
      name: "P103",
      type: "Phòng Gia Đình",
      price: "700.000 VNĐ/ngày",
      image: require("../../assets/images/anh4.jpg"),
    },
    {
      id: "44",
      name: "P1223",
      type: "Phòng Gia Đình",
      price: "700.000 VNĐ/ngày",
      image: require("../../assets/images/anh4.jpg"),
    },
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const router = useRouter();

  const handleFilterPress = () => {
    router.push("/(tabs)/boloc");
  };

  const handleSortPress = () => {
    console.log("Sắp xếp theo giá tiền");
  };

  // Điều hướng sang trang chi tiết phòng (chỉ áp dụng cho phòng đầu tiên)
  const handleRoomPress = (room: Room) => {
    router.push({
      pathname: "/(tabs)/ttphong",
      params: {
        id: room.id,
        name: room.name,
        type: room.type,
        price: room.price,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/trangchu")}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kết quả tìm kiếm</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
        >
          <Icon name="filter" size={20} color="#fff" />
          <Text style={styles.buttonText}>Bộ Lọc</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={handleSortPress}>
          <Icon name="pricetag" size={20} color="#fff" />
          <Text style={styles.buttonText}>Giá Tiền</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {rooms.map((room) =>
          // Chỉ phòng đầu tiên (id: "1") có thể nhấn để điều hướng
          room.id === "1" ? (
            <TouchableOpacity
              key={room.id}
              style={styles.roomCard}
              onPress={() => handleRoomPress(room)}
            >
              <Image source={room.image} style={styles.roomImage} />
              <View style={styles.roomInfo}>
                <Text style={styles.roomType}>{room.name}</Text>
                <Text style={styles.roomCategory}>{room.type}</Text>
                <Text style={styles.roomPrice}>{room.price}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View key={room.id} style={styles.roomCard}>
              <Image source={room.image} style={styles.roomImage} />
              <View style={styles.roomInfo}>
                <Text style={styles.roomType}>{room.name}</Text>
                <Text style={styles.roomCategory}>{room.type}</Text>
                <Text style={styles.roomPrice}>{room.price}</Text>
              </View>
            </View>
          )
        )}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1E90FF" />
          </View>
        )}
        {!hasMore && rooms.length > 0 && (
          <Text style={styles.noMoreText}>Đã tải hết phòng</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  container: {
    flex: 1,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    marginRight: 5,
    borderRadius: 10,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#00BFFF",
    paddingVertical: 10,
    marginLeft: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  roomCard: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    height: 300,
    width: "100%",
  },
  roomImage: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
  roomInfo: {
    height: "30%",
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  roomType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  roomCategory: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
  },
  roomPrice: {
    fontSize: 14,
    color: "#1E90FF",
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "left",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  noMoreText: {
    textAlign: "center",
    color: "#666",
    padding: 20,
    fontSize: 16,
  },
});
