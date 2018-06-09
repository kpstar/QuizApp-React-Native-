/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import Login from "./screens/Login"
import Level from "./screens/Level"
import Question from "./screens/Question"

export const PrimaryNav = StackNavigator({

    LoginScreen: {screen: Login},
    LevelScreen: {screen: Level},
    QuestionScreen: {screen: Question},
}, {
    headerMode: 'none',
})