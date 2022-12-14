import type { EChartsOption } from 'echarts'

// interface WordCloudTextStyle {
//   color?: string;
//   fontStyle?: string;
//   fontWeight?: string | number;
//   fontFamily?: string;
//   fontSize?: number | string;
//   align?: string;
//   verticalAlign?: string;
//   // @deprecated
//   baseline?: string;

//   opacity?: number;

//   lineHeight?: number;
//   backgroundColor?:
//     | string
//     | {
//         image: HTMLImageElement | HTMLCanvasElement | string;
//       };
//   borderColor?: string;
//   borderWidth?: number;
//   borderType?: string;
//   borderDashOffset?: number;
//   borderRadius?: number | number[];
//   padding?: number | number[];

//   width?: number | string; // Percent
//   height?: number;
//   textBorderColor?: string;
//   textBorderWidth?: number;
//   textBorderType?: string;
//   textBorderDashOffset?: number;

//   textShadowBlur?: number;
//   shadowBlur?: number;
//   shadowColor?: string;
//   textShadowColor?: string;
//   textShadowOffsetX?: number;
//   textShadowOffsetY?: number;
// }

// interface WorldCloudDataItem {
//   name?: string;
//   value?: number | number[];
//   textStyle?: WordCloudTextStyle;
//   emphasis?: {
//     textStyle?: WordCloudTextStyle;
//   };
// }

// interface WordCloudSeriesOption {
//   mainType?: 'series';
//   type?: 'wordCloud';
//   silent?: boolean;
//   blendMode?: string;
//   /**
//    * Cursor when mouse on the elements
//    */
//   cursor?: string;

//   width?: number | string;
//   height?: number | string;
//   top?: number | string;
//   right?: number | string;
//   bottom?: number | string;
//   left?: number | string;

//   textStyle?:
//     | WordCloudTextStyle
//     | {
//         color?: (params?: any) => string;
//       };
//   emphasis?: {
//     focus?: 'self' | 'series' | 'none';
//     blurScope?: 'coordinateSystem' | 'global' | 'series';
//     textStyle?: WordCloudTextStyle;
//   };

//   shape?: string;
//   maskImage?: HTMLImageElement | HTMLCanvasElement;

//   sizeRange?: number[];
//   rotationRange?: number[];
//   rotationStep?: number;

//   gridSize?: number;

//   drawOutOfBound?: boolean;
//   layoutAnimation?: boolean;

//   data?: WorldCloudDataItem[];
// }


export const lineOptions: EChartsOption = {
  title: {
    text: '???????????????',
    left: 'center'
  },
  xAxis: {
    data: [
      '??????',
      '??????',
      '??????',
      '??????',
      '??????',
      '??????',
      '??????',
      '??????',
      '??????',
      '??????',
      '?????????',
      '?????????'
    ],
    boundaryGap: false,
    axisTick: {
      show: false
    }
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 20,
    top: 80,
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    padding: [5, 10]
  },
  yAxis: {
    axisTick: {
      show: false
    }
  },
  legend: {
    data: ['??????', '??????'],
    top: 50
  },
  series: [
    {
      name: '??????',
      smooth: true,
      type: 'line',
      data: [100, 120, 161, 134, 105, 160, 165, 114, 163, 185, 118, 123],
      animationDuration: 2800,
      animationEasing: 'cubicInOut'
    },
    {
      name: '??????',
      smooth: true,
      type: 'line',
      itemStyle: {},
      data: [120, 82, 91, 154, 162, 140, 145, 250, 134, 56, 99, 123],
      animationDuration: 2800,
      animationEasing: 'quadraticOut'
    }
  ]
}

export const pieOptions: EChartsOption = {
  title: {
    text: '??????????????????',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['????????????', '????????????', '????????????', '????????????', '????????????']
  },
  series: [
    {
      name: '??????????????????',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '????????????' },
        { value: 310, name: '????????????' },
        { value: 234, name: '????????????' },
        { value: 135, name: '????????????' },
        { value: 1548, name: '????????????' }
      ]
    }
  ]
}

export const barOptions: EChartsOption = {
  title: {
    text: '?????????????????????',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: 50,
    right: 20,
    bottom: 20
  },
  xAxis: {
    type: 'category',
    data: ['??????', '??????', '??????', '??????', '??????', '??????', '??????'],
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '?????????',
      data: [13253, 34235, 26321, 12340, 24643, 1322, 1324],
      type: 'bar'
    }
  ]
}

// export const wordOptions: {series: WordCloudSeriesOption[]} = {
//   series: [
//     {
//       type: 'wordCloud',
//       gridSize: 2,
//       sizeRange: [12, 50],
//       rotationRange: [-90, 90],
//       shape: 'pentagon',
//       width: 600,
//       height: 400,
//       drawOutOfBound: true,
//       textStyle: {
//         color: function () {
//           return (
//             'rgb(' +
//             [
//               Math.round(Math.random() * 160),
//               Math.round(Math.random() * 160),
//               Math.round(Math.random() * 160)
//             ].join(',') +
//             ')'
//           )
//         }
//       },
//       emphasis: {
//         textStyle: {
//           shadowBlur: 10,
//           shadowColor: '#333'
//         }
//       },
//       data: [
//         {
//           name: 'Sam S Club',
//           value: 10000,
//           textStyle: {
//             color: 'black'
//           },
//           emphasis: {
//             textStyle: {
//               color: 'red'
//             }
//           }
//         },
//         {
//           name: 'Macys',
//           value: 6181
//         },
//         {
//           name: 'Amy Schumer',
//           value: 4386
//         },
//         {
//           name: 'Jurassic World',
//           value: 4055
//         },
//         {
//           name: 'Charter Communications',
//           value: 2467
//         },
//         {
//           name: 'Chick Fil A',
//           value: 2244
//         },
//         {
//           name: 'Planet Fitness',
//           value: 1898
//         },
//         {
//           name: 'Pitch Perfect',
//           value: 1484
//         },
//         {
//           name: 'Express',
//           value: 1112
//         },
//         {
//           name: 'Home',
//           value: 965
//         },
//         {
//           name: 'Johnny Depp',
//           value: 847
//         },
//         {
//           name: 'Lena Dunham',
//           value: 582
//         },
//         {
//           name: 'Lewis Hamilton',
//           value: 555
//         },
//         {
//           name: 'KXAN',
//           value: 550
//         },
//         {
//           name: 'Mary Ellen Mark',
//           value: 462
//         },
//         {
//           name: 'Farrah Abraham',
//           value: 366
//         },
//         {
//           name: 'Rita Ora',
//           value: 360
//         },
//         {
//           name: 'Serena Williams',
//           value: 282
//         },
//         {
//           name: 'NCAA baseball tournament',
//           value: 273
//         },
//         {
//           name: 'Point Break',
//           value: 265
//         }
//       ]
//     }
//   ]
// }
