import moment from 'moment';

export const dateFormat = 'DD/MM/YYYY';

export const convertDate = (date) => {
  return moment(date).format(dateFormat);
};
