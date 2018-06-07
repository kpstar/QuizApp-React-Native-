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
import Quiz from "./screens/Quiz"
import Playquiz from "./screens/Playquiz"

export const PrimaryNav = StackNavigator({

    LoginScreen: {screen: Login},
    LevelScreen: {screen: Level},
    QuizScreen: {screen: Quiz},
    PlayquizScreen: {screen: Playquiz},
}, {
    headerMode: 'none',
})