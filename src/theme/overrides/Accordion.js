// ----------------------------------------------------------------------

export default function Accordion(theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: 'none',
          marginBottom: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            boxShadow: theme.customShadows.z8
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
            '& .MuiTypography-root': {
              color: 'inherit'
            }
          },
          '&.Mui-expanded': {
            borderBottom: `1px solid ${theme.palette.grey[500_32]}`,
            borderRadius: theme.shape.borderRadius
          }
        },
        expandIconWrapper: {
          color: 'inherit'
        }
      }
    }
  };
}
