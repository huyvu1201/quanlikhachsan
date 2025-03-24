import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { Calendar, DateData } from 'react-native-calendars'; 

const CalendarScreen = () => {
  const today = dayjs().format('YYYY-MM-DD'); // Lấy ngày hôm nay
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);

  // Hàm xử lý chọn ngày
  const handleDayPress = (day: DateData) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day.dateString);
      setCheckOut(null);
    } else if (day.dateString > checkIn) {
      setCheckOut(day.dateString);
    } else {
      setCheckIn(day.dateString);
      setCheckOut(null);
    }
  };

  // Định dạng ngày đã chọn
  const getMarkedDates = () => {
    let markedDates: { [key: string]: { startingDay?: boolean; endingDay?: boolean; color: string; textColor: string } } = {};

    if (checkIn) {
      markedDates[checkIn] = { startingDay: true, color: '#4A90E2', textColor: 'white' };
    }

    if (checkOut) {
      markedDates[checkOut] = { endingDay: true, color: '#4A90E2', textColor: 'white' };
      let start = dayjs(checkIn);
      let end = dayjs(checkOut);

      for (let i = 1; i < end.diff(start, 'day'); i++) {
        let date = start.add(i, 'day').format('YYYY-MM-DD');
        markedDates[date] = { color: '#A9D0F5', textColor: 'black' };
      }
    }
    
    return markedDates;
  };

  return (
    <View style={styles.container}>
      <Calendar
        minDate={today} // Chặn chọn ngày trước hôm nay
        markingType={'period'}
        markedDates={getMarkedDates()}
        onDayPress={handleDayPress}
      />

      <Text style={styles.text}>
        {checkIn && checkOut
          ? `Bạn đã chọn ${dayjs(checkOut).diff(dayjs(checkIn), 'day')} đêm`
          : 'Chọn ngày nhận và trả phòng'}
      </Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          OK ({checkIn && checkOut ? dayjs(checkOut).diff(dayjs(checkIn), 'day') : 0} Nights)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalendarScreen;
