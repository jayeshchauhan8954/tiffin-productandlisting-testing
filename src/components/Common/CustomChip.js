'use client'
import React from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material';

const CustomChip = ({ label, avatarSrc, image, bgcolor, avatarSize, color, borderRadius, fontSize, sx, onClick }) => {
  const theme = useTheme();

  const chipStyle = {
    // marginLeft: 5,
    backgroundColor: bgcolor || theme.palette.primary.greenColor,
    borderRadius: borderRadius || 8,
    color: color || theme.palette.primary.contrastText,
    fontSize: fontSize || 14,
    ...sx,
  };

  // const avatarStyle = avatarSize
  // ? { height: avatarSize, width: avatarSize }
  // : {};
  const imageStyle = {
    height: avatarSize,
    width: avatarSize,
  };

  return (
    <Chip
      label={label}
      style={chipStyle}
      onClick={onClick}
      icon={image && <img src={image} alt="" style={imageStyle} />}
    />
  );
};

export default CustomChip;
