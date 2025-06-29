import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

interface Activity {
  timestamp: string;
  activity: string;
  emfLevel: number;
  temperature: number;
}

interface ActivityLogProps {
  activities: Activity[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({activities}) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ACTIVITY LOG</Text>

      <ScrollView style={styles.logContainer} showsVerticalScrollIndicator={false}>
        {activities.length === 0 ? (
          <Text style={styles.emptyText}>No activity recorded yet...</Text>
        ) : (
          activities.slice(-10).reverse().map((activity, index) => (
            <View key={index} style={styles.logItem}>
              <View style={styles.logHeader}>
                <Text style={styles.timestamp}>{formatTime(activity.timestamp)}</Text>
                <Text style={styles.emfValue}>EMF: {Math.round(activity.emfLevel)}%</Text>
              </View>
              <Text style={styles.activityText}>{activity.activity}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    maxHeight: 300,
  },
  title: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  logContainer: {
    flex: 1,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
  logItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingVertical: 8,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  timestamp: {
    color: '#4ecdc4',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  emfValue: {
    color: '#ffe66d',
    fontSize: 12,
  },
  activityText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ActivityLog;