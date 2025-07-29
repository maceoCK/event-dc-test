import React, { useState, useMemo, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useItinerary } from '@/hooks/itinerary-store';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface TimeSlot {
  hour: number;
  displayTime: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
  location?: string;
}

const { width } = Dimensions.get('window');
const DAYS_TO_SHOW = 7;
const DAY_WIDTH = width / DAYS_TO_SHOW;

export default function CalendarScreen() {
  const router = useRouter();
  const { itineraryEvents } = useItinerary();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const scrollViewRef = useRef<ScrollView>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Generate extended range of days for scrolling
  const allDays = useMemo(() => {
    const days = [];
    const startDate = new Date(currentWeek);
    startDate.setDate(currentWeek.getDate() - currentWeek.getDay() - 21); // 3 weeks before
    
    for (let i = 0; i < 49; i++) { // 7 weeks total
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  }, [currentWeek]);



  // Generate time slots for the day
  const timeSlots: TimeSlot[] = useMemo(() => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      slots.push({
        hour,
        displayTime: `${hour.toString().padStart(2, '0')}:00`
      });
    }
    return slots;
  }, []);

  const getEventColor = (tag: string): string => {
    const colors = {
      'Technology': '#8B5CF6',
      'Business': '#F59E0B', 
      'Networking': '#10B981',
      'Workshop': '#EF4444',
      'Keynote': '#3B82F6',
      'default': Colors.primary
    };
    return colors[tag as keyof typeof colors] || colors.default;
  };

  // Get itinerary events for selected date
  const dayEvents = useMemo(() => {
    const dateString = selectedDate.toISOString().split('T')[0];
    return itineraryEvents.filter(event => {
      const eventDate = new Date(event.startTime).toISOString().split('T')[0];
      return eventDate === dateString;
    }).map(event => ({
      id: event.id,
      title: event.title,
      startTime: event.startTime,
      endTime: event.endTime,
      color: getEventColor(event.tags[0] || 'default'),
      location: event.location.name
    })).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [selectedDate, itineraryEvents]);

  // Get dates that have scheduled events
  const datesWithEvents = useMemo(() => {
    const dates = new Set<string>();
    itineraryEvents.forEach(event => {
      const eventDate = new Date(event.startTime).toISOString().split('T')[0];
      dates.add(eventDate);
    });
    return dates;
  }, [itineraryEvents]);

  const formatSelectedDate = () => {
    const today = new Date();
    const isToday = selectedDate.toDateString() === today.toDateString();
    
    if (isToday) {
      return `Today — ${selectedDate.toLocaleDateString([], { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })}`;
    }
    
    return selectedDate.toLocaleDateString([], {
      weekday: 'long',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60;
  };

  const getEventPosition = (event: CalendarEvent) => {
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);
    const startHour = startTime.getHours() + startTime.getMinutes() / 60;
    const endHour = endTime.getHours() + endTime.getMinutes() / 60;
    
    const top = (startHour - 8) * 60; // 60px per hour, starting from 8am
    const height = (endHour - startHour) * 60;
    
    return { top, height };
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = new Date(currentWeek);
    if (direction === 'prev') {
      newWeek.setDate(newWeek.getDate() - 7);
    } else {
      newWeek.setDate(newWeek.getDate() + 7);
    }
    setCurrentWeek(newWeek);
  };

  const onDayScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const dayIndex = Math.round(contentOffsetX / DAY_WIDTH);
    
    if (dayIndex >= 0 && dayIndex < allDays.length) {
      const selectedDay = allDays[dayIndex];
      setSelectedDate(selectedDay);
      
      // Update current week if we've scrolled to a different week
      const weekStart = new Date(selectedDay);
      weekStart.setDate(selectedDay.getDate() - selectedDay.getDay());
      
      const currentWeekStart = new Date(currentWeek);
      currentWeekStart.setDate(currentWeek.getDate() - currentWeek.getDay());
      
      if (weekStart.getTime() !== currentWeekStart.getTime()) {
        setCurrentWeek(selectedDay);
      }
    }
  };

  const scrollToDate = (date: Date) => {
    const dayIndex = allDays.findIndex(day => 
      day.toDateString() === date.toDateString()
    );
    
    if (dayIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: dayIndex * DAY_WIDTH,
        animated: true
      });
    }
  };



  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const hasEvents = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return datesWithEvents.has(dateString);
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentWeek(today);
    scrollToDate(today);
  };

  const isNotToday = () => {
    const today = new Date();
    return selectedDate.toDateString() !== today.toDateString();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateWeek('prev')}>
          <ChevronLeft size={24} color={Colors.accent} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.monthTitle}>
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </Text>
          {isNotToday() && (
            <TouchableOpacity style={styles.todayButton} onPress={goToToday}>
              <Calendar size={16} color={Colors.primary} />
              <Text style={styles.todayButtonText}>Today</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity onPress={() => navigateWeek('next')}>
          <ChevronRight size={24} color={Colors.accent} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Days */}
      <View style={styles.daysScrollContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
          decelerationRate="fast"
          snapToInterval={DAY_WIDTH}
          snapToAlignment="start"
          onMomentumScrollEnd={onDayScroll}
          contentContainerStyle={styles.daysScrollContent}
        >
          {allDays.map((date, index) => {
            const isCurrentDay = isToday(date);
            const isSelectedDay = isSelected(date);
            const hasScheduledEvents = hasEvents(date);
            const dayOfWeek = date.getDay();
            
            return (
              <TouchableOpacity
                key={index}
                style={[styles.dayColumn, { width: DAY_WIDTH }]}
                onPress={() => {
                  setSelectedDate(date);
                  scrollToDate(date);
                }}
              >
                <Text style={styles.dayName}>{dayNames[dayOfWeek]}</Text>
                <View style={styles.dayNumberContainer}>
                  <View style={[
                    styles.dayNumber,
                    isCurrentDay && styles.dayNumberToday,
                    isSelectedDay && styles.dayNumberSelected
                  ]}>
                    <Text style={[
                      styles.dayNumberText,
                      isCurrentDay && styles.dayNumberTextToday,
                      isSelectedDay && styles.dayNumberTextSelected
                    ]}>
                      {date.getDate()}
                    </Text>
                  </View>
                  {hasScheduledEvents && !isSelectedDay && !isCurrentDay && (
                    <View style={styles.eventIndicator} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Selected Date Title */}
      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDateText}>{formatSelectedDate()}</Text>
      </View>

      {/* Time Grid */}
      <ScrollView style={styles.timeGrid} showsVerticalScrollIndicator={false}>
        <View style={styles.timeGridContent}>
          {timeSlots.map((slot) => {
            const currentTime = getCurrentTime();
            const isCurrentHour = isToday(selectedDate) && 
              currentTime >= slot.hour && currentTime < slot.hour + 1;
            
            return (
              <View key={slot.hour} style={styles.timeSlot}>
                <View style={styles.timeLabel}>
                  <Text style={styles.timeLabelText}>{slot.displayTime}</Text>
                </View>
                <View style={styles.timeSlotContent}>
                  {isCurrentHour && (
                    <View 
                      style={[
                        styles.currentTimeLine,
                        { top: (currentTime - slot.hour) * 60 }
                      ]}
                    >
                      <View style={styles.currentTimeIndicator} />
                      <View style={styles.currentTimeLineBar} />
                    </View>
                  )}
                </View>
              </View>
            );
          })}
          
          {/* Events */}
          <View style={styles.eventsContainer}>
            {dayEvents.map((event) => {
              const position = getEventPosition(event);
              return (
                <TouchableOpacity
                  key={event.id}
                  style={[
                    styles.eventBlock,
                    {
                      top: position.top,
                      height: Math.max(position.height, 30),
                      backgroundColor: event.color,
                    }
                  ]}
                  onPress={() => router.push(`/event/${event.id}`)}
                >
                  <Text style={styles.eventTitle} numberOfLines={2}>
                    {event.title}
                  </Text>
                  {event.location && (
                    <Text style={styles.eventLocation} numberOfLines={1}>
                      {event.location}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
    backgroundColor: Colors.background,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.accent,
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.small,
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  todayButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: Layout.spacing.m,
  },
  daysScrollContainer: {
    backgroundColor: Colors.background,
    paddingVertical: Layout.spacing.s,
  },
  daysScrollContent: {
    paddingHorizontal: Layout.spacing.l,
  },
  dayColumn: {
    flex: 1,
    alignItems: 'center',
  },
  dayName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.xs,
  },
  dayNumberContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  dayNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: -8,
  },
  dayNumberToday: {
    backgroundColor: Colors.accent,
  },
  dayNumberSelected: {
    backgroundColor: Colors.accent,
  },
  dayNumberText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  dayNumberTextToday: {
    color: Colors.background,
  },
  dayNumberTextSelected: {
    color: Colors.background,
  },
  selectedDateContainer: {
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  timeGrid: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  timeGridContent: {
    position: 'relative',
    paddingBottom: 100,
  },
  timeSlot: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  timeLabel: {
    width: 60,
    paddingTop: Layout.spacing.xs,
    paddingRight: Layout.spacing.s,
    alignItems: 'flex-end',
  },
  timeLabelText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  timeSlotContent: {
    flex: 1,
    position: 'relative',
  },
  currentTimeLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  currentTimeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.accent,
    marginLeft: -6,
  },
  currentTimeLineBar: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.accent,
  },
  eventsContainer: {
    position: 'absolute',
    left: 60,
    right: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: Layout.spacing.s,
  },
  eventBlock: {
    position: 'absolute',
    left: Layout.spacing.s,
    right: Layout.spacing.s,
    borderRadius: 8,
    padding: Layout.spacing.s,
    borderLeftWidth: 4,
    borderLeftColor: 'rgba(255, 255, 255, 0.3)',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.background,
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.7)',
    fontWeight: '500',
  },
});