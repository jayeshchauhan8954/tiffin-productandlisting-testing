// ----------------------------------------------------------------------

import { fontName } from "@/utils/fonts/Font";
import { PRIMARY } from "./palette";


function pxToRem(value) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm)
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md)
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg)
    }
  };
}

const FONT_PRIMARY = 'poppins, sans-serif'; 

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 })
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 })
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    // ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 })
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 })
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 })
  },
  h6: {
    fontFamily:fontName.PoppinsSemiBold,
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
  },

  // My Fonts ------------------------------------- 

  title: {
    fontSize: pxToRem(20),
    fontWeight: 600,
    fontFamily: fontName.PoppinsSemiBold
  },

  heading1: {
    fontSize: pxToRem(28),
    fontWeight: 600,
    fontFamily: fontName.PoppinsSemiBold
  },
  heading2: {
    fontSize: pxToRem(16),
    fontWeight: 600,
    fontFamily: fontName.PoppinsSemiBold
  },
  heading3: {
    fontSize: pxToRem(16),
    fontWeight: 500,
    fontFamily: fontName.PoppinsMedium
  },
  heading4: {
    fontSize: pxToRem(12),
    fontWeight: 600,
    fontFamily: fontName.PoppinsSemiBold
  },
  cardHeading: {
    fontSize: pxToRem(14),
    fontFamily: fontName.PoppinsRegular
  },
  regularText: {
    fontSize: pxToRem(16),
    fontFamily: fontName.PoppinsRegular
  },
  semiBoldText: {
    fontSize: pxToRem(14),
    fontWeight: 600,
    fontFamily: fontName.PoppinsSemiBold
  },
  cardText: {
    fontSize: pxToRem(14),
    fontFamily: fontName.PoppinsMedium
  },
  small: {
    fontSize: pxToRem(10),
    fontFamily: fontName.PoppinsRegular
  },
  small1: {
    fontSize: pxToRem(12),
    fontFamily: fontName.PoppinsRegular
  },
  medium: {
    fontSize: pxToRem(18),
    fontFamily: fontName.PoppinsMedium
  },
  boldtext: {
    fontSize: pxToRem(32),
    fontFamily: fontName.PoppinsBold
  },
  footerTxt: {
    lineHeight: 26 / 13,
    fontSize: pxToRem(14)
  },

  // ------------------------------------- 

  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16)
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
    fontFamily:fontName.PoppinsRegular,
    color:'#3F414A'
  },
  subtitle3: {
    fontWeight: 400,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14)
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16)
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14)
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12)
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: 'uppercase'
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize'
  },

  bold24: {
    fontFamily: fontName.PoppinsBold,
    fontSize: 24,
    textAlign: 'center'
  }

};

export default typography;
