import moment from 'moment';

export function fDate(date) {
  if (!date) return null;
  return moment(date).format('DD MMMM yyyy');
}

export function fDateTime(date) {
  if (!date) return null;
  return moment(date).format('DD MMM yyyy, hh:mm a');
}
