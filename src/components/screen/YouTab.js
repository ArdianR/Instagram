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

export default class LikesTab extends React.Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = { read: false, more: true }
  }

  componentDidMount() {
    return fetch('https://next.json-generator.com/api/json/get/EkfqX7muB')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
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
    return (
      <FlatList
        data={this.state.dataSource}
        renderItem={({item}) => 
          <View style={{ flexDirection: 'row', backgroundColor: '#fafafa' }}>
            <Image source={{ uri: item.picture}} style={{ width: 50, height: 50, margin: 15, borderRadius: 50 }}/>
            <View style={{ flex: 4, justifyContent: 'center' }}>
              <Text style={{ color: 'black', fontSize: 12 }}>{item.name}</Text>
              <Text style={{ color: 'black', fontSize: 12 }}>{item.address}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
              <TouchableOpacity>
                <Text style={{ borderRadius: 3, fontSize: 12, padding: 5, backgroundColor: '#3897f0', textAlign: 'center', color: 'white' }}>invite</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        keyExtractor={item => item.name}
      />
    )
  }

}

const styles = StyleSheet.create({
});