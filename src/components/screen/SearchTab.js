import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';

export default class SearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      read: false,
      more: true,
      Columns: 3,
      height: 135,
      width: 135,
      margin: 1,
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
    return (
      <View>
        <ScrollView>
          <View style={{ flexDirection: 'row' }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <FlatList
                horizontal
                data={this.state.dataSource}
                renderItem={({item}) => 
                  <View style={{ width: 100, height: 125, justifyContent:'center', backgroundColor: '#fafafa' }}>
                    <TouchableOpacity onPress={() => { Alert.alert(item.guid) }}>
                      <Image source={{uri: item.picture}} style={{ width: 65, height: 65, alignSelf: 'center', borderRadius: 50 }}/>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{ color: 'black', fontSize: 12, textAlign: 'center', padding: 5, paddingBottom: 5 }}>{item.name}</Text>
                  </View>
                }
                keyExtractor={(item, index) => index}
              />
            </ScrollView>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <FlatList
              data={ this.state.dataSource }
              renderItem={ ({item}) =>
                <TouchableOpacity onPress={() => { Alert.alert(item.guid) }}>
                  <Image style={{ flex: 1, height: this.state.height, width: this.state.width, margin: this.state.margin }} source = {{ uri: item.picture }} onPress={()=>alert(item.picture)}/>
                </TouchableOpacity>
              }
              numColumns = { this.state.Columns }
              key = {( this.state.Columns ) }
              keyExtractor={ (item, index) => index }
            />
          </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({

})