import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  View, 
  Image,
  FlatList,
} from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { Container, Button, Text, Content, Form} from 'native-base';
import { images, Colors } from '../theme';
import { getQuestions } from '../services/api';

export default class Question extends Component {

    constructor(props){
        super(props)
        this.state = {
            score: 0,
            randomIndex: -1,
            questions: [],
            currentQuestion: null,
            answeredIndex: -1,
            isCorrect: false,
            correctAnswer: "",
            total_question: 0,
        }

    }

    setStateFromQuestions(questions){
        console.log("setStateFromQuestions")
        let randomIndex = Math.floor(questions.length * Math.random())
        this.setState({
            randomIndex,
            questions,
            currentQuestion: questions[randomIndex],
            answeredIndex: -1,
            isCorrect: false,
            correctAnswer: questions[randomIndex].correctAnswer,
        })         
    }

    componentDidMount() {
        const { state: { params: { questions } } } = this.props.navigation
        const { total_question } = this.state
        this.setState({ total_question : questions.length, })
        this.setStateFromQuestions(questions)
    }

    onBtnClick(answeredIndex){
        const answered = Object.keys(this.state.currentQuestion.answers)[answeredIndex]
        let isCorrect =  answered == this.state.correctAnswer
        const {questions, randomIndex, score} = this.state
        questions.splice(randomIndex, 1)
        this.setState({
            isCorrect, 
            answeredIndex,
            score: isCorrect ? this.state.score + 1 : this.state.score,
        })

        setTimeout(() => {
            
            if (questions.length > 0)
                this.setStateFromQuestions(questions)
        }, 500);
        console.log("score", this.state.score)

    }

    finishStatus() {

    }

    render() {
        console.log("render")
        const {currentQuestion, questions, total_question} = this.state

        let now_question = total_question - questions.length + 1
        return (
            questions.length > 0 ?
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Text style={styles.scored}>Score: {this.state.score}</Text>
                    <Text style={styles.questionnum}>Questions {now_question}/{total_question}</Text>
                    <Text style={styles.question}>{currentQuestion.description}</Text>
                    {/* {Object.values(currentQuestion.answers).map((answer, index)=>{
                        return (
                            <Button 
                                key={answer} 
                                block 
                                bordered={this.state.answeredIndex != index}
                                borderColor='#000000'
                                success={this.state.isCorrect}  
                                danger={!this.state.isCorrect}  
                                onPress={this.onBtnClick.bind(this, index)} style={styles.answerbutton}><Text>{answer}</Text></Button>                                              
                        )
                    })} */}
                    <FlatList
                        contentContainerStyle={styles.listContainer}
                        data={Object.values(currentQuestion.answers)}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            return (
                            <View style={{justifyContent: 'center',  margin: 10, width: 100, height: 100}}>
                                <Button block 
                                bordered={this.state.answeredIndex!=index} 
                                success={this.state.isCorrect} 
                                danger={!this.state.isCorrect}
                                onPress={this.onBtnClick.bind(this, index)}
                                style={{flex:1, margin: 10}}> <Text>{item}</Text> </Button>
                            </View>)}}
                        keyExtractor={(item, index) => index.toString()}

                    />  
                </Content>
            </Container> : 
                <View style={{flex:1}}>
                    <StatusBar barStyle="light-content"/>
                    <View style={styles.toolbar}>
                        <TouchableOpacity onPress={() => this._onPressBack() }><Text style={styles.toolbarButton}>Back</Text></TouchableOpacity>
                        <Text style={styles.toolbarTitle}></Text>
                        <Text style={styles.toolbarButton}></Text>
                    </View>
                    <Text style={styles.scores}>Scores: {this.state.score}</Text>
                    <View style={styles.containers}>
                        <View style={styles.circle}>
                            <Text style={styles.congra}>Congratulations</Text>
                        </View>
                    </View>
                </View>
        )
    }

    _onPressBack(){
        const {goBack} = this.props.navigation
          goBack()
      }
}
const scoreCircleSize = 300
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
        marginVertical: 30,
        paddingTop: responsiveHeight(5),
        backgroundColor: Colors.backgroundPrimary,
    },
    containers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
    form: {
        marginVertical: 20,
    },
    question: {
        marginTop: 50,
        fontSize: 24,
        textAlign: 'center'
    },
    answerbutton:{
        marginVertical: 10,
    },
    scores:{
        marginTop: 20,
        fontSize: 25,
        color: Colors.textPrimary,
        justifyContent: 'flex-end',
        padding: 5, 
        marginLeft: 20,
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    scored:{
        marginTop: 20,
        fontSize: 20,
        color: '#f00',
        justifyContent: 'flex-end',
        padding: 5, 
        marginLeft: 20,
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    toolbar:{
        backgroundColor:'#81c04d',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'
    },
    toolbarButton:{
        width: 55,
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1
    },
    listContainer: {
        padding: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    congra:{
        color:'#f00',
        fontSize: 30,
        fontWeight:'bold',
    },
    questionnum:{
        color:'#f00',
        fontSize: 26,
        fontWeight:'bold',
    },
    score: {
        color: "white",
        fontSize: 20,
        fontStyle: 'italic'
      },
      circle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scoreCircleSize,
        height: scoreCircleSize,
        borderRadius: scoreCircleSize/2,
        backgroundColor: "green"
      },
});