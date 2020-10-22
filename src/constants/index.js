import Dayjs from 'dayjs'

export const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
export const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
export const startOfWeek = Dayjs().startOf('week').toDate();
export const endOfWeek = Dayjs().endOf('week').toDate();