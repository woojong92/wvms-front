import { timeFormat } from 'd3-time-format';

const timeFormatter_Ymd = timeFormat('%Y/%m/%d');

export const TimeFormat_Ymd = (data) => timeFormatter_Ymd(new Date(data));