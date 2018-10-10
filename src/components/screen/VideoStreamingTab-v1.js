import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    FlatList
} from 'react-native';

import ToastKotlin from './ToastKotlin';
import StreamingKotlin from './StreamingKotlin';

export default class VideoStreamingTab extends Component<{}> {

  constructor()
  {
    super();
    this.state = {
      currentUser: null,
      Columns: '',
      orientation: '',
      height: '',
      width: '',
      searchText: '',
    }
  }

  getOrientation = () => {
    if( this.refs.rootView ) {
        if( Dimensions.get('window').width < Dimensions.get('window').height ) {
          this.setState({ orientation: 'portrait' });
          this.setState({ Columns: 3 });
          this.setState({ height: Dimensions.get('window').width / 3 });
          this.setState({ width: Dimensions.get('window').width / 3 });
        } else {
          this.setState({ orientation: 'landscape' });
          this.setState({ Columns: 3 });
          this.setState({ height: Dimensions.get('window').width / 3 });
          this.setState({ width: Dimensions.get('window').width / 3 });
        }
    }
  }

  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener( 'change', () => { this.getOrientation(); });
  }

  componentWillMount() {
    return fetch('http://pixabay.com/api/videos/?key=6587622-e897de28a30a052a6cf8f0d43&q=movie')
      .then((response) => response.json()).then((responseJson) => {
        this.setState({ dataSource: responseJson.hits },
        function() { 
          console.warn(responseJson.hits)
        })
      }).catch((error) => { console.error(error) })
  }

    onHandleItemPress(item) {
      ToastKotlin.show('Playing: ' + item.userImageURL, ToastKotlin.LONG);
      StreamingKotlin.playVideoStream(
          item.picture_id,
          item.pageURL
      );
    }

  render() {
    return (
      <FlatList
        ref = "rootView"
        style={{ flex: 1, flexWrap: 'wrap' }}
        data={ this.state.dataSource }
        renderItem={ ({item}) =>
          <View>
            <Text style={{ fontSize: 14, color: 'black', justifyContent: 'center', textAlign: 'center' }}>{item.type}</Text>
            <TouchableOpacity
              onPress={() => this.onHandleItemPress(item.pageURL)}
            >
              <Image style={{ height: this.state.height, width: this.state.width, margin: 1 }} source = {{ uri: item.userImageURL }} />
            </TouchableOpacity>
          </View>
        }
        numColumns = { this.state.Columns }
        key = {( this.state.Columns ) }
        keyExtractor={item => item.picture_id}
      />
    );
  }
}

const styles = StyleSheet.create({

});