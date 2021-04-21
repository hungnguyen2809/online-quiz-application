import numeral from 'numeral';
import {toString, isEmpty} from 'lodash';

export const formatPhone = (number) => {
  let phone = toString(number);
  let res = '';
  if (!isEmpty(phone)) {
    for (let i = 0; i < phone.length; i++) {
      if (i === 4 || i === 7) {
        res += `-${phone[i]}`;
      } else {
        res += phone[i];
      }
    }
  }
  return res;
};

export const formatNumber = (value) => {
  let str = numeral(value).format('0,0');
  const newchar = '.';
  str = str.split(',').join(newchar);
  return str;
};
