import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Color palette for FitTrack Pro
const colors = {
  primary: '#4CAF50',
  secondary: '#FFFFFF',
  accent: '#FF9800',
  textDark: '#222',
  infoCard: '#FFF8E1',
  divider: '#F0F0F0',
};

// ---------------- Dashboard Screen ----------------
// PUBLIC_INTERFACE
function DashboardScreen() {
  const todayStats = {
    steps: 7500,
    workout: 45,
    calories: 1800,
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <View style={styles.sectionCardPrimary}>
          <Text style={styles.sectionTitle}>Today's Activity</Text>
          <View style={styles.statRow}>
            <StatBox label="Steps" value={todayStats.steps} accent />
            <StatBox label="Workout (min)" value={todayStats.workout} />
            <StatBox label="Calories" value={todayStats.calories} />
          </View>
        </View>
        <View style={styles.sectionCardAccent}>
          <Text style={styles.cardHeading}>Personalized Recommendation</Text>
          <Text style={styles.recommendationText}>
            Complete 30 more minutes of activity to reach your daily goal!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// UI component for stats
function StatBox({ label, value, accent = false }) {
  return (
    <View style={styles.statBox}>
      <Text style={[styles.statValue, accent && { color: colors.accent }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ---------------- Activity Logging Screen ----------------
// PUBLIC_INTERFACE
function LogScreen() {
  // Local state for forms
  const [workout, setWorkout] = useState('');
  const [calories, setCalories] = useState('');
  const [success, setSuccess] = useState('');

  const onLog = () => {
    if (!workout && !calories) {
      setSuccess('');
      return;
    }
    // Pretend logging happens here
    setSuccess('Entry logged successfully!');
    setWorkout('');
    setCalories('');
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.secondary }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.screenContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={styles.sectionTitle}>Log Activity</Text>
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>Workout (e.g. "Running: 30min")</Text>
            <TextInput
              style={styles.input}
              placeholder="Type workout activity..."
              value={workout}
              onChangeText={setWorkout}
              placeholderTextColor="#888"
            />
            <Text style={styles.formLabel}>Meal Calories</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter calories consumed..."
              keyboardType="numeric"
              value={calories}
              onChangeText={setCalories}
              placeholderTextColor="#888"
            />
            <TouchableOpacity
              style={[
                styles.button,
                (!workout && !calories) && { opacity: 0.5 }
              ]}
              onPress={onLog}
              disabled={!workout && !calories}
            >
              <Text style={styles.buttonText}>Log Entry</Text>
            </TouchableOpacity>
            {success ? <Text style={styles.successMessage}>{success}</Text> : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

// ---------------- Recommendations Screen ----------------
// PUBLIC_INTERFACE
function RecommendationsScreen() {
  // In the real app, recommendations would be personalized and dynamic
  const recs = [
    {
      title: "Hydration Reminder",
      text: "Drink at least 8 cups of water today.",
    },
    {
      title: "Variety in Workouts",
      text: "Try a new activity this week, such as cycling or yoga.",
    },
    {
      title: "Rest & Recovery",
      text: "Ensure you get 7-8 hours of sleep for muscle recovery.",
    },
    {
      title: "Balanced Diet",
      text: "Include fresh vegetables and lean protein in today’s meals.",
    }
  ];

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Recommendations</Text>
        {recs.map((rec, idx) => (
          <View key={idx} style={styles.sectionCardAccentAlt}>
            <Text style={styles.cardHeadingAlt}>{rec.title}</Text>
            <Text style={styles.cardTextAlt}>{rec.text}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------- Progress Screen ----------------
// PUBLIC_INTERFACE
function ProgressScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Progress Reports</Text>
        <View style={styles.sectionCardPrimary}>
          <Text style={styles.progressSubtitle}>Your progress will appear here!</Text>
          <Text style={styles.progressSmall}>
            [Charts and historical records UI to be implemented. For now, review daily steps, workouts, and calories over the week.]
          </Text>
          <View style={styles.progressBarContainer}>
            <Text style={styles.progressBarLabel}>Steps\nMon–Sun</Text>
            <ProgressBar percent={0.75} color={colors.accent} />
          </View>
          <View style={styles.progressBarContainer}>
            <Text style={styles.progressBarLabel}>Workout Minutes</Text>
            <ProgressBar percent={0.60} color={colors.primary} />
          </View>
          <View style={styles.progressBarContainer}>
            <Text style={styles.progressBarLabel}>Calories (Target: 2000/day)</Text>
            <ProgressBar percent={0.90} color={colors.accent} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Simple visual progress bar
function ProgressBar({ percent, color }) {
  return (
    <View style={styles.progressBarBg}>
      <View style={[styles.progressBarFg, { width: `${Math.round(percent * 100)}%`, backgroundColor: color }]} />
    </View>
  );
}

// ---------------- Tab Navigation Setup ----------------
const Tab = createBottomTabNavigator();

// PUBLIC_INTERFACE
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.primary,
          tabBarStyle: {
            backgroundColor: colors.secondary,
            borderTopColor: colors.primary,
            height: 60,
          },
          tabBarLabelStyle: {
            fontWeight: '700',
            fontSize: 12,
            marginBottom: 6,
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Log" component={LogScreen} />
        <Tab.Screen name="Recommendations" component={RecommendationsScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingTop: 12,
    paddingHorizontal: 18,
  },
  sectionCardPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    alignItems: 'center',
  },
  sectionCardAccent: {
    backgroundColor: colors.infoCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: 'center',
  },
  sectionCardAccentAlt: {
    backgroundColor: colors.infoCard,
    borderRadius: 10,
    padding: 16,
    marginVertical: 7,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: colors.primary,
    alignSelf: 'center',
    marginBottom: 7,
    marginTop: 6,
  },
  cardHeading: {
    color: colors.accent,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
    alignSelf: 'center',
  },
  cardHeadingAlt: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardTextAlt: {
    color: colors.textDark,
    fontSize: 15,
    lineHeight: 20,
  },
  recommendationText: {
    color: colors.primary,
    fontSize: 16,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  statLabel: {
    fontSize: 13,
    color: colors.secondary,
    marginTop: 2,
  },
  formSection: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    borderColor: colors.primary,
    borderWidth: 1.25,
    padding: 16,
    marginVertical: 14,
    elevation: 1,
  },
  formLabel: {
    fontSize: 15,
    color: colors.primary,
    marginBottom: 5,
    marginTop: 9,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderColor: colors.divider,
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 13,
    paddingVertical: 9,
    fontSize: 15,
    marginBottom: 8,
    color: colors.textDark,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 11,
  },
  buttonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    color: colors.accent,
    marginTop: 9,
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
  progressSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    alignSelf: 'center',
    marginBottom: 2,
  },
  progressSmall: {
    color: colors.infoCard,
    fontSize: 13,
    fontStyle: 'italic',
    marginVertical: 7,
    alignSelf: 'center',
    textAlign: 'center',
  },
  progressBarContainer: {
    marginTop: 13,
    marginBottom: 4,
    width: '100%',
    alignItems: 'flex-start',
  },
  progressBarLabel: {
    color: colors.secondary,
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 4,
  },
  progressBarBg: {
    width: '100%',
    height: 17,
    borderRadius: 8,
    backgroundColor: colors.divider,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressBarFg: {
    height: '100%',
    borderRadius: 8,
  },
});
