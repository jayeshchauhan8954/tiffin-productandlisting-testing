// ----------------------------------------------------------------------

export default function Table(theme) {
  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: 'theme.palette.action.hover'
            }
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.custom.tableHead,
          backgroundColor: theme.palette.background.secondary,
          '&:first-of-type': {
            // paddingLeft: theme.spacing(1.5),
            // borderTopLeftRadius: theme.shape.borderRadius,
            // borderBottomLeftRadius: theme.shape.borderRadius,
            // boxShadow: `inset 8px 0 0 ${theme.palette.background.paper}`
          },
          '&:last-of-type': {
            // paddingRight: theme.spacing(1.5),
            // borderTopRightRadius: theme.shape.borderRadius,
            // borderBottomRightRadius: theme.shape.borderRadius,
            // boxShadow: `inset -8px 0 0 ${theme.palette.background.paper}`
          }
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`
        },
        body: {
          '&:first-of-type': {
            paddingLeft: theme.spacing(1.5)
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(1.5)
          }
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `solid 1px ${theme.palette.divider}`
        },
        toolbar: {
          height: 64
        },
        select: {
          '&:focus': {
            borderRadius: theme.shape.borderRadius
          }
        },
        selectIcon: {
          width: 20,
          height: 20,
          marginTop: 2
        }
      }
    }
  };
}
