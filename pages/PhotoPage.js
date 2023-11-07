import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, Dimensions, Image, Button, Alert} from 'react-native';
import { FontAwesome, Foundation, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
const [image, setImage] = useState(null);

const handleImageUpload = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'Please allow access to your media library to upload an image.');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync();
  if (!result.cancelled) {r
    setImage(result.uri);
  }
};

const PhotoPage = ({ navigation }) => {
  return (
    <SafeAreaView>
    <ScrollView style={{height: height}}>
    <View>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Upload Image" onPress={handleImageUpload} />
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

export default PhotoPage;