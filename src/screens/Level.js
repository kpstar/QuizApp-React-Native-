import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image
} from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { Container, Button, Text, Content, Form} from 'native-base';
import { images, Colors } from '../theme';
import { getQuestions } from '../services/api';

export default class Level extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <Form style={styles.form}>
                        <Button block success onPress={this.onEasyBtnClick.bind(this)}><Text>Easy</Text></Button>
                    </Form>
                    <Form style={styles.form}>
                        <Button block warning onPress={this.onMediumBtnClick.bind(this)}><Text>Medium</Text></Button>
                    </Form>
                    <Form style={styles.form}>
                        <Button block danger onPress={this.onHardBtnClick.bind(this)}><Text>Hard</Text></Button>
                    </Form>
                </Content>
            </Container>
        )
    }

    async onEasyBtnClick() {        
        let res = await getQuestions('bins/vw1sa')
        console.log('question res', res)
        this.props.navigation.navigate('QuestionScreen', {questions: res.Additions.question})
    }

    async onMediumBtnClick() {        
        let res = await getQuestions('bins/cbm7u')
        console.log('question res', res)
        this.props.navigation.navigate('QuestionScreen', {questions: res.Additions.question})
    }

    async onHardBtnClick() {        
        let res = await getQuestions('bins/us1yy')
        console.log('question res', res)
        this.props.navigation.navigate('QuestionScreen', {questions: res.Additions.question})
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
    }
});