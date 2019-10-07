import React from 'react';

export function Results({ addresses, distances, outputFormat }) {
  const lines = [];

  for (let index = 0; index < addresses.length - 1; index++) {
    const address = outputFormat === 'hex' ? `0x${addresses[index].toString(16).toUpperCase()}` : addresses[index];

    if (index < distances.length) {
      let distance = distances[index];
      const isNegative = distance < 0;
      if (isNegative) {
        distance *= -1;
      }
      distance = outputFormat === 'hex' ? `0x${distance.toString(16).toUpperCase()}` : distance;
      lines.push(`${address}: ${isNegative ? '-' : '+'}${distance}`);
    } else {
      lines.push(`${address}`);
    }
  }

  return <pre>{lines.join('\n')}</pre>;
}
