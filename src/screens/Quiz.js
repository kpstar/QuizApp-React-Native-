import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View, 
  Image
} from 'react-native';

import { Container} from 'native-base';


export default class Quiz extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.Container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});