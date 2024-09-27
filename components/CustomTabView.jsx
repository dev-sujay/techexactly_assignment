import React, { useState } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Text, StyleSheet, Dimensions } from 'react-native';

const CustomTabView = ({routes}) => {
  const [index, setIndex] = useState(0);

  const renderScene = routes?.reduce((acc, route) => {
    acc[route.key] = route.children;
    return acc;
  }, {});

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap(renderScene)}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.tabBar}
          indicatorStyle={styles.indicator}
          labelStyle={styles.label} // Style for label
          renderLabel={({ route }) => (
            <Text style={styles.label}>
              {capitalize(route.title)}
            </Text>
          )}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: '#4abd77',
  },
  indicator: {
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    textTransform: 'none',
    color: 'white',
  },
});

export default CustomTabView;
