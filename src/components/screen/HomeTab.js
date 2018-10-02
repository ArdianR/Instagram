import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	FlatList,
  ListItem,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default class HomeTab extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
        loading: false,
        data: [],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false,
        orientation: '',
        width: 0,
        height: 0
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

	ReadMore = () => {
		if(this.state.read == false)
		{
			this.setState({read: true})
			this.setState({more: false})
		}
	}



	componentWillMount() {
		return fetch('https://next.json-generator.com/api/json/get/EkfqX7muB')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					dataSource: responseJson,
				},
				function() {
				});

			})
			.catch((error) => {
					console.error(error);
			});
	}

	render() {
		return (
      <ScrollView>
        <View style={{ flexDirection: 'row', backgroundColor: '#fafafa' }}>
          <Text style={{ paddingLeft: 5,  margin: 5, textAlign: 'left', fontSize: 12, justifyContent: 'center', color: '#202020' }}>invite Facebook Friends to Instagram</Text>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <Text style={{ paddingRight: 10, margin: 5, textAlign: 'right', fontSize: 12, color: '#3897f0' }}>See All</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={this.state.dataSource}
          keyExtractor={item => item.email}
          style={{ backgroundColor: '#fafafa' }}
          renderItem={({ item }) => (
            <View style={{ width: 125, height: 175, flexDirection: 'column', justifyContent:'center', margin: 4 }}>
              <Image source={{uri: item.picture}} style={{ width: 75, height: 75, justifyContent: 'center', alignSelf: 'center', borderRadius: 50, }} />
              <Text numberOfLines={1} style={{ color: 'black', fontSize: 12, textAlign: 'center', padding: 5, paddingBottom: 15 }}>{item.name}</Text>
              <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity>
                    <Text style={{ borderRadius: 2, fontSize: 12, padding: 2, marginRight: 10, marginLeft: 10, backgroundColor: '#3897f0', textAlign: 'center', color: 'white' }}>invite</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <FlatList
          ref = "rootView"
          style={{ flex: 1 }}
          data={this.state.dataSource}
          keyExtractor={item => item.name}
          style={{ flex: 1, backgroundColor: '#fafafa' }}
          renderItem={({item}) => 
            <View>
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Image source={{ uri: item.picture}} style={{ width: 45, height: 45, margin: 10, borderRadius: 50 }}/>
                <View style={{ flex: 4, justifyContent: 'center' }}>
                  <Text style={{ color: 'black', fontSize: 12 }}>{item.name}</Text>
                  <Text numberOfLines={1} style={{ color: 'black', fontSize: 12 }}>{item.address}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <TouchableOpacity>
                    <Icon name='ios-more' size={25} color='black' style={{ paddingRight: 15, textAlign: 'right' }}/>
                  </TouchableOpacity>
                </View>
              </View>
              <Image source={{uri: item.picture}} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }} />
              <View style={{ margin: 15, flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Icon name='md-heart-empty' size={25} color='black' style={{ paddingRight: 25 }}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name='ios-chatboxes' size={25} color='black' style={{ paddingRight: 25 }}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name='md-send' size={25} color='black' style={{ paddingRight: 25 }}/>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <TouchableOpacity>
                    <Icon name='md-bookmark' size={25} color='black' style={{ paddingRight: 5, textAlign: 'right' }}/>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={{ fontSize: 12, color: 'black', paddingLeft: 15, paddingBottom: 5 }}>{item.like} Likes</Text>
              <Text style={{ fontSize: 12, color: 'black', paddingLeft: 15, paddingBottom: 5 }}>{item.like} HOURS AGO</Text>
              <Text numberOfLines={1} style={{ fontSize: 12, color: 'black', paddingLeft: 15, paddingRight: 15, paddingBottom: 5 }}>{item.about}</Text>
              {
                this.state.more ? 
                  <TouchableOpacity onPress={this.ReadMore}>
                      <Text style={{ fontSize: 12, color: 'black', paddingLeft: 15, paddingBottom: 5 }}>more</Text>
                  </TouchableOpacity>
                : null
              }
              {
                this.state.read ? 
                  <Text style= {{ fontSize: 12, color: 'black' }}>{item.about}</Text>
                : null
              }
            </View>
          }
        />
      </ScrollView>
		);
	}
}

const styles = StyleSheet.create({
});