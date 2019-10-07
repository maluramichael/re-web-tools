import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  code: {
    fontFamily: 'monospaced',
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1
  }
}));
