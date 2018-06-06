import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View, 
    Image
  } from 'react-native';
import { Container, Content, Button, Icon, Form, Item, Label, Input, Text, Footer} from 'native-base';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
export default class FloatingLabelExample extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }
  render() {
    return (
        <Container>
        <Content contentContainerStyle={styles.container}>
            
            <Form style={styles.form}>
                <Item floatingLabel last>
                    <Label>Email</Label>
                    <Input autoCapitalize='none' autoCorrect={false} value={this.state.email} onChangeText={text=>this.setState({email: text})}/>
                </Item>
                <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input secureTextEntry={true} value={this.state.password} onChangeText={text=>this.setState({password: text})}/>
                </Item>
            </Form>
            <Button block primary onPress={this.onLogin.bind(this)}><Text>Sign in</Text></Button>
        </Content>
    </Container>
    );
  }

  onLogin() {
     this.props.navigation.navigate('LevelScreen')
  }

}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
        paddingTop: responsiveHeight(5),
        // backgroundColor: Colors.backgroundPrimary,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    form: {
        marginVertical: 24,
    }, 

    footer: {
        backgroundColor: '#fff0',
        alignItems: 'center',
        justifyContent: 'center'
    }
});