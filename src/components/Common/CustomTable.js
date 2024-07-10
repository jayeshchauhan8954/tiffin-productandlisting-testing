// material
import { Card, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
// components
import Scrollbar from "@/components/Scrollbar";
import NoData from "./NoData";

// ----------------------------------------------------------------------
export default function CustomTable({ columns, data, isLoading = false, sx, cardSx, freezeColum, size = "small", nestedRow, insideDrawer = false }) {
  const columnsToShow = Object.entries(columns).filter(e => e[1].status);
  const theme = useTheme()
  return (
    <Card sx={{ flex: 1, mt: 2, border: `1px solid ${theme.palette.grey[300]}`, boxShadow: theme.shadows.cardShadow, ...cardSx }}>
      <TableContainer sx={insideDrawer && { maxWidth: { lg: "100%", md: "100%", xs: "90vw" } }}>
        <Scrollbar>
          <Table size={size} sx={{ minWidth: 1000, ...sx }}>
            <TableHead>
              <TableRow>
                {columnsToShow.map((item, i) => {
                  const isFreeze = i == freezeColum;
                  const cellId = `table-th-key-${item[0]}-${i}`;

                  if (isFreeze) return (
                    <TableCell
                      key={cellId}
                      sx={{
                        right: 0,
                        position: "sticky",
                        whiteSpace: 'nowrap',
                        ...item[1].sx
                      }}
                    >
                      {item[1].title}
                    </TableCell>
                  );

                  return (
                    <TableCell key={cellId} sx={{ whiteSpace: 'nowrap' }}>{item[1].title}</TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>

              {data?.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={columnsToShow.length}>
                    <NoData text="No Record Found." />
                  </TableCell>
                </TableRow>
              )}
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columnsToShow.length}>
                    <Skeleton height={20} animation="wave" />
                    <Skeleton height={20} animation="wave" />
                    <Skeleton height={20} animation="wave" />
                  </TableCell>
                </TableRow>
              )
                : data?.map((item, dataIndex) => {
                  return (
                    <>
                      <TableRow key={item.id}>
                        {columnsToShow.map((colItem, i) => {
                          const isFreeze = i == freezeColum;
                          const cellId = `table-td-key-${colItem[0]}-${i}`;

                          if (isFreeze) return (
                            <TableCell
                              component={Card}
                              key={cellId}
                              sx={{
                                right: 0,
                                borderRadius: 0,
                                position: "sticky",
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {colItem[1]?.getElement(item, dataIndex)}
                            </TableCell>
                          );

                          return (
                            <TableCell key={cellId} sx={{ whiteSpace: 'nowrap', ...colItem[1]?.sx }}>{colItem[1]?.getElement(item, dataIndex)}</TableCell>
                          )
                        })}
                      </TableRow>

                      {
                        nestedRow &&
                        <TableRow key={`nr_${dataIndex}`} sx={{ '& > *': { borderBottom: 'unset', borderTop: 'unset' } }}>
                          <TableCell
                            key={`nestred_row_${dataIndex}`}
                            colSpan={nestedRow.colSpan}
                            sx={{ whiteSpace: 'nowrap', p: 0, m: 0, '& > *': { borderBottom: 'unset', borderTop: 'unset' } }}>
                            {nestedRow?.getElement(item, dataIndex)}
                          </TableCell>
                        </TableRow>

                      }
                    </>
                  )
                })}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  )
};
