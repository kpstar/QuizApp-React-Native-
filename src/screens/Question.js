import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  View, 
  Image
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
        const {currentQuestion, questions} = this.state
        return (
            questions.length > 0 ?
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Text style={styles.question}>{currentQuestion.description}</Text>
                    {Object.values(currentQuestion.answers).map((answer, index)=>{
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
                    })}
                </Content>
            </Container> : 
                <View>
                    <View style={styles.toolbar}>
                        <TouchableOpacity onPress={() => this._onPressBack() }><Text style={styles.toolbarButton}>Back</Text></TouchableOpacity>
                        <Text style={styles.toolbarTitle}></Text>
                        <Text style={styles.toolbarButton}></Text>
                    </View>
                    <Text style={styles.scores}>Scores: {this.state.score}</Text>
                </View>
        )
    }

    _onPressBack(){
        const {goBack} = this.props.navigation
          goBack()
      }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
        marginVertical: 30,
        paddingTop: responsiveHeight(5),
        backgroundColor: Colors.backgroundPrimary,
        justifyContent: 'center',
    },
    form: {
        marginVertical: 20,
    },
    question: {
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
    }
});