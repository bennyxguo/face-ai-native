import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { tailwind } from '../../utils/tailwind';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, revokeToken, selectUser } from '../auth/userSlice';

import Rank from '../common/Rank';
import ImageForm from '../imageForm/ImageForm';
import FaceRecognition from '../faceRecognition/FaceRecognition';
import { faceRecognition, updateEntry } from '../faceRecognition/faceRecognitionSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(fetchUser()).unwrap();
    };
    fetchUsers();
  }, []);

  const imageRef = useRef(null);
  const [inputState, setInputState] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    'https://res.cloudinary.com/tridiamond/image/upload/v1627931132/bgx_t2jvye.jpg'
  );
  const boxInitialState = [];
  const [boxes, setBoxes] = useState(boxInitialState);

  // Supports multiple face detection
  const calculateFaceLocations = (data) => {
    let box = [];

    imageRef.current.measureInWindow((x, y, width, height) => {
      const imgWidth = Number(x);
      const imgHeight = Number(y);
      const location = {
        x,
        y,
        width,
        height
      };
      console.log('location', location);
      console.log(data.outputs[0].data.regions);
      box = data.outputs[0].data.regions.map((region) => {
        const { left_col, top_row, right_col, bottom_row } = region.region_info.bounding_box;

        return {
          leftCol: left_col * imgWidth,
          topRow: top_row * imgHeight,
          rightCol: imgWidth - right_col * imgWidth,
          bottomRow: imgHeight - bottom_row * imgHeight
        };
      });

      setBoxes(box);
    });

    // if (image && image instanceof HTMLElement) {
    //   const width = Number(image.offsetWidth);
    //   const height = Number(image.offsetHeight);

    //   box = data.outputs[0].data.regions.map((region) => {
    //     const { left_col, top_row, right_col, bottom_row } = region.region_info.bounding_box;

    //     return {
    //       leftCol: left_col * width,
    //       topRow: top_row * height,
    //       rightCol: width - right_col * width,
    //       bottomRow: height - bottom_row * height
    //     };
    //   });
    // }

    // return box;
  };

  const onLogout = async () => {
    await dispatch(revokeToken()).unwrap();
  };

  const onInputChange = (value) => {
    setImageUrl(value);
  };

  const onSubmit = async () => {
    if (imageUrl === '') return;

    const faceData = await dispatch(faceRecognition({ imageUrl })).unwrap();
    if (user && faceData) {
      calculateFaceLocations(faceData);
      await dispatch(updateEntry({ current: user.entries })).unwrap();
      await dispatch(fetchUser()).unwrap();
    }
  };

  const onFocusInput = () => {
    setInputState(true);
  };

  const onFocusOut = () => {
    setInputState(false);
  };

  return (
    <View>
      <Text style={tailwind('mt-8 mb-6 text-purple-500 text-4xl')}>
        Welcome back, <Text style={tailwind('font-semibold')}>{user ? user.name : ''}</Text>!
      </Text>
      <View style={tailwind('flex')}>
        {!inputState && (
          <View>
            <Rank entries={user ? user.entries : 0} />
            <FaceRecognition ref={imageRef} imageUrl={imageUrl} boxes={boxes} />
          </View>
        )}
        <ImageForm
          imageUrl={imageUrl}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          onFocusInput={onFocusInput}
          onFocusOut={onFocusOut}
        />
      </View>
      <TouchableOpacity
        onPress={onLogout}
        style={tailwind(
          'mt-12 bg-purple-500 text-gray-100 p-4 w-full rounded-2xl flex justify-center items-center'
        )}
      >
        <Text style={tailwind('text-lg tracking-wide font-semibold text-gray-100')}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
