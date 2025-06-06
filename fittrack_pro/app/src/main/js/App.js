import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/**
 * Dashboard Screen - shows daily activity stats: steps, workout minutes, calories.
 * PUBLIC_INTERFACE
 */
function DashboardScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.section}>
        <Text style={styles.heading}>Today's Activity</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>7,500</Text>
            <Text style={styles.statLabel}>Steps</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Workout (min)</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1,800</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
        </View>
      </View>
      <View style={styles.tipSection}>
        <Text style={styles.tipTitle}>Personalized Recommendation</Text>
        <Text style={styles.tipText}>Complete 30 more minutes of activity to reach your daily goal!</Text>
      </View>
    </SafeAreaView>
  );
}

/**
 * Log Screen - allows user to log workouts and meals.
 * PUBLIC_INTERFACE
 */
function LogScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.heading}>Log Workout / Meal</Text>
      <View style={styles.logSection}>
        <Text style={styles.logText}>[Form inputs for logging workout and meals appear here.]</Text>
      </View>
    </SafeAreaView>
  );
}

/**
 * Progress Screen - shows user's fitness progress reports.
 * PUBLIC_INTERFACE
 */
function ProgressScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.heading}>Progress Reports</Text>
      <View style={styles.progressSection}>
        <Text style={styles.progressText}>[Charts and history of activity, workouts, and calorie intake appear here.]</Text>
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

/**
 * App Entry - main FitTrack Pro container with themed bottom tab navigation.
 * PUBLIC_INTERFACE
 */
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.primary,
          tabBarStyle: {
            backgroundColor: colors.secondary,
            borderTopColor: colors.primary,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '700',
          },
        }}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Log" component={LogScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Theme colors for branding and consistency
const colors = {
  primary: '#4CAF50',
  secondary: '#FFFFFF',
  accent: '#FF9800',
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingTop: 32,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  heading: {
    color: colors.secondary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: colors.accent,
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    color: colors.secondary,
    fontSize: 14,
    marginTop: 4,
  },
  tipSection: {
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    padding: 16,
    marginTop: 12,
    borderColor: colors.accent,
    borderWidth: 1,
    alignItems: 'center',
  },
  tipTitle: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  tipText: {
    color: colors.primary,
    fontSize: 15,
    textAlign: 'center',
  },
  logSection: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 18,
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  logText: {
    color: colors.secondary,
    fontSize: 16,
  },
  progressSection: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 18,
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  progressText: {
    color: colors.secondary,
    fontSize: 16,
    textAlign: 'center',
  },
});
