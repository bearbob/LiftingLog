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
  //
  eigth: '#ed8e8e', //red tone, for warnings
  ninth: '#721010', //darker red, for warnings
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
  warningButtonBackgroundColor: ColorScheme.eigth,
  warningButtonBorderColor: ColorScheme.ninth,
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
  centeredContainer: {
    alignItems: 'center',
  },
  sectionContainer: {
    borderWidth: 0,
    flexDirection: 'row',
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    color: Color.buttonBackgroundColor,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: Color.mainFontColor,
  },
  rowContainer: {
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
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
  iconButton: {
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Color.buttonBackgroundColor,
    padding: 20,
    borderWidth: 2,
    borderColor: Color.buttonBorderColor,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  warningIconButton: {
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Color.warningButtonBackgroundColor,
    padding: 20,
    borderWidth: 2,
    borderColor: Color.warningButtonBorderColor,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: Color.buttonFontColor,
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonTextInactive: {
    color: Color.mainFontColorInactive,
    fontWeight: 'bold'
  },
  input: {
    height: 45,
    width: 80,
    borderRadius: 10,
    borderColor: Color.buttonBackgroundColor,
    backgroundColor: Color.mainBackgroundColor,
    color: Color.mainFontColor,
    borderWidth: 1,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    flexDirection: 'row',
    paddingTop: 10
  },
  picker: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    backgroundColor: Color.buttonBackgroundColor,
    padding: 5,
    borderRadius: 10,
  },
  chart: {
    marginTop: 5,
    marginBottom: 10,
  },
});
