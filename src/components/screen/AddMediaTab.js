import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';

export default class AddMediaTab extends React.Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <TouchableOpacity>
                <Image style={{ width: 30, height: 30, resizeMode: 'center' }} source={require('../assets/home/icon_add.png')}/>
            </TouchableOpacity>
        )
    }


    constructor(props) {
        super(props);
        this.state = { isLoading: true, read: false, more: true }
    }

    ReadMore = () => {
        if(this.state.read == false)
        {
            console.warn(this.state.read, this.state.more)
            this.setState({read: true})
            this.setState({more: false})
        }
    }

    componentDidMount() {
        return fetch('https://next.json-generator.com/api/json/get/EkfqX7muB')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                },
                function() {
                    // console.warn(responseJson)
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        
        if(this.state.isLoading) {
            return(
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <Image style={{ width: 30, height: 30, resizeMode: 'center', margin: 15 }} source={require('../assets/home/icon_camera.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ flex: 1, alignItems: 'center', resizeMode: 'center', height: 40 }} source={require('../assets/home/logo_instagram.png')}/>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <Image style={{ width: 30, height: 30, resizeMode: 'center', margin: 15 }} source={require('../assets/home/icon_send.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 13, backgroundColor: '#F2F2F2' }}>
                    <ScrollView>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 4, backgroundColor: '#fafafa' }}>
                                <Text style={{ paddingLeft: 5,  margin: 5, textAlign: 'left', fontSize: 12, justifyContent: 'center', color: '#202020' }}>invite Facebook Friends to Instagram</Text>
                            </View>
                            <View style={{ flex: 1, backgroundColor: '#fafafa'}}>
                                <TouchableOpacity>
                                    <Text style={{ paddingRight: 5, margin: 5, textAlign: 'right', fontSize: 12, justifyContent: 'center', color: '#3897f0' }}>See All</Text>
                                </TouchableOpacity>
                            </View> 
                        </View>
                        <View style={{ flex: 4, flexDirection: 'row' }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <FlatList
                                    horizontal
                                    data={this.state.dataSource}
                                    renderItem={({item}) => 
                                        <View style={{ flex: 1, width: 110, height: 150, flexDirection: 'column', justifyContent:'center', margin: 4, backgroundColor: '#fafafa' }}>
                                            <Image source={{uri: item.picture}} style={{ width: 65, height: 65, justifyContent: 'center', alignSelf: 'center', borderRadius: 50, }} />
                                            <Text numberOfLines={1} style={{ color: 'black', fontSize: 12, textAlign: 'center', padding: 5, paddingBottom: 15 }}>{item.name}</Text>
                                            <TouchableOpacity>
                                                <Text style={{ borderRadius: 2, fontSize: 12, padding: 2, marginRight: 10, marginLeft: 10, backgroundColor: '#3897f0', textAlign: 'center', color: 'white' }}>invite</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    keyExtractor={(item, index) => index}
                                />
                            </ScrollView>
                        </View>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({item}) => 
                                <View style={{ flex: 6, flexDirection: 'column', backgroundColor: '#fafafa', marginBottom: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 4, flexDirection: 'row', paddingBottom: 10, paddingTop: 10 }}>
                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                <Image source={{uri: item.picture}} style={{ width: 35, height: 35, justifyContent: 'center', alignSelf: 'center', borderRadius: 50, }} />
                                            </View>
                                            <View style={{ flex: 4, flexDirection: 'column' }}>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ color: 'black', fontSize: 12 }}>{item.name}</Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ color: '#262626', fontSize: 12 }}>{item.address}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <TouchableOpacity>
                                                    <Image style={{ width: 100, height: 30, resizeMode: 'center', alignSelf: 'center' }} source={require('../assets/home/icon_more.png')}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 4 }}>
                                        <Image source={{uri: item.picture}} style={{ width: '100%', height: 350, justifyContent: 'center', alignSelf: 'center' }} />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5, paddingTop: 10 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity>
                                                <Image style={{ width: 30, height: 30, resizeMode: 'center' }} source={require('../assets/home/icon_favorite.png')}/>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity>
                                                <Image style={{ width: 28, height: 28, resizeMode: 'center' }} source={require('../assets/home/icon_chat.png')}/>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
                                            <TouchableOpacity>
                                                <Image style={{ width: 28, height: 28, resizeMode: 'center' }} source={require('../assets/home/icon_send.png')}/>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'flex-end', marginRight: 15 }}>
                                            <TouchableOpacity>
                                                <Image style={{ width: 30, height: 30, resizeMode: 'center' }} source={require('../assets/home/icon_bookmark.png')}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, paddingTop: 5, paddingBottom: 3, paddingLeft: 15 }}>
                                        <Text style={{ fontSize: 12, color: 'black' }}>{item.like} Likes</Text>
                                    </View>
                                    <View style={{ flex: 1, paddingLeft: 15, paddingBottom: 3 }}>
                                        <Text style={{ fontSize: 12, color: 'black' }}>3 HOURS AGO</Text>
                                    </View>
                                    <View style={{ flex: 1, paddingLeft: 15, paddingRight: 15, paddingBottom: 5 }}>
                                        <Text numberOfLines={1} style={{ fontSize: 12, color: 'black' }}>{item.about}</Text>
                                        {
                                            this.state.more ? 
                                                <TouchableOpacity onPress={this.ReadMore}>
                                                    <Text style={{ fontSize: 12 }}>more</Text>
                                                </TouchableOpacity>
                                            : null
                                        }
                                        {
                                            this.state.read ? 
                                                <Text style= {{ fontSize: 12, color: 'black' }}>{item.about}</Text>
                                            : null
                                        }
                                    </View>
                                </View>
                            }
                            keyExtractor={(item, index) => index}
                        />
                        <View style={{ flex: 1 }}/>
                    </ScrollView>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});