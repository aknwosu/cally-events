// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

const events = {
  'xxx': [
    {
      id: "moonphase+1603459380000",
      start: { date: "2020-10-23" },
      end: {date: "2020-10-23"},
      status: "confirmed",
      summary: "First quarter 2:23pm",
      visibility: "public",
      kind: "calendar#events",
      summary: "Phases of the Moon",
    }
  ]
}
const eventSummaries = [
  {
    id: 'xxx',
    primary: false,
    summary: 'Holidays in Nigeria'
  }
]
// 

window.gapi = {
  isSignedIn: true,
  load: (auth, cb) => {
    cb()
  },
  auth2: {
    getAuthInstance: () => {
      return {
        isSignedIn: {
          listen: (cb) => {
            cb(true);
          },
          get: () => true
        }
      }
    }
  },
  client: {
    init: async (params) => {
      return Promise.resolve(null)
    },
    calendar: {
      calendarList: {
        list: async (params) => ({
          result: {
            items: eventSummaries
          }
        })
      },
      events: {
        list: async (params) => ({
          result: {
            items: events[params.calendarId]
          }
        })
      }
    }
  }
};