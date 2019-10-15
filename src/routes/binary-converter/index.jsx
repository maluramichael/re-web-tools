import React, {
  useEffect,
  useRef,
  useState
} from 'react';

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

import * as _        from 'ramda';
import { useStyles } from '../../theme';

export const Meta = {
  title: 'Bytes to image',
  description: 'Visualize bytes as an image.',
  color: '#5757FF'
};

function convertBytes(bytes) {
  bytes = _.splitEvery(3, bytes || []).map(chunk => {
    if (chunk.length === 1) {
      chunk.push('00');
    }
    if (chunk.length === 2) {
      chunk.push('00');
    }
    if (chunk.length === 3) {
      chunk.push('FF');
    }
    return chunk.map(b => parseInt(b, 16));
  });

  return bytes;
}

function parseBytes(string, inputType) {
  let results = [];
  if (inputType === 'x64dbg') {
    // const pattern = /(^[\dA-F]+)\s{2}([\w\d\s]+)\s{2}(.*)/gmi;
    //
    // let match = pattern.exec(string);
    // while (match != null) {
    //   let bytes = match[2].split(' ');//.map(b => b.toString());
    //
    //   results = results.concat(bytes);
    //   match = pattern.exec(string);
    // }

    results = string.split('\n').map(line => {
      const x = line.split('  ');
      if (x.length === 3) {
        return x[1];
      }
      return null;
    }).filter(x => x !== null).flat();
  } else {
    return string.split(' ');
  }
  return results;
}

export const BinaryConverter = () => {

  // -- Hooks
  const classes = useStyles();
  const canvas = useRef(null);

  // -- States
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState('x64dbg');
  const [inputByteFormat, setInputByteFormat] = useState('hex');
  const [inputColorFormat, setInputColorFormat] = useState('rgb');
  const [inputWidth, setInputWidth] = useState(100);
  const [inputHeight, setInputHeight] = useState(100);
  const [outputFormat, setOutputFormat] = useState('bmp');

  useEffect(() => {
    if (canvas) {
      let bytes = parseBytes(input, inputType);
      const colors = convertBytes(bytes);

      const ctx = canvas.current.getContext('2d');
      ctx.clearRect(0, 0, inputWidth, inputHeight);
      const id = ctx.getImageData(0, 0, inputWidth, inputHeight);
      const pixels = id.data;

      for (let x = 0; x < colors.length; x++) {
        for (let y = 0; y < colors[x].length; y++) {
          pixels[x * 4 + y] = colors[x][y];
        }
      }

      ctx.scale(30, 30);
      ctx.putImageData(id, 0, 0);
    }
    return () => {

    };
  }, [input, inputType, inputWidth, inputHeight, inputColorFormat]);

  // Rendering
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <h2>Data</h2>
          <InputLabel>Bytes</InputLabel>
          <TextField fullWidth={true}
                     className={classes.textarea}
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
            <InputLabel>Type</InputLabel>
            <Select value={inputType} onChange={e => setInputType(e.target.value)}>
              <MenuItem value={'x64dbg'}>x32dbg/x64dgb</MenuItem>
              <MenuItem value={'List'}>List</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth={true}>
            <InputLabel>Byte format</InputLabel>
            <Select value={inputByteFormat} onChange={e => setInputByteFormat(e.target.value)}>
              <MenuItem value={'hex'}>Hex</MenuItem>
            </Select>
          </FormControl>

          <h3>Assumptions</h3>

          <FormControl fullWidth={true}>
            <InputLabel>Color format</InputLabel>
            <Select value={inputColorFormat} onChange={e => setInputColorFormat(e.target.value)}>
              <MenuItem value={'rgb'}>RGB</MenuItem>
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
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <h2>Results</h2>
          <canvas ref={canvas} width={inputWidth} height={inputHeight}/>
        </Grid>

        <Grid item xs={12}>
          <h1>FAQ</h1>
          <ExpansionPanel>
            <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header">
              <Typography>What is the purpose of this tool?</Typography>
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
};
