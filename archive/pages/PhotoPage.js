import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { FontAwesome, Foundation, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { height, width } = Dimensions.get('window');
const black = '#202020';
const darkgrey = '#555555';
const neutralgrey = '#BBBBBB';
const lightgrey = '#DDDDDD';
const white = '#FFF';

const PhotoPage = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Please allow access to your media library to upload an image.'
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleNext = () => {
    navigation.navigate('PhotoResultPage', { image });
  };

  return (
    <SafeAreaView style={{ height: Dimensions.get('window'), backgroundColor: white }}>
      <ScrollView style={{height: 1.029*height}}>
        <View style={{ top: 200, justifyContent: 'center' }}>
          {/* Image view */}
          {image ? (
            <Image source={{ uri: image }} style={{ left: 0.1*width, width: 0.8*width, height: 0.8*width }} />
          ) : (
            <Image
              source={require('../img/upload_image.png')}
              style={{ left: 0.1*width, width: 0.8*width, height: 0.8*width }}
            />
          )}
        </View>
        <View style={{ top: 250, height: 500, backgroundColor: white }}>
          {/* Upload Image Pressable */}
          <Pressable
            onPress={handleImageUpload}
            style={{
              left: 0.1*width,
              width: 0.8 * width,
              backgroundColor: neutralgrey,
              color: darkgrey,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ color: darkgrey, fontSize: 16 }}>Upload Image</Text>
          </Pressable>
          {/* Next Pressable */}
          <Pressable
            onPress={handleNext}
            style={{
              left: 0.1*width,
              width: 0.8 * width,
              backgroundColor: neutralgrey,
              color: darkgrey,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ color: darkgrey, fontSize: 16 }}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View style={styles.bottomMenu}>
        <Pressable onPress={() => navigation.navigate('HomePage')}>
          <Foundation name="home" style={styles.menuicon} size={30} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ColorPage')}>
          <Ionicons name="color-palette" style={styles.menuicon} size={30} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('PhotoPage')}>
          <MaterialIcons name="image" style={styles.menuiconactive} size={30} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ProfilePage')}>
          <MaterialIcons name="info" style={styles.menuicon} size={30} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default PhotoPage;