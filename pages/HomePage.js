import React, { useState } from 'react';
import { TouchableOpacity, View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { FontAwesome, Foundation, Ionicons, MaterialIcons } from '@expo/vector-icons';


const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
const black = '#100B00';
const darkgreen = '#1D2917';
const lightgreen = '#799B82';
const beige = '#FDFBE3';
const white = '#FFF';
// function recentPalette(palettesList) {
//   let palRet = '';
//   if (palettesList) {
//     for (const palette of palettesList) {
//       const colRet = palette.map((color) => (
//         <View style={styles.recentColorBox}></View>
//       ));
//       palRet += <View style={styles.recentPaletteRow}>{colRet}</View>;
//     }
//     return palRet;
//   } else {
//     return (
//       <Text style={styles.noRecentPalette}>
//         You have not created any palette yet!
//       </Text>
//     );
//   }
// }

const HomePage = ({ navigation }) => {
  const SaveButton = () => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
      setIsPressed(!isPressed);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          backgroundColor: white,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            borderRadius: 20,
            padding: 5,
          }}
        >
          <FontAwesome name="bookmark" size={28} color={isPressed ? '#FF6B66':'#ccc'}/>
        </View>
      </View>
    </TouchableOpacity>
    );
  };

  const colorList = [['#C1DBE3','#C7DFC5','#FCE694','#B2A795','#373737'],
               ['#157F1F', '#4CB963', '#A0EADE', '#5C6784', '#1D263B'],
               ['#2E1F27', '#854D27', '#DD7230', '#F4C95D', '#E7E393']]



  const styles = StyleSheet.create({
  welcomeContainer: {
    top: -250,
    width: width,
    height: height*0.32,
  },
  welcomeText: {
    color: black,
    fontSize: 40,
    fontWeight: '800',
    top: 80,
    left: 30,
  },
  //-----------------------------------//
  modeChoose: {
    color: black,
    fontSize: 25,
    fontWeight: '800',
    top: -290,
    marginLeft: 30,
  },
  modeChooseText: {
    color: white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 25,
  },
  modeChooseSwiper: {
    height: 0.1*height,
    top: -280,
  },
  mcslide: {
    backgroundColor: lightgreen,
    height: 0.1*height,
    width: 0.9*width,
    left: 0.05*width,
    borderRadius: 5,
  },
  //-----------------------------------//
  recentTitle: {
    color: black,
    fontSize: 25,
    fontWeight: '800',
    top: -250,
    marginLeft: 30,
    marginBottom: 40,
  },
//-----------------------------------//
featuredPaletteSwiper: {
  top: -325,
  height: 0.4*height,
},
slide: {
  width: width,
  alignItems: 'center',
},

image: {
  width: 0.9*width,
  height: 0.4*height,
  borderRadius: 40,
},

imageTitle: {
  width: 0.76*width,
  color: white,
  fontSize: 20,
  fontWeight: '700',
  top: -265,
  left: 15,
  zIndex:100,
},

imageContent: {
  width: 0.76*width,
  color: white,
  fontSize: 17,
  fontWeight: '400',
  top: -110,
  left: 15,
  zIndex:100,
},

imageGradient: {
  width: 0.85*width,
  height: 0.2*height,
  borderRadius: 40,
  // zIndex: 10,
  top: -0.2*height,
},
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
  color: lightgreen,
},

menuicon: {
  color: darkgreen,
},
backrec: {
  width: width,
  height: 0.3*height,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  top: 0,
  backgroundColor: darkgreen,

},
paletteCont: {
  top: -270,
}

});

  function palette(num, list){
    const result = [];
    var r = 0;
    for (let i=0; i<num;i ++){
    result.push(
      <View key={i} style={{width: 0.9*width, 
        left: 0.05*width, 
        height: 0.09*height, 
        marginBottom: 0.02*height,
        backgroundColor: beige,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingLeft: 5,
        paddingRight: 5,}}>
  
          <View style={{width: 0.065*height, 
          height: 0.065*height, 
          backgroundColor: list[r][0],
          borderRadius: 5}}>
          </View>
  
          <View style={{width: 0.065*height, 
          height: 0.065*height, 
          backgroundColor: list[r][1],
          borderRadius: 5,}}>
          </View>
  
          <View style={{width: 0.065*height, 
          height: 0.065*height, 
          marginTop: 0.01*height,
          marginBottom: 0.01*height,
          backgroundColor: list[r][2],
          borderRadius: 5,}}>
          </View>
  
          <View style={{width: 0.065*height, 
          height: 0.065*height, 
          marginTop: 0.01*height,
          marginBottom: 0.01*height,
          backgroundColor: list[r][3],
          borderRadius: 5,}}>
          </View>
  
          <View style={{width: 0.065*height,  
          height: 0.065*height, 
          marginTop: 0.01*height,
          marginBottom: 0.01*height,
          backgroundColor: list[r][4],
          borderRadius: 5,}}>
          </View>
          <SaveButton />
      </View>
      );
      r += 1;
    }
    return result;
  }

  return (
    <SafeAreaView style={{height: Dimensions.get('window'), backgroundColor: white}}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.backrec}></View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Explore</Text>
        </View>

        
        <View style={styles.featuredPaletteSwiper}>
          <Swiper
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,.3)',
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
                  backgroundColor: '#fff',
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
              <Image style={styles.image} source={require('../img/img.jpeg')} resizeMode="cover"/>
              <View style={styles.gradient}>
                <Text style={styles.imageTitle}>Engaging palette</Text>
                <Text style={styles.imageContent}>Create engaging palettes</Text>
              </View>
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('../img/img.jpeg')} resizeMode="cover"/>
              <View style={styles.gradient}>
                <Text style={styles.imageTitle}>Real-time generating</Text> 
                <Text style={styles.imageContent}>Generate palettes from image</Text>
              </View>
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('../img/img.jpeg')} />
              <View style={styles.gradient}>
                <Text style={styles.imageTitle}>Color deficiencies </Text>
                <Text style={styles.imageContent}>Understand and share values</Text>
              </View>
            </View>
          </Swiper>
        </View>
        

        <Text style={styles.modeChoose}>Create a palette now</Text>
        <View style={styles.modeChooseSwiper}>
        <Swiper
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0)',
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
                  backgroundColor: 'rgba(255,255,255,0)',
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  marginLeft: 4,
                  marginRight: 4
                }}
              />
            }
            paginationStyle={{
              bottom:10,
            }}
            loop={false}
          >
            <View style={styles.mcslide}>
              <Pressable onPress={() => navigation.navigate('ColorPage')}>
                <Text style={styles.modeChooseText}>Pick a dominant color</Text>
              </Pressable>
            </View>

            <View style={styles.mcslide}>
              <Pressable onPress={() => navigation.navigate('PhotoPage')}>
                <Text style={styles.modeChooseText}>Generate from a photo</Text>
              </Pressable>
            </View>
            <View style={styles.mcslide}>
              <Pressable onPress={() => navigation.navigate('InfoPage')}>
                <Text style={styles.modeChooseText}>Learn about color blindness</Text>
              </Pressable>
            </View>
          </Swiper>
        </View>

        <Text style={styles.recentTitle}>Recent palettes</Text>
        <View style={styles.paletteCont}>{palette(3, colorList)}</View>
      </ScrollView>
      <View style={styles.bottomMenu}>
          <Pressable onPress={() => navigation.navigate('HomePage')}>
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
  
};

export default HomePage;