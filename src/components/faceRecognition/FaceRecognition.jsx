import React, { forwardRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import Card from '../common/Card';
import InfoSvg from '../svg/InfoSvg';

const FaceRecognition = forwardRef(({ imageUrl, boxes }, ref) => {
  const faceBoxes = boxes.map((box, i) => {
    const styles = StyleSheet.create({
      boudingBox: {
        position: 'absolute',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        top: box.topRow,
        right: box.rightCol,
        bottom: box.bottomRow,
        left: box.leftCol,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#8363ee',
        backgroundColor: 'transparent'
      }
    });

    return <View key={i} style={styles.boudingBox}></View>;
  });

  return (
    <Card>
      <View style={tailwind('w-full')}>
        <Text style={tailwind('flex justify-center text-purple-300')}>
          <InfoSvg />
          <Text>Fill in the image url, image will be displayed here.</Text>
        </Text>
        <View>
          {imageUrl !== '' && (
            <Image
              ref={ref}
              style={imageStyle.imageStyle}
              source={{
                uri: imageUrl
              }}
            />
          )}

          {boxes.length > 0 && faceBoxes}
        </View>
      </View>
    </Card>
  );
});

const imageStyle = StyleSheet.create({
  imageStyle: {
    display: 'flex',
    position: 'relative',
    marginTop: 15,
    borderRadius: 10,
    width: '100%',
    height: 300
  }
});

export default FaceRecognition;
