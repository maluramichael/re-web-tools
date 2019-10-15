import { Conversion } from './conversion';

export class BinaryConversion extends Conversion {
  constructor() {
    super();
    this.name = 'Binary';
  }

  convert = (input, endianness) => {
    let chunks = [];
    for (let i = 0; i < input.length; i++) {
      chunks.push((parseInt(input[i], 16) >>> 0).toString(2).padStart(4, '0'));
    }
    return chunks.join(' ');
  };
}

export class AsciiConversion extends Conversion {
  constructor() {
    super();
    this.name = 'ASCII';
  }

  convert = (input, endianness) => {
    let chunks = [];
    for (let i = 0; i < Math.floor(input.length / 2) * 2; i += 2) {
      chunks.push(String.fromCharCode(parseInt(input[i] + input[i + 1], 16)));
    }
    return chunks.join('');
  };
}

export class IntegerConversion extends Conversion {
  constructor() {
    super();
    this.name = 'Integer';
  }

  convert = (input, endianness) => {
    return parseInt(input, 16);
  };
}

export class FloatConversion extends Conversion {
  constructor() {
    super();
    this.name = 'Float';
  }

  convert = (input) => {
    // TODO
    return null;
  };
}

export class OctConversion extends Conversion {
  constructor() {
    super();
    this.name = 'Oct';
  }

  convert = (input) => {
    return parseInt(input, 8);
  };
}

