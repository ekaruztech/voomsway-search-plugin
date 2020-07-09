import * as moment from 'moment';

const root = document.getElementById('voomsway-search-root');
const apiclientkey = root.dataset.apiclientkey;

export const searchDateArray = (count = 7) => {
  const array = [];
  const current = moment();
  // current.date(current.date() + 1);
  for (let i = 0; i < count; i++) {
    const dateData = {
      value: current.format('YYYY-MM-DD'),
      label: current.format('dddd, DD MMM YYYY'),
    };
    current.date(current.date() + 1);
    array.push(dateData);
  }
  return array;
};

export const capitalizeFirstLetter = string => {
  return string && string.charAt(0).toUpperCase() + string.slice(1);
};

export const vehicleTypesUrl = '/resources/vehicle-types';
// export const travelPathsUrl = '/travelPaths/locations';
export const setupsUrl = `/api/${apiclientkey ||
  process.env.REACT_APP_API_CLIENT_KEY}/setups`;
export const charterUrl = '/charters/create';
// export const terminalsUrl = '/terminals?selection=account name destinations location.city location.state&all=true&population=[{"path": "destinations", "select": "account name destinations location.city location.state"}]';
export const terminalsUrl =
  '/terminals?selection=account name destinations location.city location.state&all=true';
