import React, {PropTypes} from 'react';
import {
  View,
  StyleSheet,WebView,AsyncStorage,BackHandler,TouchableOpacity,Text
} from 'react-native';
import PopupDialog,{slideAnimation} from 'react-native-popup-dialog';
import Hr from "react-native-hr-component";
import {userLogin,logoutUser} from './../store/session/actions.js'
import {connect} from 'react-redux';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={userId:''}
  }
componentDidMount(){
  BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillMount(){
    // this.getUserId()
  }
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
getUserId = async () => {
  let userId = '';
  try {
    userId = await AsyncStorage.getItem('userID') ;
    this.setState({userID:userId});
    } catch (error) {
    console.warn(error.message);
    }
  alert(userId)
  }
handleBackPress = () => {
  this.popupDialog.show();
  return true;
  }
logout=()=>{
this.props.logoutUser()
}

exit=()=>{BackHandler.exitApp();}

cancel=()=>{  this.popupDialog.dismiss();}

  render() {
    return (
      <View style={{height:'100%',width:'100%'}}>


        <WebView
               source={{uri: 'https://parentapp-a4061.firebaseapp.com/'}}
               style={{flex:1}}
             />

             <PopupDialog
               ref={(popupDialog) => { this.popupDialog = popupDialog; }}
              dialogAnimation={slideAnimation} dismissOnTouchOutside={false}
              height={0.4} width={0.6} containerStyle={{paddingBottom:'35%',}} dialogStyle={{}} >
              <View style={{flex:1,borderTopLeftRadius:7,borderTopRightRadius:7}}>
                <MessagePopUp logout={this.logout} exit={this.exit} cancel={this.cancel}/>
              </View>
             </PopupDialog>

      </View>

      );
  }
}



const MessagePopUp=(props)=>{
  return (
    <View style={{flex:1,backgroundColor:'#40739e',borderRadius:5}}>
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <TouchableOpacity onPress={props.logout}>
        <Text style={{color:'#e84118',fontWeight:'bold',fontSize:22}}>Logout</Text>
      </TouchableOpacity>
      </View>
      <Hr lineColor="#353b48" textPadding={0.001} hrStyles={{width:'88%',marginHorizontal:'6%'}}/>
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity onPress={props.exit}>
          <Text style={{color:'orange',fontWeight:'bold',fontSize:22}}>Exit</Text>
        </TouchableOpacity>
      </View>
      <Hr lineColor="#353b48" textPadding={0.001} hrStyles={{width:'88%',marginHorizontal:'6%'}}/>
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity onPress={props.cancel}>
          <Text style={{color:'#4cd137',fontWeight:'bold',fontSize:22}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
mapDispatchToProps={
logoutUser:logoutUser
}

export default connect(null,mapDispatchToProps)(Home)
