import dayjs from 'dayjs';

const formatTime = (n: number | string, formatter: string) : string => {
  if (!n) return '';
  return dayjs(n).format(formatter);
}


export default formatTime;
