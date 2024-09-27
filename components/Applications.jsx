import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Switch, TextInput, Image } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import SearchBar from './SearchBar';

const Applications = () => {

    const applications = [
        { name: 'Assistant', isEnabled: false, icon: require('../assets/googleasst.png') },
        { name: 'Calculator', isEnabled: false, icon: require('../assets/calc1.png') },
        { name: 'Calculator', isEnabled: false, icon: require('../assets/calc2.png') },
        { name: 'Calendar', isEnabled: false, icon: require('../assets/calendar.png') },
        { name: 'Chrome', isEnabled: false, icon: require('../assets/chrome.webp') },
    ]
    const [filteredApplications, setFilteredApplications] = React.useState(applications)

    const [searchText, setSearchText] = React.useState('')

    useEffect(() => {
        setFilteredApplications(applications.filter(app => app.name.toLowerCase().includes(searchText.toLowerCase())))
    }, [searchText])

    return (
        <View>
            <SearchBar value={searchText} onChangeText={setSearchText} />
            <ScrollView style={styles.applicationsContainer}>
                {
                    filteredApplications.map((application, index) => (
                        <View key={index} style={styles.applicationRow}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Image source={application.icon} style={{ width: 40, height: 40, marginRight: 10 }} />
                                <Text style={styles.applicationTitle}>{application.name}</Text>
                            </View>
                            <Switch
                                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                                thumbColor={application.isEnabled ? '#4abd77' : 'lightgray'}
                                value={application.isEnabled}
                                onValueChange={(value) => {
                                    setFilteredApplications(applications.map((app, i) => {
                                        if (index === i) {
                                            return { ...app, isEnabled: value }
                                        }
                                        return app
                                    }))
                                }}
                            />
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    searchInput: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    applicationsContainer: {
        padding: 10,
    },
    applicationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
    },
    applicationTitle: {
        fontSize: 20,
    },
});

export default Applications