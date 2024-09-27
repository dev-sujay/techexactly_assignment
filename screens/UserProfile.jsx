import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Avatar } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomTabView from '../components/CustomTabView';
import Applications from '../components/Applications';

const UserProfile = () => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Avatar.Image
                    source={require('../assets/avatar.png')}
                    size={100}
                    style={styles.avatar} />
                <Text style={styles.username}>Suvojit</Text>
                <View style={styles.connectionStatus}>
                    <Text style={styles.connectionText}>
                        Connected
                    </Text>
                    <AntDesign name="checkcircle" size={24} color="#4abd77" />
                </View>
            </View>
            <CustomTabView routes={[
                { key: 'applications', title: 'Applications', children: Applications },
                { key: 'settings', title: 'Settings', children: () => <Text>Settings</Text> },
            ]} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#4abd77',
        paddingVertical: 20,
    },
    avatar: {
        backgroundColor: 'white',
        marginTop: 10
    },
    username: {
        fontSize: 35,
        letterSpacing: 1,
        color: 'white',
        marginVertical: 10
    },
    connectionStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 8,
        gap: 7,
        borderRadius: 25,
        paddingHorizontal: 18,
        marginTop: 10
    },
    connectionText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        letterSpacing: 1,
    }
});

export default UserProfile;
