import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

export const Searchboxview = ({navigation, route}) => {

        const [channel_name, setChannels] = React.useState([]);
        const [showChannel_name, setShowChannels] = React.useState([]);
        const filters = {
            type: 'messaging',
            example: 'slack-demo',
            members: {
              $in: [route.params.client.user.id],
            }
        }
        let offset = 0;
        const options = {limit: 30, state: true};
        async function fetchChannels() {
            const channels = await route.params.client.queryChannels(filters);
            const channels_names = [];
            channels.map((c,i)=> {
                const obj = {
                    key : i,
                    name : c.data.name,
                    channelId : c.id,
                }                
                channels_names.push(obj)
            })
            setChannels(channels_names);
        }
        function searchFunction(u){
            fetchChannels();
            const showchannel = [];
            channel_name.map((c)=> {
                if(c.name!= undefined && c.name.toLowerCase().indexOf(u) > -1)
                {
                    showchannel.push({
                        key : c.key,
                        name : c.name,
                        channelId : c.channelId,
                    })
                }
            })
            setShowChannels(showchannel)
            
        }
        function changeChannel(channelId) {
            navigation.jumpTo('ChannelScreen',{channelId,});
        }
        
        return(
            <>
            <View style={{flexDirection:"row",backgroundColor:"#3F0E40"}}>
                <Text style={styles.backButton} onPress={() => {navigation.goBack(); navigation.openDrawer()}}>{" <"}</Text>
                <TextInput
                    autoFocus={true}
                    style={styles.inputSearchBox}
                    placeholderTextColor="grey"
                    placeholder="Jump to"
                    blurOnSubmit={true}
                    onChangeText= {searchFunction}
                />
            </View>
            <View style={{backgroundColor: "#3F0E40",height:"100%",width:"100%"}}>
                <FlatList
                    style={{margin:20}}
                    data={showChannel_name}
                    renderItem= {({item, index, separator}) => (
                        <Text onPress={() => changeChannel(item.channelId)} key={item.key} style={{color: "white",fontSize:20,margin:10}}>{item.name}</Text>
                    )}
                />

            </View>
            </>
        )
    }
const styles = StyleSheet.create({
    inputSearchBox: {
        flex:9,
        height:40,
        borderRadius:20,
        color: "white",
        backgroundColor: '#2e0a2f',
        margin: 10,
      },
      backButton: {
          flex:1,
          fontSize:30,
          marginTop:10,
          borderRadius:50,
          backgroundColor:'#2e0a2f',
          height:40,
          marginLeft:5,
          paddingLeft:5,
          color:"white"
        },   
})