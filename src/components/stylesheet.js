import React from 'react';
import { StyleSheet } from 'react-native';

export const ColorScheme = {
  first: '#212121', //the darkest color
  second: '#3B3B3B', //second darkest color
  //-----------
  third: '#1BFF91', //brightest non-white color
  fourth: '#108C5A', // darker version of the brightest non-white color
  //-----------
  fith: '#fcfffc', //almost white
  sixth: '#9e9e9e', // grey
  seventh: '#003300', // almost black
};

export const Color = {
  textColor: ColorScheme.third,
  headerColor: ColorScheme.fith,
  active: ColorScheme.third,
  inactive: ColorScheme.fourth,
  backgroundColor: ColorScheme.first,
  activeBackgroundColor: ColorScheme.second,//
  mainBackgroundColor: ColorScheme.second,//
  mainFontColor: ColorScheme.fith,
  mainFontColorInactive: ColorScheme.sixth,
  buttonFontColor: ColorScheme.seventh,
  buttonBackgroundColor: ColorScheme.third,
  inactiveButtonBackgroundColor: ColorScheme.fourth,
  borderColor: ColorScheme.fourth,
  buttonBorderColor: ColorScheme.fourth,
  inactiveButtonBorder: ColorScheme.third,
  graphShadowColor: ColorScheme.fourth,
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
    borderRadius: 10,
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
