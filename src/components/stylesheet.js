import React from 'react';
import { StyleSheet } from 'react-native';

export const ColorScheme = {
  first: '#212121', //the darkest color
  second: '#0d7377',
  third: '#14ffec',
  fourth: '#323232', //second darkest color
  fith: '#fcfffc',
  sixth: '#9e9e9e',
  seventh: '#003300',
};

export const Color = {
  textColor: ColorScheme.third,
  headerColor: ColorScheme.fith,
  active: ColorScheme.third,
  inactive: ColorScheme.second,
  backgroundColor: ColorScheme.first,
  activeBackgroundColor: ColorScheme.fourth,
  mainBackgroundColor: ColorScheme.fourth,
  mainFontColor: ColorScheme.fith,
  mainFontColorInactive: ColorScheme.sixth,
  buttonFontColor: ColorScheme.seventh,
  buttonBackgroundColor: ColorScheme.third,
  inactiveButtonBackgroundColor: ColorScheme.second,
  borderColor: ColorScheme.second,
  buttonBorderColor: ColorScheme.second,
  inactiveButtonBorder: ColorScheme.third,
  graphShadowColor: ColorScheme.second,
};

export const Theme = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Color.headerColor
  },
  maincontainer: {
    borderRadius: 20,
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: Color.backgroundColor,
    backgroundColor: Color.mainBackgroundColor
  },
  text: {
    color: Color.mainFontColor,
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    color: Color.buttonBackgroundColor,
  },
  button: {
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Color.buttonBackgroundColor,
    padding: 20,
    borderWidth: 2,
    borderColor: Color.buttonBorderColor,
    marginTop: 7,
  },
  buttonInactive: {
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Color.inactiveButtonBackgroundColor,
    padding: 20,
    borderWidth: 2,
    borderColor: Color.inactiveButtonBorder,
    marginTop: 7,
  },
  buttonText: {
    color: Color.buttonFontColor,
    fontWeight: 'bold'
  },
  buttonTextInactive: {
    color: Color.mainFontColorInactive,
    fontWeight: 'bold'
  },
  input: {
    height: 35,
    width: 80,
    marginTop: 5,
    borderColor: Color.buttonBorderColor,
    backgroundColor: Color.mainBackgroundColor,
    color: Color.mainFontColor,
    borderWidth: 1,
  },
  inputContainer: {
    alignItems: 'center',
    borderWidth: 0,
    flexDirection: 'row',
    paddingTop: 10
  },
  picker: {
    alignItems: 'center',
    backgroundColor: Color.buttonBackgroundColor,
    padding: 5,
    borderRadius: 10,
  },
});
