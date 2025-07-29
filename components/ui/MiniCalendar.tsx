import React, { useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useItinerary } from '@/hooks/itinerary-store';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface MiniCalendarProps {
  date: string;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ date }) => {
  const { itineraryEvents } = useItinerary();
  
  const eventDate = useMemo(() => new Date(date), [date]);
  
  const monthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const month = monthNames[eventDate.getMonth()];
  const day = eventDate.getDate();

  // Get scheduled events for this date
  const scheduledEvents = useMemo(() => {
    const dateString = eventDate.toISOString().split('T')[0];
    return itineraryEvents.filter(event => {
      const eventDateString = new Date(event.startTime).toISOString().split('T')[0];
      return eventDateString === dateString;
    }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [eventDate, itineraryEvents]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>{month}</Text>
        </View>
        <View style={styles.dayContainer}>
          <Text style={styles.dayText}>{day}</Text>
        </View>
      </View>
      
      {scheduledEvents.length > 0 && (
        <View style={styles.eventsContainer}>
          <Text style={styles.eventsTitle}>Your Schedule</Text>
          <ScrollView style={styles.eventsList} showsVerticalScrollIndicator={false}>
            {scheduledEvents.map((event) => (
              <View key={event.id} style={styles.eventItem}>
                <Text style={styles.eventTime}>
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </Text>
                <Text style={styles.eventTitle} numberOfLines={2}>
                  {event.title}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  calendarContainer: {
    width: 60,
    height: 60,
    backgroundColor: Colors.card,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    marginRight: Layout.spacing.m,
  },
  monthContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  eventsContainer: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Layout.spacing.s,
    maxHeight: 120,
  },
  eventsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.xs,
  },
  eventsList: {
    flex: 1,
  },
  eventItem: {
    marginBottom: Layout.spacing.xs,
    paddingBottom: Layout.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  eventTime: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 2,
  },
  eventTitle: {
    fontSize: 11,
    color: Colors.text,
    lineHeight: 14,
  },
});

export default MiniCalendar;
export { MiniCalendar };