import React, { useState } from 'react';
import * as _              from 'ramda';

import Grid                  from '@material-ui/core/Grid';
import FormControl           from '@material-ui/core/FormControl';
import InputLabel            from '@material-ui/core/InputLabel';
import Select                from '@material-ui/core/Select';
import MenuItem              from '@material-ui/core/MenuItem';
import TextField             from '@material-ui/core/TextField';
import FormGroup             from '@material-ui/core/FormGroup';
import FormControlLabel      from '@material-ui/core/FormControlLabel';
import Checkbox              from '@material-ui/core/Checkbox';
import Button                from '@material-ui/core/Button';
import ButtonGroup           from '@material-ui/core/ButtonGroup';
import ExpansionPanel        from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography            from '@material-ui/core/Typography';

import { Results }   from './results';
import { useStyles } from '../../lib/styles';

export const Meta = {
  title: 'Address lists',
  description: 'Convert addresses. Find pattern in lists.',
  color: 'blue'
};

export function AddressList() {

  // Hooks
  const classes = useStyles();

  // -- States
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState('list');
  const [inputAddressFormat, setInputAddressFormat] = useState('hex');
  const [inputCheatTableSelector, setInputCheatTableSelector] = useState(
    'RealAddress'
  );

  const [outputFormat, setOutputFormat] = useState('hex');

  const [makeAddressesUnique, setMakeAddressesUnique] = useState(true);
  const [sortAddresses, setSortAddresses] = useState(true);
  const [calculateDistance, setCalculateDistance] = useState(true);

  // Variables
  const distances = [];
  let addresses = [];

  // Transformation
  if (inputType === 'list') {
    addresses = _.split('\n', input);
  } else if (inputType === 'cheat-table') {
    let pattern;

    // eslint-disable-next-line default-case
    switch (inputCheatTableSelector) {
      case 'Address':
        pattern = /<Address>(.*)<\/Address>/gim;
        break;
      case 'RealAddress':
        pattern = /RealAddress="(.*)"/gim;
        break;
    }

    if (pattern) {
      let cheatTableMatch = pattern.exec(input);
      while (cheatTableMatch != null) {
        addresses.push(cheatTableMatch[1]);
        cheatTableMatch = pattern.exec(input);
      }
    }
  } else if (inputType === 'x64dbg') {
    const pattern = /^([ABCDEF0-9]{,1})/gim;
    let x64dbgMatch = pattern.exec(input);
    while (x64dbgMatch != null) {
      addresses.push(x64dbgMatch[1]);
      x64dbgMatch = pattern.exec(input);
    }
  }

  addresses = _.pipe(
    _.map(x => parseInt(x, inputAddressFormat === 'hex' ? 16 : 10)),
    _.reject(_.isEmpty()),
    _.reject(isNaN)
  )(addresses);

  if (makeAddressesUnique) {
    addresses = _.uniq(addresses);
  }

  if (sortAddresses) {
    addresses = _.sort((l, r) => l - r, addresses);
  }

  if (calculateDistance) {
    for (let i = 0; i < addresses.length; i++) {
      if (i === 0) {
        distances.push(0);
        continue;
      }
      const distance = addresses[i] - addresses[i - 1];
      distances.push(distance);
    }
  }

  // Rendering
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <h2>Data</h2>

          <InputLabel>Addresses</InputLabel>
          <TextField
            fullWidth={true}
            multiline
            rows={30}
            onChange={e => setInput(e.target.value)}
            margin="normal"
          />
        </Grid>

        <Grid item xs={4}>
          <h2>Options</h2>

          <h3>Input</h3>
          <InputLabel htmlFor="input-type">Type</InputLabel>
          <FormControl fullWidth={true}>
            <Select
              value={inputType}
              onChange={e => setInputType(e.target.value)}
            >
              <MenuItem value={'list'}>List</MenuItem>
              <MenuItem value={'cheat-table'}>Cheat Table</MenuItem>
              <MenuItem value={'x64dbg'}>x32dbg/x64dgb</MenuItem>
            </Select>
          </FormControl>

          <InputLabel htmlFor="input-format">Format</InputLabel>
          <FormControl fullWidth={true}>
            <Select
              value={inputAddressFormat}
              onChange={e => setInputAddressFormat(e.target.value)}
            >
              <MenuItem value={'hex'}>Hex</MenuItem>
              <MenuItem value={'dec'}>Decimal</MenuItem>
            </Select>
          </FormControl>

          {inputType === 'cheat-table' && (
            <div>
              <InputLabel htmlFor="input-cheat-table-selector">
                Cheat table selector
              </InputLabel>
              <FormControl fullWidth={true}>
                <Select
                  value={inputCheatTableSelector}
                  onChange={e => setInputCheatTableSelector(e.target.value)}
                >
                  <MenuItem value={'RealAddress'}>RealAddress</MenuItem>
                  <MenuItem value={'Address'}>Address</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}

          <h3>Output</h3>
          <InputLabel htmlFor="output-format">Format</InputLabel>
          <FormControl fullWidth={true}>
            <Select
              value={outputFormat}
              onChange={e => setOutputFormat(e.target.value)}
            >
              <MenuItem value={'hex'}>Hex</MenuItem>
              <MenuItem value={'dec'}>Decimal</MenuItem>
            </Select>
          </FormControl>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={makeAddressesUnique}
                  onChange={e => setMakeAddressesUnique(e.target.checked)}
                />
              }
              label="Unique"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sortAddresses}
                  onChange={e => setSortAddresses(e.target.checked)}
                />
              }
              label="Sort"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={calculateDistance}
                  onChange={e => setCalculateDistance(e.target.checked)}
                />
              }
              label="Distance"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={4}>
          <h2>Results</h2>
          {addresses.length > 0 && (<div>
            <ButtonGroup aria-label="small outlined button group">
              <Button variant="contained" color="primary" onClick={(e) => {
                const text = _.map(address => outputFormat === 'hex' ? `0x${address.toString(16).toUpperCase()}` : address, addresses).join('\n');
                navigator.clipboard.writeText(text);
              }}>
                Copy
              </Button>
            </ButtonGroup>
            <Results
              addresses={addresses}
              distances={distances}
              outputFormat={outputFormat}
            />
          </div>)
          }
        </Grid>

        <Grid item xs={12}>
          <h1>FAQ</h1>
          <ExpansionPanel>
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
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
