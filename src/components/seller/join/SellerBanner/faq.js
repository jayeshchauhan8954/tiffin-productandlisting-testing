import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fontName } from '@/utils/fonts/Font';

function Faq() {
    return (
        <>
            <Box sx={{ py: 5}}>
                <Container>
                    <Grid item xs={11} md={12} textAlign={"center"}>
                        <Typography variant="title" fontSize={24}>Frequently asked questions</Typography>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <Accordion sx={useStyles.accordion} defaultExpanded>
                                <AccordionSummary
                                    sx={useStyles.accordionSummary}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    How long does it take to become a TiffinStash partner?
                                </AccordionSummary>
                                <AccordionDetails sx={useStyles.accordionDetails}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={useStyles.accordion}>
                                <AccordionSummary
                                    sx={useStyles.accordionSummary}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    Where does TiffinStash deliver within Canada?
                                </AccordionSummary>
                                <AccordionDetails sx={useStyles.accordionDetails}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={useStyles.accordion}>
                                <AccordionSummary
                                    sx={useStyles.accordionSummary}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    What types of support do TiffinStash seller partners receive?
                                </AccordionSummary>
                                <AccordionDetails sx={useStyles.accordionDetails}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{ ...useStyles.accordion, borderBottom: "none" }}>
                                <AccordionSummary
                                    sx={useStyles.accordionSummary}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4-content"
                                    id="panel4-header"
                                >
                                    Where can I go for more questions?
                                </AccordionSummary>
                                <AccordionDetails sx={useStyles.accordionDetails}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default Faq;

const useStyles = {
    background: {
        width: '100vw',
        background: 'hsla(22, 100%, 98%, 1)',
    },
    accordionSummary: {
        borderBottom: "none !important",
        borderRadius: "0px !important",
        color: "hsla(229, 8%, 27%, 1)",
        fontFamily: fontName.PoppinsMedium,
        fontSize: "16px",
        paddingLeft: "0px",
        paddingRight: "0px"
    },
    accordionDetails: {
        color: "hsla(0, 0%, 9%, 0.6)",
        fontFamily: fontName.PoppinsRegular,
        fontSize: "14px !important",
        paddingLeft: "0px",
        paddingRight: "0px"
    },
    accordion: {
        boxShadow: "none !important",
        borderBottom: "1px solid hsla(0, 0%, 93%, 1)",
        borderRadius: 0,
        margin: "0px !important",
        padding: "18px 0px"
    }
};