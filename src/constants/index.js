import Dayjs from 'dayjs'

export const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
export const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
export const COLOR_MAP = ['green', 'rebeccapurple', 'red', 'blue'];
export const startOfWeek = Dayjs().startOf('week').toDate();
export const endOfWeek = Dayjs().endOf('week').toDate();