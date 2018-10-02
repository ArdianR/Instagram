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
  Alert,
  Dimensions
} from 'react-native';

export default class SearchTab extends React.Component {

  constructor() {
    super();
    this.state = {
      orientation: '',
      Columns: 3,
    }
  }

  getOrientation = () => {
    if( this.refs.rootView ) {
        if( Dimensions.get('window').width < Dimensions.get('window').height ) {
          this.setState({ orientation: 'portrait' });
        } else {
          this.setState({ orientation: 'landscape' });
        }
    }
  }

  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener( 'change', () => { this.getOrientation(); });
  }

  componentWillMount() {
    return fetch('https://next.json-generator.com/api/json/get/EkfqX7muB').then((response) => response.json())
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
      <ScrollView>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.name}
          data={this.state.dataSource}
          renderItem={({item}) => 
            <View style={{ width: 100, height: 125, justifyContent:'center', backgroundColor: '#fafafa' }}>
              <TouchableOpacity onPress={() => { Alert.alert(item.guid) }}>
                <Image source={{uri: item.picture}} style={{ width: 65, height: 65, alignSelf: 'center', borderRadius: 50 }}/>
              </TouchableOpacity>
              <Text numberOfLines={1} style={{ color: 'black', fontSize: 12, textAlign: 'center', padding: 5, paddingBottom: 5 }}>{item.name}</Text>
            </View>
          }
        />
        <FlatList
          ref = "rootView"
          style = {{ flex: 1 }}
          data={ this.state.dataSource }
          renderItem={ ({item}) =>
            <View style={{ flexWrap: 'wrap' }}>
              <TouchableOpacity onPress={() => { Alert.alert(item.guid) }}>
                <Image style={{ height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 3, margin: 1 }} source = {{ uri: item.picture }} onPress={()=>alert(item.picture)}/>
              </TouchableOpacity>
            </View>
          }
          numColumns = { this.state.Columns }
          key = {( this.state.Columns ) }
          keyExtractor={item => item.name}
        />
      </ScrollView>
  );
}

}

const styles = StyleSheet.create({

});