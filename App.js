import React, {useState} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import RNLocation from 'react-native-library';

RNLocation.configure({
  distanceFilter: null,
});

//distanceFilter - minimum distance in meters that a device
//location will change before a new location is updated

const App = () => {
  [viewLocation, isViewLocation] = useState([]);

  //click on Get location - action
  const permissionHandle = async () => {
    console.log('inside the async call-1');
    //CHECK IF LOCATION ACCESS IS PERMITTED OR NOT
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse', //or 'fine'
      },
    });
    console.log('inside the async call-2');
    console.log(permission);
    //REQUEST THE LOCATION
    permission = await RNLocation.requestPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse',
        rationale: {
          title: 'We need to access your location',
          message: 'We use your location to show where you are on the map',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    });
    console.log('after requesting the permission: user responded with');
    console.log(permission);
    //check permission and make it compulsory to give access to your location
    let location;

    if (!permission) {
      //if the permission is not given
      permission = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show where you are on the map',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });
      console.log(permission);
      location = await RNLocation.getLatestLocation({timeout: 100});
      isViewLocation(location);
      console.log(
        location,
        location.longitude,
        location.latitude,
        location.timestamp,
      );
    } else {
      console.log('Here 7');
      location = await RNLocation.getLatestLocation({timeout: 100});
      console.log(
        location,
        location.longitude,
        location.latitude,
        location.timestamp,
      );
    }
  };

  const tweetLocation = () => {
    let twitterParams = [];

    try {

      if(tweet){
        twitterParams.push(${tweet});
        const url =  'https://twitter.com/intent/tweet?' + twitterParams.join('&');
        Linking.openURL(url);
      }
    }
    catch(error){
      console.error(error)
    }
  };

  return (
    <View>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={permissionHandle} />
      </View>
      <Text>Latitude: {viewLocation.latitude}</Text>
      <Text>Longitude:{viewLocation.longitude}</Text>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Send Location" onPress={tweetLocation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
