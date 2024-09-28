import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Switch, TextInput, Image, ActivityIndicator, RefreshControl } from 'react-native'
import SearchBar from './SearchBar';

const Applications = () => {
    const [applications, setApplications] = React.useState([])
    const [searchText, setSearchText] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const [refreshing, setRefreshing] = React.useState(false)

    const getApplications = async () => {
        setLoading(true)
        try {
            const res = await fetch('https://navkiraninfotech.com/g-mee-api/api/v1/apps/list?kid_id=378', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json()
            if (data.success) {
                setApplications(data.data?.app_list?.map(app => ({ id: app.app_id, name: app?.app_name, isEnabled: app.status?.toLowerCase() === "active", icon: app?.app_icon })))
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            console.error(error, 'error ==> getApplications');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getApplications()
    }, [])


    return (
        <View>
            <SearchBar value={searchText} onChangeText={setSearchText} />
            <ScrollView style={styles.applicationsContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getApplications} />}>
                {
                    loading ?
                        <ActivityIndicator size="large" color="#4abd77" />
                        :
                        applications.filter(app => app.name.toLowerCase().includes(searchText.toLowerCase())).map((application, index) => (
                            <View key={index} style={styles.applicationRow}>
                                <View style={styles.appInfo}>
                                    <Image source={{ uri: application.icon }} style={{ width: 40, height: 40, marginRight: 10 }} />
                                    <Text style={styles.applicationTitle}>{application.name}</Text>
                                </View>
                                <View style={styles.switchBtn}>
                                <Switch
                                    style={styles.switch}
                                    thumbColor={application.isEnabled ? '#4abd77' : 'lightgray'}
                                    value={application.isEnabled}
                                    onValueChange={(value) => {
                                        setApplications(prev => prev.map((app, i) => {
                                            if (index === i) {
                                                return { ...app, isEnabled: value }
                                            }
                                            return app
                                        }))
                                    }}
                                />
                                </View>
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
    appInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        width: '65%'
    },
    applicationTitle: {
        fontSize: 20,
    },
    switchBtn: {
        width: '35%',
        alignItems: 'flex-end'
    },
    switch: {
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    }
});

export default Applications