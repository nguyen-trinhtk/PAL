import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, Dimensions} from 'react-native';
import { FontAwesome, Foundation, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ColorPicker from 'react-native-wheel-color-picker'

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
const black = '#101010';
const darkgrey = '#555555';
const neutralgrey = '#BBBBBB';
const lightgrey = '#DDDDDD';
const white = '#FFF';

const ColorPage = ({ navigation }) => {
const [color, setColor] = useState('');

// function recentPale
  const onColorChange = color => {
    setColor(color);
  };
  return (
    <SafeAreaView style={{height: Dimensions.get('window'), backgroundColor: white}}>
    <ScrollView style={styles.scrollView}>
    <Text style={styles.titleText}>Pick a Color</Text>
    <View style={{ top: 0.1*height, width: 0.8*width, height: 0.6*height, marginLeft: 0.1*width}}>
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
      <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '700',}}>Selected color: {color}</Text>
      <View style={{top: height*0.1, height: 0.332*height, flexDirection: 'row', justifyContent: 'space-around'}}>
      <Pressable onPress={() => navigation.navigate('ColorResultPage')}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '700', color: darkgrey, backgroundColor: white, borderWidth: 4, borderColor: darkgrey, width: 0.4*width, height: 0.09*height, padding: 18, borderRadius: 20,}}>Back</Text>
      </Pressable>
        
        <Pressable onPress={() => navigation.navigate('ColorResultPage')}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '700', color: white, backgroundColor: darkgrey, width: 0.4*width, height: 0.09*height, padding: 18, borderRadius: 20,}}>Generate</Text>
        </Pressable>
        
      </View>
      
      </ScrollView>
      <View style={styles.bottomMenu}>
          <Pressable onPress={() => navigation.navigate('HomePage')}>
            <Foundation name='home' style={styles.menuicon} size={30}/>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('ColorPage')}>
            <Ionicons name='color-palette' style={styles.menuiconactive} size={30}/>
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
  backgroundColor: black,
  flexDirection: 'row',
  justifyContent: 'space-around',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  height: 70,
  padding: 15,
},

menuiconactive: {
  color: white,
},

menuicon: {
  color: neutralgrey,
},
paletteCont: {
  top: 0,
},
titleText: {
  fontSize: 30,
  fontWeight: '800',
  top: 0.1*height,
  left: 0.1*width,

}


});

export default ColorPage;