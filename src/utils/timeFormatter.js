import { timeFormat } from 'd3-time-format';

const timeFormatter_Ymd = timeFormat('%Y.%m.%d');
const timeFormatter_YmdHM = timeFormat('%Y.%m.%d %H:%M');

export const TimeFormat_Ymd = (data) => timeFormatter_Ymd(new Date(data));
export const TimeFormat_YmdHM = (data) => timeFormatter_YmdHM(new Date(data));