import merge from 'lodash/merge';
import { useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';

export default function useChart(options) {
  const theme = useTheme();
  const smUp = useResponsive('up', 'sm');

  const LABEL_TOTAL = {
    show: true,
    label: 'Total',
    color: theme.palette.text.secondary,
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    lineHeight: theme.typography.subtitle2.lineHeight,
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    lineHeight: theme.typography.h3.lineHeight,
  };

  const baseOptions = {
    // Bổ sung tùy chọn cho biểu đồ cột
    plotOptions: {
      bar: {
        columnWidth: '50%',
        barHeight: '80%',
        borderRadius: 8,
      },
    },
  };

  return merge(baseOptions, options);
}
