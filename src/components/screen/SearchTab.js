import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ListView,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';

export default class SearchTab extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
      orientation: '',
      Columns: 3,
    }
    this.arrayholder = [];
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
    return fetch('https://next.json-generator.com/api/json/get/EkfqX7muB')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r3 ) => r3 == r3});
        this.setState({
          isLoading: false,
          dataSourceListView: ds.cloneWithRows(responseJson),
          dataSourceFlatList: responseJson,
        }, function() {
          this.arrayholder = responseJson ;
        });
      })
      .catch((error) => {
        console.error(error);
    });
  }

  GetListViewItem (name) {
   Alert.alert(name);
  }
  
  SearchFilterFunction(text){
    const newData = this.arrayholder.filter(function(item){
       const itemData = item.name.toUpperCase()
       const textData = text.toUpperCase()
       return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSourceListView: this.state.dataSourceListView.cloneWithRows(newData),
      text: text
    })
 } 
 
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
 
    return (
      <View>
        <TextInput
          onChangeText={(text) => this.SearchFilterFunction(text)}
          value={this.state.text}
          style={{ margin: 5, width: '96%' ,borderRadius: 3, backgroundColor: '#f2f3f4' }}
          underlineColorAndroid='transparent'
          placeholder="Search"
          returnKeyType="search"
          placeholderStyle={{}}
        />
      <ScrollView>
      <ListView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        enableEmptySections={true}
        dataSource={this.state.dataSourceListView}
        renderRow={(rowData) => 
          <View style={{ width: 100, height: 125, justifyContent:'center', backgroundColor: '#fafafa' }}>
            <TouchableOpacity onPress={() => { Alert.alert(rowData.guid) }}>
              <Image source={{uri: rowData.picture}} style={{ width: 65, height: 65, alignSelf: 'center', borderRadius: 50 }}/>
            </TouchableOpacity>
            <Text numberOfLines={1} style={{ color: 'black', fontSize: 12, textAlign: 'center', padding: 5, paddingBottom: 5 }}>{rowData.name}</Text>
          </View>
        }
      />
      <FlatList
        ref = "rootView"
        style = {{ flex: 1 }}
        data={ this.state.dataSourceFlatList }
        renderItem={ ({item}) =>
          <ListView
            ref = "rootView"
            style = {{ flex: 1 }}
            enableEmptySections={true}
            dataSource={this.state.dataSourceListView}
            renderRow={(rowData) => 
              <View style={{ flexWrap: 'wrap' }}>
                <TouchableOpacity onPress={() => { Alert.alert(rowData.guid) }}>
                  <Image style={{ height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 3, margin: 1 }} source = {{ uri: rowData.picture }} onPress={()=>alert(rowData.picture)}/>
                </TouchableOpacity>
              </View>
            }
          />
        }
        numColumns = { this.state.Columns }
        key = {( this.state.Columns ) }
        keyExtractor={item => item.name}
      />
      </ScrollView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({

})