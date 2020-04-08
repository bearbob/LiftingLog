import React from 'react';
import { StyleSheet } from 'react-native';

export const ColorScheme = {
  first: '#040f0f',
  second: '#1e6b29',
  third: '#2ba84a',
  fourth: '#2d3a3a',
  fith: '#fcfffc'
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
  buttonBackgroundColor: ColorScheme.third,
  inactiveButtonBackgroundColor: ColorScheme.second,
  borderColor: ColorScheme.second,
  buttonBorderColor: ColorScheme.second,
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
  buttonText: {
    color: Color.mainFontColor,
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
