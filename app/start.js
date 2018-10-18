import React ,{Component} from 'react';
import {connect} from 'react-redux';
import Auth from './Auth'
import {
  View,
  StyleSheet,AsyncStorage
} from 'react-native';
import Home from './Home'
import {getUser,saveUser} from './store/session/actions.js'




class Start extends Component{
  constructor(props) {
    super(props);
    this.state={}
  }

  componentWillMount(){
   this.getUserId()
 }
  getUserId = async () => {
   let user = '';
   let userId='';
   try {
     user = await AsyncStorage.getItem('success') || 'none';
     userId = await AsyncStorage.getItem('userID') || null;
     this.props.getUser(user)
   } catch (error) {
     // Error retrieving data
     console.warn(error.message);
   }
   this.setState({userId:userId})
 }
render(){

    if(this.props.logged == true||this.props.userString =='true')
      {  return(
        <Home userID={this.state.userId}/>
      )       }
    else {
      return(<Auth /> ) }

    }
   }



mapDispatchToProps={
  getUser:getUser
}
mapStateToProps=(state)=>({
  logged:state.logged,useR :state.user ,userString:state.userString
})

export default connect(mapStateToProps,mapDispatchToProps)(Start)
