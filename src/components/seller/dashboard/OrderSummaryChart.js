'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Chart } from './Chart';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const iconMapping = { 'On The Way': RunningWithErrorsIcon, Pending: HourglassTopIcon, Delivered: CheckCircleIcon };
const iconColor = { 'On the Way': 'red', Pending: 'green', Delivered: 'yellow' };


export function OrderSummary({ chartSeries, labels, sx }) {
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="Order Summary" />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {chartSeries.map((item, index) => {
              const label = labels[index];
              const Icon = iconMapping[label];
              // const color = iconColor[label]
              return (
                <Stack key={label} spacing={1} sx={{ alignItems: 'center' }}>
                  {Icon ? <Icon fontSize="var(--icon-fontSize-lg)" /> : null}
                  {label !== 'undefined' && <Typography variant="h6">{label}</Typography>}
                  {label !== 'undefined' && < Typography color="text.secondary" variant="subtitle2">
                    {item}%
                  </Typography>}
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card >
  );
}

function useChartOptions() {
  const theme = useTheme();

  return {
    chart: { background: 'transparent' },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: { enabled: false },
    // labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}
