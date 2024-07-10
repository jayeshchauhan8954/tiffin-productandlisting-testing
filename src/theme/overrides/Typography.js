// ----------------------------------------------------------------------

export default function Typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme?.spacing(2)
        },
        gutterBottom: {
          marginBottom: theme?.spacing(1)
        }
      },
      variants: [
        {
          props: { required: true },
          style: {
            position: 'relative',
            display: 'inline-block',
            marginRight: theme?.spacing(1),
            '&::before': {
              content: '"*"',
              position: 'absolute',
              right: -12,
              top: -3,
              height: 10,
              width: 10,
              color: 'red',
              fontWeight: 900
            }
          }
        }
      ]
    }
  };
}
