import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// PUBLIC_INTERFACE
function DashboardScreen() {
  /** Main dashboard showing daily activity stats */
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
            <Text style={styles.statNumber}>1800</Text>
            <Text style={styles.statLabel}>Cals</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// PUBLIC_INTERFACE
function LogScreen() {
  /** Logging screen for workouts and meal entries */
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.heading}>Log Workout / Meal</Text>
      <View style={styles.logSection}>
        <Text style={styles.logText}>[Workout and meal inputs go here]</Text>
      </View>
    </SafeAreaView>
  );
}

// PUBLIC_INTERFACE
function ProgressScreen() {
  /** Progress reporting screen */
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.heading}>Progress Reports</Text>
      <View style={styles.progressSection}>
        <Text style={styles.progressText}>[Progress charts and summaries go here]</Text>
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

// PUBLIC_INTERFACE
export default function App() {
  /** Main FitTrack Pro container with navigation structure */
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

// Theme colors used throughout the app
const colors = {
  primary: '#4CAF50',
  secondary: '#FFFFFF',
  accent: '#FF9800',
};

// App-wide styles using the color scheme
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
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
  },
  logSection: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 18,
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  progressText: {
    color: colors.secondary,
    fontSize: 16,
  },
});
