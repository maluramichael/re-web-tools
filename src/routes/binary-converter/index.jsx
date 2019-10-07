import React, { useState } from 'react';

import Grid                  from '@material-ui/core/Grid';
import FormControl           from '@material-ui/core/FormControl';
import InputLabel            from '@material-ui/core/InputLabel';
import TextField             from '@material-ui/core/TextField';
import Select                from '@material-ui/core/Select';
import MenuItem              from '@material-ui/core/MenuItem';
import ExpansionPanel        from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography            from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { useStyles }         from '../../lib/styles';

export const Meta = {
  title: 'Binary to image converter',
  description: 'Convert bytes arrays to images.',
  color: 'green'
};

export function BinaryConverter() {

  // Hooks
  const classes = useStyles();

  // -- States
  const [input, setInput] = useState('');
  const [inputByteFormat, setInputByteFormat] = useState('hex');
  const [inputColorFormat, setInputColorFormat] = useState('rgb');
  const [inputWidth, setInputWidth] = useState(100);
  const [inputHeight, setInputHeight] = useState(100);

  const [outputFormat, setOutputFormat] = useState('bmp');

  // Rendering
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <h2>Data</h2>
          <InputLabel>Bytes</InputLabel>
          <TextField fullWidth={true}
                     style={{ 'font-family': 'monospaced' }}
                     multiline
                     rows={30}
                     onChange={e => setInput(e.target.value)}
                     margin="normal"
          />
        </Grid>

        <Grid item xs={4}>
          <h2>Options</h2>

          <h3>Input</h3>
          <FormControl fullWidth={true}>
            <InputLabel>Byte format</InputLabel>
            <Select value={inputByteFormat} onChange={e => setInputByteFormat(e.target.value)}>
              <MenuItem value={'hex'}>Hex</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth={true}>
            <InputLabel>Color format</InputLabel>
            <Select value={inputColorFormat} onChange={e => setInputColorFormat(e.target.value)}>
              <MenuItem value={'rgb'}>RGB</MenuItem>
              <MenuItem value={'rgba'}>RGBA</MenuItem>
              <MenuItem value={'gray'}>Gray</MenuItem>
              <MenuItem value={'alpha'}>Alpha</MenuItem>
            </Select>
          </FormControl>

          <TextField fullWidth={true}
                     label={'Width'}
                     value={inputWidth}
                     onChange={(e) => setInputWidth(e.target.value)}
                     type="number"/>

          <TextField fullWidth={true}
                     label={'Height'}
                     value={inputHeight}
                     onChange={(e) => setInputHeight(e.target.value)}
                     type="number"/>

          <h3>Output</h3>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="output-format">Format</InputLabel>
            <Select value={outputFormat} onChange={e => setOutputFormat(e.target.value)}>
              <MenuItem value={'bmp'}>Bitmap</MenuItem>
              <MenuItem value={'base64'}>Base64</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <h2>Results</h2>
        </Grid>

        <Grid item xs={12}>
          <h1>FAQ</h1>
          <ExpansionPanel>
            <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header">
              <Typography className={classes.heading}>What is the purpose of this tool?</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    </div>
  );
}
