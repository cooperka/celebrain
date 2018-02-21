import imageData from './celebs.json';

// All we need is the first item. Discard the rest for cleaner snapshots.
jest.doMock('./celebs.json', () => [imageData[0]]);
