import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import songs from './model/data';

const { width, height } = Dimensions.get('window');

export default function App() {
  const[sound, setSound] = useState(null);
  const[songIndex, setSongIndex] = useState(0);
  const[songStatus, setSongStatus] = useSatte(null);
  const[isPlaying, setIsPLaying] = useState(false);
  const[islooping, setIsLopping] = useState(false);

  const songSlider = useRef(null);
  const scroollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scroollX.addListener(({value}) => {
      const index = Math.round(value / width);
      //console.log(`ScrollX : ${value}`);
      //console.log(index);
      setSongIndex(index);
    });
  }, []);

  const renderSongs = ({ item, index }) => {
    return  (
      <Animated.View style={styles.mainImageWrapper}>
        <View style={[style.imageWrapper, styles.elevation]}>
          <Image sourse={item.artwork} style={styles.musicImage} />
        </View>
      </Animated.View>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>

       <Animated.FlatList  
        data={songs}
        keyExtractor={item => item.id}
        renderItem={renderSongs}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScrol={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x : scrollX },
              }
            }
          ],
          { useNativeDriver: true }
        )}
       />


        <View>
          <Text style={[styles.songContent, styles.songTitle]}>
            {songs[songIndex].title}
          </Text>
          <Text style={[styles.songContent, styles.songArtist]}>
            {songs[songIndex].artist}
          </Text>
        </View>

        <View>
          <Slider 
            style={styles.progressBar}
            value={10}
            mininumValue={0}
            maximumValue={100}
            thumbTintColor='#FFD369'
            minimumTrackTintColot='#FFD369'
            maxinumTrackTintColor='#fff'
            onSlidingComplete={() => {}}
          />
          <View style={styles.progressLevelDuration}>
            <Text style={styles.progressLevelText}>00:00</Text>
            <Text style={styles.progressLevelText}>00:00</Text>
          </View>
        </View>

        <View style={styles.musicControlsContainer}>
          <TouchableOpacity>
            <Ionicons name='play-skip-back-outline' size={35} color="#FFD369" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='pause-circle' size={75} color="#FFD369" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='play-skip-forward-outline' size={35} color="#FFD369" />
          </TouchableOpacity>
        </View>
        
      </View>
      <View style={styles.footer}>
        <View styles={styles.iconWrapper}>
          <TouchableOpacity>
            <Ionicons name='heart-outline' size={30} color="#888888" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='repeat' size={30} color="#888888" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='share-outline' size={30} color="#888888" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='ellipsis-horinzontal' size={30} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImageWrapper : {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    width: width,
    alignItems: 'center',
    paddingVertical: 25,
    borderTopColor: '#393E45',
    borderTopWidth: 1,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },
  imageWrapper: {
    width: 340,
    height: 360,
    marginVertical: 20,
  },
  elevation: {
    elevantion: 5,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRaidius: 15
  },
  songContent: {
    textAling: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  songArtist: {
    fontSize: 16,
    fontWeight:'300',
  },
  progressBar: {
    width: 350,
    height: 40,
    marginTop: 20,
  },
  progressLevelDuration: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#fff',
    fontWeight: '500',
  },
  musicControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 10,
  }
});
