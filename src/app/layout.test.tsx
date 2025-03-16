import '@testing-library/jest-dom';
import RootLayout, { metadata } from './layout';

describe('RootLayout', () => {
  it('exports a valid layout component', () => {
    expect(RootLayout).toBeDefined();
  });

  it('sets metadata correctly', () => {
    expect(metadata.title).toBe('Qantas Test');
    expect(metadata.description).toBe('Qantas Hotel Search');
  });
}); 