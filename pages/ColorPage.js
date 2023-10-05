import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, StatusBar} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// function recentPalette(palettesList){
//   var palRet = '';
//   var colRet = '';
//   if (palettesList){
//     for (const palette of paletteList){
//       for (const color in palette){
//         colRet += (<View style={styles.recentColorBox}></View>);
//       }
//       palRet += (<View style={styles.recentPaletteRow}>{colRet}</View>);
//     }
//     return palRet;
//   }
//   else{
//     return (<Text style={styles.noRecentPalette}>You have not create any palette yet!</Text>)
//   }
// }

function recentPalette(palettesList) {
  let palRet = '';
  if (palettesList) {
    for (const palette of palettesList) {
      const colRet = palette.map((color) => (
        <View style={styles.recentColorBox}></View>
      ));
      palRet += <View style={styles.recentPaletteRow}>{colRet}</View>;
    }
    return palRet;
  } else {
    return (
      <Text style={styles.noRecentPalette}>
        You have not created any palette yet!
      </Text>
    );
  }
}

const HomePage = ({ navigation }) => {
// export default Homepage = () => {
  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.curvedWelcomeRectangle}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.subText}>Give this a subtitle</Text>
          <View style={styles.avatar}></View>
        </View>
        <View style={styles.featuredPaletteSwiper}>
          {/* put my swiper here */}
        </View>
        <Text style={styles.modeChoose}>Create your own palette</Text>
        

        <Pressable onPress={() => navigation.navigate('ColorPage')}>
          <View style={styles.fromColor}>
            <Text style={styles.modeChooseText}>Pick a color</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('PhotoPage')}>
          <View style={styles.fromPicture}>
            <Text styles={styles.modeChooseText}>Generate from photo</Text>
          </View>
        </Pressable>
        <View style={styles.recentPalettes}>
          {recentPalette(paletteList)}
        </View>
        
      </ScrollView>
      <View style={styles.bottomMenu}>
          <Pressable>
            {/* if on press go up to top */}
            <FontAwesomeIcon icon="fa-solid fa-house" style={styles.menuicon}/>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('ColorPage')}>
            <FontAwesomeIcon icon="fa-solid fa-brush" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('PhotoPage')}>
            <FontAwesomeIcon icon="fa-solid fa-image" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('ProfilePage')}>
            <FontAwesomeIcon icon="fa-solid fa-bars" />
          </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // curvedWelcomeRectangle: {
  //   width: '100%',
  //   height: '30%',
  //   backgroundColor: '#eeeeee',
  //   borderBottomLeftRadius: 50,
  //   borderBottomRightRadius: 50,
  // },
  // welcomeText: {
  //   color: 'black',
  //   fontSize: 20,
  //   fontWeight: '800',
  //   top: '100%',
  //   left: 20,
  // },
  // avatar: {
  //   backgroundColor: 'gray',
  //   right: -20,
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  // },
  // subText: {
  //   color: 'grey',
  //   fontSize: 18,
  //   left: 20,
  // },
  // scrollView: {
  //   marginHorizontal: 20,
  // },
  // modeChoose: {
  //   color: 'black',
  //   fontSize: 20,
  //   fontWeight: '800',
  //   top: '100%',
  //   left: 20,
  // },
})

export default HomePage