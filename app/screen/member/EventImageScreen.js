import React, { Component } from 'react';
import { View, Alert, ScrollView, Image } from 'react-native';
import { Provider as PaperProvider, Appbar, Button, Portal, Modal, TouchableRipple, ActivityIndicator } from 'react-native-paper';
import { showMessage } from "react-native-flash-message";
import ValidationComponent from 'react-native-form-validator';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';

import supabase from '../../config/supabase';
import store from '../../config/storeApp';
import styleApp from '../../config/styleApp.js';

class BuktiBayarScreen extends ValidationComponent {

  constructor(props) {
      super(props);

      this.state = store.getState();  
      store.subscribe(()=>{
        this.setState(store.getState());
      });

      this.state = {
        
      };
  }

  componentDidMount() {
      this.getData();

  }

  async getData() {
    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:true }
    });

    let event_id = this.props.route.params.event_id;
 
    let { data, error } = await supabase
          .from('event')
          .select('id, cover')          
          .eq('id', event_id)
          .single()

    this.setState({ cover:data.cover });

    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:false }
    });
  }

  async onUploadCover() {
    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:true }
    });

    //request akses galeri
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showMessage({
        message: 'Akses galeri tidak diijinkan',
        type: 'danger',
        icon: 'danger',
      });

    } else {

      //buka galeri
      let fileImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      //jika close galeri
      if (fileImage.cancelled) {
        store.dispatch({
            type: 'LOADING',
            payload: { isLoading:true }
        });

      //proses upload
      } else {
      
        //ambil nama file & ekstensi (jpg/png)
        let fileData = fileImage.uri.split('/');
        let fileName = fileData[(fileData.length-1)];
        let fileNameData = fileName.split('.');
        let fileNameExt = fileNameData[1];

        //upload image ke supabase storage
        const { data, error } = await supabase
                                .storage
                                .from('eventbanner')
                                .upload('public/'+fileName, decode(fileImage.base64), {
                                     contentType: 'image/'+fileNameExt
                                })

        //get url image sampul
        const { signedURL } = await supabase
                                      .storage
                                      .from('eventbanner')
                                      .createSignedUrl('public/'+fileName, 6000000000);
        let cover = signedURL;

        //respon
        if(error != null) {
          showMessage({
            message: error,
            type: 'danger',
            icon: 'danger',
          });
        } else {
          //update sampul di table buku
          let event_id = this.props.route.params.event_id;
          const { data } = await supabase
                                        .from('event')
                                        .update([{
                                            cover: cover,
                                        }])
                                        .eq('id', event_id);

          showMessage({
            message: 'Gambar berhasil diupload',
            type: 'success',
            icon: 'success',
          });
        }

        this.setState({cover:cover});
      }
      //end proses upload
    }

    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:false }
    });

  }

  onDeleteCoverConfirm() {
    Alert.alert(
      "Perhatian",
      "Cover akan dihapus",
      [
        { text: "Batal" },
        { text: "OK", onPress: () => this.onDelete() }
      ]
    );
  }

  async onDelete() {

    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:true }
    });

    //ambil nama file
    let cover = this.state.cover;
    let coverData = cover.split('/');
    let coverName = coverData[(coverData.length-1)];
    let coverNameData = coverName.split('?');
    let coverNamePure = coverNameData[0];

      //hapus
      const { data, error } = await supabase
                              .storage
                              .from('eventbanner')
                              .remove(['public/'+coverNamePure]);

      if(error != null) {
        showMessage({
          message: error,
          type: 'danger',
          icon: 'danger',
        });
      } else {
        //update sampul di table buku
        let event_id = this.props.route.params.event_id;
        const { data } = await supabase
                                      .from('event')
                                      .update([{
                                          cover: null,
                                      }])
                                      .eq('id', event_id);

        showMessage({
          message: 'Cover berhasil dihapus',
          type: 'success',
          icon: 'success',
        });
      }
      
      this.setState({cover:null});

      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:false }
      });
  }

  render() {
      return (
        <>
          <Appbar.Header style={styleApp.Appbar}>
            <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Upload Cover" color='green'/>
          </Appbar.Header>

          <ScrollView style={ styleApp.ScrollView }>

           {this.state.cover == null ?
                <View style={{marginTop:20}}>
                  <Button 
                    mode="contained"
                    icon="image" 
                    onPress={() => this.onUploadCover()}
                    disabled={this.state.isLoading}
                    style={styleApp.Button}
                  >
                    Upload Cover
                  </Button>
                </View>
              :
                <View style={{marginTop:20}}>
                  <Image
                    style={{ alignSelf: 'center', width:330, height:140 }}
                    resizeMode="contain"
                    source={{
                      uri: this.state.cover
                    }}
                  />

                  <Button 
                    mode="text"
                    icon="delete" 
                    onPress={() => this.onDeleteCoverConfirm()}
                    disabled={this.state.isLoading}
                    style={styleApp.Button}
                  >
                    Hapus Cover
                  </Button>
                </View>
            }

          </ScrollView>
        </>
      )
  }
}

export default BuktiBayarScreen;
