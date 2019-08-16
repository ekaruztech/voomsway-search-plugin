import * as moment from "moment";

export const searchDateArray = (count = 7) => {
  const array = [];
  const current = moment();
  // current.date(current.date() + 1);
  for (let i = 0; i < count; i++) {
    const dateData = {
      value: current.format("MM-DD-YYYY"),
      label: current.format("dddd, DD MMM YYYY")
    };
    current.date(current.date() + 1);
    array.push(dateData);
  }
  return array;
};
