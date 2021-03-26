import moment from 'moment';

export const dateFormat = 'DD-MM-YYYY';

export const convertDate = (date) => {
  // console.log(date);
  let dt = new Date(date);
  // console.log('Day', dt.getDate());
  // console.log('Month', dt.getMonth());
  // console.log('Year', dt.getFullYear());
  // console.log('Full', dt.toLocaleDateString());
  return moment(dt).format('DD-MM-YYYY');
};
