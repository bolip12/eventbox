import * as React from 'react';
import { ScrollView, View, FlatList, Dimensions } from 'react-native';
import { HelperText, List, RadioButton, Button, Title, Divider } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class pickerInput extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	pickerDisplay: false,
	    	labelSelected: '',
	    };
	}

	toggleDisplay() {
	    this.setState({pickerDisplay: !this.state.pickerDisplay})
	}

	componentDidMount() {
		this.defaultValue();
	}

	componentDidUpdate(prevProps, prevState) {
	    if(prevProps.value !== this.props.value) {
	      this.defaultValue();
	    }

	    if(prevState.pickerDisplay !== this.state.pickerDisplay && this.state.pickerDisplay == true) {
	      this.RBSheet.open();
	    }

	    if(prevState.pickerDisplay !== this.state.pickerDisplay && this.state.pickerDisplay == false) {
	      this.RBSheet.close();
	    }
	}

	defaultValue() {
		//this.defaultValue();
		let labelSelected = this.props.label;
		let valueSelected = this.props.value;
		
		this.setState({labelSelected:labelSelected, valueSelected:valueSelected});
	}

	onSelect(value) {
	    this.props.onChangePickerValue(value);

	    let label = '';
	    this.props.options.map((item, key) => {
	    	if(item.value == value) {
	    		label = item.label;
	    	}
	    });

	    this.setState({labelSelected: label})
	    this.props.onChangePickerLabel(label);
	    this.toggleDisplay();
	}

	render() {
		return (
			

			<View>
				<HelperText style={{ color:'green', marginHorizontal:10, marginBottom:-20 }}>{this.props.title}</HelperText>
	            <List.Item
	              title={this.state.labelSelected}
	              right={() => <List.Icon icon="menu-down" />}
	              onPress={() => this.toggleDisplay()}
	              style={{ height:60, marginHorizontal:10, borderBottomColor:'#cccccc', borderBottomWidth:1 }}
	            />

	            <RBSheet
		          ref={ref => {
		            this.RBSheet = ref;
		          }}
		          openDuration={250}
		          closeOnPressMask={false}
		          customStyles={{ container:{height:'auto', maxHeight:(windowHeight*0.5)} }}
		        >
		        	<ScrollView keyboardShouldPersistTaps="handled" style={{margin:10}}>
		        		<View style={{flexDirection:'row'}}>
			        		<Title style={{marginLeft:20}}>{this.props.title}</Title>
			        		<View style={{marginLeft: 'auto'}}>
							<Button 
						    	mode="text"
						    	icon="cancel"
						    	color="grey"
						    	onPress={() => this.toggleDisplay()}
						    >
							    Close
							</Button>
							</View>
						</View>
			        	<Divider />

			            <RadioButton.Group onValueChange={(value) => this.onSelect(value)} value={this.state.valueSelected}>
			                <FlatList
			                  keyboardShouldPersistTaps={'handled'}
			                  data={this.props.options}
			                  keyExtractor={(item) => item.label}
			                  style={{ backgroundColor:'#fff' }}
			                  renderItem={({ item }) => (
			                    <RadioButton.Item value={item.value} label={item.label} color='green' />
			                  )}
			                />
			            </RadioButton.Group>
					</ScrollView>

		        </RBSheet>
		    </View>
		);
	}
}

export default pickerInput;