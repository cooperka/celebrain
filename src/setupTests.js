import imageData from '../public/celebs.json';

// All we need is the first item. Discard the rest for cleaner snapshots.
jest.doMock('../public/celebs.json', () => [imageData[0]]);
