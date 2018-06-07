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
                        <Button block success onPress={this.onBtnClick.bind(this)}><Text>Easy</Text></Button>
                    </Form>
                    <Form style={styles.form}>
                        <Button block warning><Text>Medium</Text></Button>
                    </Form>
                    <Form style={styles.form}>
                        <Button block danger><Text>Hard</Text></Button>
                    </Form>
                </Content>
            </Container>
        )
    }

    async onBtnClick() {        
        let res = await getQuestions('bins/vw1sa')
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