import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
  NativeEventEmitter, NativeModules
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import { showEditor } from 'react-native-video-trim';
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

import {data} from './data';

const {width} = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

const Home = () => {
  const tabBarheight = useBottomTabBarHeight();

  useEffect(() => {
  const eventEmitter = new NativeEventEmitter(NativeModules.VideoTrim);
  const subscription = eventEmitter.addListener('VideoTrim', (event) => {
    switch (event.name) {
      case 'onShow': {
        // on Dialog show
        console.log('onShowListener', event);
        break;
      }
      case 'onHide': {
        // on Dialog hide
        console.log('onHide', event);
        break;
      }
      case 'onStartTrimming': {
        // Android only: on start trimming
        console.log('onStartTrimming', event);
        break;
      }
      case 'onFinishTrimming': {
        // on trimming is done
        console.log('onFinishTrimming', event);
        break;
      }
      case 'onCancelTrimming': {
        // when user clicks Cancel button
        console.log('onCancelTrimming', event);
        break;
      }
      case 'onError': {
        // any error occured: invalid file, lack of permissions to write to photo/gallery, unexpected error...
        console.log('onError', event);
        break;
      }
    }
  });

  return () => {
    subscription.remove();
  };
}, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Home</Text>
      </View>

      <TouchableOpacity
        onPress={async () => {
          // const result = await launchImageLibrary({
          //   mediaType: 'video',
          // });
          // console.log('result', result)
          // showEditor(result?.assets[0]?.uri , {
          //       maxDuration: 20,
          //     })
          //       .then((res) => console.log(res))
          //       .catch((e) => console.log(e));


          ImagePicker.openPicker({
                      mediaType: "video",
                    })
                      .then(async (media) => {
                        console.log(media)
                         showEditor(media.path , {
                maxDuration: 20,
              })
                      })

         
        }}
        style={{ padding: 10, backgroundColor: 'red' }}
      >
        <Text style={{ color: 'white' }}>Launch Library</Text>
      </TouchableOpacity>


      {/* Scrollable Content */}
      {/* <View style={styles.scrollContainer}>
        <ScrollView
          indicatorStyle="white"
          contentContainerStyle={[
            styles.scrollContentContainer,
            {
              paddingBottom:
                Platform.OS === 'ios' ? tabBarheight : tabBarheight - 40,
            },
          ]}>
          {data.map((item) => (
            <View key={item.id} style={styles.imageContainer}>
              <Image
                style={styles.imageCard}
                source={{uri: item.image_url}}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  contentContainer: {
    marginTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 14,
  },
  imageCard: {
    borderRadius: 14,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
});

export default Home;
