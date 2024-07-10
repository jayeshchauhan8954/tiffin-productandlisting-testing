'use client'

import React, { useState } from 'react';
import { Box, Button, Card, IconButton, Typography, useTheme } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import { _assets } from '@/utils/config/images';
import { fontName } from '@/utils/fonts/Font';

const cardData = [
    {
        id: 1,
        text: "Waiting In A Long Queue?",
        subtext: "Skip the wait and order your favorites here.",
        imageUrl: _assets.images.homeList.bannerCardDown('bannerimgdown1.png'),
        buttonText: "Order Now!",
        showButton: true,
    },
    {
        id: 2,
        text: "GET SPECIAL DISCOUNT",
        subtext: "Up to 50% OFF + Free delivery on your first order",
        imageUrl: _assets.images.homeList.bannerCardDown('bannerimgdown2.png'),
        showButton: false,
    },
    {
        id: 3,
        text: "Waiting In A Long Queue?",
        subtext: "Skip the wait and order your favorites here.",
        imageUrl: _assets.images.homeList.bannerCardDown('bannerimgdown3.png'),
        buttonText: "Order Now!",
        showButton: true,
    },
];


const SliderCard = () => {
    const theme = useTheme()
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? cardData.length - 3 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === cardData.length - 3 ? 0 : prevIndex + 1));
    };

    return (
        <Box sx={{ position: 'relative', maxWidth: '100%', margin: 'auto', px: 3, mt: '16px' }}>
            <IconButton
                onClick={handlePrev}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '15px',
                    transform: 'translateY(-50%)',
                    background: theme.palette.secondary.iconBg,
                    color: theme.palette.secondary.iconColor,
                    ":hover": {
                        background: theme.palette.secondary.iconBg,
                        color: theme.palette.secondary.iconColor,
                    },
                    borderRadius: '50%',
                    zIndex: 1,
                }}
            >
                <ArrowBack />
            </IconButton>
            <Box
                sx={{
                    display: 'flex',
                    overflow: 'hidden',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                        transition: 'transform 0.5s ease',
                        gap: '10px',
                    }}
                >
                    {cardData.map((card) => (
                        <Box
                            key={card.id}
                            sx={{
                                flex: '0 0 33.33%',
                                maxWidth: '32%',
                                padding: '10px',
                                margin: '5px',
                                boxSizing: 'border-box',
                                position: 'relative',
                            }}
                        >
                            <Image
                                src={card.imageUrl}
                                alt={card.text}
                                layout="responsive"
                                width={300}
                                height={200}

                            />
                            {card.showButton && (
                                <Button
                                    variant="contained"
                                    color="primary"

                                    sx={{
                                        position: 'absolute',
                                        bottom: 82,
                                        left: 25,
                                        backgroundColor: theme.palette.primary.contrastText,
                                        color: theme.palette.primary.main,
                                        width: '112px',
                                        height: '32px',
                                        borderRadius: '80px',
                                        ":hover": {
                                            background: theme.palette.primary.contrastText,
                                            color: theme.palette.primary.main,
                                        },
                                    }}
                                >
                                    <Typography variant='subtitle2' sx={{ color: theme.palette.primary.main, fontFamily: fontName.PoppinsSemiBold, ml: '-15px' }}>{card.buttonText}</Typography>
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            right: 10,
                                            zIndex: 1,
                                            width: '10px',
                                            height: '10px',
                                            color: theme.palette.primary.main
                                        }}
                                    >
                                        <ArrowForwardIcon fontSize="small" />
                                    </IconButton>
                                </Button>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
            <IconButton
                onClick={handleNext}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '20px',
                    transform: 'translateY(-50%)',
                    background: theme.palette.secondary.iconBg,
                    color: theme.palette.secondary.iconColor,
                    ":hover": {
                        background: theme.palette.secondary.iconBg,
                        color: theme.palette.secondary.iconColor,
                    },
                    borderRadius: '50%',
                    zIndex: 1,
                }}
            >
                <ArrowForward />
            </IconButton>
        </Box>
    );
};

export default SliderCard;
