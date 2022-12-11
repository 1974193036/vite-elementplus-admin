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
    text: '每月销售额',
    left: 'center'
  },
  xAxis: {
    data: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
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
    data: ['预计', '实际'],
    top: 50
  },
  series: [
    {
      name: '预计',
      smooth: true,
      type: 'line',
      data: [100, 120, 161, 134, 105, 160, 165, 114, 163, 185, 118, 123],
      animationDuration: 2800,
      animationEasing: 'cubicInOut'
    },
    {
      name: '实际',
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
    text: '用户访问来源',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  series: [
    {
      name: '用户访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]
    }
  ]
}

export const barOptions: EChartsOption = {
  title: {
    text: '每周用户活跃量',
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
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '活跃量',
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
