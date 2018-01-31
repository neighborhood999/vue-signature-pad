const SAVE_TYPE = ['image/png', 'image/jpeg', 'image/svg+xml'];

export const checkSaveType = type => SAVE_TYPE.includes(type);

export const undo = data => {
  const record = data.toData();

  if (record) {
    return data.fromData(record.slice(0, -1));
  }

  return;
};
