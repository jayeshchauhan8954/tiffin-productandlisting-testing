import { alpha } from '@mui/material';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
export const GREY = {
  0: '#FFFFFF', /** Chnaged */
  100: '#F9FAFB',
  200: '#F2F4F4',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8)
};

export const PRIMARY = {
  lighter: '#F0E6F8',
  light: '#7367F033',
  main: '#DE5200',
  lightOrange: '#ff9d2d',
  dark: '#DE5200',
  darker: '#6B12B7',
  contrastText: '#fff',
  greenColor: "#78A63A",
  lightGrey: "#EAEAEA",
  Grey: "#585858",
  blackColor: "#000000",
  lighterGray: "#F5F5F5",
  lightPink: "#FFF0E7",
  primaryGrey90: "#545661",
  lightGreen: "#EFFFEF",
  primaryEdark: "#EFF1FE",
  lighterPink: "#FFF7F3",
  lightOrange: "#FFD6BE",
  gray2: "#808080",
  primaryDark: "#373A4F",
  primaryDGrey: "#B0B2BB",
  primaryDGrey60: "#989AA5",
  primaryGray2: "#E3E4E9",
  primaryGray3: "#3B3B3B",
  primaryGray4: "#6A6C77",
  primaryGray5: "#F3F3F3",
  primaryGray6: "#E7E7E7",
  primaryGray7: "#FAFAFA",
  primaryGray8: "#F0F0F0",
  primaryGray8: "#B3B3B3",
  primaryDmain: "#3F414A",
  borderGray: "#F1F1F1",
  blueColor: "#4285F6",
  darkBlue: "#3C5A98",
  primaryDmain2: "#0D0E15",
  textGray: "#F4F5F9", 
  textGray1: "#161616", 
  lighterPink: "#FFF5EA",
  lightergrey2: "#F6F6F6", 
  lightGrey3: "#F2F2F2",
  lightGrey4: "#80838E",
  lightGrey5: "#EFEFEF",
  lightGrey6: "#F9F9F9",
  darkGrey: "#DEDEDE",
  yellow: "#F4B000",
  yellow2: "#FFC91F",
  lightPink3: "#FFFBE8",
  dividerColor: "#F4F4F4",
  footerDark: "#5C5C5C",
  divideGrey: "#ECECEC", 
  textFeildGrey: "#FBFBFB", 
  lightPink2: "#FFF2EA",
  lightYellow: "#FFFBE5",
  yellowColor: "#D6B400",
  lightYellow2: "#FF9D2D"




  


};

export const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff',
  iconBg:'#F3F3F3',
  iconColor:'#0D0E15'
};

const INFO = {
  lighter: '#A2D2FF',
  light: '#45A5FF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff'
};

const SUCCESS = {
  lighter: '#DBF5E7',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: '#fff'
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800]
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff'
};

const CUSTOM = {
  open: '#4facfe',
  card1: '#25DAE6',
  card2: '#F4A335',
  card3: '#63C276',
  card4: '#255635',
  card5: '#F25F84',
  tableHead: '#253757',
  cardTittle: '#3F414A'
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main)
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4']
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  custom: { ...CUSTOM },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  }
};

const palette = {
  light: {
    ...COMMON,
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500], light: '#fff' },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200], primary: PRIMARY.main, secondary: '#C9D1D8' },
    action: { active: GREY[600], ...COMMON.action }
  },
  dark: {
    ...COMMON,
    text: { primary: '#fff', secondary: GREY[500], disabled: GREY[600], dark: GREY[800] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16], primary: PRIMARY.main, secondary: '#C9D1D8' },
    action: { active: GREY[500], ...COMMON.action }
  }
};

export default palette;
