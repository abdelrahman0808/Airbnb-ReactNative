import {
    TouchableOpacity,
    View
} from 'react-native'
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const CalendarView = ({
    startDay,
    endDay,
    setStartDay,
    setEndDay
}: {
    startDay: any,
    endDay: any,
    setStartDay: React.Dispatch<React.SetStateAction<any>>,
    setEndDay: React.Dispatch<React.SetStateAction<any>>
}) => {
    const [markedDates, setMarkedDates] = useState<any>({});

    return (
        <View>
             <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: '#fff',
                borderColor: Colors.grey,
              }}>
              <Ionicons name="close-outline" size={22} />
            </TouchableOpacity>
            <Calendar
                style={{
                    marginTop: 40
                }}
                onDayPress={(day) => {
                    if (startDay && !endDay) {
                        const date: any = {}
                        for (const d = moment(startDay); d.isSameOrBefore(day.dateString); d.add(1, 'days')) {
                            date[d.format('YYYY-MM-DD')] = {
                                marked: true,
                                color: 'black',
                                textColor: 'white'
                            };

                            if (d.format('YYYY-MM-DD') === startDay) date[d.format('YYYY-MM-DD')].startingDay = true;
                            if (d.format('YYYY-MM-DD') === day.dateString) date[d.format('YYYY-MM-DD')].endingDay = true;
                        }

                        setMarkedDates(date);
                        setEndDay(day.dateString);
                    } else {
                        setStartDay(day.dateString)
                        setEndDay(null)
                        setMarkedDates({
                            [day.dateString]: {
                                marked: true,
                                color: 'black',
                                textColor: 'white',
                                startingDay: true,
                                endingDay: true
                            }
                        })
                    }
                }}
                monthFormat={"yyyy MMM"}
                hideDayNames={false}
                markingType={'period'}
                markedDates={markedDates}
                theme={{
                    selectedDayBackgroundColor: '#646464',
                    selectedDayTextColor: 'white',
                    monthTextColor: 'blue',
                    dayTextColor: 'black',
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 16,
                    arrowColor: '#e6e6e6',
                    dotColor: 'black'
                }}
            />
        </View>
    );
}



export default CalendarView