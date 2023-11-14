import React, { useState } from 'react';
import { TouchableOpacity, View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { FontAwesome, Foundation, Ionicons, MaterialIcons } from '@expo/vector-icons';


const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
const black = '#202020';
const darkgrey = '#555555';
const neutralgrey = '#BBBBBB';
const lightgrey = '#DDDDDD';
const white = '#FFF';

const IntroPage = ({ navigation }) => {
    
  const styles = StyleSheet.create({
//-----------------------------------//
featuredPaletteSwiper: {
  top: 0,
  height: height,
},
slide: {
  width: width,
  height: height,
  backgroundColor: white,
  alignItems: 'center',
},

image: {
  width: width,
  height: 0.5*height,
  top: 0.175*height,
},

imageTitle: {
  width: width,
  color: black,
  paddingLeft: 50,
  paddingRight: 50,
  textAlign: 'center',
  fontSize: 20,
  fontWeight: '700',
  top: 0.2*height,
  zIndex: 100,
},
navigationText: {
    top: 0.275*height,
    width: 0.8*width,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
    color: white,
    padding: 10,
    backgroundColor: darkgrey,
    borderRadius: 20,
}
});

  return (
    <SafeAreaView style={{height: Dimensions.get('window')}}>
        <View style={styles.featuredPaletteSwiper}>
          <Swiper
            dot={
              <View
                style={{
                  backgroundColor: neutralgrey,
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  marginLeft: 4,
                  marginRight: 4
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: darkgrey,
                  width: 20,
                  height: 7,
                  borderRadius: 4,
                  marginLeft: 4,
                  marginRight: 4
                }}
              />
            }
            paginationStyle={{
              bottom:22,
            }}
            loop={false}
          >
            <View style={styles.slide}>
              <Image style={styles.image} source={require('../img/intro-1.png')} resizeMode="cover"/>
                <Text style={styles.imageTitle}>Create attractive palettes with a base color.</Text>
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('../img/intro-2.png')} resizeMode="cover"/>
                <Text style={styles.imageTitle}>Generate color schemes directly from a photo</Text> 
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('../img/intro-3.png')} resizeMode="cover"/>
                <Text style={styles.imageTitle}>Demonstrate different color vision deficiencies' perception</Text> 
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('../img/intro-4.png')} />
              <View style={styles.gradient}>
                <Text style={styles.imageTitle}>Choose appropriate colors for your design</Text>
              </View>
              <Pressable onPress={() => navigation.navigate('HomePage')}>
              <Text style={styles.navigationText}>Start now</Text>
              </Pressable>
            </View>
          </Swiper>
        </View>
        

        

    </SafeAreaView>
  );
  
};

export default IntroPage;