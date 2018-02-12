const SAVE_TYPE = ['image/png', 'image/jpeg', 'image/svg+xml'];

export const checkSaveType = type => SAVE_TYPE.includes(type);

export const DEFAULT_OPTIONS = {
  minWidth: 0.5,
  maxWidth: 2.5,
  throttle: 16,
  minDistance: 5,
  backgroundColor: 'rgba(0,0,0,0)',
  penColor: 'black',
  velocityFilterWeight: 0.7
};
