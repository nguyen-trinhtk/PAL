import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, Dimensions} from 'react-native';
import { FontAwesome, Foundation, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ColorPicker from 'react-native-wheel-color-picker'

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const ColorPage = ({ navigation }) => {
  const [color, setColor] = useState('');

  const onColorChange = color => {
    setColor(color);
  };
  return (
    <SafeAreaView>
    <ScrollView style={{height: height}}>
    <View style={{ marginTop: 0.1*height, width: 0.9*width, height: width, marginLeft: 0.05*width}}>
    <ColorPicker
          color={color}
          onColorChange={(color) => onColorChange(color)}
          thumbSize={20}
          sliderSize={30}
          noSnap={true}
          row={false}
          swatches={false}
        />
			</View>
      </ScrollView>
      <View style={styles.bottomMenu}>
          <Pressable>
            <Foundation name='home' style={styles.menuiconactive} size={30}/>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('ColorPage')}>
            <Ionicons name='color-palette' style={styles.menuicon} size={30}/>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('PhotoPage')}>
            <MaterialIcons name='image' style={styles.menuicon} size={30}/>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('ProfilePage')}>
            <MaterialIcons name='info' style={styles.menuicon} size={30}/>
          </Pressable>
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
//-----------------------------------//
bottomMenu: {
  position: 'absolute',
  bottom: 0,
  left: 0,
    right: 0,
  backgroundColor: 'white',
  flexDirection: 'row',
  justifyContent: 'space-around',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  height: 70,
  padding: 15,
},

menuiconactive: {
  color: '#214D75',
},

menuicon: {
  color: '#002648',
}
});

export default ColorPage;