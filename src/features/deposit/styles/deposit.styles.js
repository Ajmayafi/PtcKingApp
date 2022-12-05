import React from "react";
import { StyleSheet, Dimensions } from "react-native";
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
    shadow: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
    header: {
      flexDirection: 'row',
      width,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F6F6F6',
    },
    headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
    saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
    viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: '10%',
      paddingBottom: '20%',
    },
    dropdown1BtnStyle: {
      width: 320,
      height: 66,
      backgroundColor: '#333333',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#444',
    },
    dropdown1BtnTxtStyle: {color: 'white', textAlign: 'left'},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
    dropdown1searchInputStyleStyle: {
      backgroundColor: '#EFEFEF',
      borderRadius: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#444',
    },
  
    dropdown2BtnStyle: {
      width: '80%',
      height: 50,
      backgroundColor: '#444',
      borderRadius: 8,
    },
    dropdown2BtnTxtStyle: {
      color: '#FFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    dropdown2DropdownStyle: {
      backgroundColor: '#444',
      borderRadius: 12,
    },
    dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
    dropdown2RowTxtStyle: {
      color: '#FFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    dropdown2SelectedRowStyle: {backgroundColor: 'rgba(255,255,255,0.2)'},
    dropdown2searchInputStyleStyle: {
      backgroundColor: '#444',
      borderBottomWidth: 1,
      borderBottomColor: '#FFF',
    },
  
    dropdown3BtnStyle: {
      width: '80%',
      height: 50,
      backgroundColor: '#FFF',
      paddingHorizontal: 0,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#444',
    },
    dropdown3BtnChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 18,
    },
    dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
    dropdown3BtnTxt: {
      color: '#444',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      marginHorizontal: 12,
    },
    dropdown3DropdownStyle: {backgroundColor: 'slategray'},
    dropdown3RowStyle: {
      backgroundColor: 'slategray',
      borderBottomColor: '#444',
      height: 50,
    },
    dropdown3RowChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 18,
    },
    dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
    dropdown3RowTxt: {
      color: '#F1F1F1',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      marginHorizontal: 12,
    },
    dropdown3searchInputStyleStyle: {
      backgroundColor: 'slategray',
      borderBottomWidth: 1,
      borderBottomColor: '#FFF',
    },
  });