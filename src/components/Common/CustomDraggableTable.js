import React from 'react';
import {
	Box,
	Card,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Scrollbar from '@/components/Scrollbar';
import NoData from './NoData';

export default function CustomDraggableTable({
	columns,
	data,
	isLoading = false,
	sx,
	cardSx,
	freezeColumn,
	onDragEnd,
}) {
	const columnsToShow = Object?.entries(columns).filter((e) => e[1].status);

	return (
		<Card sx={{ flex: 1, py: 1, mt: 2, ...cardSx }}>
			<TableContainer>
				<DragDropContext onDragEnd={onDragEnd}>
					<Scrollbar>
					<Box sx={{ pb: 1 }} >
						<Table sx={{ minWidth: 1000, ...sx }}>
							<TableHead>
								<TableRow>
									{columnsToShow?.map((columnName, i) => {
										const isFreeze = i === freezeColumn;
										const cellId = `table-th-key-${columnName}-${i}`;

										return (
											<TableCell
												key={cellId}
												sx={{
													right: 0,
													position: isFreeze ? 'sticky' : 'relative',
													whiteSpace: 'nowrap',
												}}
											>
												{columnName[1]?.title}
											</TableCell>
										);
									})}
								</TableRow>
							</TableHead>
							<Droppable droppableId="tableBody" direction="vertical" >
								{(provided) => (
									<TableBody
										{...provided?.droppableProps}
										ref={provided?.innerRef}

									>
										{data ? (
											data.length === 0 && !isLoading ? (
												<TableRow>
													<TableCell colSpan={columnsToShow?.length}>
														<NoData text="No Record Found." />
													</TableCell>
												</TableRow>
											) : (
												isLoading ? (
													<TableRow>
														<TableCell colSpan={columnsToShow?.length}>
															<Typography>Loading...</Typography>
														</TableCell>
													</TableRow>
												) : (
													Array.isArray(data) && data.length > 0 && data.map((item, dataIndex) => {
														return (
															<Draggable
																key={item?.id}
																draggableId={`table-row-key-${item?.id}`}
																index={dataIndex}
															>
																{(provided, snapshot) => (
																	<TableRow
																		ref={provided?.innerRef}
																		{...provided?.draggableProps}
																		{...provided?.dragHandleProps}
																	>
																		{columnsToShow?.map((colName, i) => {
																			const isFreeze = i === freezeColumn;
																			const cellId = `table-td-key-${colName}-${i}`;

																			return (
																				<TableCell
																					component={Card}
																					key={cellId}
																					sx={{
																						right: 0,
																						position: isFreeze ? 'sticky' : 'relative',
																						whiteSpace: 'nowrap',
																					}}
																				>
																					{colName[1]?.getElement(item, dataIndex)}
																				</TableCell>
																			);
																		})}
																	</TableRow>
																)}
															</Draggable>
														);
													})
												)
											)
										) : null}
										{provided?.placeholder}
									</TableBody>
								)}
							</Droppable>
						</Table>
						</Box>
					</Scrollbar>
				</DragDropContext>
			</TableContainer>
		</Card>
	);
}

