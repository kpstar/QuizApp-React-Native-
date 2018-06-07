import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animbutton from '../components/animbutton'
const { width, height } = Dimensions.get('window')

export default class Quiz extends Component {
  constructor(props){
    super(props);
    this.qno = 0
    this.score = 0
    this.json = this.props.questions
    this.state = {
      question : this.json[this.qno].description,
      options : this.json[this.qno].answers,
      correctoption : this.json[this.qno].correctAnswer,
      countCheck : 0,
      indexes: []
    }
  }
  next(){
    // if(this.qno < this.json.length-1){
    //   this.qno++

    //   this.setState({ countCheck: 0, question: this.json[this.qno].description, options: this.json[this.qno].answers, correctoption : this.json[this.qno].correctAnswer})
    // }else{
      
    //   this.props.quizFinish(this.score*100/5)
    //  }
    // this.state.indexes.ad
    // if (this.state.indexes.size < this.json.size) {
        
    // } else {
    //     this.props.quizFinish(this.score)
    // }
  }
  _answer(status,ans){

    if(status == true){
        const count = this.state.countCheck + 1
        this.setState({ countCheck: count })
        if(ans == this.state.correctoption ){
          this.score += 1
        }
      }else{
        const count = this.state.countCheck - 1
        this.setState({ countCheck: count })
        if(this.state.countCheck < 1 || ans == this.state.correctoption){
        this.score -= 1
       }
      }

  }
  render() {
    let _this = this
    const currentOptions = this.state.options
    const options = Object.keys(currentOptions).map( function(k) {
      return (  <View key={k} style={styles.buttons}>

        <Animbutton countCheck={_this.state.countCheck} onColor={"green"} effect={"tada"} _onPress={(status) => _this._answer(status,k)} text={currentOptions[k]} />

      </View>)
    });

    return (
      <ScrollView style={{backgroundColor: '#F5FCFF',paddingTop: 10}}>
      <View style={styles.container}>

      <View style={{ flex: 1,flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>

      <View style={styles.oval} >
        <Text style={styles.welcome}>
          {this.state.question}
        </Text>
     </View>
        <View>
        { options }
        </View>
        <View style={{flexDirection:"row"}}>
        {/* <TouchableOpacity onPress={() => this.next()} >
          <View style={{paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"green"}}>
            <Icon name="md-arrow-round-forward" size={30} color="white" />
          </View>
        </TouchableOpacity > */}

        </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  oval: {
    width: width * 90/100,
    borderRadius: 20,
    backgroundColor: 'green',
    marginTop: 50,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    margin: 15,
    color: "white",
    justifyContent: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttons: {
      margin: 10,
      paddingTop: 10,
      width: width*80/100,
  },
  toolbarButton:{
    width: 55,
    color:'#fff',
    textAlign:'center'
  },
});