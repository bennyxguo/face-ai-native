import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function EntriesSVG() {
  return (
    <Svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="1"
        stroke="#eee9ff"
        fill="none"
        d="M20 22V2H4V22L6 20L8 22L10 20L12 22L14 20L16 22L18 20L20 22Z"
      ></Path>
      <Path strokeLinejoin="round" strokeWidth="1" stroke="#eee9ff" d="M7 16H17"></Path>
      <Path strokeLinejoin="round" strokeWidth="1" stroke="#eee9ff" d="M7 12H12"></Path>
      <Path strokeLinejoin="round" strokeWidth="1" stroke="#eee9ff" d="M7 6H12"></Path>
      <Path strokeLinejoin="round" strokeWidth="1" stroke="#eee9ff" d="M14 6H17"></Path>
      <Path strokeLinejoin="round" strokeWidth="1" stroke="#eee9ff" d="M14 9H17"></Path>
      <Path strokeLinejoin="round" strokeWidth="1" stroke="#eee9ff" d="M14 12H17"></Path>
      <Path strokeLinejoin="round" strokeWidth="1" stroke="#eee9ff" d="M7 9H12"></Path>
    </Svg>
  );
}
