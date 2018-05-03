// import {PixelRatio} from 'react-native'
//
// export default function (px) {
//   let ppi = PixelRatio.get();
//   return px / ppi
// }


import { Dimensions,PixelRatio} from 'react-native';

export const windowWidth = Dimensions.get('window').width;    //当前设备宽高
export const windowHeight = Dimensions.get('window').height;

const fontScale = PixelRatio.getFontScale();
const pixelRatio = PixelRatio.get();                //当前设备像素密度
const PPI = 2;                                      //iphone6 像素密度，将iPhone6作为基准
const iphone6Width = 750 / PPI;
const iphone6Height = 1334 / PPI;
const scaleWidth = windowWidth / iphone6Width;        //获取宽高缩放比例
const scaleHeight = windowHeight / iphone6Height;



/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 * @constructor
 */
// export default function (size:number) {
// 	size = Math.round((size * scaleWidth));
// 	return size / PPI;
// }

export default function H(size:number) {
  size = Math.round((size * scaleHeight));
  return size / PPI;
}
/*
*根据屏幕分辨率设置百分比
// */
// export default function(length:number){
//   let dp = Math.round(windowHeight * ( length / 100 ));
//   return dp;
// }
//
/**
 * 设置text为sp
 * @param size  sp
 * @returns {Number} dp
 */
export function setSpText(size:number) {
	var scale = Math.min(scaleWidth, scaleHeight);
	size = Math.round((size * scale) * pixelRatio / fontScale);
	return size;
}
