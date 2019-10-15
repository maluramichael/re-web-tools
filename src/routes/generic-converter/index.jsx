import React, { useState } from 'react';

import Grid                  from '@material-ui/core/Grid';
import InputLabel            from '@material-ui/core/InputLabel';
import TextField             from '@material-ui/core/TextField';
import ExpansionPanel        from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography            from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel      from '@material-ui/core/FormControlLabel';
import RadioGroup            from '@material-ui/core/RadioGroup';
import FormLabel             from '@material-ui/core/FormLabel';
import Radio                 from '@material-ui/core/Radio';
import FormControl           from '@material-ui/core/FormControl';

import { useStyles } from '../../theme';

import {
  AsciiConversion,
  BinaryConversion,
  FloatConversion,
  IntegerConversion,
  OctConversion
} from '../../conversions/asciiConversion';

export const Meta = {
  title: 'Generic converter',
  description: 'Convert bytes to many different formats.',
  color: '#a765e9'
};

const conversions = [
  new BinaryConversion(),
  new AsciiConversion(),
  new IntegerConversion(),
  new FloatConversion(),
  new OctConversion()
];

function cleanInput(byteString) {
  // return (byteString || '').replace(/[^a-f0-9]+/gi, '').toUpperCase();
  return (byteString || '');
}

export const GenericConverter = () => {

  // -- Hooks
  const classes = useStyles();

  // -- States
  const [input, setInput] = useState('FFFF');
  const [endianness, setEndianness] = useState('le');
  const [bits, setBits] = useState('32');

  // Rendering
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <h2>Data</h2>
          <FormControl>
            <FormLabel component="legend">Bits</FormLabel>
            <RadioGroup aria-label="bits" name="bits" value={bits}
                        onChange={(e) => setBits(e.target.value)}>
              <FormControlLabel value={'32'} control={<Radio/>} label="32bit"/>
              <FormControlLabel value={'64'} control={<Radio/>} label="64bit"/>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel component="legend">Endianness</FormLabel>
            <RadioGroup aria-label="endianness" name="endianness" value={endianness}
                        onChange={(e) => setEndianness(e.target.value)}>
              <FormControlLabel value="be" control={<Radio/>} label="Big-endian"/>
              <FormControlLabel value="le" control={<Radio/>} label="Little-endian"/>
            </RadioGroup>
          </FormControl>

          <InputLabel>Bytes</InputLabel>
          <TextField fullWidth={true}
                     className={classes.textarea}
                     onChange={e => setInput(cleanInput(e.target.value))}
                     value={input}
                     margin="normal"
          />
        </Grid>

        <Grid item xs={8}>
          <h2>Results</h2>
          <Grid item container>
            {conversions.map(({ name, convert, parse }) => {
              return <Grid item xs={12} key={name}>
                <InputLabel>{name}</InputLabel>
                <TextField fullWidth={true} value={convert(input, endianness) || '<empty>'}/>
                <br/>
                <br/>
              </Grid>;
            })}
          </Grid>
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
