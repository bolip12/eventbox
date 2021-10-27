import * as React from 'react';
import { ScrollView, View, FlatList, Alert, Text, Image } from 'react-native';
import { Provider as PaperProvider, Appbar, TextInput, Button, HelperText } from 'react-native-paper';
import ValidationComponent from 'react-native-form-validator';
import { showMessage } from "react-native-flash-message";
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';

import supabase from '../../config/supabase.js';
import styleApp from '../../config/styleApp.js';
import store from '../../config/storeApp';

class EventImageScreen extends ValidationComponent {

	constructor(props) {
	    super(props);

	    this.state = store.getState();  
	    store.subscribe(()=>{
	      this.setState(store.getState());
	    });

	    this.state = {
	    	...this.state,
	    };

	}

	componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.fetchData();
    });
	}

  componentWillUnmount() {
  	this._unsubscribe();
  }

	async fetchData() {

		let event_id = this.props.route.params.event_id;

		store.dispatch({
        type: 'LOADING',
        payload: { isLoading:true }
    });
 
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

    let event_id = this.props.route.params.event_id;

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
        this.setState({isLoading:false});

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
        let coverURL = signedURL;

        //respon
        if(error != null) {
          showMessage({
            message: error,
            type: 'danger',
            icon: 'danger',
          });
        } else {
          
          const { data } = await supabase
                                        .from('event')
                                        .update([{
                                            cover: fileName,
                                        }])
                                        .eq('id', event_id);

          showMessage({
            message: 'Gambar berhasil diupload',
            type: 'success',
            icon: 'success',
          });
        }

        this.setState({icoverURL:coverURL});
      }
      //end proses upload
    }

    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:true }
    });

  }

	async onChangeCover() {
		store.dispatch({
      type: 'LOADING',
        payload: { isLoading:true }
    });

    let event_id = this.props.route.params.event_id;

	 	let options = {
    			saveToPhotos: false,
	    		includeBase64: true,
	    	}

		launchImageLibrary(options, async(response) => {

			//validate
			let validate = true;
			if(response.didCancel === true) {
				validate = false;
			}

			let fileData = response.assets[0];
			if(fileData.width > 300) {
				validate = false;
				showMessage({
		      message: 'Max lebar gambar 300 pixel',
		      icon: 'warning',
		      backgroundColor: 'red',
		      color: 'white',
		    });
			}

			if(fileData.height > 140) {
				validate = false;
				showMessage({
		      message: 'Max tinggi gambar 140 pixel',
		      icon: 'warning',
		      backgroundColor: 'red',
		      color: 'white',
		    });
			}

			if(validate === true) {

	      //delete prev
	      let cover = this.state.cover;
				let coverData = cover.split('/');
		    let coverName = coverData[(coverData.length-1)];
		    let coverNameData = coverName.split('?');
		    let coverNamePure = coverNameData[0];

	      const { data:delete_prev, error:error_prev } = await supabase
																  .storage
																  .from('eventbanner')
																  .remove(['public/'+coverNamePure])

			  //upload new
			  let fileData = response.assets[0];
				const { data, error } = await supabase
			                        .storage
			                        .from('eventbanner')
			                        .upload('public/'+fileData.fileName, decode(fileData.base64), {
			                             contentType: fileData.type
			                        })
				if(error == null) {
						//get file url
	          const { signedURL } = await supabase
	                                          .storage
	                                          .from('eventbanner')
	                                          .createSignedUrl('public/'+fileData.fileName, 6000000000);

	          //update cover link
	          const {data:update_cover} = await supabase
																				  .from('event')
																				  .update([{ cover: signedURL }])
																				  .eq('id', event_id);

					  this.setState({cover:signedURL});
					  showMessage({
				      message: 'Cover berhasil diubah',
				      icon: 'success',
				      backgroundColor: 'green',
				      color: 'white',
				    }); 

	      } else {
	      		showMessage({
				      message: error.message,
				      icon: 'warning',
				      backgroundColor: 'red',
				      color: 'white',
				    });
	      }

	    }
	    //end validate

    })

    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:false }
    });
	}

	async onDeleteCoverConfirm() {
	    Alert.alert(
	      "Warning",
	      "Cover akan dihapus?",
	      [
	        { text: "Batal" },
	        { text: "OK", onPress: () => this.onDeleteCover() }
	      ],
	    );
	}

	async onDeleteCover() {
		store.dispatch({
        type: 'LOADING',
        payload: { isLoading:true }
    });

		//delete prev
		let event_id = this.props.route.params.event_id;

    let cover = this.state.cover;
		let coverData = cover.split('/');
    let coverName = coverData[(coverData.length-1)];
    let coverNameData = coverName.split('?');
    let coverNamePure = coverNameData[0];

    const { data:delete_prev } = await supabase
														  .storage
														  .from('eventbanner')
														  .remove(['public/'+coverNamePure])

		//update cover link
    const {data:update_cover} = await supabase
																  .from('event')
																  .update([{ cover:null }])
																  .eq('id', event_id);

		this.setState({cover:null});

		showMessage({
      message: 'Cover berhasil dihapus',
      icon: 'success',
      backgroundColor: 'green',
      color: 'white',
    }); 

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

			    <ScrollView style={styleApp.ScrollView}>

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
									<View style={{alignItems:'center'}}><HelperText>Ukuran cover : Max lebar 300 pixel & max tinggi 140 pixel</HelperText></View>
								</View>
							:
								<View style={{marginTop:20}}>
						   		<Image
						        style={{ alignSelf: 'center', width:325, height:100}}
						        resizeMode="contain"
						        source={{
						          uri: this.state.cover
						        }}
						      />

						      <Button 
							    	mode="contained"
							    	icon="pencil" 
							    	onPress={() => this.onChangeCover()}
							    	disabled={this.state.isLoading}
							    	style={styleApp.Button}
							    >
								    Ubah Cover
									</Button>
									<View style={{alignItems:'center'}}><HelperText>Ukuran cover : Max lebar 300 pixel & max tinggi 140 pixel</HelperText></View>

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

export default EventImageScreen;