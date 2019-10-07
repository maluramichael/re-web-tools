import React, { useState } from 'react';

import Grid        from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel  from '@material-ui/core/InputLabel';
import TextField   from '@material-ui/core/TextField';
import Select      from '@material-ui/core/Select';
import MenuItem    from '@material-ui/core/MenuItem';

export const Meta = {
  title: 'Binary to image converter',
  description: 'Convert bytes arrays to images.',
  color: 'green'
};

export function BinaryConverter() {

  // Hooks
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
                     rows={10}
                     onChange={e => setInput(e.target.value)}
                     margin="normal"
          />
        </Grid>

        <Grid item xs={4}>
          <h2>Options</h2>

          <h3>Input</h3>
          <InputLabel>Byte format</InputLabel>
          <FormControl fullWidth={true}>
            <Select
              value={inputByteFormat}
              onChange={e => setInputByteFormat(e.target.value)}
            >
              <MenuItem value={'hex'}>Hex</MenuItem>
            </Select>
          </FormControl>

          <InputLabel>Color format</InputLabel>
          <FormControl fullWidth={true}>
            <Select
              value={inputColorFormat}
              onChange={e => setInputColorFormat(e.target.value)}
            >
              <MenuItem value={'rgb'}>RGB</MenuItem>
              <MenuItem value={'rgba'}>RGBA</MenuItem>
              <MenuItem value={'gray'}>Gray</MenuItem>
              <MenuItem value={'alpha'}>Alpha</MenuItem>
            </Select>
          </FormControl>

          <InputLabel>Width</InputLabel>
          <FormControl fullWidth={true}>
            <TextField
              value={inputWidth}
              onChange={(e) => setInputWidth(e.target.value)}
              type="number"
              margin="normal"
            />
          </FormControl>

          <InputLabel>Height</InputLabel>
          <FormControl fullWidth={true}>
            <TextField
              value={inputWidth}
              onChange={(e) => setInputHeight(e.target.value)}
              type="number"
              margin="normal"
            />
          </FormControl>

          <h3>Output</h3>
          <InputLabel htmlFor="output-format">Format</InputLabel>
          <FormControl fullWidth={true}>
            <Select
              value={outputFormat}
              onChange={e => setOutputFormat(e.target.value)}
            >
              <MenuItem value={'bmp'}>Bitmap</MenuItem>
              <MenuItem value={'base64'}>Base64</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <h2>Results</h2>
        </Grid>
      </Grid>
    </div>
  );
}
