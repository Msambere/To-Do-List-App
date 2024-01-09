(() => {
  "use strict";
  function t(t) {
    const e = Object.prototype.toString.call(t);
    return t instanceof Date || ("object" == typeof t && "[object Date]" === e)
      ? new t.constructor(+t)
      : "number" == typeof t ||
          "[object Number]" === e ||
          "string" == typeof e ||
          "[object String]" === e
        ? new Date(t)
        : new Date(NaN);
  }
  function e(t, e) {
    return t instanceof Date ? new t.constructor(e) : new Date(e);
  }
  function n(n, a) {
    const r = t(n);
    return isNaN(a) ? e(n, NaN) : a ? (r.setDate(r.getDate() + a), r) : r;
  }
  function a(e) {
    if (
      !((n = e),
      n instanceof Date ||
        ("object" == typeof n &&
          "[object Date]" === Object.prototype.toString.call(n)) ||
        "number" == typeof e)
    )
      return !1;
    var n;
    const a = t(e);
    return !isNaN(Number(a));
  }
  const r = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds",
    },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes",
    },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
    xWeeks: { one: "1 week", other: "{{count}} weeks" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
  };
  function o(t) {
    return (e = {}) => {
      const n = e.width ? String(e.width) : t.defaultWidth;
      return t.formats[n] || t.formats[t.defaultWidth];
    };
  }
  const i = {
      date: o({
        formats: {
          full: "EEEE, MMMM do, y",
          long: "MMMM do, y",
          medium: "MMM d, y",
          short: "MM/dd/yyyy",
        },
        defaultWidth: "full",
      }),
      time: o({
        formats: {
          full: "h:mm:ss a zzzz",
          long: "h:mm:ss a z",
          medium: "h:mm:ss a",
          short: "h:mm a",
        },
        defaultWidth: "full",
      }),
      dateTime: o({
        formats: {
          full: "{{date}} 'at' {{time}}",
          long: "{{date}} 'at' {{time}}",
          medium: "{{date}}, {{time}}",
          short: "{{date}}, {{time}}",
        },
        defaultWidth: "full",
      }),
    },
    d = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P",
    };
  function s(t) {
    return (e, n) => {
      let a;
      if (
        "formatting" === (n?.context ? String(n.context) : "standalone") &&
        t.formattingValues
      ) {
        const e = t.defaultFormattingWidth || t.defaultWidth,
          r = n?.width ? String(n.width) : e;
        a = t.formattingValues[r] || t.formattingValues[e];
      } else {
        const e = t.defaultWidth,
          r = n?.width ? String(n.width) : t.defaultWidth;
        a = t.values[r] || t.values[e];
      }
      return a[t.argumentCallback ? t.argumentCallback(e) : e];
    };
  }
  function c(t) {
    return (e, n = {}) => {
      const a = n.width,
        r = (a && t.matchPatterns[a]) || t.matchPatterns[t.defaultMatchWidth],
        o = e.match(r);
      if (!o) return null;
      const i = o[0],
        d = (a && t.parsePatterns[a]) || t.parsePatterns[t.defaultParseWidth],
        s = Array.isArray(d)
          ? (function (t, e) {
              for (let e = 0; e < t.length; e++) if (t[e].test(i)) return e;
            })(d)
          : (function (t, e) {
              for (const e in t)
                if (Object.prototype.hasOwnProperty.call(t, e) && t[e].test(i))
                  return e;
            })(d);
      let c;
      return (
        (c = t.valueCallback ? t.valueCallback(s) : s),
        (c = n.valueCallback ? n.valueCallback(c) : c),
        { value: c, rest: e.slice(i.length) }
      );
    };
  }
  var u;
  const l = {
    code: "en-US",
    formatDistance: (t, e, n) => {
      let a;
      const o = r[t];
      return (
        (a =
          "string" == typeof o
            ? o
            : 1 === e
              ? o.one
              : o.other.replace("{{count}}", e.toString())),
        n?.addSuffix
          ? n.comparison && n.comparison > 0
            ? "in " + a
            : a + " ago"
          : a
      );
    },
    formatLong: i,
    formatRelative: (t, e, n, a) => d[t],
    localize: {
      ordinalNumber: (t, e) => {
        const n = Number(t),
          a = n % 100;
        if (a > 20 || a < 10)
          switch (a % 10) {
            case 1:
              return n + "st";
            case 2:
              return n + "nd";
            case 3:
              return n + "rd";
          }
        return n + "th";
      },
      era: s({
        values: {
          narrow: ["B", "A"],
          abbreviated: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        defaultWidth: "wide",
      }),
      quarter: s({
        values: {
          narrow: ["1", "2", "3", "4"],
          abbreviated: ["Q1", "Q2", "Q3", "Q4"],
          wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
        },
        defaultWidth: "wide",
        argumentCallback: (t) => t - 1,
      }),
      month: s({
        values: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbreviated: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        defaultWidth: "wide",
      }),
      day: s({
        values: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        defaultWidth: "wide",
      }),
      dayPeriod: s({
        values: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
        },
        defaultWidth: "wide",
        formattingValues: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
        },
        defaultFormattingWidth: "wide",
      }),
    },
    match: {
      ordinalNumber:
        ((u = {
          matchPattern: /^(\d+)(th|st|nd|rd)?/i,
          parsePattern: /\d+/i,
          valueCallback: (t) => parseInt(t, 10),
        }),
        (t, e = {}) => {
          const n = t.match(u.matchPattern);
          if (!n) return null;
          const a = n[0],
            r = t.match(u.parsePattern);
          if (!r) return null;
          let o = u.valueCallback ? u.valueCallback(r[0]) : r[0];
          return (
            (o = e.valueCallback ? e.valueCallback(o) : o),
            { value: o, rest: t.slice(a.length) }
          );
        }),
      era: c({
        matchPatterns: {
          narrow: /^(b|a)/i,
          abbreviated:
            /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
          wide: /^(before christ|before common era|anno domini|common era)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: { any: [/^b/i, /^(a|c)/i] },
        defaultParseWidth: "any",
      }),
      quarter: c({
        matchPatterns: {
          narrow: /^[1234]/i,
          abbreviated: /^q[1234]/i,
          wide: /^[1234](th|st|nd|rd)? quarter/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
        defaultParseWidth: "any",
        valueCallback: (t) => t + 1,
      }),
      month: c({
        matchPatterns: {
          narrow: /^[jfmasond]/i,
          abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
          wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [
            /^j/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
          any: [
            /^ja/i,
            /^f/i,
            /^mar/i,
            /^ap/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^au/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
        },
        defaultParseWidth: "any",
      }),
      day: c({
        matchPatterns: {
          narrow: /^[smtwf]/i,
          short: /^(su|mo|tu|we|th|fr|sa)/i,
          abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
          wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
          any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
        },
        defaultParseWidth: "any",
      }),
      dayPeriod: c({
        matchPatterns: {
          narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
          any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
        },
        defaultMatchWidth: "any",
        parsePatterns: {
          any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i,
          },
        },
        defaultParseWidth: "any",
      }),
    },
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  };
  let m = {};
  function h() {
    return m;
  }
  Math.pow(10, 8);
  const f = 6048e5,
    g = 864e5;
  function p(e) {
    const n = t(e);
    return n.setHours(0, 0, 0, 0), n;
  }
  function b(t) {
    const e = new Date(
      Date.UTC(
        t.getFullYear(),
        t.getMonth(),
        t.getDate(),
        t.getHours(),
        t.getMinutes(),
        t.getSeconds(),
        t.getMilliseconds(),
      ),
    );
    return e.setUTCFullYear(t.getFullYear()), t.getTime() - e.getTime();
  }
  function w(n) {
    const a = t(n);
    return (
      (function (t, e) {
        const n = p(t),
          a = p(e),
          r = n.getTime() - b(n),
          o = a.getTime() - b(a);
        return Math.round((r - o) / g);
      })(
        a,
        (function (n) {
          const a = t(n),
            r = e(n, 0);
          return (
            r.setFullYear(a.getFullYear(), 0, 1), r.setHours(0, 0, 0, 0), r
          );
        })(a),
      ) + 1
    );
  }
  function y(e, n) {
    const a = h(),
      r =
        n?.weekStartsOn ??
        n?.locale?.options?.weekStartsOn ??
        a.weekStartsOn ??
        a.locale?.options?.weekStartsOn ??
        0,
      o = t(e),
      i = o.getDay(),
      d = (i < r ? 7 : 0) + i - r;
    return o.setDate(o.getDate() - d), o.setHours(0, 0, 0, 0), o;
  }
  function C(t) {
    return y(t, { weekStartsOn: 1 });
  }
  function v(n) {
    const a = t(n),
      r = a.getFullYear(),
      o = e(n, 0);
    o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
    const i = C(o),
      d = e(n, 0);
    d.setFullYear(r, 0, 4), d.setHours(0, 0, 0, 0);
    const s = C(d);
    return a.getTime() >= i.getTime()
      ? r + 1
      : a.getTime() >= s.getTime()
        ? r
        : r - 1;
  }
  function E(n) {
    const a = t(n),
      r =
        C(a).getTime() -
        (function (t) {
          const n = v(t),
            a = e(t, 0);
          return a.setFullYear(n, 0, 4), a.setHours(0, 0, 0, 0), C(a);
        })(a).getTime();
    return Math.round(r / f) + 1;
  }
  function x(n, a) {
    const r = t(n),
      o = r.getFullYear(),
      i = h(),
      d =
        a?.firstWeekContainsDate ??
        a?.locale?.options?.firstWeekContainsDate ??
        i.firstWeekContainsDate ??
        i.locale?.options?.firstWeekContainsDate ??
        1,
      s = e(n, 0);
    s.setFullYear(o + 1, 0, d), s.setHours(0, 0, 0, 0);
    const c = y(s, a),
      u = e(n, 0);
    u.setFullYear(o, 0, d), u.setHours(0, 0, 0, 0);
    const l = y(u, a);
    return r.getTime() >= c.getTime()
      ? o + 1
      : r.getTime() >= l.getTime()
        ? o
        : o - 1;
  }
  function D(n, a) {
    const r = t(n),
      o =
        y(r, a).getTime() -
        (function (t, n) {
          const a = h(),
            r =
              n?.firstWeekContainsDate ??
              n?.locale?.options?.firstWeekContainsDate ??
              a.firstWeekContainsDate ??
              a.locale?.options?.firstWeekContainsDate ??
              1,
            o = x(t, n),
            i = e(t, 0);
          return i.setFullYear(o, 0, r), i.setHours(0, 0, 0, 0), y(i, n);
        })(r, a).getTime();
    return Math.round(o / f) + 1;
  }
  function L(t, e) {
    return (t < 0 ? "-" : "") + Math.abs(t).toString().padStart(e, "0");
  }
  const k = {
      y(t, e) {
        const n = t.getFullYear(),
          a = n > 0 ? n : 1 - n;
        return L("yy" === e ? a % 100 : a, e.length);
      },
      M(t, e) {
        const n = t.getMonth();
        return "M" === e ? String(n + 1) : L(n + 1, 2);
      },
      d: (t, e) => L(t.getDate(), e.length),
      a(t, e) {
        const n = t.getHours() / 12 >= 1 ? "pm" : "am";
        switch (e) {
          case "a":
          case "aa":
            return n.toUpperCase();
          case "aaa":
            return n;
          case "aaaaa":
            return n[0];
          default:
            return "am" === n ? "a.m." : "p.m.";
        }
      },
      h: (t, e) => L(t.getHours() % 12 || 12, e.length),
      H: (t, e) => L(t.getHours(), e.length),
      m: (t, e) => L(t.getMinutes(), e.length),
      s: (t, e) => L(t.getSeconds(), e.length),
      S(t, e) {
        const n = e.length,
          a = t.getMilliseconds();
        return L(Math.floor(a * Math.pow(10, n - 3)), e.length);
      },
    },
    M = {
      G: function (t, e, n) {
        const a = t.getFullYear() > 0 ? 1 : 0;
        switch (e) {
          case "G":
          case "GG":
          case "GGG":
            return n.era(a, { width: "abbreviated" });
          case "GGGGG":
            return n.era(a, { width: "narrow" });
          default:
            return n.era(a, { width: "wide" });
        }
      },
      y: function (t, e, n) {
        if ("yo" === e) {
          const e = t.getFullYear(),
            a = e > 0 ? e : 1 - e;
          return n.ordinalNumber(a, { unit: "year" });
        }
        return k.y(t, e);
      },
      Y: function (t, e, n, a) {
        const r = x(t, a),
          o = r > 0 ? r : 1 - r;
        return "YY" === e
          ? L(o % 100, 2)
          : "Yo" === e
            ? n.ordinalNumber(o, { unit: "year" })
            : L(o, e.length);
      },
      R: function (t, e) {
        return L(v(t), e.length);
      },
      u: function (t, e) {
        return L(t.getFullYear(), e.length);
      },
      Q: function (t, e, n) {
        const a = Math.ceil((t.getMonth() + 1) / 3);
        switch (e) {
          case "Q":
            return String(a);
          case "QQ":
            return L(a, 2);
          case "Qo":
            return n.ordinalNumber(a, { unit: "quarter" });
          case "QQQ":
            return n.quarter(a, {
              width: "abbreviated",
              context: "formatting",
            });
          case "QQQQQ":
            return n.quarter(a, { width: "narrow", context: "formatting" });
          default:
            return n.quarter(a, { width: "wide", context: "formatting" });
        }
      },
      q: function (t, e, n) {
        const a = Math.ceil((t.getMonth() + 1) / 3);
        switch (e) {
          case "q":
            return String(a);
          case "qq":
            return L(a, 2);
          case "qo":
            return n.ordinalNumber(a, { unit: "quarter" });
          case "qqq":
            return n.quarter(a, {
              width: "abbreviated",
              context: "standalone",
            });
          case "qqqqq":
            return n.quarter(a, { width: "narrow", context: "standalone" });
          default:
            return n.quarter(a, { width: "wide", context: "standalone" });
        }
      },
      M: function (t, e, n) {
        const a = t.getMonth();
        switch (e) {
          case "M":
          case "MM":
            return k.M(t, e);
          case "Mo":
            return n.ordinalNumber(a + 1, { unit: "month" });
          case "MMM":
            return n.month(a, { width: "abbreviated", context: "formatting" });
          case "MMMMM":
            return n.month(a, { width: "narrow", context: "formatting" });
          default:
            return n.month(a, { width: "wide", context: "formatting" });
        }
      },
      L: function (t, e, n) {
        const a = t.getMonth();
        switch (e) {
          case "L":
            return String(a + 1);
          case "LL":
            return L(a + 1, 2);
          case "Lo":
            return n.ordinalNumber(a + 1, { unit: "month" });
          case "LLL":
            return n.month(a, { width: "abbreviated", context: "standalone" });
          case "LLLLL":
            return n.month(a, { width: "narrow", context: "standalone" });
          default:
            return n.month(a, { width: "wide", context: "standalone" });
        }
      },
      w: function (t, e, n, a) {
        const r = D(t, a);
        return "wo" === e
          ? n.ordinalNumber(r, { unit: "week" })
          : L(r, e.length);
      },
      I: function (t, e, n) {
        const a = E(t);
        return "Io" === e
          ? n.ordinalNumber(a, { unit: "week" })
          : L(a, e.length);
      },
      d: function (t, e, n) {
        return "do" === e
          ? n.ordinalNumber(t.getDate(), { unit: "date" })
          : k.d(t, e);
      },
      D: function (t, e, n) {
        const a = w(t);
        return "Do" === e
          ? n.ordinalNumber(a, { unit: "dayOfYear" })
          : L(a, e.length);
      },
      E: function (t, e, n) {
        const a = t.getDay();
        switch (e) {
          case "E":
          case "EE":
          case "EEE":
            return n.day(a, { width: "abbreviated", context: "formatting" });
          case "EEEEE":
            return n.day(a, { width: "narrow", context: "formatting" });
          case "EEEEEE":
            return n.day(a, { width: "short", context: "formatting" });
          default:
            return n.day(a, { width: "wide", context: "formatting" });
        }
      },
      e: function (t, e, n, a) {
        const r = t.getDay(),
          o = (r - a.weekStartsOn + 8) % 7 || 7;
        switch (e) {
          case "e":
            return String(o);
          case "ee":
            return L(o, 2);
          case "eo":
            return n.ordinalNumber(o, { unit: "day" });
          case "eee":
            return n.day(r, { width: "abbreviated", context: "formatting" });
          case "eeeee":
            return n.day(r, { width: "narrow", context: "formatting" });
          case "eeeeee":
            return n.day(r, { width: "short", context: "formatting" });
          default:
            return n.day(r, { width: "wide", context: "formatting" });
        }
      },
      c: function (t, e, n, a) {
        const r = t.getDay(),
          o = (r - a.weekStartsOn + 8) % 7 || 7;
        switch (e) {
          case "c":
            return String(o);
          case "cc":
            return L(o, e.length);
          case "co":
            return n.ordinalNumber(o, { unit: "day" });
          case "ccc":
            return n.day(r, { width: "abbreviated", context: "standalone" });
          case "ccccc":
            return n.day(r, { width: "narrow", context: "standalone" });
          case "cccccc":
            return n.day(r, { width: "short", context: "standalone" });
          default:
            return n.day(r, { width: "wide", context: "standalone" });
        }
      },
      i: function (t, e, n) {
        const a = t.getDay(),
          r = 0 === a ? 7 : a;
        switch (e) {
          case "i":
            return String(r);
          case "ii":
            return L(r, e.length);
          case "io":
            return n.ordinalNumber(r, { unit: "day" });
          case "iii":
            return n.day(a, { width: "abbreviated", context: "formatting" });
          case "iiiii":
            return n.day(a, { width: "narrow", context: "formatting" });
          case "iiiiii":
            return n.day(a, { width: "short", context: "formatting" });
          default:
            return n.day(a, { width: "wide", context: "formatting" });
        }
      },
      a: function (t, e, n) {
        const a = t.getHours() / 12 >= 1 ? "pm" : "am";
        switch (e) {
          case "a":
          case "aa":
            return n.dayPeriod(a, {
              width: "abbreviated",
              context: "formatting",
            });
          case "aaa":
            return n
              .dayPeriod(a, { width: "abbreviated", context: "formatting" })
              .toLowerCase();
          case "aaaaa":
            return n.dayPeriod(a, { width: "narrow", context: "formatting" });
          default:
            return n.dayPeriod(a, { width: "wide", context: "formatting" });
        }
      },
      b: function (t, e, n) {
        const a = t.getHours();
        let r;
        switch (
          ((r =
            12 === a
              ? "noon"
              : 0 === a
                ? "midnight"
                : a / 12 >= 1
                  ? "pm"
                  : "am"),
          e)
        ) {
          case "b":
          case "bb":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting",
            });
          case "bbb":
            return n
              .dayPeriod(r, { width: "abbreviated", context: "formatting" })
              .toLowerCase();
          case "bbbbb":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      B: function (t, e, n) {
        const a = t.getHours();
        let r;
        switch (
          ((r =
            a >= 17
              ? "evening"
              : a >= 12
                ? "afternoon"
                : a >= 4
                  ? "morning"
                  : "night"),
          e)
        ) {
          case "B":
          case "BB":
          case "BBB":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting",
            });
          case "BBBBB":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      h: function (t, e, n) {
        if ("ho" === e) {
          let e = t.getHours() % 12;
          return 0 === e && (e = 12), n.ordinalNumber(e, { unit: "hour" });
        }
        return k.h(t, e);
      },
      H: function (t, e, n) {
        return "Ho" === e
          ? n.ordinalNumber(t.getHours(), { unit: "hour" })
          : k.H(t, e);
      },
      K: function (t, e, n) {
        const a = t.getHours() % 12;
        return "Ko" === e
          ? n.ordinalNumber(a, { unit: "hour" })
          : L(a, e.length);
      },
      k: function (t, e, n) {
        let a = t.getHours();
        return (
          0 === a && (a = 24),
          "ko" === e ? n.ordinalNumber(a, { unit: "hour" }) : L(a, e.length)
        );
      },
      m: function (t, e, n) {
        return "mo" === e
          ? n.ordinalNumber(t.getMinutes(), { unit: "minute" })
          : k.m(t, e);
      },
      s: function (t, e, n) {
        return "so" === e
          ? n.ordinalNumber(t.getSeconds(), { unit: "second" })
          : k.s(t, e);
      },
      S: function (t, e) {
        return k.S(t, e);
      },
      X: function (t, e, n, a) {
        const r = (a._originalDate || t).getTimezoneOffset();
        if (0 === r) return "Z";
        switch (e) {
          case "X":
            return A(r);
          case "XXXX":
          case "XX":
            return S(r);
          default:
            return S(r, ":");
        }
      },
      x: function (t, e, n, a) {
        const r = (a._originalDate || t).getTimezoneOffset();
        switch (e) {
          case "x":
            return A(r);
          case "xxxx":
          case "xx":
            return S(r);
          default:
            return S(r, ":");
        }
      },
      O: function (t, e, n, a) {
        const r = (a._originalDate || t).getTimezoneOffset();
        switch (e) {
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + T(r, ":");
          default:
            return "GMT" + S(r, ":");
        }
      },
      z: function (t, e, n, a) {
        const r = (a._originalDate || t).getTimezoneOffset();
        switch (e) {
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + T(r, ":");
          default:
            return "GMT" + S(r, ":");
        }
      },
      t: function (t, e, n, a) {
        const r = a._originalDate || t;
        return L(Math.floor(r.getTime() / 1e3), e.length);
      },
      T: function (t, e, n, a) {
        return L((a._originalDate || t).getTime(), e.length);
      },
    };
  function T(t, e = "") {
    const n = t > 0 ? "-" : "+",
      a = Math.abs(t),
      r = Math.floor(a / 60),
      o = a % 60;
    return 0 === o ? n + String(r) : n + String(r) + e + L(o, 2);
  }
  function A(t, e) {
    return t % 60 == 0 ? (t > 0 ? "-" : "+") + L(Math.abs(t) / 60, 2) : S(t, e);
  }
  function S(t, e = "") {
    const n = t > 0 ? "-" : "+",
      a = Math.abs(t);
    return n + L(Math.floor(a / 60), 2) + e + L(a % 60, 2);
  }
  const P = (t, e) => {
      switch (t) {
        case "P":
          return e.date({ width: "short" });
        case "PP":
          return e.date({ width: "medium" });
        case "PPP":
          return e.date({ width: "long" });
        default:
          return e.date({ width: "full" });
      }
    },
    B = (t, e) => {
      switch (t) {
        case "p":
          return e.time({ width: "short" });
        case "pp":
          return e.time({ width: "medium" });
        case "ppp":
          return e.time({ width: "long" });
        default:
          return e.time({ width: "full" });
      }
    },
    q = {
      p: B,
      P: (t, e) => {
        const n = t.match(/(P+)(p+)?/) || [],
          a = n[1],
          r = n[2];
        if (!r) return P(t, e);
        let o;
        switch (a) {
          case "P":
            o = e.dateTime({ width: "short" });
            break;
          case "PP":
            o = e.dateTime({ width: "medium" });
            break;
          case "PPP":
            o = e.dateTime({ width: "long" });
            break;
          default:
            o = e.dateTime({ width: "full" });
        }
        return o.replace("{{date}}", P(a, e)).replace("{{time}}", B(r, e));
      },
    },
    W = ["D", "DD"],
    Y = ["YY", "YYYY"];
  function j(t, e, n) {
    if ("YYYY" === t)
      throw new RangeError(
        `Use \`yyyy\` instead of \`YYYY\` (in \`${e}\`) for formatting years to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`,
      );
    if ("YY" === t)
      throw new RangeError(
        `Use \`yy\` instead of \`YY\` (in \`${e}\`) for formatting years to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`,
      );
    if ("D" === t)
      throw new RangeError(
        `Use \`d\` instead of \`D\` (in \`${e}\`) for formatting days of the month to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`,
      );
    if ("DD" === t)
      throw new RangeError(
        `Use \`dd\` instead of \`DD\` (in \`${e}\`) for formatting days of the month to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`,
      );
  }
  const N = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    I = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    O = /^'([^]*?)'?$/,
    H = /''/g,
    F = /[a-zA-Z]/;
  function Q(e, n, r) {
    const o = h(),
      i = r?.locale ?? o.locale ?? l,
      d =
        r?.firstWeekContainsDate ??
        r?.locale?.options?.firstWeekContainsDate ??
        o.firstWeekContainsDate ??
        o.locale?.options?.firstWeekContainsDate ??
        1,
      s =
        r?.weekStartsOn ??
        r?.locale?.options?.weekStartsOn ??
        o.weekStartsOn ??
        o.locale?.options?.weekStartsOn ??
        0,
      c = t(e);
    if (!a(c)) throw new RangeError("Invalid time value");
    const u = {
      firstWeekContainsDate: d,
      weekStartsOn: s,
      locale: i,
      _originalDate: c,
    };
    return n
      .match(I)
      .map(function (t) {
        const e = t[0];
        return "p" === e || "P" === e ? (0, q[e])(t, i.formatLong) : t;
      })
      .join("")
      .match(N)
      .map(function (t) {
        if ("''" === t) return "'";
        const a = t[0];
        if ("'" === a)
          return (function (t) {
            const e = t.match(O);
            return e ? e[1].replace(H, "'") : t;
          })(t);
        const o = M[a];
        if (o)
          return (
            r?.useAdditionalWeekYearTokens ||
              ((d = t), -1 === Y.indexOf(d)) ||
              j(t, n, String(e)),
            !r?.useAdditionalDayOfYearTokens &&
              (function (t) {
                return -1 !== W.indexOf(t);
              })(t) &&
              j(t, n, String(e)),
            o(c, t, i.localize, u)
          );
        var d;
        if (a.match(F))
          throw new RangeError(
            "Format string contains an unescaped latin alphabet character `" +
              a +
              "`",
          );
        return t;
      })
      .join("");
  }
  function $(t, e, n, a, r, o) {
    (this.title = t),
      (this.description = e),
      (this.dueDate = (function (t) {
        return Q(
          "" === t ? new Date().toLocaleString() : new Date(t).toLocaleString(),
          "M-dd-y",
        );
      })(n)),
      (this.priority = a),
      (this.todos = []),
      (this.notes = r),
      (this.projectTag = o),
      (this.status = "");
  }
  function z(t, e) {
    this.projectTag = t;
    let n = e.filter((e) => e.projectTag === t);
    this.tdList = n;
  }
  let G = [];
  function X(t, e, n, a, r, o, i) {
    let d = new $(t, e, n, a, r, o, i);
    return (
      G.push(d),
      G.sort((t, e) => new Date(t.dueDate) - new Date(e.dueDate)),
      U(G),
      G
    );
  }
  function R(e) {
    let a = [];
    e.forEach((e) => {
      (function (e) {
        return (function (e, n) {
          return +t(e) < +t(n);
        })(e.dueDate, n(new Date(), -1));
      })(e) && a.push(e["data-index"].toString());
    }),
      document.querySelectorAll(".todo").forEach((t) => {
        let e = t.getAttribute("data-index");
        a.includes(e) && t.classList.add("overdue");
      });
  }
  function U(t) {
    t.forEach((e) => {
      e["data-index"] = t.findIndex((t) => t.title === e.title);
    });
  }
  function J(t) {
    let e = [];
    return (
      t.forEach((t) => {
        let n = t.projectTag;
        "Daily" == n || "" == n || e.includes(n) || e.push(n);
      }),
      e
    );
  }
  function _(t) {
    let e = n(new Date(), 10);
    return [
      t.filter((t) => "High" === t.priority && t.dueDate <= Q(e, "M-dd-y")),
      t.filter(
        (t) =>
          ("High" === t.priority && t.dueDate > Q(e, "M-dd-y")) ||
          ("Medium" === t.priority && t.dueDate > Q(e, "M-dd-y")),
      ),
      t.filter(
        (t) =>
          ("Low" === t.priority && t.dueDate <= Q(e, "M-dd-y")) ||
          ("Medium" === t.priority && t.dueDate <= Q(e, "M-dd-y")),
      ),
      t.filter((t) => "Low" === t.priority && t.dueDate > Q(e, "M-dd-y")),
    ];
  }
  function V(t, e, n) {
    const a = document.createElement("div");
    a.classList.add("form-row");
    const r = document.createElement("label");
    r.setAttribute("for", t), (r.textContent = e);
    const o = document.createElement("input");
    return (
      o.setAttribute("type", n),
      o.setAttribute("name", t),
      o.setAttribute("id", t),
      a.appendChild(r),
      a.appendChild(o),
      a
    );
  }
  function K(t, e, n) {
    const a = document.createElement("div");
    a.classList.add("form-row");
    const r = document.createElement("label");
    r.setAttribute("for", t), (r.textContent = e);
    const o = document.createElement("select");
    return (
      o.setAttribute("id", t),
      o.setAttribute("name", t),
      n.forEach((t) => {
        let e = document.createElement("option");
        (e.textContent = t), o.appendChild(e);
      }),
      a.appendChild(r),
      a.appendChild(o),
      a
    );
  }
  X(
    "Create user constructor",
    "Create a function that will store user information like id and avatar",
    "01-25-2024",
    "High",
    "test notes",
    "To-do App",
  ),
    X(
      "Look up data-fns library",
      "See what functions are available",
      "12-29-2023",
      "High",
      "",
      "To-do App",
    ),
    X("Go to the gym", "Complete the daily workout", "", "High", "", "Daily"),
    X("tester1", "checking fn", "04-11-1989", "Low", "", "Test 1"),
    X("tester2", "checking fn", "05-18-2020", "Medium", "", "Test 2"),
    X("Always today", "always today", new Date(), "Low", "", "Test 1"),
    X("Today plus 2", "checking fn", n(new Date(), 2), "High", "", "Test 2"),
    X("Today plus 5", "checking fn", n(new Date(), 5), "Medium", "", "Test 3"),
    X(
      "read the newspaper",
      "Complete the daily workout",
      "",
      "Medium",
      "",
      "Daily",
    ),
    X("Buy a yacht", "Complete the daily workout", "", "Low", "", "Daily");
  const Z = document.getElementById("content");
  function tt(t) {
    let e = "";
    return (e = 1 === t ? "task is" : "tasks are"), e;
  }
  function et(t) {
    let e = document.createElement("h2");
    return e.classList.add("pHeader"), (e.textContent = t), e;
  }
  function nt(t) {
    let e = document.createElement("div");
    return (
      e.classList.add("list-display"),
      e.classList.add("tdList-container"),
      t.forEach((t) => {
        let n = ot(t);
        e.appendChild(n);
      }),
      e
    );
  }
  function at(t) {
    let e = document.createElement("div");
    e.classList.add("quad-display"), e.classList.add("quad-container");
    for (let n = 1; n < 5; n++) {
      let a = rt(t[n - 1]);
      a.classList.add("quad" + n), e.appendChild(a);
    }
    let n = document.createElement("div");
    n.classList.add("quad-grid-label"),
      n.classList.add("urgent"),
      (n.textContent = "URGENT"),
      e.appendChild(n);
    let a = document.createElement("div");
    a.classList.add("quad-grid-label"),
      a.classList.add("later"),
      (a.textContent = "NOT URGENT"),
      e.appendChild(a);
    let r = document.createElement("div");
    r.classList.add("quad-grid-label"),
      r.classList.add("rotate"),
      r.classList.add("important"),
      (r.textContent = "IMPORTANT"),
      e.appendChild(r);
    let o = document.createElement("div");
    return (
      o.classList.add("quad-grid-label"),
      o.classList.add("rotate"),
      o.classList.add("unimportant"),
      (o.textContent = " NOT IMPORTANT"),
      e.appendChild(o),
      e
    );
  }
  function rt(t) {
    let e = document.createElement("div");
    return (
      e.classList.add("tdList-container"),
      t.forEach((t) => {
        let n = ot(t);
        e.appendChild(n);
      }),
      e
    );
  }
  function ot(t) {
    let e = document.createElement("div");
    e.classList.add("todo"), e.setAttribute("data-index", t["data-index"]);
    let n = document.createElement("img");
    n.classList.add("checkbox"), (n.src = "../src/Images/unchecked-box.png");
    let a = document.createElement("div");
    a.classList.add("todo-title"), (a.textContent = t.title);
    let r = document.createElement("div");
    r.classList.add("dueDate-div"), (r.textContent = t.dueDate);
    let o = document.createElement("div");
    o.classList.add("priority-div"),
      (o.textContent = t.priority),
      (o.style.color = (function (t) {
        let e = t.priority;
        return "High" === e
          ? "red"
          : "Medium" === e
            ? "blue"
            : "Low" === e
              ? "black"
              : "grey";
      })(t));
    let i = document.createElement("img");
    i.classList.add("edit"), (i.src = "../src/Images/pencil.png");
    let d = document.createElement("img");
    return (
      d.classList.add("delete"),
      (d.src = "../src/Images/delete.png"),
      e.appendChild(n),
      e.appendChild(a),
      e.appendChild(r),
      e.appendChild(o),
      e.appendChild(i),
      e.appendChild(d),
      e
    );
  }
  function it(t, e) {
    "complete" != e
      ? (t.classList.remove("complete"),
        (t.firstChild.src = "../src/Images/unchecked-box.png"))
      : "complete" === e &&
        (t.classList.add("complete"),
        (t.firstChild.src = "../src/Images/checked-checkbox.png"));
  }
  Z.appendChild(
    (function () {
      const t = document.createElement("div");
      t.classList.add("header");
      const e = document.createElement("div");
      e.classList.add("ltbox");
      const n = document.createElement("img");
      n.classList.add("logo"), (n.src = "../src/Images/logo.png");
      const a = document.createElement("h1");
      a.classList.add("title"), (a.textContent = "Check-It");
      const r = document.createElement("div");
      r.classList.add("header-right");
      const o = document.createElement("div");
      o.classList.add("userDisplay"),
        (o.textContent = "User name and avatar go here");
      const i = document.createElement("label");
      i.classList.add("toggle-box");
      const d = document.createElement("input");
      d.setAttribute("type", "checkbox"),
        d.setAttribute("id", "toggle-checkbox");
      const s = document.createElement("div");
      return (
        s.classList.add("circle"),
        i.appendChild(d),
        i.appendChild(s),
        r.appendChild(o),
        r.appendChild(i),
        e.appendChild(n),
        e.appendChild(a),
        t.appendChild(e),
        t.appendChild(r),
        t
      );
    })(),
  ),
    Z.appendChild(
      (function () {
        const t = document.createElement("div");
        t.classList.add("navBar");
        const e = document.createElement("button");
        e.classList.add("button"),
          e.classList.add("navBtn"),
          e.setAttribute("id", "todayBtn"),
          (e.textContent = "Today");
        const n = document.createElement("button");
        n.classList.add("button"),
          n.classList.add("navBtn"),
          n.setAttribute("id", "weekly"),
          (n.textContent = "This Week");
        const a = document.createElement("button");
        a.classList.add("button"),
          a.classList.add("navBtn"),
          a.setAttribute("id", "all"),
          (a.textContent = "All Tasks");
        const r = document.createElement("button");
        r.classList.add("button"),
          r.classList.add("navBtn"),
          r.setAttribute("id", "daily"),
          (r.textContent = "Daily Tasks");
        const o = document.createElement("button");
        o.classList.add("button"),
          o.classList.add("navBtn"),
          o.setAttribute("id", "projects"),
          (o.textContent = "Projects");
        const i = document.createElement("button");
        return (
          i.classList.add("button"),
          i.classList.add("navBtn"),
          i.setAttribute("id", "new-todo-btn"),
          (i.textContent = "+ Add New Todo"),
          t.appendChild(e),
          t.appendChild(n),
          t.appendChild(a),
          t.appendChild(r),
          t.appendChild(o),
          t.appendChild(i),
          t
        );
      })(),
    ),
    Z.appendChild(
      (function () {
        const t = document.createElement("div");
        return t.classList.add("main"), t.setAttribute("id", "main"), t;
      })(),
    ),
    Z.appendChild(
      (function () {
        const t = document.createElement("div");
        return (
          t.classList.add("footer"), (t.textContent = "made by Msambere"), t
        );
      })(),
    ),
    Z.appendChild(
      (function () {
        const t = document.createElement("dialog");
        t.classList.add("modal"), t.setAttribute("id", "newTodoDialog");
        const e = document.createElement("form");
        e.setAttribute("method", "dialog"), e.setAttribute("id", "myForm");
        const n = V("td-title", "Title of Todo", "text"),
          a = V("td-description", "Description of Todo", "text"),
          r = V("td-dueDate", "Due Date:", "date"),
          o = K("td-priority", "Priority", ["High", "Medium", "Low"]),
          i = K("td-projectTag", "Project", J(G)),
          d = document.createElement("div");
        d.classList.add("form-buttons");
        const s = document.createElement("button");
        s.setAttribute("id", "cancelBtn"),
          s.setAttribute("value", "cancel"),
          s.setAttribute("formmethod", "dialog"),
          (s.textContent = "Cancel");
        const c = document.createElement("button");
        return (
          c.setAttribute("id", "confirmBtn"),
          c.setAttribute("value", "default"),
          (c.textContent = "Confirm"),
          d.appendChild(s),
          d.appendChild(c),
          e.appendChild(n),
          e.appendChild(a),
          e.appendChild(r),
          e.appendChild(o),
          e.appendChild(i),
          e.appendChild(d),
          t.appendChild(e),
          t
        );
      })(),
    ),
    Z.appendChild(
      (function () {
        const t = document.createElement("dialog");
        t.classList.add("modal"), t.setAttribute("id", "editTodoDialog");
        const e = document.createElement("form");
        e.setAttribute("method", "dialog"), e.setAttribute("id", "editForm");
        const n = (function (t, e, n) {
            const a = document.createElement("div");
            a.classList.add("form-row");
            const r = document.createElement("label");
            r.setAttribute("for", t), (r.textContent = "Choose a property");
            const o = document.createElement("select");
            return (
              o.setAttribute("id", t),
              o.setAttribute("name", t),
              [
                "title",
                "description",
                "dueDate",
                "priority",
                "notes",
                "project tag",
              ].forEach((t) => {
                let e = document.createElement("option");
                (e.textContent = t), o.appendChild(e);
              }),
              a.appendChild(r),
              a.appendChild(o),
              a
            );
          })("td-property"),
          a = (function (t, e, n) {
            const a = document.createElement("div");
            a.classList.add("form-row");
            const r = document.createElement("label");
            r.setAttribute("for", t), (r.textContent = "");
            const o = document.createElement("input");
            return (
              o.setAttribute("type", "text"),
              o.setAttribute("name", t),
              o.setAttribute("id", t),
              a.appendChild(r),
              a.appendChild(o),
              a
            );
          })("newValue"),
          r = document.createElement("div");
        r.classList.add("form-buttons");
        const o = document.createElement("button");
        o.setAttribute("id", "editCancelBtn"),
          o.setAttribute("value", "cancel"),
          o.setAttribute("formmethod", "dialog"),
          (o.textContent = "Cancel");
        const i = document.createElement("button");
        return (
          i.setAttribute("id", "editConfirmBtn"),
          i.setAttribute("value", "default"),
          (i.textContent = "Confirm"),
          r.appendChild(o),
          r.appendChild(i),
          e.appendChild(n),
          e.appendChild(a),
          e.appendChild(r),
          t.appendChild(e),
          t
        );
      })(),
    );
  const dt = document.getElementById("main"),
    st = document.getElementById("all");
  st.classList.toggle("active"),
    dt.appendChild(et("All tasks")),
    dt.classList.contains("quad")
      ? (dt.appendChild(at(_(G))), R(G))
      : (dt.appendChild(nt(G)), R(G)),
    bt();
  const ct = document.querySelector(".toggle-box"),
    ut = document.querySelector(".circle"),
    lt = document.getElementById("toggle-checkbox");
  ut.addEventListener(
    "click",
    () => (dt.classList.toggle("quad"), yt(), void Ct()),
  ),
    ct.addEventListener("click", () => {
      lt.checked
        ? (ut.style.transform = "translateX(42px)")
        : (ut.style.transform = "translateX(0px)");
    }),
    document.getElementById("todayBtn").addEventListener("click", (t) => {
      wt(t), yt(), Ct();
    }),
    document.getElementById("weekly").addEventListener("click", (t) => {
      yt(), wt(t), Ct();
    }),
    st.addEventListener("click", (t) => {
      yt(), wt(t), Ct();
    }),
    document.getElementById("daily").addEventListener("click", (t) => {
      yt(), wt(t), Ct();
    });
  const mt = document.getElementById("projects");
  mt.addEventListener("click", (t) => {
    wt(t),
      mt.after(
        (function (t) {
          let e = document.createElement("div");
          return (
            e.classList.add("projectBtns-container"),
            J(t).forEach((t) => {
              let n = document.createElement("button");
              n.classList.add("button"),
                n.classList.add("project-btn"),
                (n.textContent = t),
                e.appendChild(n);
            }),
            e
          );
        })(G),
      ),
      yt(),
      dt.appendChild(et("All Projects")),
      dt.appendChild(
        (function (t) {
          let e = document.createElement("div");
          return (
            e.classList.add("projectOverviews-container"),
            e.classList.add("list-display"),
            (function (t) {
              let e = J(t),
                n = [];
              return (
                e.forEach((e) => {
                  let a = new z(e, t);
                  n.push(a);
                }),
                n
              );
            })(t).forEach((t) => {
              let n = (function (t) {
                let e = document.createElement("div");
                e.classList.add("project-overview");
                let n = document.createElement("h3");
                n.classList.add("overview-title"),
                  (n.textContent = t.projectTag);
                let a = (function (t) {
                    let e = t.filter((t) => "complete" === t.status).length,
                      n = t.length,
                      a = _(t);
                    return {
                      numTds: n,
                      numCompleted: e,
                      numQ1: a[0].length,
                      numQ2: a[1].length,
                      numQ3: a[2].length,
                      numQ4: a[3].length,
                    };
                  })(t.tdList),
                  r = document.createElement("p");
                r.textContent = `${a.numCompleted} / ${a.numTds} tasks completed`;
                let o = document.createElement("p"),
                  i = tt(a.numQ1);
                o.textContent = `${a.numQ1}  ${i} urgent and important.`;
                let d = document.createElement("p"),
                  s = tt(a.numQ2);
                d.textContent = `${a.numQ2} ${s} not urgent and important.`;
                let c = document.createElement("p"),
                  u = tt(a.numQ3);
                c.textContent = `${a.numQ3} ${u} urgent and unimportant.`;
                let l = document.createElement("p"),
                  m = tt(a.numQ4);
                return (
                  (l.textContent = `${a.numQ4} ${m} not urgent and unimportant.`),
                  e.appendChild(n),
                  e.appendChild(r),
                  e.appendChild(o),
                  e.appendChild(d),
                  e.appendChild(c),
                  e.appendChild(l),
                  e
                );
              })(t);
              e.appendChild(n);
            }),
            e
          );
        })(G),
      ),
      bt();
    const e = document.querySelectorAll(".project-btn");
    e.forEach((t) =>
      t.addEventListener("click", (t) => {
        yt(), wt(t), Ct(), e.forEach((t) => t.remove());
      }),
    );
  });
  const ht = document.getElementById("new-todo-btn"),
    ft = document.getElementById("newTodoDialog"),
    gt = ft.querySelector("#cancelBtn"),
    pt = ft.querySelector("#confirmBtn");
  function bt() {
    document.querySelectorAll(".checkbox").forEach((t) =>
      t.addEventListener("click", (t) =>
        (function (t) {
          let e = t.target.parentElement,
            n = (function (t, e) {
              let n = e[t].status;
              return (e[t].status = "" === n ? "complete" : ""), n;
            })(e.getAttribute("data-index"), G);
          it(e, n);
        })(t),
      ),
    ),
      document.querySelectorAll(".delete").forEach((t) =>
        t.addEventListener("click", (t) =>
          (function (t) {
            !(function (t, e) {
              let n = e.findIndex((e) => e.title === t);
              e.splice(n, 1), e.sort((t, e) => t.dueDate - e.dueDate);
            })(t.target.parentElement.firstChild.nextSibling.textContent, G),
              t.target.parentElement.remove();
          })(t),
        ),
      ),
      (function () {
        const t = document.querySelectorAll(".edit"),
          e = document.getElementById("editTodoDialog"),
          n = e.querySelector("#editCancelBtn"),
          a = e.querySelector("#editConfirmBtn");
        t.forEach((t) =>
          t.addEventListener("click", (t) => {
            let r = t.target.parentElement.firstChild.nextSibling.textContent,
              o = G.findIndex((t) => t.title === r);
            e.showModal(),
              a.addEventListener("click", (t) => {
                t.preventDefault(),
                  (function (t) {
                    let e = document.getElementById("td-property").value,
                      n = document.getElementById("newValue").value;
                    (G[t][e] = n), G[t];
                  })(o),
                  G.sort((t, e) => new Date(t.dueDate) - new Date(e.dueDate)),
                  document.getElementById("editForm").reset(),
                  e.close(),
                  yt(),
                  Ct();
              }),
              n.addEventListener("click", () => {
                document.getElementById("editForm").reset(), e.close();
              });
          }),
        );
      })();
  }
  function wt(t) {
    document
      .querySelectorAll(".active")
      .forEach((t) => t.classList.toggle("active")),
      t.target.classList.toggle("active");
  }
  function yt() {
    for (; dt.firstChild; ) dt.removeChild(dt.firstChild);
  }
  function Ct() {
    let t = document.querySelector(".active").textContent,
      e = "";
    switch (t) {
      case "Today":
        e = G.filter(
          (t) =>
            t.dueDate === Q(new Date(), "M-dd-y") && "Daily" != t.projectTag,
        );
        break;
      case "This Week":
        e = G.filter(
          (t) =>
            t.dueDate >= Q(new Date(), "M-dd-y") &&
            t.dueDate <= Q(n(new Date(), 7), "M-dd-y") &&
            "Daily" != t.projectTag,
        );
        break;
      case "All Tasks":
        e = G;
        break;
      case "Daily Tasks":
        e = (function (t) {
          return t.filter((t) => "Daily" === t.projectTag);
        })(G);
        break;
      default:
        e = (function (t, e) {
          return t.filter((t) => t.projectTag === e);
        })(G, t);
    }
    dt.appendChild(et(t)),
      dt.classList.contains("quad")
        ? (dt.appendChild(at(_(e))), R(G))
        : (dt.appendChild(nt(e)), R(G)),
      bt(),
      document.querySelectorAll(".todo").forEach((t) => {
        let e = t.getAttribute("data-index");
        it(t, G[e].status);
      });
  }
  ht.addEventListener("click", () => {
    ht.classList.toggle("clicked"), ft.showModal();
  }),
    pt.addEventListener("click", (t) => {
      t.preventDefault(),
        (function (t) {
          let e = ot(t),
            n = G.findIndex((e) => e.title === t.title),
            a = document.querySelectorAll(".todo");
          if (0 != n) {
            let t = G[n - 1].title;
            a.forEach((n) => {
              n.textContent.includes(t) && n.after(e);
            });
          } else {
            let t = G[1].title;
            a.forEach((n) => {
              n.textContent.includes(t) && n.before(e);
            });
          }
        })(
          (function () {
            let t = new $(
              document.getElementById("td-title").value,
              document.getElementById("td-description").value,
              Q(n(document.getElementById("td-dueDate").value, 1), "M-dd-y"),
              document.getElementById("td-priority").value,
              [],
              "",
              document.getElementById("td-projectTag").value,
            );
            return (
              G.push(t),
              G.sort((t, e) => new Date(t.dueDate) - new Date(e.dueDate)),
              U(G),
              t
            );
          })(),
        ),
        bt(),
        document.getElementById("myForm").reset(),
        ft.close();
    }),
    gt.addEventListener("click", () => {
      document.getElementById("myForm").reset(), ft.close();
    });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFBVXlCLEVBQVN6QixRQUN2RTBNLEVBQVU5SyxTQUFTQyxpQkFBaUIsU0FDeEMsR0FBZSxHQUFYRSxFQUFjLENBQ2QsSUFBSTRLLEVBQWUsRUFBYTVLLEVBQVUsR0FBRy9CLE1BQzdDME0sRUFBUWxMLFNBQVNNLElBQ1RBLEVBQUlrQixZQUFZZixTQUFTMEssSUFDekI3SyxFQUFJZ0gsTUFBTTJELEVBQ2IsR0FFVCxLQUFPLENBQ0gsSUFBSUcsRUFBYyxFQUFhLEdBQUc1TSxNQUNsQzBNLEVBQVFsTCxTQUFTTSxJQUNUQSxFQUFJa0IsWUFBWWYsU0FBUzJLLElBQ3pCOUssRUFBSStLLE9BQU9KLEVBQ2QsR0FFVCxDQUNKLENBOUNJSyxDSmhESixXQUNFLElBS0k1TCxFQUFVLElBQUksRUFMSlUsU0FBUzRCLGVBQWUsWUFBWTNVLE1BQ2pDK1MsU0FBUzRCLGVBQWUsa0JBQWtCM1UsTUFDM0M2UCxFQUFPNVAsRUFBUThTLFNBQVM0QixlQUFlLGNBQWMzVSxNQUFPLEdBQUksVUFDL0QrUyxTQUFTNEIsZUFBZSxlQUFlM1UsTUFFVyxHQUFJLEdBRHBEK1MsU0FBUzRCLGVBQWUsaUJBQWlCM1UsT0FLNUQsT0FIQSxFQUFhc1MsS0FBS0QsR0FDbEIsRUFBYUUsTUFBSyxDQUFDbkgsRUFBRXFDLElBQUssSUFBSTlOLEtBQUt5TCxFQUFFaUcsU0FBUyxJQUFJMVIsS0FBSzhOLEVBQUU0RCxXQUN6RG1CLEVBQVUsR0FDSEgsQ0FDVCxDSW9Dc0I2TCxJQUVsQjdFLEtBQ0F0RyxTQUFTNEIsZUFBZSxVQUFVMkksUUFDbEN0QixHQUFjdUIsT0FBTyxJQUd6QjNFLEdBQVVhLGlCQUFpQixTQUFTLEtBQ2hDMUcsU0FBUzRCLGVBQWUsVUFBVTJJLFFBQ2xDdEIsR0FBY3VCLE9BQU8sRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3RvRGF0ZS5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29uc3RydWN0RnJvbS5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvYWRkRGF5cy5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNWYWxpZC5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNEYXRlLm1qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXREaXN0YW5jZS5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL19saWIvYnVpbGRGb3JtYXRMb25nRm4ubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdExvbmcubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdFJlbGF0aXZlLm1qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZExvY2FsaXplRm4ubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkTWF0Y2hGbi5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL19saWIvYnVpbGRNYXRjaFBhdHRlcm5Gbi5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTLm1qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMvX2xpYi9sb2NhbGl6ZS5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvbWF0Y2gubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZGVmYXVsdE9wdGlvbnMubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2NvbnN0YW50cy5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZkRheS5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9nZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzLm1qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXREYXlPZlllYXIubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cy5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZlllYXIubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZXZWVrLm1qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mSVNPV2Vlay5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0SVNPV2Vla1llYXIubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldElTT1dlZWsubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZJU09XZWVrWWVhci5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZ2V0V2Vla1llYXIubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldFdlZWsubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZXZWVrWWVhci5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9hZGRMZWFkaW5nWmVyb3MubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZm9ybWF0L2xpZ2h0Rm9ybWF0dGVycy5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9mb3JtYXQvZm9ybWF0dGVycy5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9mb3JtYXQvbG9uZ0Zvcm1hdHRlcnMubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvcHJvdGVjdGVkVG9rZW5zLm1qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9mb3JtYXQubWpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtYXBwLy4vc3JjL2NvbnN0cnVjdG9ycy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWFwcC8uL3NyYy9hcHBsb2dpYy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc0JlZm9yZS5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3ViRGF5cy5tanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9zcmMvbmV3VEQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9zcmMvc2l0ZUNvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWFwcC8uL3NyYy9zaXRlZHluYW1pYy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LWFwcC8uL3NyYy9lZGl0VEQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbmFtZSB0b0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGFuIGluc3RhbmNlIG9mIERhdGUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIGl0cyBjbG9uZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYSBudW1iZXIsIGl0IGlzIHRyZWF0ZWQgYXMgYSB0aW1lc3RhbXAuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG5vbmUgb2YgdGhlIGFib3ZlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBJbnZhbGlkIERhdGUuXG4gKlxuICogKipOb3RlKio6ICphbGwqIERhdGUgYXJndW1lbnRzIHBhc3NlZCB0byBhbnkgKmRhdGUtZm5zKiBmdW5jdGlvbiBpcyBwcm9jZXNzZWQgYnkgYHRvRGF0ZWAuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGFyZ3VtZW50IC0gVGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqXG4gKiBAcmV0dXJucyBUaGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICBjb25zdCBhcmdTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpO1xuXG4gIC8vIENsb25lIHRoZSBkYXRlXG4gIGlmIChcbiAgICBhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUgfHxcbiAgICAodHlwZW9mIGFyZ3VtZW50ID09PSBcIm9iamVjdFwiICYmIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IERhdGVdXCIpXG4gICkge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgYXJndW1lbnQuY29uc3RydWN0b3IoK2FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChcbiAgICB0eXBlb2YgYXJndW1lbnQgPT09IFwibnVtYmVyXCIgfHxcbiAgICBhcmdTdHIgPT09IFwiW29iamVjdCBOdW1iZXJdXCIgfHxcbiAgICB0eXBlb2YgYXJnU3RyID09PSBcInN0cmluZ1wiIHx8XG4gICAgYXJnU3RyID09PSBcIltvYmplY3QgU3RyaW5nXVwiXG4gICkge1xuICAgIC8vIFRPRE86IENhbiB3ZSBnZXQgcmlkIG9mIGFzP1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gVE9ETzogQ2FuIHdlIGdldCByaWQgb2YgYXM/XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCB0b0RhdGU7XG4iLCIvKipcbiAqIEBuYW1lIGNvbnN0cnVjdEZyb21cbiAqIEBjYXRlZ29yeSBHZW5lcmljIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnN0cnVjdHMgYSBkYXRlIHVzaW5nIHRoZSByZWZlcmVuY2UgZGF0ZSBhbmQgdGhlIHZhbHVlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGUgZnVuY3Rpb24gY29uc3RydWN0cyBhIG5ldyBkYXRlIHVzaW5nIHRoZSBjb25zdHJ1Y3RvciBmcm9tIHRoZSByZWZlcmVuY2VcbiAqIGRhdGUgYW5kIHRoZSBnaXZlbiB2YWx1ZS4gSXQgaGVscHMgdG8gYnVpbGQgZ2VuZXJpYyBmdW5jdGlvbnMgdGhhdCBhY2NlcHRcbiAqIGRhdGUgZXh0ZW5zaW9ucy5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSByZWZlcmVuY2UgZGF0ZSB0byB0YWtlIGNvbnN0cnVjdG9yIGZyb21cbiAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjcmVhdGUgdGhlIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBEYXRlIGluaXRpYWxpemVkIHVzaW5nIHRoZSBnaXZlbiBkYXRlIGFuZCB2YWx1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSAnZGF0ZS1mbnMnXG4gKlxuICogLy8gQSBmdW5jdGlvbiB0aGF0IGNsb25lcyBhIGRhdGUgcHJlc2VydmluZyB0aGUgb3JpZ2luYWwgdHlwZVxuICogZnVuY3Rpb24gY2xvbmVEYXRlPERhdGVUeXBlIGV4dGVuZHMgRGF0ZShkYXRlOiBEYXRlVHlwZSk6IERhdGVUeXBlIHtcbiAqICAgcmV0dXJuIGNvbnN0cnVjdEZyb20oXG4gKiAgICAgZGF0ZSwgLy8gVXNlIGNvbnRydXN0b3IgZnJvbSB0aGUgZ2l2ZW4gZGF0ZVxuICogICAgIGRhdGUuZ2V0VGltZSgpIC8vIFVzZSB0aGUgZGF0ZSB2YWx1ZSB0byBjcmVhdGUgYSBuZXcgZGF0ZVxuICogICApXG4gKiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RGcm9tKGRhdGUsIHZhbHVlKSB7XG4gIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBuZXcgZGF0ZS5jb25zdHJ1Y3Rvcih2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcbiAgfVxufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGNvbnN0cnVjdEZyb207XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBhZGREYXlzXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkYXlzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRheXMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0gYW1vdW50IC0gVGhlIGFtb3VudCBvZiBkYXlzIHRvIGJlIGFkZGVkLiBQb3NpdGl2ZSBkZWNpbWFscyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguZmxvb3JgLCBkZWNpbWFscyBsZXNzIHRoYW4gemVybyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguY2VpbGAuXG4gKlxuICogQHJldHVybnMgVGhlIG5ldyBkYXRlIHdpdGggdGhlIGRheXMgYWRkZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQWRkIDEwIGRheXMgdG8gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIGNvbnN0IHJlc3VsdCA9IGFkZERheXMobmV3IERhdGUoMjAxNCwgOCwgMSksIDEwKVxuICogLy89PiBUaHUgU2VwIDExIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZERheXMoZGF0ZSwgYW1vdW50KSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBpZiAoaXNOYU4oYW1vdW50KSkgcmV0dXJuIGNvbnN0cnVjdEZyb20oZGF0ZSwgTmFOKTtcbiAgaWYgKCFhbW91bnQpIHtcbiAgICAvLyBJZiAwIGRheXMsIG5vLW9wIHRvIGF2b2lkIGNoYW5naW5nIHRpbWVzIGluIHRoZSBob3VyIGJlZm9yZSBlbmQgb2YgRFNUXG4gICAgcmV0dXJuIF9kYXRlO1xuICB9XG4gIF9kYXRlLnNldERhdGUoX2RhdGUuZ2V0RGF0ZSgpICsgYW1vdW50KTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGFkZERheXM7XG4iLCJpbXBvcnQgeyBpc0RhdGUgfSBmcm9tIFwiLi9pc0RhdGUubWpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgaXNWYWxpZFxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB2YWxpZD9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybnMgZmFsc2UgaWYgYXJndW1lbnQgaXMgSW52YWxpZCBEYXRlIGFuZCB0cnVlIG90aGVyd2lzZS5cbiAqIEFyZ3VtZW50IGlzIGNvbnZlcnRlZCB0byBEYXRlIHVzaW5nIGB0b0RhdGVgLiBTZWUgW3RvRGF0ZV0oaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy90b0RhdGUpXG4gKiBJbnZhbGlkIERhdGUgaXMgYSBEYXRlLCB3aG9zZSB0aW1lIHZhbHVlIGlzIE5hTi5cbiAqXG4gKiBUaW1lIHZhbHVlIG9mIERhdGU6IGh0dHA6Ly9lczUuZ2l0aHViLmlvLyN4MTUuOS4xLjFcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBkYXRlIHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMgVGhlIGRhdGUgaXMgdmFsaWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSB2YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNWYWxpZChuZXcgRGF0ZSgyMDE0LCAxLCAzMSkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSB2YWx1ZSwgY29udmVydGFibGUgaW50byBhIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKDEzOTM4MDQ4MDAwMDApXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIHRoZSBpbnZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKCcnKSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWQoZGF0ZSkge1xuICBpZiAoIWlzRGF0ZShkYXRlKSAmJiB0eXBlb2YgZGF0ZSAhPT0gXCJudW1iZXJcIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgcmV0dXJuICFpc05hTihOdW1iZXIoX2RhdGUpKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBpc1ZhbGlkO1xuIiwiLyoqXG4gKiBAbmFtZSBpc0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIHZhbHVlIGEgZGF0ZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZS4gVGhlIGZ1bmN0aW9uIHdvcmtzIGZvciBkYXRlcyB0cmFuc2ZlcnJlZCBhY3Jvc3MgaWZyYW1lcy5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhIGRhdGVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGEgdmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZShuZXcgRGF0ZSgpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhbiBpbnZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUobmV3IERhdGUoTmFOKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3Igc29tZSB2YWx1ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZSgnMjAxNC0wMi0zMScpXG4gKiAvLz0+IGZhbHNlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBhbiBvYmplY3Q6XG4gKiBjb25zdCByZXN1bHQgPSBpc0RhdGUoe30pXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgfHxcbiAgICAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSBcIltvYmplY3QgRGF0ZV1cIilcbiAgKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBpc0RhdGU7XG4iLCJjb25zdCBmb3JtYXREaXN0YW5jZUxvY2FsZSA9IHtcbiAgbGVzc1RoYW5YU2Vjb25kczoge1xuICAgIG9uZTogXCJsZXNzIHRoYW4gYSBzZWNvbmRcIixcbiAgICBvdGhlcjogXCJsZXNzIHRoYW4ge3tjb3VudH19IHNlY29uZHNcIixcbiAgfSxcblxuICB4U2Vjb25kczoge1xuICAgIG9uZTogXCIxIHNlY29uZFwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSBzZWNvbmRzXCIsXG4gIH0sXG5cbiAgaGFsZkFNaW51dGU6IFwiaGFsZiBhIG1pbnV0ZVwiLFxuXG4gIGxlc3NUaGFuWE1pbnV0ZXM6IHtcbiAgICBvbmU6IFwibGVzcyB0aGFuIGEgbWludXRlXCIsXG4gICAgb3RoZXI6IFwibGVzcyB0aGFuIHt7Y291bnR9fSBtaW51dGVzXCIsXG4gIH0sXG5cbiAgeE1pbnV0ZXM6IHtcbiAgICBvbmU6IFwiMSBtaW51dGVcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gbWludXRlc1wiLFxuICB9LFxuXG4gIGFib3V0WEhvdXJzOiB7XG4gICAgb25lOiBcImFib3V0IDEgaG91clwiLFxuICAgIG90aGVyOiBcImFib3V0IHt7Y291bnR9fSBob3Vyc1wiLFxuICB9LFxuXG4gIHhIb3Vyczoge1xuICAgIG9uZTogXCIxIGhvdXJcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gaG91cnNcIixcbiAgfSxcblxuICB4RGF5czoge1xuICAgIG9uZTogXCIxIGRheVwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSBkYXlzXCIsXG4gIH0sXG5cbiAgYWJvdXRYV2Vla3M6IHtcbiAgICBvbmU6IFwiYWJvdXQgMSB3ZWVrXCIsXG4gICAgb3RoZXI6IFwiYWJvdXQge3tjb3VudH19IHdlZWtzXCIsXG4gIH0sXG5cbiAgeFdlZWtzOiB7XG4gICAgb25lOiBcIjEgd2Vla1wiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSB3ZWVrc1wiLFxuICB9LFxuXG4gIGFib3V0WE1vbnRoczoge1xuICAgIG9uZTogXCJhYm91dCAxIG1vbnRoXCIsXG4gICAgb3RoZXI6IFwiYWJvdXQge3tjb3VudH19IG1vbnRoc1wiLFxuICB9LFxuXG4gIHhNb250aHM6IHtcbiAgICBvbmU6IFwiMSBtb250aFwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSBtb250aHNcIixcbiAgfSxcblxuICBhYm91dFhZZWFyczoge1xuICAgIG9uZTogXCJhYm91dCAxIHllYXJcIixcbiAgICBvdGhlcjogXCJhYm91dCB7e2NvdW50fX0geWVhcnNcIixcbiAgfSxcblxuICB4WWVhcnM6IHtcbiAgICBvbmU6IFwiMSB5ZWFyXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IHllYXJzXCIsXG4gIH0sXG5cbiAgb3ZlclhZZWFyczoge1xuICAgIG9uZTogXCJvdmVyIDEgeWVhclwiLFxuICAgIG90aGVyOiBcIm92ZXIge3tjb3VudH19IHllYXJzXCIsXG4gIH0sXG5cbiAgYWxtb3N0WFllYXJzOiB7XG4gICAgb25lOiBcImFsbW9zdCAxIHllYXJcIixcbiAgICBvdGhlcjogXCJhbG1vc3Qge3tjb3VudH19IHllYXJzXCIsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0RGlzdGFuY2UgPSAodG9rZW4sIGNvdW50LCBvcHRpb25zKSA9PiB7XG4gIGxldCByZXN1bHQ7XG5cbiAgY29uc3QgdG9rZW5WYWx1ZSA9IGZvcm1hdERpc3RhbmNlTG9jYWxlW3Rva2VuXTtcbiAgaWYgKHR5cGVvZiB0b2tlblZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmVzdWx0ID0gdG9rZW5WYWx1ZTtcbiAgfSBlbHNlIGlmIChjb3VudCA9PT0gMSkge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub25lO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub3RoZXIucmVwbGFjZShcInt7Y291bnR9fVwiLCBjb3VudC50b1N0cmluZygpKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zPy5hZGRTdWZmaXgpIHtcbiAgICBpZiAob3B0aW9ucy5jb21wYXJpc29uICYmIG9wdGlvbnMuY29tcGFyaXNvbiA+IDApIHtcbiAgICAgIHJldHVybiBcImluIFwiICsgcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0ICsgXCIgYWdvXCI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJleHBvcnQgZnVuY3Rpb24gYnVpbGRGb3JtYXRMb25nRm4oYXJncykge1xuICByZXR1cm4gKG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIC8vIFRPRE86IFJlbW92ZSBTdHJpbmcoKVxuICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgIGNvbnN0IGZvcm1hdCA9IGFyZ3MuZm9ybWF0c1t3aWR0aF0gfHwgYXJncy5mb3JtYXRzW2FyZ3MuZGVmYXVsdFdpZHRoXTtcbiAgICByZXR1cm4gZm9ybWF0O1xuICB9O1xufVxuIiwiaW1wb3J0IHsgYnVpbGRGb3JtYXRMb25nRm4gfSBmcm9tIFwiLi4vLi4vX2xpYi9idWlsZEZvcm1hdExvbmdGbi5tanNcIjtcblxuY29uc3QgZGF0ZUZvcm1hdHMgPSB7XG4gIGZ1bGw6IFwiRUVFRSwgTU1NTSBkbywgeVwiLFxuICBsb25nOiBcIk1NTU0gZG8sIHlcIixcbiAgbWVkaXVtOiBcIk1NTSBkLCB5XCIsXG4gIHNob3J0OiBcIk1NL2RkL3l5eXlcIixcbn07XG5cbmNvbnN0IHRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiBcImg6bW06c3MgYSB6enp6XCIsXG4gIGxvbmc6IFwiaDptbTpzcyBhIHpcIixcbiAgbWVkaXVtOiBcImg6bW06c3MgYVwiLFxuICBzaG9ydDogXCJoOm1tIGFcIixcbn07XG5cbmNvbnN0IGRhdGVUaW1lRm9ybWF0cyA9IHtcbiAgZnVsbDogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIGxvbmc6IFwie3tkYXRlfX0gJ2F0JyB7e3RpbWV9fVwiLFxuICBtZWRpdW06IFwie3tkYXRlfX0sIHt7dGltZX19XCIsXG4gIHNob3J0OiBcInt7ZGF0ZX19LCB7e3RpbWV9fVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdExvbmcgPSB7XG4gIGRhdGU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6IFwiZnVsbFwiLFxuICB9KSxcblxuICB0aW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogdGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImZ1bGxcIixcbiAgfSksXG5cbiAgZGF0ZVRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlVGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImZ1bGxcIixcbiAgfSksXG59O1xuIiwiY29uc3QgZm9ybWF0UmVsYXRpdmVMb2NhbGUgPSB7XG4gIGxhc3RXZWVrOiBcIidsYXN0JyBlZWVlICdhdCcgcFwiLFxuICB5ZXN0ZXJkYXk6IFwiJ3llc3RlcmRheSBhdCcgcFwiLFxuICB0b2RheTogXCIndG9kYXkgYXQnIHBcIixcbiAgdG9tb3Jyb3c6IFwiJ3RvbW9ycm93IGF0JyBwXCIsXG4gIG5leHRXZWVrOiBcImVlZWUgJ2F0JyBwXCIsXG4gIG90aGVyOiBcIlBcIixcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRSZWxhdGl2ZSA9ICh0b2tlbiwgX2RhdGUsIF9iYXNlRGF0ZSwgX29wdGlvbnMpID0+XG4gIGZvcm1hdFJlbGF0aXZlTG9jYWxlW3Rva2VuXTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICogVGhlIGxvY2FsaXplIGZ1bmN0aW9uIGFyZ3VtZW50IGNhbGxiYWNrIHdoaWNoIGFsbG93cyB0byBjb252ZXJ0IHJhdyB2YWx1ZSB0b1xuICogdGhlIGFjdHVhbCB0eXBlLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKlxuICogQHJldHVybnMgVGhlIGNvbnZlcnRlZCB2YWx1ZVxuICovXG5cbi8qKlxuICogVGhlIG1hcCBvZiBsb2NhbGl6ZWQgdmFsdWVzIGZvciBlYWNoIHdpZHRoLlxuICovXG5cbi8qKlxuICogVGhlIGluZGV4IHR5cGUgb2YgdGhlIGxvY2FsZSB1bml0IHZhbHVlLiBJdCB0eXBlcyBjb252ZXJzaW9uIG9mIHVuaXRzIG9mXG4gKiB2YWx1ZXMgdGhhdCBkb24ndCBzdGFydCBhdCAwIChpLmUuIHF1YXJ0ZXJzKS5cbiAqL1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSB1bml0IHZhbHVlIHRvIHRoZSB0dXBsZSBvZiB2YWx1ZXMuXG4gKi9cblxuLyoqXG4gKiBUaGUgdHVwbGUgb2YgbG9jYWxpemVkIGVyYSB2YWx1ZXMuIFRoZSBmaXJzdCBlbGVtZW50IHJlcHJlc2VudHMgQkMsXG4gKiB0aGUgc2Vjb25kIGVsZW1lbnQgcmVwcmVzZW50cyBBRC5cbiAqL1xuXG4vKipcbiAqIFRoZSB0dXBsZSBvZiBsb2NhbGl6ZWQgcXVhcnRlciB2YWx1ZXMuIFRoZSBmaXJzdCBlbGVtZW50IHJlcHJlc2VudHMgUTEuXG4gKi9cblxuLyoqXG4gKiBUaGUgdHVwbGUgb2YgbG9jYWxpemVkIGRheSB2YWx1ZXMuIFRoZSBmaXJzdCBlbGVtZW50IHJlcHJlc2VudHMgU3VuZGF5LlxuICovXG5cbi8qKlxuICogVGhlIHR1cGxlIG9mIGxvY2FsaXplZCBtb250aCB2YWx1ZXMuIFRoZSBmaXJzdCBlbGVtZW50IHJlcHJlc2VudHMgSmFudWFyeS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRMb2NhbGl6ZUZuKGFyZ3MpIHtcbiAgcmV0dXJuICh2YWx1ZSwgb3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSBvcHRpb25zPy5jb250ZXh0ID8gU3RyaW5nKG9wdGlvbnMuY29udGV4dCkgOiBcInN0YW5kYWxvbmVcIjtcblxuICAgIGxldCB2YWx1ZXNBcnJheTtcbiAgICBpZiAoY29udGV4dCA9PT0gXCJmb3JtYXR0aW5nXCIgJiYgYXJncy5mb3JtYXR0aW5nVmFsdWVzKSB7XG4gICAgICBjb25zdCBkZWZhdWx0V2lkdGggPSBhcmdzLmRlZmF1bHRGb3JtYXR0aW5nV2lkdGggfHwgYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnM/LndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogZGVmYXVsdFdpZHRoO1xuXG4gICAgICB2YWx1ZXNBcnJheSA9XG4gICAgICAgIGFyZ3MuZm9ybWF0dGluZ1ZhbHVlc1t3aWR0aF0gfHwgYXJncy5mb3JtYXR0aW5nVmFsdWVzW2RlZmF1bHRXaWR0aF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRlZmF1bHRXaWR0aCA9IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgICAgY29uc3Qgd2lkdGggPSBvcHRpb25zPy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGFyZ3MuZGVmYXVsdFdpZHRoO1xuXG4gICAgICB2YWx1ZXNBcnJheSA9IGFyZ3MudmFsdWVzW3dpZHRoXSB8fCBhcmdzLnZhbHVlc1tkZWZhdWx0V2lkdGhdO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IGFyZ3MuYXJndW1lbnRDYWxsYmFjayA/IGFyZ3MuYXJndW1lbnRDYWxsYmFjayh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBGb3Igc29tZSByZWFzb24gVHlwZVNjcmlwdCBqdXN0IGRvbid0IHdhbnQgdG8gbWF0Y2ggaXQsIG5vIG1hdHRlciBob3cgaGFyZCB3ZSB0cnkuIEkgY2hhbGxlbmdlIHlvdSB0byB0cnkgdG8gcmVtb3ZlIGl0IVxuICAgIHJldHVybiB2YWx1ZXNBcnJheVtpbmRleF07XG4gIH07XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gYnVpbGRNYXRjaEZuKGFyZ3MpIHtcbiAgcmV0dXJuIChzdHJpbmcsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aDtcblxuICAgIGNvbnN0IG1hdGNoUGF0dGVybiA9XG4gICAgICAod2lkdGggJiYgYXJncy5tYXRjaFBhdHRlcm5zW3dpZHRoXSkgfHxcbiAgICAgIGFyZ3MubWF0Y2hQYXR0ZXJuc1thcmdzLmRlZmF1bHRNYXRjaFdpZHRoXTtcbiAgICBjb25zdCBtYXRjaFJlc3VsdCA9IHN0cmluZy5tYXRjaChtYXRjaFBhdHRlcm4pO1xuXG4gICAgaWYgKCFtYXRjaFJlc3VsdCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IG1hdGNoZWRTdHJpbmcgPSBtYXRjaFJlc3VsdFswXTtcblxuICAgIGNvbnN0IHBhcnNlUGF0dGVybnMgPVxuICAgICAgKHdpZHRoICYmIGFyZ3MucGFyc2VQYXR0ZXJuc1t3aWR0aF0pIHx8XG4gICAgICBhcmdzLnBhcnNlUGF0dGVybnNbYXJncy5kZWZhdWx0UGFyc2VXaWR0aF07XG5cbiAgICBjb25zdCBrZXkgPSBBcnJheS5pc0FycmF5KHBhcnNlUGF0dGVybnMpXG4gICAgICA/IGZpbmRJbmRleChwYXJzZVBhdHRlcm5zLCAocGF0dGVybikgPT4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpKVxuICAgICAgOiAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAtLSBJIGNoYWxsYW5nZSB5b3UgdG8gZml4IHRoZSB0eXBlXG4gICAgICAgIGZpbmRLZXkocGFyc2VQYXR0ZXJucywgKHBhdHRlcm4pID0+IHBhdHRlcm4udGVzdChtYXRjaGVkU3RyaW5nKSk7XG5cbiAgICBsZXQgdmFsdWU7XG5cbiAgICB2YWx1ZSA9IGFyZ3MudmFsdWVDYWxsYmFjayA/IGFyZ3MudmFsdWVDYWxsYmFjayhrZXkpIDoga2V5O1xuICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZUNhbGxiYWNrXG4gICAgICA/IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55IC0tIEkgY2hhbGxhbmdlIHlvdSB0byBmaXggdGhlIHR5cGVcbiAgICAgICAgb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKVxuICAgICAgOiB2YWx1ZTtcblxuICAgIGNvbnN0IHJlc3QgPSBzdHJpbmcuc2xpY2UobWF0Y2hlZFN0cmluZy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHsgdmFsdWUsIHJlc3QgfTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmplY3QsIHByZWRpY2F0ZSkge1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoXG4gICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmXG4gICAgICBwcmVkaWNhdGUob2JqZWN0W2tleV0pXG4gICAgKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSkge1xuICBmb3IgKGxldCBrZXkgPSAwOyBrZXkgPCBhcnJheS5sZW5ndGg7IGtleSsrKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtrZXldKSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBidWlsZE1hdGNoUGF0dGVybkZuKGFyZ3MpIHtcbiAgcmV0dXJuIChzdHJpbmcsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG1hdGNoUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MubWF0Y2hQYXR0ZXJuKTtcbiAgICBpZiAoIW1hdGNoUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBtYXRjaGVkU3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG5cbiAgICBjb25zdCBwYXJzZVJlc3VsdCA9IHN0cmluZy5tYXRjaChhcmdzLnBhcnNlUGF0dGVybik7XG4gICAgaWYgKCFwYXJzZVJlc3VsdCkgcmV0dXJuIG51bGw7XG4gICAgbGV0IHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrXG4gICAgICA/IGFyZ3MudmFsdWVDYWxsYmFjayhwYXJzZVJlc3VsdFswXSlcbiAgICAgIDogcGFyc2VSZXN1bHRbMF07XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAtLSBJIGNoYWxsYW5nZSB5b3UgdG8gZml4IHRoZSB0eXBlXG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2sgPyBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpIDogdmFsdWU7XG5cbiAgICBjb25zdCByZXN0ID0gc3RyaW5nLnNsaWNlKG1hdGNoZWRTdHJpbmcubGVuZ3RoKTtcblxuICAgIHJldHVybiB7IHZhbHVlLCByZXN0IH07XG4gIH07XG59XG4iLCJpbXBvcnQgeyBmb3JtYXREaXN0YW5jZSB9IGZyb20gXCIuL2VuLVVTL19saWIvZm9ybWF0RGlzdGFuY2UubWpzXCI7XG5pbXBvcnQgeyBmb3JtYXRMb25nIH0gZnJvbSBcIi4vZW4tVVMvX2xpYi9mb3JtYXRMb25nLm1qc1wiO1xuaW1wb3J0IHsgZm9ybWF0UmVsYXRpdmUgfSBmcm9tIFwiLi9lbi1VUy9fbGliL2Zvcm1hdFJlbGF0aXZlLm1qc1wiO1xuaW1wb3J0IHsgbG9jYWxpemUgfSBmcm9tIFwiLi9lbi1VUy9fbGliL2xvY2FsaXplLm1qc1wiO1xuaW1wb3J0IHsgbWF0Y2ggfSBmcm9tIFwiLi9lbi1VUy9fbGliL21hdGNoLm1qc1wiO1xuXG4vKipcbiAqIEBjYXRlZ29yeSBMb2NhbGVzXG4gKiBAc3VtbWFyeSBFbmdsaXNoIGxvY2FsZSAoVW5pdGVkIFN0YXRlcykuXG4gKiBAbGFuZ3VhZ2UgRW5nbGlzaFxuICogQGlzby02MzktMiBlbmdcbiAqIEBhdXRob3IgU2FzaGEgS29zcyBbQGtvc3Nub2NvcnBdKGh0dHBzOi8vZ2l0aHViLmNvbS9rb3Nzbm9jb3JwKVxuICogQGF1dGhvciBMZXNoYSBLb3NzIFtAbGVzaGFrb3NzXShodHRwczovL2dpdGh1Yi5jb20vbGVzaGFrb3NzKVxuICovXG5leHBvcnQgY29uc3QgZW5VUyA9IHtcbiAgY29kZTogXCJlbi1VU1wiLFxuICBmb3JtYXREaXN0YW5jZTogZm9ybWF0RGlzdGFuY2UsXG4gIGZvcm1hdExvbmc6IGZvcm1hdExvbmcsXG4gIGZvcm1hdFJlbGF0aXZlOiBmb3JtYXRSZWxhdGl2ZSxcbiAgbG9jYWxpemU6IGxvY2FsaXplLFxuICBtYXRjaDogbWF0Y2gsXG4gIG9wdGlvbnM6IHtcbiAgICB3ZWVrU3RhcnRzT246IDAgLyogU3VuZGF5ICovLFxuICAgIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogMSxcbiAgfSxcbn07XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZW5VUztcbiIsImltcG9ydCB7IGJ1aWxkTG9jYWxpemVGbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkTG9jYWxpemVGbi5tanNcIjtcblxuY29uc3QgZXJhVmFsdWVzID0ge1xuICBuYXJyb3c6IFtcIkJcIiwgXCJBXCJdLFxuICBhYmJyZXZpYXRlZDogW1wiQkNcIiwgXCJBRFwiXSxcbiAgd2lkZTogW1wiQmVmb3JlIENocmlzdFwiLCBcIkFubm8gRG9taW5pXCJdLFxufTtcblxuY29uc3QgcXVhcnRlclZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCIxXCIsIFwiMlwiLCBcIjNcIiwgXCI0XCJdLFxuICBhYmJyZXZpYXRlZDogW1wiUTFcIiwgXCJRMlwiLCBcIlEzXCIsIFwiUTRcIl0sXG4gIHdpZGU6IFtcIjFzdCBxdWFydGVyXCIsIFwiMm5kIHF1YXJ0ZXJcIiwgXCIzcmQgcXVhcnRlclwiLCBcIjR0aCBxdWFydGVyXCJdLFxufTtcblxuLy8gTm90ZTogaW4gRW5nbGlzaCwgdGhlIG5hbWVzIG9mIGRheXMgb2YgdGhlIHdlZWsgYW5kIG1vbnRocyBhcmUgY2FwaXRhbGl6ZWQuXG4vLyBJZiB5b3UgYXJlIG1ha2luZyBhIG5ldyBsb2NhbGUgYmFzZWQgb24gdGhpcyBvbmUsIGNoZWNrIGlmIHRoZSBzYW1lIGlzIHRydWUgZm9yIHRoZSBsYW5ndWFnZSB5b3UncmUgd29ya2luZyBvbi5cbi8vIEdlbmVyYWxseSwgZm9ybWF0dGVkIGRhdGVzIHNob3VsZCBsb29rIGxpa2UgdGhleSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIHNlbnRlbmNlLFxuLy8gZS5nLiBpbiBTcGFuaXNoIGxhbmd1YWdlIHRoZSB3ZWVrZGF5cyBhbmQgbW9udGhzIHNob3VsZCBiZSBpbiB0aGUgbG93ZXJjYXNlLlxuY29uc3QgbW9udGhWYWx1ZXMgPSB7XG4gIG5hcnJvdzogW1wiSlwiLCBcIkZcIiwgXCJNXCIsIFwiQVwiLCBcIk1cIiwgXCJKXCIsIFwiSlwiLCBcIkFcIiwgXCJTXCIsIFwiT1wiLCBcIk5cIiwgXCJEXCJdLFxuICBhYmJyZXZpYXRlZDogW1xuICAgIFwiSmFuXCIsXG4gICAgXCJGZWJcIixcbiAgICBcIk1hclwiLFxuICAgIFwiQXByXCIsXG4gICAgXCJNYXlcIixcbiAgICBcIkp1blwiLFxuICAgIFwiSnVsXCIsXG4gICAgXCJBdWdcIixcbiAgICBcIlNlcFwiLFxuICAgIFwiT2N0XCIsXG4gICAgXCJOb3ZcIixcbiAgICBcIkRlY1wiLFxuICBdLFxuXG4gIHdpZGU6IFtcbiAgICBcIkphbnVhcnlcIixcbiAgICBcIkZlYnJ1YXJ5XCIsXG4gICAgXCJNYXJjaFwiLFxuICAgIFwiQXByaWxcIixcbiAgICBcIk1heVwiLFxuICAgIFwiSnVuZVwiLFxuICAgIFwiSnVseVwiLFxuICAgIFwiQXVndXN0XCIsXG4gICAgXCJTZXB0ZW1iZXJcIixcbiAgICBcIk9jdG9iZXJcIixcbiAgICBcIk5vdmVtYmVyXCIsXG4gICAgXCJEZWNlbWJlclwiLFxuICBdLFxufTtcblxuY29uc3QgZGF5VmFsdWVzID0ge1xuICBuYXJyb3c6IFtcIlNcIiwgXCJNXCIsIFwiVFwiLCBcIldcIiwgXCJUXCIsIFwiRlwiLCBcIlNcIl0sXG4gIHNob3J0OiBbXCJTdVwiLCBcIk1vXCIsIFwiVHVcIiwgXCJXZVwiLCBcIlRoXCIsIFwiRnJcIiwgXCJTYVwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgd2lkZTogW1xuICAgIFwiU3VuZGF5XCIsXG4gICAgXCJNb25kYXlcIixcbiAgICBcIlR1ZXNkYXlcIixcbiAgICBcIldlZG5lc2RheVwiLFxuICAgIFwiVGh1cnNkYXlcIixcbiAgICBcIkZyaWRheVwiLFxuICAgIFwiU2F0dXJkYXlcIixcbiAgXSxcbn07XG5cbmNvbnN0IGRheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06IFwiYVwiLFxuICAgIHBtOiBcInBcIixcbiAgICBtaWRuaWdodDogXCJtaVwiLFxuICAgIG5vb246IFwiblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiBcIkFNXCIsXG4gICAgcG06IFwiUE1cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxuICB3aWRlOiB7XG4gICAgYW06IFwiYS5tLlwiLFxuICAgIHBtOiBcInAubS5cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxufTtcblxuY29uc3QgZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06IFwiYVwiLFxuICAgIHBtOiBcInBcIixcbiAgICBtaWRuaWdodDogXCJtaVwiLFxuICAgIG5vb246IFwiblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiBcIkFNXCIsXG4gICAgcG06IFwiUE1cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxuICB3aWRlOiB7XG4gICAgYW06IFwiYS5tLlwiLFxuICAgIHBtOiBcInAubS5cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxufTtcblxuY29uc3Qgb3JkaW5hbE51bWJlciA9IChkaXJ0eU51bWJlciwgX29wdGlvbnMpID0+IHtcbiAgY29uc3QgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcblxuICAvLyBJZiBvcmRpbmFsIG51bWJlcnMgZGVwZW5kIG9uIGNvbnRleHQsIGZvciBleGFtcGxlLFxuICAvLyBpZiB0aGV5IGFyZSBkaWZmZXJlbnQgZm9yIGRpZmZlcmVudCBncmFtbWF0aWNhbCBnZW5kZXJzLFxuICAvLyB1c2UgYG9wdGlvbnMudW5pdGAuXG4gIC8vXG4gIC8vIGB1bml0YCBjYW4gYmUgJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICd3ZWVrJywgJ2RhdGUnLCAnZGF5T2ZZZWFyJyxcbiAgLy8gJ2RheScsICdob3VyJywgJ21pbnV0ZScsICdzZWNvbmQnLlxuXG4gIGNvbnN0IHJlbTEwMCA9IG51bWJlciAlIDEwMDtcbiAgaWYgKHJlbTEwMCA+IDIwIHx8IHJlbTEwMCA8IDEwKSB7XG4gICAgc3dpdGNoIChyZW0xMDAgJSAxMCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJzdFwiO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJuZFwiO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJyZFwiO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVtYmVyICsgXCJ0aFwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvY2FsaXplID0ge1xuICBvcmRpbmFsTnVtYmVyLFxuXG4gIGVyYTogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGVyYVZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICB9KSxcblxuICBxdWFydGVyOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogcXVhcnRlclZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICAgIGFyZ3VtZW50Q2FsbGJhY2s6IChxdWFydGVyKSA9PiBxdWFydGVyIC0gMSxcbiAgfSksXG5cbiAgbW9udGg6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBtb250aFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICB9KSxcblxuICBkYXk6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgfSksXG5cbiAgZGF5UGVyaW9kOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJ3aWRlXCIsXG4gICAgZm9ybWF0dGluZ1ZhbHVlczogZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0Rm9ybWF0dGluZ1dpZHRoOiBcIndpZGVcIixcbiAgfSksXG59O1xuIiwiaW1wb3J0IHsgYnVpbGRNYXRjaEZuIH0gZnJvbSBcIi4uLy4uL19saWIvYnVpbGRNYXRjaEZuLm1qc1wiO1xuaW1wb3J0IHsgYnVpbGRNYXRjaFBhdHRlcm5GbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4ubWpzXCI7XG5cbmNvbnN0IG1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4gPSAvXihcXGQrKSh0aHxzdHxuZHxyZCk/L2k7XG5jb25zdCBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL1xcZCsvaTtcblxuY29uc3QgbWF0Y2hFcmFQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihifGEpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihiXFwuP1xccz9jXFwuP3xiXFwuP1xccz9jXFwuP1xccz9lXFwuP3xhXFwuP1xccz9kXFwuP3xjXFwuP1xccz9lXFwuPykvaSxcbiAgd2lkZTogL14oYmVmb3JlIGNocmlzdHxiZWZvcmUgY29tbW9uIGVyYXxhbm5vIGRvbWluaXxjb21tb24gZXJhKS9pLFxufTtcbmNvbnN0IHBhcnNlRXJhUGF0dGVybnMgPSB7XG4gIGFueTogWy9eYi9pLCAvXihhfGMpL2ldLFxufTtcblxuY29uc3QgbWF0Y2hRdWFydGVyUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bMTIzNF0vaSxcbiAgYWJicmV2aWF0ZWQ6IC9ecVsxMjM0XS9pLFxuICB3aWRlOiAvXlsxMjM0XSh0aHxzdHxuZHxyZCk/IHF1YXJ0ZXIvaSxcbn07XG5jb25zdCBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgYW55OiBbLzEvaSwgLzIvaSwgLzMvaSwgLzQvaV0sXG59O1xuXG5jb25zdCBtYXRjaE1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bamZtYXNvbmRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXihqYW58ZmVifG1hcnxhcHJ8bWF5fGp1bnxqdWx8YXVnfHNlcHxvY3R8bm92fGRlYykvaSxcbiAgd2lkZTogL14oamFudWFyeXxmZWJydWFyeXxtYXJjaHxhcHJpbHxtYXl8anVuZXxqdWx5fGF1Z3VzdHxzZXB0ZW1iZXJ8b2N0b2Jlcnxub3ZlbWJlcnxkZWNlbWJlcikvaSxcbn07XG5jb25zdCBwYXJzZU1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogW1xuICAgIC9eai9pLFxuICAgIC9eZi9pLFxuICAgIC9ebS9pLFxuICAgIC9eYS9pLFxuICAgIC9ebS9pLFxuICAgIC9eai9pLFxuICAgIC9eai9pLFxuICAgIC9eYS9pLFxuICAgIC9ecy9pLFxuICAgIC9eby9pLFxuICAgIC9ebi9pLFxuICAgIC9eZC9pLFxuICBdLFxuXG4gIGFueTogW1xuICAgIC9eamEvaSxcbiAgICAvXmYvaSxcbiAgICAvXm1hci9pLFxuICAgIC9eYXAvaSxcbiAgICAvXm1heS9pLFxuICAgIC9eanVuL2ksXG4gICAgL15qdWwvaSxcbiAgICAvXmF1L2ksXG4gICAgL15zL2ksXG4gICAgL15vL2ksXG4gICAgL15uL2ksXG4gICAgL15kL2ksXG4gIF0sXG59O1xuXG5jb25zdCBtYXRjaERheVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW3NtdHdmXS9pLFxuICBzaG9ydDogL14oc3V8bW98dHV8d2V8dGh8ZnJ8c2EpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihzdW58bW9ufHR1ZXx3ZWR8dGh1fGZyaXxzYXQpL2ksXG4gIHdpZGU6IC9eKHN1bmRheXxtb25kYXl8dHVlc2RheXx3ZWRuZXNkYXl8dGh1cnNkYXl8ZnJpZGF5fHNhdHVyZGF5KS9pLFxufTtcbmNvbnN0IHBhcnNlRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogWy9ecy9pLCAvXm0vaSwgL150L2ksIC9edy9pLCAvXnQvaSwgL15mL2ksIC9ecy9pXSxcbiAgYW55OiBbL15zdS9pLCAvXm0vaSwgL150dS9pLCAvXncvaSwgL150aC9pLCAvXmYvaSwgL15zYS9pXSxcbn07XG5cbmNvbnN0IG1hdGNoRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYXxwfG1pfG58KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pLFxuICBhbnk6IC9eKFthcF1cXC4/XFxzP21cXC4/fG1pZG5pZ2h0fG5vb258KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pLFxufTtcbmNvbnN0IHBhcnNlRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIGFueToge1xuICAgIGFtOiAvXmEvaSxcbiAgICBwbTogL15wL2ksXG4gICAgbWlkbmlnaHQ6IC9ebWkvaSxcbiAgICBub29uOiAvXm5vL2ksXG4gICAgbW9ybmluZzogL21vcm5pbmcvaSxcbiAgICBhZnRlcm5vb246IC9hZnRlcm5vb24vaSxcbiAgICBldmVuaW5nOiAvZXZlbmluZy9pLFxuICAgIG5pZ2h0OiAvbmlnaHQvaSxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBtYXRjaCA9IHtcbiAgb3JkaW5hbE51bWJlcjogYnVpbGRNYXRjaFBhdHRlcm5Gbih7XG4gICAgbWF0Y2hQYXR0ZXJuOiBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHBhcnNlUGF0dGVybjogcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICB2YWx1ZUNhbGxiYWNrOiAodmFsdWUpID0+IHBhcnNlSW50KHZhbHVlLCAxMCksXG4gIH0pLFxuXG4gIGVyYTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaEVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZUVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcblxuICBxdWFydGVyOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoUXVhcnRlclBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgICB2YWx1ZUNhbGxiYWNrOiAoaW5kZXgpID0+IGluZGV4ICsgMSxcbiAgfSksXG5cbiAgbW9udGg6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hNb250aFBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZU1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gIH0pLFxuXG4gIGRheTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcblxuICBkYXlQZXJpb2Q6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJhbnlcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcbn07XG4iLCJsZXQgZGVmYXVsdE9wdGlvbnMgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRPcHRpb25zKCkge1xuICByZXR1cm4gZGVmYXVsdE9wdGlvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0T3B0aW9ucyhuZXdPcHRpb25zKSB7XG4gIGRlZmF1bHRPcHRpb25zID0gbmV3T3B0aW9ucztcbn1cbiIsIi8qKlxuICogQG1vZHVsZSBjb25zdGFudHNcbiAqIEBzdW1tYXJ5IFVzZWZ1bCBjb25zdGFudHNcbiAqIEBkZXNjcmlwdGlvblxuICogQ29sbGVjdGlvbiBvZiB1c2VmdWwgZGF0ZSBjb25zdGFudHMuXG4gKlxuICogVGhlIGNvbnN0YW50cyBjb3VsZCBiZSBpbXBvcnRlZCBmcm9tIGBkYXRlLWZucy9jb25zdGFudHNgOlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBtYXhUaW1lLCBtaW5UaW1lIH0gZnJvbSBcIi4vY29uc3RhbnRzL2RhdGUtZm5zL2NvbnN0YW50c1wiO1xuICpcbiAqIGZ1bmN0aW9uIGlzQWxsb3dlZFRpbWUodGltZSkge1xuICogICByZXR1cm4gdGltZSA8PSBtYXhUaW1lICYmIHRpbWUgPj0gbWluVGltZTtcbiAqIH1cbiAqIGBgYFxuICovXG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBkYXlzSW5XZWVrXG4gKiBAc3VtbWFyeSBEYXlzIGluIDEgd2Vlay5cbiAqL1xuZXhwb3J0IGNvbnN0IGRheXNJbldlZWsgPSA3O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgZGF5c0luWWVhclxuICogQHN1bW1hcnkgRGF5cyBpbiAxIHllYXIuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBIb3cgbWFueSBkYXlzIGluIGEgeWVhci5cbiAqXG4gKiBPbmUgeWVhcnMgZXF1YWxzIDM2NS4yNDI1IGRheXMgYWNjb3JkaW5nIHRvIHRoZSBmb3JtdWxhOlxuICpcbiAqID4gTGVhcCB5ZWFyIG9jY3VyZXMgZXZlcnkgNCB5ZWFycywgZXhjZXB0IGZvciB5ZWFycyB0aGF0IGFyZSBkaXZpc2FibGUgYnkgMTAwIGFuZCBub3QgZGl2aXNhYmxlIGJ5IDQwMC5cbiAqID4gMSBtZWFuIHllYXIgPSAoMzY1KzEvNC0xLzEwMCsxLzQwMCkgZGF5cyA9IDM2NS4yNDI1IGRheXNcbiAqL1xuZXhwb3J0IGNvbnN0IGRheXNJblllYXIgPSAzNjUuMjQyNTtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1heFRpbWVcbiAqIEBzdW1tYXJ5IE1heGltdW0gYWxsb3dlZCB0aW1lLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBtYXhUaW1lIH0gZnJvbSBcIi4vY29uc3RhbnRzL2RhdGUtZm5zL2NvbnN0YW50c1wiO1xuICpcbiAqIGNvbnN0IGlzVmFsaWQgPSA4NjQwMDAwMDAwMDAwMDAxIDw9IG1heFRpbWU7XG4gKiAvLz0+IGZhbHNlXG4gKlxuICogbmV3IERhdGUoODY0MDAwMDAwMDAwMDAwMSk7XG4gKiAvLz0+IEludmFsaWQgRGF0ZVxuICovXG5leHBvcnQgY29uc3QgbWF4VGltZSA9IE1hdGgucG93KDEwLCA4KSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW5UaW1lXG4gKiBAc3VtbWFyeSBNaW5pbXVtIGFsbG93ZWQgdGltZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgbWluVGltZSB9IGZyb20gXCIuL2NvbnN0YW50cy9kYXRlLWZucy9jb25zdGFudHNcIjtcbiAqXG4gKiBjb25zdCBpc1ZhbGlkID0gLTg2NDAwMDAwMDAwMDAwMDEgPj0gbWluVGltZTtcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBuZXcgRGF0ZSgtODY0MDAwMDAwMDAwMDAwMSlcbiAqIC8vPT4gSW52YWxpZCBEYXRlXG4gKi9cbmV4cG9ydCBjb25zdCBtaW5UaW1lID0gLW1heFRpbWU7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbldlZWtcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIHdlZWsuXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJbldlZWsgPSA2MDQ4MDAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbkRheVxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgZGF5LlxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5EYXkgPSA4NjQwMDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luTWludXRlXG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBtaW51dGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luTWludXRlID0gNjAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJbkhvdXJcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIGhvdXJcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luSG91ciA9IDM2MDAwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaWxsaXNlY29uZHNJblNlY29uZFxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgc2Vjb25kXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJblNlY29uZCA9IDEwMDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5ZZWFyXG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgeWVhci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJblllYXIgPSA1MjU2MDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5Nb250aFxuICogQHN1bW1hcnkgTWludXRlcyBpbiAxIG1vbnRoLlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luTW9udGggPSA0MzIwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJbkRheVxuICogQHN1bW1hcnkgTWludXRlcyBpbiAxIGRheS5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJbkRheSA9IDE0NDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtaW51dGVzSW5Ib3VyXG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgaG91ci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbnV0ZXNJbkhvdXIgPSA2MDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1vbnRoc0luUXVhcnRlclxuICogQHN1bW1hcnkgTW9udGhzIGluIDEgcXVhcnRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1vbnRoc0luUXVhcnRlciA9IDM7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBtb250aHNJblllYXJcbiAqIEBzdW1tYXJ5IE1vbnRocyBpbiAxIHllYXIuXG4gKi9cbmV4cG9ydCBjb25zdCBtb250aHNJblllYXIgPSAxMjtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHF1YXJ0ZXJzSW5ZZWFyXG4gKiBAc3VtbWFyeSBRdWFydGVycyBpbiAxIHllYXJcbiAqL1xuZXhwb3J0IGNvbnN0IHF1YXJ0ZXJzSW5ZZWFyID0gNDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbkhvdXJcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBob3VyLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luSG91ciA9IDM2MDA7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5NaW51dGVcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBtaW51dGUuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5NaW51dGUgPSA2MDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbkRheVxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIGRheS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbkRheSA9IHNlY29uZHNJbkhvdXIgKiAyNDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbldlZWtcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSB3ZWVrLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luV2VlayA9IHNlY29uZHNJbkRheSAqIDc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5ZZWFyXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgeWVhci5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJblllYXIgPSBzZWNvbmRzSW5EYXkgKiBkYXlzSW5ZZWFyO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luTW9udGhcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBtb250aFxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luTW9udGggPSBzZWNvbmRzSW5ZZWFyIC8gMTI7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5RdWFydGVyXG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgcXVhcnRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJblF1YXJ0ZXIgPSBzZWNvbmRzSW5Nb250aCAqIDM7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZkRheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGEgZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIGRheSBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAwMiAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mRGF5KGRhdGUpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZkRheTtcbiIsIi8qKlxuICogR29vZ2xlIENocm9tZSBhcyBvZiA2Ny4wLjMzOTYuODcgaW50cm9kdWNlZCB0aW1lem9uZXMgd2l0aCBvZmZzZXQgdGhhdCBpbmNsdWRlcyBzZWNvbmRzLlxuICogVGhleSB1c3VhbGx5IGFwcGVhciBmb3IgZGF0ZXMgdGhhdCBkZW5vdGUgdGltZSBiZWZvcmUgdGhlIHRpbWV6b25lcyB3ZXJlIGludHJvZHVjZWRcbiAqIChlLmcuIGZvciAnRXVyb3BlL1ByYWd1ZScgdGltZXpvbmUgdGhlIG9mZnNldCBpcyBHTVQrMDA6NTc6NDQgYmVmb3JlIDEgT2N0b2JlciAxODkxXG4gKiBhbmQgR01UKzAxOjAwOjAwIGFmdGVyIHRoYXQgZGF0ZSlcbiAqXG4gKiBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgdGhlIG9mZnNldCBpbiBtaW51dGVzIGFuZCB3b3VsZCByZXR1cm4gNTcgZm9yIHRoZSBleGFtcGxlIGFib3ZlLFxuICogd2hpY2ggd291bGQgbGVhZCB0byBpbmNvcnJlY3QgY2FsY3VsYXRpb25zLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgdGltZXpvbmUgb2Zmc2V0IGluIG1pbGxpc2Vjb25kcyB0aGF0IHRha2VzIHNlY29uZHMgaW4gYWNjb3VudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoZGF0ZSkge1xuICBjb25zdCB1dGNEYXRlID0gbmV3IERhdGUoXG4gICAgRGF0ZS5VVEMoXG4gICAgICBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICBkYXRlLmdldE1vbnRoKCksXG4gICAgICBkYXRlLmdldERhdGUoKSxcbiAgICAgIGRhdGUuZ2V0SG91cnMoKSxcbiAgICAgIGRhdGUuZ2V0TWludXRlcygpLFxuICAgICAgZGF0ZS5nZXRTZWNvbmRzKCksXG4gICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpLFxuICAgICksXG4gICk7XG4gIHV0Y0RhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIC0gdXRjRGF0ZS5nZXRUaW1lKCk7XG59XG4iLCJpbXBvcnQgeyBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMgfSBmcm9tIFwiLi9kaWZmZXJlbmNlSW5DYWxlbmRhckRheXMubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mWWVhciB9IGZyb20gXCIuL3N0YXJ0T2ZZZWFyLm1qc1wiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGdldERheU9mWWVhclxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIGRheSBvZiB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgZGF5IG9mIHRoZSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGdpdmVuIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGF5IG9mIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggZGF5IG9mIHRoZSB5ZWFyIGlzIDIgSnVseSAyMDE0P1xuICogY29uc3QgcmVzdWx0ID0gZ2V0RGF5T2ZZZWFyKG5ldyBEYXRlKDIwMTQsIDYsIDIpKVxuICogLy89PiAxODNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mWWVhcihkYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkaWZmID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKF9kYXRlLCBzdGFydE9mWWVhcihfZGF0ZSkpO1xuICBjb25zdCBkYXlPZlllYXIgPSBkaWZmICsgMTtcbiAgcmV0dXJuIGRheU9mWWVhcjtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBnZXREYXlPZlllYXI7XG4iLCJpbXBvcnQgeyBtaWxsaXNlY29uZHNJbkRheSB9IGZyb20gXCIuL2NvbnN0YW50cy5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZEYXkgfSBmcm9tIFwiLi9zdGFydE9mRGF5Lm1qc1wiO1xuaW1wb3J0IHsgZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyB9IGZyb20gXCIuL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXNcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgZGF5cyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuIFRoaXMgbWVhbnMgdGhhdCB0aGUgdGltZXMgYXJlIHJlbW92ZWRcbiAqIGZyb20gdGhlIGRhdGVzIGFuZCB0aGVuIHRoZSBkaWZmZXJlbmNlIGluIGRheXMgaXMgY2FsY3VsYXRlZC5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZUxlZnQgLSBUaGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIGRhdGVSaWdodCAtIFRoZSBlYXJsaWVyIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgZGF5cyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTEgMjM6MDA6MDAgYW5kIDIgSnVseSAyMDEyIDAwOjAwOjAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxuICogICBuZXcgRGF0ZSgyMDEyLCA2LCAyLCAwLCAwKSxcbiAqICAgbmV3IERhdGUoMjAxMSwgNiwgMiwgMjMsIDApXG4gKiApXG4gKiAvLz0+IDM2NlxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgZGF5cyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTEgMjM6NTk6MDAgYW5kIDMgSnVseSAyMDExIDAwOjAxOjAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxuICogICBuZXcgRGF0ZSgyMDExLCA2LCAzLCAwLCAxKSxcbiAqICAgbmV3IERhdGUoMjAxMSwgNiwgMiwgMjMsIDU5KVxuICogKVxuICogLy89PiAxXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZUxlZnQsIGRhdGVSaWdodCkge1xuICBjb25zdCBzdGFydE9mRGF5TGVmdCA9IHN0YXJ0T2ZEYXkoZGF0ZUxlZnQpO1xuICBjb25zdCBzdGFydE9mRGF5UmlnaHQgPSBzdGFydE9mRGF5KGRhdGVSaWdodCk7XG5cbiAgY29uc3QgdGltZXN0YW1wTGVmdCA9XG4gICAgc3RhcnRPZkRheUxlZnQuZ2V0VGltZSgpIC0gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhzdGFydE9mRGF5TGVmdCk7XG4gIGNvbnN0IHRpbWVzdGFtcFJpZ2h0ID1cbiAgICBzdGFydE9mRGF5UmlnaHQuZ2V0VGltZSgpIC1cbiAgICBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKHN0YXJ0T2ZEYXlSaWdodCk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIGRheSBpcyBub3QgY29uc3RhbnRcbiAgLy8gKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIGRheSBvZiB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpXG4gIHJldHVybiBNYXRoLnJvdW5kKCh0aW1lc3RhbXBMZWZ0IC0gdGltZXN0YW1wUmlnaHQpIC8gbWlsbGlzZWNvbmRzSW5EYXkpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cztcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcbmltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZZZWFyXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYSB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIHllYXIgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mWWVhcihuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDAwKSlcbiAqIC8vPT4gV2VkIEphbiAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mWWVhcihkYXRlKSB7XG4gIGNvbnN0IGNsZWFuRGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgX2RhdGUgPSBjb25zdHJ1Y3RGcm9tKGRhdGUsIDApO1xuICBfZGF0ZS5zZXRGdWxsWWVhcihjbGVhbkRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgMSk7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZlllYXI7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBzdGFydE9mV2Vla30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFN1biBBdWcgMzEgMjAxNCAwMDowMDowMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0aGUgd2VlayBzdGFydHMgb24gTW9uZGF5LCB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApLCB7IHdlZWtTdGFydHNPbjogMSB9KVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZXZWVrKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCB3ZWVrU3RhcnRzT24gPVxuICAgIG9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICAwO1xuXG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkYXkgPSBfZGF0ZS5nZXREYXkoKTtcbiAgY29uc3QgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyA3IDogMCkgKyBkYXkgLSB3ZWVrU3RhcnRzT247XG5cbiAgX2RhdGUuc2V0RGF0ZShfZGF0ZS5nZXREYXRlKCkgLSBkaWZmKTtcbiAgX2RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mV2VlaztcbiIsImltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcIi4vc3RhcnRPZldlZWsubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZklTT1dlZWtcbiAqIEBjYXRlZ29yeSBJU08gV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYW4gSVNPIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhbiBJU08gd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYW4gSVNPIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mSVNPV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZJU09XZWVrKGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZXZWVrKGRhdGUsIHsgd2Vla1N0YXJ0c09uOiAxIH0pO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZJU09XZWVrO1xuIiwiaW1wb3J0IHsgY29uc3RydWN0RnJvbSB9IGZyb20gXCIuL2NvbnN0cnVjdEZyb20ubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mSVNPV2VlayB9IGZyb20gXCIuL3N0YXJ0T2ZJU09XZWVrLm1qc1wiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGdldElTT1dlZWtZZWFyXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWstTnVtYmVyaW5nIFllYXIgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUsXG4gKiB3aGljaCBhbHdheXMgc3RhcnRzIDMgZGF5cyBiZWZvcmUgdGhlIHllYXIncyBmaXJzdCBUaHVyc2RheS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgZ2l2ZW4gZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGljaCBJU08td2VlayBudW1iZXJpbmcgeWVhciBpcyAyIEphbnVhcnkgMjAwNT9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldElTT1dlZWtZZWFyKG5ldyBEYXRlKDIwMDUsIDAsIDIpKVxuICogLy89PiAyMDA0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJU09XZWVrWWVhcihkYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCB5ZWFyID0gX2RhdGUuZ2V0RnVsbFllYXIoKTtcblxuICBjb25zdCBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyID0gY29uc3RydWN0RnJvbShkYXRlLCAwKTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhci5zZXRGdWxsWWVhcih5ZWFyICsgMSwgMCwgNCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIGNvbnN0IHN0YXJ0T2ZOZXh0WWVhciA9IHN0YXJ0T2ZJU09XZWVrKGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIpO1xuXG4gIGNvbnN0IGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIgPSBjb25zdHJ1Y3RGcm9tKGRhdGUsIDApO1xuICBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyLnNldEZ1bGxZZWFyKHllYXIsIDAsIDQpO1xuICBmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICBjb25zdCBzdGFydE9mVGhpc1llYXIgPSBzdGFydE9mSVNPV2Vlayhmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyKTtcblxuICBpZiAoX2RhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZOZXh0WWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhciArIDE7XG4gIH0gZWxzZSBpZiAoX2RhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZUaGlzWWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhcjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geWVhciAtIDE7XG4gIH1cbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBnZXRJU09XZWVrWWVhcjtcbiIsImltcG9ydCB7IG1pbGxpc2Vjb25kc0luV2VlayB9IGZyb20gXCIuL2NvbnN0YW50cy5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZJU09XZWVrIH0gZnJvbSBcIi4vc3RhcnRPZklTT1dlZWsubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mSVNPV2Vla1llYXIgfSBmcm9tIFwiLi9zdGFydE9mSVNPV2Vla1llYXIubWpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgZ2V0SVNPV2Vla1xuICogQGNhdGVnb3J5IElTTyBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgSVNPIHdlZWsgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIElTTyB3ZWVrIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBnaXZlbiBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIElTTyB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIHdlZWsgb2YgdGhlIElTTy13ZWVrIG51bWJlcmluZyB5ZWFyIGlzIDIgSmFudWFyeSAyMDA1P1xuICogY29uc3QgcmVzdWx0ID0gZ2V0SVNPV2VlayhuZXcgRGF0ZSgyMDA1LCAwLCAyKSlcbiAqIC8vPT4gNTNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElTT1dlZWsoZGF0ZSkge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgZGlmZiA9XG4gICAgc3RhcnRPZklTT1dlZWsoX2RhdGUpLmdldFRpbWUoKSAtIHN0YXJ0T2ZJU09XZWVrWWVhcihfZGF0ZSkuZ2V0VGltZSgpO1xuXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2YgZGF5cyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyXG4gIC8vIGJlY2F1c2UgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gYSB3ZWVrIGlzIG5vdCBjb25zdGFudFxuICAvLyAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgd2VlayBvZiB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpXG4gIHJldHVybiBNYXRoLnJvdW5kKGRpZmYgLyBtaWxsaXNlY29uZHNJbldlZWspICsgMTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBnZXRJU09XZWVrO1xuIiwiaW1wb3J0IHsgZ2V0SVNPV2Vla1llYXIgfSBmcm9tIFwiLi9nZXRJU09XZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZJU09XZWVrIH0gZnJvbSBcIi4vc3RhcnRPZklTT1dlZWsubWpzXCI7XG5pbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mSVNPV2Vla1llYXJcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXIsXG4gKiB3aGljaCBhbHdheXMgc3RhcnRzIDMgZGF5cyBiZWZvcmUgdGhlIHllYXIncyBmaXJzdCBUaHVyc2RheS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciAyIEp1bHkgMjAwNTpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZJU09XZWVrWWVhcihuZXcgRGF0ZSgyMDA1LCA2LCAyKSlcbiAqIC8vPT4gTW9uIEphbiAwMyAyMDA1IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mSVNPV2Vla1llYXIoZGF0ZSkge1xuICBjb25zdCB5ZWFyID0gZ2V0SVNPV2Vla1llYXIoZGF0ZSk7XG4gIGNvbnN0IGZvdXJ0aE9mSmFudWFyeSA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRGdWxsWWVhcih5ZWFyLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gc3RhcnRPZklTT1dlZWsoZm91cnRoT2ZKYW51YXJ5KTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mSVNPV2Vla1llYXI7XG4iLCJpbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcIi4vc3RhcnRPZldlZWsubWpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBnZXRXZWVrWWVhcn0gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIGdldFdlZWtZZWFyXG4gKiBAY2F0ZWdvcnkgV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgZXhhY3QgY2FsY3VsYXRpb24gZGVwZW5kcyBvbiB0aGUgdmFsdWVzIG9mXG4gKiBgb3B0aW9ucy53ZWVrU3RhcnRzT25gICh3aGljaCBpcyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlaylcbiAqIGFuZCBgb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGVgICh3aGljaCBpcyB0aGUgZGF5IG9mIEphbnVhcnksIHdoaWNoIGlzIGFsd2F5cyBpblxuICogdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHdlZWstbnVtYmVyaW5nIHllYXIpXG4gKlxuICogV2VlayBudW1iZXJpbmc6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1dlZWsjV2Vla19udW1iZXJpbmdcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBnaXZlbiBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKlxuICogQHJldHVybnMgVGhlIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBudW1iZXJpbmcgeWVhciBpcyAyNiBEZWNlbWJlciAyMDA0IHdpdGggdGhlIGRlZmF1bHQgc2V0dGluZ3M/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRXZWVrWWVhcihuZXcgRGF0ZSgyMDA0LCAxMSwgMjYpKVxuICogLy89PiAyMDA1XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIHdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMjYgRGVjZW1iZXIgMjAwNCBpZiB3ZWVrIHN0YXJ0cyBvbiBTYXR1cmRheT9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldFdlZWtZZWFyKG5ldyBEYXRlKDIwMDQsIDExLCAyNiksIHsgd2Vla1N0YXJ0c09uOiA2IH0pXG4gKiAvLz0+IDIwMDRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBudW1iZXJpbmcgeWVhciBpcyAyNiBEZWNlbWJlciAyMDA0IGlmIHRoZSBmaXJzdCB3ZWVrIGNvbnRhaW5zIDQgSmFudWFyeT9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldFdlZWtZZWFyKG5ldyBEYXRlKDIwMDQsIDExLCAyNiksIHsgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiA0IH0pXG4gKiAvLz0+IDIwMDRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtZZWFyKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IHllYXIgPSBfZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3QgZmlyc3RXZWVrQ29udGFpbnNEYXRlID1cbiAgICBvcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgMTtcblxuICBjb25zdCBmaXJzdFdlZWtPZk5leHRZZWFyID0gY29uc3RydWN0RnJvbShkYXRlLCAwKTtcbiAgZmlyc3RXZWVrT2ZOZXh0WWVhci5zZXRGdWxsWWVhcih5ZWFyICsgMSwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrT2ZOZXh0WWVhci5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3Qgc3RhcnRPZk5leHRZZWFyID0gc3RhcnRPZldlZWsoZmlyc3RXZWVrT2ZOZXh0WWVhciwgb3B0aW9ucyk7XG5cbiAgY29uc3QgZmlyc3RXZWVrT2ZUaGlzWWVhciA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZpcnN0V2Vla09mVGhpc1llYXIuc2V0RnVsbFllYXIoeWVhciwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrT2ZUaGlzWWVhci5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3Qgc3RhcnRPZlRoaXNZZWFyID0gc3RhcnRPZldlZWsoZmlyc3RXZWVrT2ZUaGlzWWVhciwgb3B0aW9ucyk7XG5cbiAgaWYgKF9kYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mTmV4dFllYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXIgKyAxO1xuICB9IGVsc2UgaWYgKF9kYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mVGhpc1llYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHllYXIgLSAxO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZ2V0V2Vla1llYXI7XG4iLCJpbXBvcnQgeyBtaWxsaXNlY29uZHNJbldlZWsgfSBmcm9tIFwiLi9jb25zdGFudHMubWpzXCI7XG5pbXBvcnQgeyBzdGFydE9mV2VlayB9IGZyb20gXCIuL3N0YXJ0T2ZXZWVrLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWtZZWFyIH0gZnJvbSBcIi4vc3RhcnRPZldlZWtZZWFyLm1qc1wiO1xuaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZ2V0V2Vla30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIGdldFdlZWtcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbG9jYWwgd2VlayBpbmRleCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbG9jYWwgd2VlayBpbmRleCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSBleGFjdCBjYWxjdWxhdGlvbiBkZXBlbmRzIG9uIHRoZSB2YWx1ZXMgb2ZcbiAqIGBvcHRpb25zLndlZWtTdGFydHNPbmAgKHdoaWNoIGlzIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrKVxuICogYW5kIGBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZWAgKHdoaWNoIGlzIHRoZSBkYXkgb2YgSmFudWFyeSwgd2hpY2ggaXMgYWx3YXlzIGluXG4gKiB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgd2Vlay1udW1iZXJpbmcgeWVhcilcbiAqXG4gKiBXZWVrIG51bWJlcmluZzogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2VlayNXZWVrX251bWJlcmluZ1xuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGdpdmVuIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIHdlZWsgb2YgdGhlIGxvY2FsIHdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMiBKYW51YXJ5IDIwMDUgd2l0aCBkZWZhdWx0IG9wdGlvbnM/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRXZWVrKG5ldyBEYXRlKDIwMDUsIDAsIDIpKVxuICogLy89PiAyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIHdlZWsgb2YgdGhlIGxvY2FsIHdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMiBKYW51YXJ5IDIwMDUsXG4gKiAvLyBpZiBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayxcbiAqIC8vIGFuZCB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhciBhbHdheXMgY29udGFpbnMgNCBKYW51YXJ5P1xuICogY29uc3QgcmVzdWx0ID0gZ2V0V2VlayhuZXcgRGF0ZSgyMDA1LCAwLCAyKSwge1xuICogICB3ZWVrU3RhcnRzT246IDEsXG4gKiAgIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogNFxuICogfSlcbiAqIC8vPT4gNTNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2VlayhkYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkaWZmID1cbiAgICBzdGFydE9mV2VlayhfZGF0ZSwgb3B0aW9ucykuZ2V0VGltZSgpIC1cbiAgICBzdGFydE9mV2Vla1llYXIoX2RhdGUsIG9wdGlvbnMpLmdldFRpbWUoKTtcblxuICAvLyBSb3VuZCB0aGUgbnVtYmVyIG9mIGRheXMgdG8gdGhlIG5lYXJlc3QgaW50ZWdlclxuICAvLyBiZWNhdXNlIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGluIGEgd2VlayBpcyBub3QgY29uc3RhbnRcbiAgLy8gKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIHdlZWsgb2YgdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KVxuICByZXR1cm4gTWF0aC5yb3VuZChkaWZmIC8gbWlsbGlzZWNvbmRzSW5XZWVrKSArIDE7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZ2V0V2VlaztcbiIsImltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tLm1qc1wiO1xuaW1wb3J0IHsgZ2V0V2Vla1llYXIgfSBmcm9tIFwiLi9nZXRXZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcIi4vc3RhcnRPZldlZWsubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBzdGFydE9mV2Vla1llYXJ9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mV2Vla1llYXJcbiAqIEBjYXRlZ29yeSBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyLlxuICogVGhlIGV4YWN0IGNhbGN1bGF0aW9uIGRlcGVuZHMgb24gdGhlIHZhbHVlcyBvZlxuICogYG9wdGlvbnMud2Vla1N0YXJ0c09uYCAod2hpY2ggaXMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWspXG4gKiBhbmQgYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCAod2hpY2ggaXMgdGhlIGRheSBvZiBKYW51YXJ5LCB3aGljaCBpcyBhbHdheXMgaW5cbiAqIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB3ZWVrLW51bWJlcmluZyB5ZWFyKVxuICpcbiAqIFdlZWsgbnVtYmVyaW5nOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XZWVrI1dlZWtfbnVtYmVyaW5nXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGEgd2Vlay1udW1iZXJpbmcgeWVhclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYW4gYSB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciAyIEp1bHkgMjAwNSB3aXRoIGRlZmF1bHQgc2V0dGluZ3M6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2Vla1llYXIobmV3IERhdGUoMjAwNSwgNiwgMikpXG4gKiAvLz0+IFN1biBEZWMgMjYgMjAwNCAwMDowMDowMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciAyIEp1bHkgMjAwNVxuICogLy8gaWYgTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2Ygd2Vla1xuICogLy8gYW5kIDQgSmFudWFyeSBpcyBhbHdheXMgaW4gdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXI6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2Vla1llYXIobmV3IERhdGUoMjAwNSwgNiwgMiksIHtcbiAqICAgd2Vla1N0YXJ0c09uOiAxLFxuICogICBmaXJzdFdlZWtDb250YWluc0RhdGU6IDRcbiAqIH0pXG4gKiAvLz0+IE1vbiBKYW4gMDMgMjAwNSAwMDowMDowMFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZldlZWtZZWFyKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCBmaXJzdFdlZWtDb250YWluc0RhdGUgPVxuICAgIG9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgZGVmYXVsdE9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICAxO1xuXG4gIGNvbnN0IHllYXIgPSBnZXRXZWVrWWVhcihkYXRlLCBvcHRpb25zKTtcbiAgY29uc3QgZmlyc3RXZWVrID0gY29uc3RydWN0RnJvbShkYXRlLCAwKTtcbiAgZmlyc3RXZWVrLnNldEZ1bGxZZWFyKHllYXIsIDAsIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSk7XG4gIGZpcnN0V2Vlay5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3QgX2RhdGUgPSBzdGFydE9mV2VlayhmaXJzdFdlZWssIG9wdGlvbnMpO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZldlZWtZZWFyO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGFkZExlYWRpbmdaZXJvcyhudW1iZXIsIHRhcmdldExlbmd0aCkge1xuICBjb25zdCBzaWduID0gbnVtYmVyIDwgMCA/IFwiLVwiIDogXCJcIjtcbiAgY29uc3Qgb3V0cHV0ID0gTWF0aC5hYnMobnVtYmVyKS50b1N0cmluZygpLnBhZFN0YXJ0KHRhcmdldExlbmd0aCwgXCIwXCIpO1xuICByZXR1cm4gc2lnbiArIG91dHB1dDtcbn1cbiIsImltcG9ydCB7IGFkZExlYWRpbmdaZXJvcyB9IGZyb20gXCIuLi9hZGRMZWFkaW5nWmVyb3MubWpzXCI7XG5cbi8qXG4gKiB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBhICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBBKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBkICB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICB8ICBEICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBoICB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICB8ICBIICB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBtICB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBNICB8IE1vbnRoICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBzICB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICB8ICBTICB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICB8XG4gKiB8ICB5ICB8IFllYXIgKGFicykgICAgICAgICAgICAgICAgICAgICB8ICBZICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgKiBhcmUgbm90IGltcGxlbWVudGVkIGJ1dCByZXNlcnZlZCBieSBVbmljb2RlIHN0YW5kYXJkLlxuICovXG5cbmV4cG9ydCBjb25zdCBsaWdodEZvcm1hdHRlcnMgPSB7XG4gIC8vIFllYXJcbiAgeShkYXRlLCB0b2tlbikge1xuICAgIC8vIEZyb20gaHR0cDovL3d3dy51bmljb2RlLm9yZy9yZXBvcnRzL3RyMzUvdHIzNS0zMS90cjM1LWRhdGVzLmh0bWwjRGF0ZV9Gb3JtYXRfdG9rZW5zXG4gICAgLy8gfCBZZWFyICAgICB8ICAgICB5IHwgeXkgfCAgIHl5eSB8ICB5eXl5IHwgeXl5eXkgfFxuICAgIC8vIHwtLS0tLS0tLS0tfC0tLS0tLS18LS0tLXwtLS0tLS0tfC0tLS0tLS18LS0tLS0tLXxcbiAgICAvLyB8IEFEIDEgICAgIHwgICAgIDEgfCAwMSB8ICAgMDAxIHwgIDAwMDEgfCAwMDAwMSB8XG4gICAgLy8gfCBBRCAxMiAgICB8ICAgIDEyIHwgMTIgfCAgIDAxMiB8ICAwMDEyIHwgMDAwMTIgfFxuICAgIC8vIHwgQUQgMTIzICAgfCAgIDEyMyB8IDIzIHwgICAxMjMgfCAgMDEyMyB8IDAwMTIzIHxcbiAgICAvLyB8IEFEIDEyMzQgIHwgIDEyMzQgfCAzNCB8ICAxMjM0IHwgIDEyMzQgfCAwMTIzNCB8XG4gICAgLy8gfCBBRCAxMjM0NSB8IDEyMzQ1IHwgNDUgfCAxMjM0NSB8IDEyMzQ1IHwgMTIzNDUgfFxuXG4gICAgY29uc3Qgc2lnbmVkWWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgIGNvbnN0IHllYXIgPSBzaWduZWRZZWFyID4gMCA/IHNpZ25lZFllYXIgOiAxIC0gc2lnbmVkWWVhcjtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHRva2VuID09PSBcInl5XCIgPyB5ZWFyICUgMTAwIDogeWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBNb250aFxuICBNKGRhdGUsIHRva2VuKSB7XG4gICAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgcmV0dXJuIHRva2VuID09PSBcIk1cIiA/IFN0cmluZyhtb250aCArIDEpIDogYWRkTGVhZGluZ1plcm9zKG1vbnRoICsgMSwgMik7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHRoZSBtb250aFxuICBkKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldERhdGUoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBBTSBvciBQTVxuICBhKGRhdGUsIHRva2VuKSB7XG4gICAgY29uc3QgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF0ZS5nZXRIb3VycygpIC8gMTIgPj0gMSA/IFwicG1cIiA6IFwiYW1cIjtcblxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgXCJhXCI6XG4gICAgICBjYXNlIFwiYWFcIjpcbiAgICAgICAgcmV0dXJuIGRheVBlcmlvZEVudW1WYWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgY2FzZSBcImFhYVwiOlxuICAgICAgICByZXR1cm4gZGF5UGVyaW9kRW51bVZhbHVlO1xuICAgICAgY2FzZSBcImFhYWFhXCI6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWVbMF07XG4gICAgICBjYXNlIFwiYWFhYVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGRheVBlcmlvZEVudW1WYWx1ZSA9PT0gXCJhbVwiID8gXCJhLm0uXCIgOiBcInAubS5cIjtcbiAgICB9XG4gIH0sXG5cbiAgLy8gSG91ciBbMS0xMl1cbiAgaChkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRIb3VycygpICUgMTIgfHwgMTIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gSG91ciBbMC0yM11cbiAgSChkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRIb3VycygpLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIE1pbnV0ZVxuICBtKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldE1pbnV0ZXMoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBTZWNvbmRcbiAgcyhkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRTZWNvbmRzKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gRnJhY3Rpb24gb2Ygc2Vjb25kXG4gIFMoZGF0ZSwgdG9rZW4pIHtcbiAgICBjb25zdCBudW1iZXJPZkRpZ2l0cyA9IHRva2VuLmxlbmd0aDtcbiAgICBjb25zdCBtaWxsaXNlY29uZHMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpO1xuICAgIGNvbnN0IGZyYWN0aW9uYWxTZWNvbmRzID0gTWF0aC5mbG9vcihcbiAgICAgIG1pbGxpc2Vjb25kcyAqIE1hdGgucG93KDEwLCBudW1iZXJPZkRpZ2l0cyAtIDMpLFxuICAgICk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhmcmFjdGlvbmFsU2Vjb25kcywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBnZXREYXlPZlllYXIgfSBmcm9tIFwiLi4vLi4vZ2V0RGF5T2ZZZWFyLm1qc1wiO1xuaW1wb3J0IHsgZ2V0SVNPV2VlayB9IGZyb20gXCIuLi8uLi9nZXRJU09XZWVrLm1qc1wiO1xuaW1wb3J0IHsgZ2V0SVNPV2Vla1llYXIgfSBmcm9tIFwiLi4vLi4vZ2V0SVNPV2Vla1llYXIubWpzXCI7XG5pbXBvcnQgeyBnZXRXZWVrIH0gZnJvbSBcIi4uLy4uL2dldFdlZWsubWpzXCI7XG5pbXBvcnQgeyBnZXRXZWVrWWVhciB9IGZyb20gXCIuLi8uLi9nZXRXZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IGFkZExlYWRpbmdaZXJvcyB9IGZyb20gXCIuLi9hZGRMZWFkaW5nWmVyb3MubWpzXCI7XG5pbXBvcnQgeyBsaWdodEZvcm1hdHRlcnMgfSBmcm9tIFwiLi9saWdodEZvcm1hdHRlcnMubWpzXCI7XG5cbmNvbnN0IGRheVBlcmlvZEVudW0gPSB7XG4gIGFtOiBcImFtXCIsXG4gIHBtOiBcInBtXCIsXG4gIG1pZG5pZ2h0OiBcIm1pZG5pZ2h0XCIsXG4gIG5vb246IFwibm9vblwiLFxuICBtb3JuaW5nOiBcIm1vcm5pbmdcIixcbiAgYWZ0ZXJub29uOiBcImFmdGVybm9vblwiLFxuICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgbmlnaHQ6IFwibmlnaHRcIixcbn07XG5cbi8qXG4gKiB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBhICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBBKiB8IE1pbGxpc2Vjb25kcyBpbiBkYXkgICAgICAgICAgICB8XG4gKiB8ICBiICB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICB8ICBCICB8IEZsZXhpYmxlIGRheSBwZXJpb2QgICAgICAgICAgICB8XG4gKiB8ICBjICB8IFN0YW5kLWFsb25lIGxvY2FsIGRheSBvZiB3ZWVrICB8ICBDKiB8IExvY2FsaXplZCBob3VyIHcvIGRheSBwZXJpb2QgICB8XG4gKiB8ICBkICB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICB8ICBEICB8IERheSBvZiB5ZWFyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBlICB8IExvY2FsIGRheSBvZiB3ZWVrICAgICAgICAgICAgICB8ICBFICB8IERheSBvZiB3ZWVrICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBmICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICBGKiB8IERheSBvZiB3ZWVrIGluIG1vbnRoICAgICAgICAgICB8XG4gKiB8ICBnKiB8IE1vZGlmaWVkIEp1bGlhbiBkYXkgICAgICAgICAgICB8ICBHICB8IEVyYSAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBoICB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICB8ICBIICB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBpISB8IElTTyBkYXkgb2Ygd2VlayAgICAgICAgICAgICAgICB8ICBJISB8IElTTyB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgICB8XG4gKiB8ICBqKiB8IExvY2FsaXplZCBob3VyIHcvIGRheSBwZXJpb2QgICB8ICBKKiB8IExvY2FsaXplZCBob3VyIHcvbyBkYXkgcGVyaW9kICB8XG4gKiB8ICBrICB8IEhvdXIgWzEtMjRdICAgICAgICAgICAgICAgICAgICB8ICBLICB8IEhvdXIgWzAtMTFdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBsKiB8IChkZXByZWNhdGVkKSAgICAgICAgICAgICAgICAgICB8ICBMICB8IFN0YW5kLWFsb25lIG1vbnRoICAgICAgICAgICAgICB8XG4gKiB8ICBtICB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBNICB8IE1vbnRoICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBuICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICBOICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBvISB8IE9yZGluYWwgbnVtYmVyIG1vZGlmaWVyICAgICAgICB8ICBPICB8IFRpbWV6b25lIChHTVQpICAgICAgICAgICAgICAgICB8XG4gKiB8ICBwISB8IExvbmcgbG9jYWxpemVkIHRpbWUgICAgICAgICAgICB8ICBQISB8IExvbmcgbG9jYWxpemVkIGRhdGUgICAgICAgICAgICB8XG4gKiB8ICBxICB8IFN0YW5kLWFsb25lIHF1YXJ0ZXIgICAgICAgICAgICB8ICBRICB8IFF1YXJ0ZXIgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICByKiB8IFJlbGF0ZWQgR3JlZ29yaWFuIHllYXIgICAgICAgICB8ICBSISB8IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgICB8XG4gKiB8ICBzICB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICB8ICBTICB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICB8XG4gKiB8ICB0ISB8IFNlY29uZHMgdGltZXN0YW1wICAgICAgICAgICAgICB8ICBUISB8IE1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICB8XG4gKiB8ICB1ICB8IEV4dGVuZGVkIHllYXIgICAgICAgICAgICAgICAgICB8ICBVKiB8IEN5Y2xpYyB5ZWFyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICB2KiB8IFRpbWV6b25lIChnZW5lcmljIG5vbi1sb2NhdC4pICB8ICBWKiB8IFRpbWV6b25lIChsb2NhdGlvbikgICAgICAgICAgICB8XG4gKiB8ICB3ICB8IExvY2FsIHdlZWsgb2YgeWVhciAgICAgICAgICAgICB8ICBXKiB8IFdlZWsgb2YgbW9udGggICAgICAgICAgICAgICAgICB8XG4gKiB8ICB4ICB8IFRpbWV6b25lIChJU08tODYwMSB3L28gWikgICAgICB8ICBYICB8IFRpbWV6b25lIChJU08tODYwMSkgICAgICAgICAgICB8XG4gKiB8ICB5ICB8IFllYXIgKGFicykgICAgICAgICAgICAgICAgICAgICB8ICBZICB8IExvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICB8XG4gKiB8ICB6ICB8IFRpbWV6b25lIChzcGVjaWZpYyBub24tbG9jYXQuKSB8ICBaKiB8IFRpbWV6b25lIChhbGlhc2VzKSAgICAgICAgICAgICB8XG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgKiBhcmUgbm90IGltcGxlbWVudGVkIGJ1dCByZXNlcnZlZCBieSBVbmljb2RlIHN0YW5kYXJkLlxuICpcbiAqIExldHRlcnMgbWFya2VkIGJ5ICEgYXJlIG5vbi1zdGFuZGFyZCwgYnV0IGltcGxlbWVudGVkIGJ5IGRhdGUtZm5zOlxuICogLSBgb2AgbW9kaWZpZXMgdGhlIHByZXZpb3VzIHRva2VuIHRvIHR1cm4gaXQgaW50byBhbiBvcmRpbmFsIChzZWUgYGZvcm1hdGAgZG9jcylcbiAqIC0gYGlgIGlzIElTTyBkYXkgb2Ygd2Vlay4gRm9yIGBpYCBhbmQgYGlpYCBpcyByZXR1cm5zIG51bWVyaWMgSVNPIHdlZWsgZGF5cyxcbiAqICAgaS5lLiA3IGZvciBTdW5kYXksIDEgZm9yIE1vbmRheSwgZXRjLlxuICogLSBgSWAgaXMgSVNPIHdlZWsgb2YgeWVhciwgYXMgb3Bwb3NlZCB0byBgd2Agd2hpY2ggaXMgbG9jYWwgd2VlayBvZiB5ZWFyLlxuICogLSBgUmAgaXMgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIsIGFzIG9wcG9zZWQgdG8gYFlgIHdoaWNoIGlzIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIuXG4gKiAgIGBSYCBpcyBzdXBwb3NlZCB0byBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYElgIGFuZCBgaWBcbiAqICAgZm9yIHVuaXZlcnNhbCBJU08gd2Vlay1udW1iZXJpbmcgZGF0ZSwgd2hlcmVhc1xuICogICBgWWAgaXMgc3VwcG9zZWQgdG8gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGB3YCBhbmQgYGVgXG4gKiAgIGZvciB3ZWVrLW51bWJlcmluZyBkYXRlIHNwZWNpZmljIHRvIHRoZSBsb2NhbGUuXG4gKiAtIGBQYCBpcyBsb25nIGxvY2FsaXplZCBkYXRlIGZvcm1hdFxuICogLSBgcGAgaXMgbG9uZyBsb2NhbGl6ZWQgdGltZSBmb3JtYXRcbiAqL1xuXG5leHBvcnQgY29uc3QgZm9ybWF0dGVycyA9IHtcbiAgLy8gRXJhXG4gIEc6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBlcmEgPSBkYXRlLmdldEZ1bGxZZWFyKCkgPiAwID8gMSA6IDA7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gQUQsIEJDXG4gICAgICBjYXNlIFwiR1wiOlxuICAgICAgY2FzZSBcIkdHXCI6XG4gICAgICBjYXNlIFwiR0dHXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5lcmEoZXJhLCB7IHdpZHRoOiBcImFiYnJldmlhdGVkXCIgfSk7XG4gICAgICAvLyBBLCBCXG4gICAgICBjYXNlIFwiR0dHR0dcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmVyYShlcmEsIHsgd2lkdGg6IFwibmFycm93XCIgfSk7XG4gICAgICAvLyBBbm5vIERvbWluaSwgQmVmb3JlIENocmlzdFxuICAgICAgY2FzZSBcIkdHR0dcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5lcmEoZXJhLCB7IHdpZHRoOiBcIndpZGVcIiB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gWWVhclxuICB5OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgLy8gT3JkaW5hbCBudW1iZXJcbiAgICBpZiAodG9rZW4gPT09IFwieW9cIikge1xuICAgICAgY29uc3Qgc2lnbmVkWWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIC8vIFJldHVybnMgMSBmb3IgMSBCQyAod2hpY2ggaXMgeWVhciAwIGluIEphdmFTY3JpcHQpXG4gICAgICBjb25zdCB5ZWFyID0gc2lnbmVkWWVhciA+IDAgPyBzaWduZWRZZWFyIDogMSAtIHNpZ25lZFllYXI7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih5ZWFyLCB7IHVuaXQ6IFwieWVhclwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMueShkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gTG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhclxuICBZOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgc2lnbmVkV2Vla1llYXIgPSBnZXRXZWVrWWVhcihkYXRlLCBvcHRpb25zKTtcbiAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgIGNvbnN0IHdlZWtZZWFyID0gc2lnbmVkV2Vla1llYXIgPiAwID8gc2lnbmVkV2Vla1llYXIgOiAxIC0gc2lnbmVkV2Vla1llYXI7XG5cbiAgICAvLyBUd28gZGlnaXQgeWVhclxuICAgIGlmICh0b2tlbiA9PT0gXCJZWVwiKSB7XG4gICAgICBjb25zdCB0d29EaWdpdFllYXIgPSB3ZWVrWWVhciAlIDEwMDtcbiAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3ModHdvRGlnaXRZZWFyLCAyKTtcbiAgICB9XG5cbiAgICAvLyBPcmRpbmFsIG51bWJlclxuICAgIGlmICh0b2tlbiA9PT0gXCJZb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih3ZWVrWWVhciwgeyB1bml0OiBcInllYXJcIiB9KTtcbiAgICB9XG5cbiAgICAvLyBQYWRkaW5nXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh3ZWVrWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICBSOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4pIHtcbiAgICBjb25zdCBpc29XZWVrWWVhciA9IGdldElTT1dlZWtZZWFyKGRhdGUpO1xuXG4gICAgLy8gUGFkZGluZ1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaXNvV2Vla1llYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gRXh0ZW5kZWQgeWVhci4gVGhpcyBpcyBhIHNpbmdsZSBudW1iZXIgZGVzaWduYXRpbmcgdGhlIHllYXIgb2YgdGhpcyBjYWxlbmRhciBzeXN0ZW0uXG4gIC8vIFRoZSBtYWluIGRpZmZlcmVuY2UgYmV0d2VlbiBgeWAgYW5kIGB1YCBsb2NhbGl6ZXJzIGFyZSBCLkMuIHllYXJzOlxuICAvLyB8IFllYXIgfCBgeWAgfCBgdWAgfFxuICAvLyB8LS0tLS0tfC0tLS0tfC0tLS0tfFxuICAvLyB8IEFDIDEgfCAgIDEgfCAgIDEgfFxuICAvLyB8IEJDIDEgfCAgIDEgfCAgIDAgfFxuICAvLyB8IEJDIDIgfCAgIDIgfCAgLTEgfFxuICAvLyBBbHNvIGB5eWAgYWx3YXlzIHJldHVybnMgdGhlIGxhc3QgdHdvIGRpZ2l0cyBvZiBhIHllYXIsXG4gIC8vIHdoaWxlIGB1dWAgcGFkcyBzaW5nbGUgZGlnaXQgeWVhcnMgdG8gMiBjaGFyYWN0ZXJzIGFuZCByZXR1cm5zIG90aGVyIHllYXJzIHVuY2hhbmdlZC5cbiAgdTogZnVuY3Rpb24gKGRhdGUsIHRva2VuKSB7XG4gICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHllYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gUXVhcnRlclxuICBROiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgcXVhcnRlciA9IE1hdGguY2VpbCgoZGF0ZS5nZXRNb250aCgpICsgMSkgLyAzKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAxLCAyLCAzLCA0XG4gICAgICBjYXNlIFwiUVwiOlxuICAgICAgICByZXR1cm4gU3RyaW5nKHF1YXJ0ZXIpO1xuICAgICAgLy8gMDEsIDAyLCAwMywgMDRcbiAgICAgIGNhc2UgXCJRUVwiOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHF1YXJ0ZXIsIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIDNyZCwgNHRoXG4gICAgICBjYXNlIFwiUW9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIocXVhcnRlciwgeyB1bml0OiBcInF1YXJ0ZXJcIiB9KTtcbiAgICAgIC8vIFExLCBRMiwgUTMsIFE0XG4gICAgICBjYXNlIFwiUVFRXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIDEsIDIsIDMsIDQgKG5hcnJvdyBxdWFydGVyOyBjb3VsZCBiZSBub3QgbnVtZXJpY2FsKVxuICAgICAgY2FzZSBcIlFRUVFRXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLlxuICAgICAgY2FzZSBcIlFRUVFcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBTdGFuZC1hbG9uZSBxdWFydGVyXG4gIHE6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBxdWFydGVyID0gTWF0aC5jZWlsKChkYXRlLmdldE1vbnRoKCkgKyAxKSAvIDMpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDEsIDIsIDMsIDRcbiAgICAgIGNhc2UgXCJxXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcocXVhcnRlcik7XG4gICAgICAvLyAwMSwgMDIsIDAzLCAwNFxuICAgICAgY2FzZSBcInFxXCI6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MocXVhcnRlciwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgICAgIGNhc2UgXCJxb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihxdWFydGVyLCB7IHVuaXQ6IFwicXVhcnRlclwiIH0pO1xuICAgICAgLy8gUTEsIFEyLCBRMywgUTRcbiAgICAgIGNhc2UgXCJxcXFcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gMSwgMiwgMywgNCAobmFycm93IHF1YXJ0ZXI7IGNvdWxkIGJlIG5vdCBudW1lcmljYWwpXG4gICAgICBjYXNlIFwicXFxcXFcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uXG4gICAgICBjYXNlIFwicXFxcVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIE1vbnRoXG4gIE06IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiTVwiOlxuICAgICAgY2FzZSBcIk1NXCI6XG4gICAgICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuTShkYXRlLCB0b2tlbik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gICAgICBjYXNlIFwiTW9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobW9udGggKyAxLCB7IHVuaXQ6IFwibW9udGhcIiB9KTtcbiAgICAgIC8vIEphbiwgRmViLCAuLi4sIERlY1xuICAgICAgY2FzZSBcIk1NTVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEosIEYsIC4uLiwgRFxuICAgICAgY2FzZSBcIk1NTU1NXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICAgICBjYXNlIFwiTU1NTVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7IHdpZHRoOiBcIndpZGVcIiwgY29udGV4dDogXCJmb3JtYXR0aW5nXCIgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIFN0YW5kLWFsb25lIG1vbnRoXG4gIEw6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAxLCAyLCAuLi4sIDEyXG4gICAgICBjYXNlIFwiTFwiOlxuICAgICAgICByZXR1cm4gU3RyaW5nKG1vbnRoICsgMSk7XG4gICAgICAvLyAwMSwgMDIsIC4uLiwgMTJcbiAgICAgIGNhc2UgXCJMTFwiOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKG1vbnRoICsgMSwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gICAgICBjYXNlIFwiTG9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobW9udGggKyAxLCB7IHVuaXQ6IFwibW9udGhcIiB9KTtcbiAgICAgIC8vIEphbiwgRmViLCAuLi4sIERlY1xuICAgICAgY2FzZSBcIkxMTFwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEosIEYsIC4uLiwgRFxuICAgICAgY2FzZSBcIkxMTExMXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICAgICBjYXNlIFwiTExMTFwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7IHdpZHRoOiBcIndpZGVcIiwgY29udGV4dDogXCJzdGFuZGFsb25lXCIgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIExvY2FsIHdlZWsgb2YgeWVhclxuICB3OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgd2VlayA9IGdldFdlZWsoZGF0ZSwgb3B0aW9ucyk7XG5cbiAgICBpZiAodG9rZW4gPT09IFwid29cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIod2VlaywgeyB1bml0OiBcIndlZWtcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHdlZWssIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gSVNPIHdlZWsgb2YgeWVhclxuICBJOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgaXNvV2VlayA9IGdldElTT1dlZWsoZGF0ZSk7XG5cbiAgICBpZiAodG9rZW4gPT09IFwiSW9cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaXNvV2VlaywgeyB1bml0OiBcIndlZWtcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGlzb1dlZWssIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHRoZSBtb250aFxuICBkOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSBcImRvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0RGF0ZSgpLCB7IHVuaXQ6IFwiZGF0ZVwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuZChkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHllYXJcbiAgRDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGRheU9mWWVhciA9IGdldERheU9mWWVhcihkYXRlKTtcblxuICAgIGlmICh0b2tlbiA9PT0gXCJEb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXlPZlllYXIsIHsgdW5pdDogXCJkYXlPZlllYXJcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRheU9mWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2Vla1xuICBFOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBUdWVcbiAgICAgIGNhc2UgXCJFXCI6XG4gICAgICBjYXNlIFwiRUVcIjpcbiAgICAgIGNhc2UgXCJFRUVcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgXCJFRUVFRVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlIFwiRUVFRUVFXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwic2hvcnRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdWVzZGF5XG4gICAgICBjYXNlIFwiRUVFRVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBMb2NhbCBkYXkgb2Ygd2Vla1xuICBlOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICBjb25zdCBsb2NhbERheU9mV2VlayA9IChkYXlPZldlZWsgLSBvcHRpb25zLndlZWtTdGFydHNPbiArIDgpICUgNyB8fCA3O1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIE51bWVyaWNhbCB2YWx1ZSAoTnRoIGRheSBvZiB3ZWVrIHdpdGggY3VycmVudCBsb2NhbGUgb3Igd2Vla1N0YXJ0c09uKVxuICAgICAgY2FzZSBcImVcIjpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhsb2NhbERheU9mV2Vlayk7XG4gICAgICAvLyBQYWRkZWQgbnVtZXJpY2FsIHZhbHVlXG4gICAgICBjYXNlIFwiZWVcIjpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhsb2NhbERheU9mV2VlaywgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCA3dGhcbiAgICAgIGNhc2UgXCJlb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihsb2NhbERheU9mV2VlaywgeyB1bml0OiBcImRheVwiIH0pO1xuICAgICAgY2FzZSBcImVlZVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSBcImVlZWVlXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgXCJlZWVlZWVcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgXCJlZWVlXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIFN0YW5kLWFsb25lIGxvY2FsIGRheSBvZiB3ZWVrXG4gIGM6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlLmdldERheSgpO1xuICAgIGNvbnN0IGxvY2FsRGF5T2ZXZWVrID0gKGRheU9mV2VlayAtIG9wdGlvbnMud2Vla1N0YXJ0c09uICsgOCkgJSA3IHx8IDc7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gTnVtZXJpY2FsIHZhbHVlIChzYW1lIGFzIGluIGBlYClcbiAgICAgIGNhc2UgXCJjXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcobG9jYWxEYXlPZldlZWspO1xuICAgICAgLy8gUGFkZGVkIG51bWVyaWNhbCB2YWx1ZVxuICAgICAgY2FzZSBcImNjXCI6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MobG9jYWxEYXlPZldlZWssIHRva2VuLmxlbmd0aCk7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCA3dGhcbiAgICAgIGNhc2UgXCJjb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihsb2NhbERheU9mV2VlaywgeyB1bml0OiBcImRheVwiIH0pO1xuICAgICAgY2FzZSBcImNjY1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSBcImNjY2NjXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgXCJjY2NjY2NcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgXCJjY2NjXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIElTTyBkYXkgb2Ygd2Vla1xuICBpOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICBjb25zdCBpc29EYXlPZldlZWsgPSBkYXlPZldlZWsgPT09IDAgPyA3IDogZGF5T2ZXZWVrO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDJcbiAgICAgIGNhc2UgXCJpXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcoaXNvRGF5T2ZXZWVrKTtcbiAgICAgIC8vIDAyXG4gICAgICBjYXNlIFwiaWlcIjpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhpc29EYXlPZldlZWssIHRva2VuLmxlbmd0aCk7XG4gICAgICAvLyAybmRcbiAgICAgIGNhc2UgXCJpb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihpc29EYXlPZldlZWssIHsgdW5pdDogXCJkYXlcIiB9KTtcbiAgICAgIC8vIFR1ZVxuICAgICAgY2FzZSBcImlpaVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSBcImlpaWlpXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgXCJpaWlpaWlcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgXCJpaWlpXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFNIG9yIFBNXG4gIGE6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBkYXlQZXJpb2RFbnVtVmFsdWUgPSBob3VycyAvIDEyID49IDEgPyBcInBtXCIgOiBcImFtXCI7XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiYVwiOlxuICAgICAgY2FzZSBcImFhXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIFwiYWFhXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZVxuICAgICAgICAgIC5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNhc2UgXCJhYWFhYVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIGNhc2UgXCJhYWFhXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFNLCBQTSwgbWlkbmlnaHQsIG5vb25cbiAgYjogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGxldCBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgaWYgKGhvdXJzID09PSAxMikge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5ub29uO1xuICAgIH0gZWxzZSBpZiAoaG91cnMgPT09IDApIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubWlkbmlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGhvdXJzIC8gMTIgPj0gMSA/IFwicG1cIiA6IFwiYW1cIjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgY2FzZSBcImJiXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIFwiYmJiXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZVxuICAgICAgICAgIC5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNhc2UgXCJiYmJiYlwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIGNhc2UgXCJiYmJiXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIGluIHRoZSBtb3JuaW5nLCBpbiB0aGUgYWZ0ZXJub29uLCBpbiB0aGUgZXZlbmluZywgYXQgbmlnaHRcbiAgQjogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGxldCBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgaWYgKGhvdXJzID49IDE3KSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLmV2ZW5pbmc7XG4gICAgfSBlbHNlIGlmIChob3VycyA+PSAxMikge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5hZnRlcm5vb247XG4gICAgfSBlbHNlIGlmIChob3VycyA+PSA0KSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLm1vcm5pbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubmlnaHQ7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSBcIkJcIjpcbiAgICAgIGNhc2UgXCJCQlwiOlxuICAgICAgY2FzZSBcIkJCQlwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSBcIkJCQkJCXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSBcIkJCQkJcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwid2lkZVwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gSG91ciBbMS0xMl1cbiAgaDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gXCJob1wiKSB7XG4gICAgICBsZXQgaG91cnMgPSBkYXRlLmdldEhvdXJzKCkgJSAxMjtcbiAgICAgIGlmIChob3VycyA9PT0gMCkgaG91cnMgPSAxMjtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7IHVuaXQ6IFwiaG91clwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuaChkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gSG91ciBbMC0yM11cbiAgSDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gXCJIb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldEhvdXJzKCksIHsgdW5pdDogXCJob3VyXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5IKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBIb3VyIFswLTExXVxuICBLOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCkgJSAxMjtcblxuICAgIGlmICh0b2tlbiA9PT0gXCJLb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihob3VycywgeyB1bml0OiBcImhvdXJcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGhvdXJzLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIEhvdXIgWzEtMjRdXG4gIGs6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBsZXQgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgaWYgKGhvdXJzID09PSAwKSBob3VycyA9IDI0O1xuXG4gICAgaWYgKHRva2VuID09PSBcImtvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7IHVuaXQ6IFwiaG91clwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaG91cnMsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gTWludXRlXG4gIG06IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09IFwibW9cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRNaW51dGVzKCksIHsgdW5pdDogXCJtaW51dGVcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLm0oZGF0ZSwgdG9rZW4pO1xuICB9LFxuXG4gIC8vIFNlY29uZFxuICBzOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSBcInNvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0U2Vjb25kcygpLCB7IHVuaXQ6IFwic2Vjb25kXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5zKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBGcmFjdGlvbiBvZiBzZWNvbmRcbiAgUzogZnVuY3Rpb24gKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5TKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBUaW1lem9uZSAoSVNPLTg2MDEuIElmIG9mZnNldCBpcyAwLCBvdXRwdXQgaXMgYWx3YXlzIGAnWidgKVxuICBYOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5cbiAgICBpZiAodGltZXpvbmVPZmZzZXQgPT09IDApIHtcbiAgICAgIHJldHVybiBcIlpcIjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBIb3VycyBhbmQgb3B0aW9uYWwgbWludXRlc1xuICAgICAgY2FzZSBcIlhcIjpcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lV2l0aE9wdGlvbmFsTWludXRlcyh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGhvdXQgYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYFhYYFxuICAgICAgY2FzZSBcIlhYWFhcIjpcbiAgICAgIGNhc2UgXCJYWFwiOiAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0KTtcblxuICAgICAgLy8gSG91cnMsIG1pbnV0ZXMgYW5kIG9wdGlvbmFsIHNlY29uZHMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICAvLyBOb3RlOiBuZWl0aGVyIElTTy04NjAxIG5vciBKYXZhU2NyaXB0IHN1cHBvcnRzIHNlY29uZHMgaW4gdGltZXpvbmUgb2Zmc2V0c1xuICAgICAgLy8gc28gdGhpcyB0b2tlbiBhbHdheXMgaGFzIHRoZSBzYW1lIG91dHB1dCBhcyBgWFhYYFxuICAgICAgY2FzZSBcIlhYWFhYXCI6XG4gICAgICBjYXNlIFwiWFhYXCI6IC8vIEhvdXJzIGFuZCBtaW51dGVzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0LCBcIjpcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIFRpbWV6b25lIChJU08tODYwMS4gSWYgb2Zmc2V0IGlzIDAsIG91dHB1dCBpcyBgJyswMDowMCdgIG9yIGVxdWl2YWxlbnQpXG4gIHg6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgY29uc3QgdGltZXpvbmVPZmZzZXQgPSBvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcblxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIEhvdXJzIGFuZCBvcHRpb25hbCBtaW51dGVzXG4gICAgICBjYXNlIFwieFwiOlxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmVXaXRoT3B0aW9uYWxNaW51dGVzKHRpbWV6b25lT2Zmc2V0KTtcblxuICAgICAgLy8gSG91cnMsIG1pbnV0ZXMgYW5kIG9wdGlvbmFsIHNlY29uZHMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAvLyBOb3RlOiBuZWl0aGVyIElTTy04NjAxIG5vciBKYXZhU2NyaXB0IHN1cHBvcnRzIHNlY29uZHMgaW4gdGltZXpvbmUgb2Zmc2V0c1xuICAgICAgLy8gc28gdGhpcyB0b2tlbiBhbHdheXMgaGFzIHRoZSBzYW1lIG91dHB1dCBhcyBgeHhgXG4gICAgICBjYXNlIFwieHh4eFwiOlxuICAgICAgY2FzZSBcInh4XCI6IC8vIEhvdXJzIGFuZCBtaW51dGVzIHdpdGhvdXQgYDpgIGRlbGltaXRlclxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGB4eHhgXG4gICAgICBjYXNlIFwieHh4eHhcIjpcbiAgICAgIGNhc2UgXCJ4eHhcIjogLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQsIFwiOlwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gVGltZXpvbmUgKEdNVClcbiAgTzogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICBjb25zdCB0aW1lem9uZU9mZnNldCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gU2hvcnRcbiAgICAgIGNhc2UgXCJPXCI6XG4gICAgICBjYXNlIFwiT09cIjpcbiAgICAgIGNhc2UgXCJPT09cIjpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZVNob3J0KHRpbWV6b25lT2Zmc2V0LCBcIjpcIik7XG4gICAgICAvLyBMb25nXG4gICAgICBjYXNlIFwiT09PT1wiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBUaW1lem9uZSAoc3BlY2lmaWMgbm9uLWxvY2F0aW9uKVxuICB6OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBTaG9ydFxuICAgICAgY2FzZSBcInpcIjpcbiAgICAgIGNhc2UgXCJ6elwiOlxuICAgICAgY2FzZSBcInp6elwiOlxuICAgICAgICByZXR1cm4gXCJHTVRcIiArIGZvcm1hdFRpbWV6b25lU2hvcnQodGltZXpvbmVPZmZzZXQsIFwiOlwiKTtcbiAgICAgIC8vIExvbmdcbiAgICAgIGNhc2UgXCJ6enp6XCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gXCJHTVRcIiArIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0LCBcIjpcIik7XG4gICAgfVxuICB9LFxuXG4gIC8vIFNlY29uZHMgdGltZXN0YW1wXG4gIHQ6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgY29uc3QgdGltZXN0YW1wID0gTWF0aC5mbG9vcihvcmlnaW5hbERhdGUuZ2V0VGltZSgpIC8gMTAwMCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0aW1lc3RhbXAsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gTWlsbGlzZWNvbmRzIHRpbWVzdGFtcFxuICBUOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lKCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0aW1lc3RhbXAsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG59O1xuXG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZVNob3J0KG9mZnNldCwgZGVsaW1pdGVyID0gXCJcIikge1xuICBjb25zdCBzaWduID0gb2Zmc2V0ID4gMCA/IFwiLVwiIDogXCIrXCI7XG4gIGNvbnN0IGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihhYnNPZmZzZXQgLyA2MCk7XG4gIGNvbnN0IG1pbnV0ZXMgPSBhYnNPZmZzZXQgJSA2MDtcbiAgaWYgKG1pbnV0ZXMgPT09IDApIHtcbiAgICByZXR1cm4gc2lnbiArIFN0cmluZyhob3Vycyk7XG4gIH1cbiAgcmV0dXJuIHNpZ24gKyBTdHJpbmcoaG91cnMpICsgZGVsaW1pdGVyICsgYWRkTGVhZGluZ1plcm9zKG1pbnV0ZXMsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXMob2Zmc2V0LCBkZWxpbWl0ZXIpIHtcbiAgaWYgKG9mZnNldCAlIDYwID09PSAwKSB7XG4gICAgY29uc3Qgc2lnbiA9IG9mZnNldCA+IDAgPyBcIi1cIiA6IFwiK1wiO1xuICAgIHJldHVybiBzaWduICsgYWRkTGVhZGluZ1plcm9zKE1hdGguYWJzKG9mZnNldCkgLyA2MCwgMik7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKG9mZnNldCwgZGVsaW1pdGVyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltZXpvbmUob2Zmc2V0LCBkZWxpbWl0ZXIgPSBcIlwiKSB7XG4gIGNvbnN0IHNpZ24gPSBvZmZzZXQgPiAwID8gXCItXCIgOiBcIitcIjtcbiAgY29uc3QgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgY29uc3QgaG91cnMgPSBhZGRMZWFkaW5nWmVyb3MoTWF0aC5mbG9vcihhYnNPZmZzZXQgLyA2MCksIDIpO1xuICBjb25zdCBtaW51dGVzID0gYWRkTGVhZGluZ1plcm9zKGFic09mZnNldCAlIDYwLCAyKTtcbiAgcmV0dXJuIHNpZ24gKyBob3VycyArIGRlbGltaXRlciArIG1pbnV0ZXM7XG59XG4iLCJjb25zdCBkYXRlTG9uZ0Zvcm1hdHRlciA9IChwYXR0ZXJuLCBmb3JtYXRMb25nKSA9PiB7XG4gIHN3aXRjaCAocGF0dGVybikge1xuICAgIGNhc2UgXCJQXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHsgd2lkdGg6IFwic2hvcnRcIiB9KTtcbiAgICBjYXNlIFwiUFBcIjpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoeyB3aWR0aDogXCJtZWRpdW1cIiB9KTtcbiAgICBjYXNlIFwiUFBQXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHsgd2lkdGg6IFwibG9uZ1wiIH0pO1xuICAgIGNhc2UgXCJQUFBQXCI6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLmRhdGUoeyB3aWR0aDogXCJmdWxsXCIgfSk7XG4gIH1cbn07XG5cbmNvbnN0IHRpbWVMb25nRm9ybWF0dGVyID0gKHBhdHRlcm4sIGZvcm1hdExvbmcpID0+IHtcbiAgc3dpdGNoIChwYXR0ZXJuKSB7XG4gICAgY2FzZSBcInBcIjpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoeyB3aWR0aDogXCJzaG9ydFwiIH0pO1xuICAgIGNhc2UgXCJwcFwiOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7IHdpZHRoOiBcIm1lZGl1bVwiIH0pO1xuICAgIGNhc2UgXCJwcHBcIjpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoeyB3aWR0aDogXCJsb25nXCIgfSk7XG4gICAgY2FzZSBcInBwcHBcIjpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7IHdpZHRoOiBcImZ1bGxcIiB9KTtcbiAgfVxufTtcblxuY29uc3QgZGF0ZVRpbWVMb25nRm9ybWF0dGVyID0gKHBhdHRlcm4sIGZvcm1hdExvbmcpID0+IHtcbiAgY29uc3QgbWF0Y2hSZXN1bHQgPSBwYXR0ZXJuLm1hdGNoKC8oUCspKHArKT8vKSB8fCBbXTtcbiAgY29uc3QgZGF0ZVBhdHRlcm4gPSBtYXRjaFJlc3VsdFsxXTtcbiAgY29uc3QgdGltZVBhdHRlcm4gPSBtYXRjaFJlc3VsdFsyXTtcblxuICBpZiAoIXRpbWVQYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGRhdGVMb25nRm9ybWF0dGVyKHBhdHRlcm4sIGZvcm1hdExvbmcpO1xuICB9XG5cbiAgbGV0IGRhdGVUaW1lRm9ybWF0O1xuXG4gIHN3aXRjaCAoZGF0ZVBhdHRlcm4pIHtcbiAgICBjYXNlIFwiUFwiOlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHsgd2lkdGg6IFwic2hvcnRcIiB9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJQUFwiOlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHsgd2lkdGg6IFwibWVkaXVtXCIgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiUFBQXCI6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoeyB3aWR0aDogXCJsb25nXCIgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiUFBQUFwiOlxuICAgIGRlZmF1bHQ6XG4gICAgICBkYXRlVGltZUZvcm1hdCA9IGZvcm1hdExvbmcuZGF0ZVRpbWUoeyB3aWR0aDogXCJmdWxsXCIgfSk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBkYXRlVGltZUZvcm1hdFxuICAgIC5yZXBsYWNlKFwie3tkYXRlfX1cIiwgZGF0ZUxvbmdGb3JtYXR0ZXIoZGF0ZVBhdHRlcm4sIGZvcm1hdExvbmcpKVxuICAgIC5yZXBsYWNlKFwie3t0aW1lfX1cIiwgdGltZUxvbmdGb3JtYXR0ZXIodGltZVBhdHRlcm4sIGZvcm1hdExvbmcpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBsb25nRm9ybWF0dGVycyA9IHtcbiAgcDogdGltZUxvbmdGb3JtYXR0ZXIsXG4gIFA6IGRhdGVUaW1lTG9uZ0Zvcm1hdHRlcixcbn07XG4iLCJjb25zdCBwcm90ZWN0ZWREYXlPZlllYXJUb2tlbnMgPSBbXCJEXCIsIFwiRERcIl07XG5jb25zdCBwcm90ZWN0ZWRXZWVrWWVhclRva2VucyA9IFtcIllZXCIsIFwiWVlZWVwiXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW4odG9rZW4pIHtcbiAgcmV0dXJuIHByb3RlY3RlZERheU9mWWVhclRva2Vucy5pbmRleE9mKHRva2VuKSAhPT0gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4odG9rZW4pIHtcbiAgcmV0dXJuIHByb3RlY3RlZFdlZWtZZWFyVG9rZW5zLmluZGV4T2YodG9rZW4pICE9PSAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRocm93UHJvdGVjdGVkRXJyb3IodG9rZW4sIGZvcm1hdCwgaW5wdXQpIHtcbiAgaWYgKHRva2VuID09PSBcIllZWVlcIikge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFxuICAgICAgYFVzZSBcXGB5eXl5XFxgIGluc3RlYWQgb2YgXFxgWVlZWVxcYCAoaW4gXFxgJHtmb3JtYXR9XFxgKSBmb3IgZm9ybWF0dGluZyB5ZWFycyB0byB0aGUgaW5wdXQgXFxgJHtpbnB1dH1cXGA7IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZGAsXG4gICAgKTtcbiAgfSBlbHNlIGlmICh0b2tlbiA9PT0gXCJZWVwiKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXG4gICAgICBgVXNlIFxcYHl5XFxgIGluc3RlYWQgb2YgXFxgWVlcXGAgKGluIFxcYCR7Zm9ybWF0fVxcYCkgZm9yIGZvcm1hdHRpbmcgeWVhcnMgdG8gdGhlIGlucHV0IFxcYCR7aW5wdXR9XFxgOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRgLFxuICAgICk7XG4gIH0gZWxzZSBpZiAodG9rZW4gPT09IFwiRFwiKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXG4gICAgICBgVXNlIFxcYGRcXGAgaW5zdGVhZCBvZiBcXGBEXFxgIChpbiBcXGAke2Zvcm1hdH1cXGApIGZvciBmb3JtYXR0aW5nIGRheXMgb2YgdGhlIG1vbnRoIHRvIHRoZSBpbnB1dCBcXGAke2lucHV0fVxcYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kYCxcbiAgICApO1xuICB9IGVsc2UgaWYgKHRva2VuID09PSBcIkREXCIpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcbiAgICAgIGBVc2UgXFxgZGRcXGAgaW5zdGVhZCBvZiBcXGBERFxcYCAoaW4gXFxgJHtmb3JtYXR9XFxgKSBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB0byB0aGUgaW5wdXQgXFxgJHtpbnB1dH1cXGA7IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZGAsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgaXNWYWxpZCB9IGZyb20gXCIuL2lzVmFsaWQubWpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBkZWZhdWx0TG9jYWxlIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0TG9jYWxlLm1qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi9fbGliL2RlZmF1bHRPcHRpb25zLm1qc1wiO1xuaW1wb3J0IHsgZm9ybWF0dGVycyB9IGZyb20gXCIuL19saWIvZm9ybWF0L2Zvcm1hdHRlcnMubWpzXCI7XG5pbXBvcnQgeyBsb25nRm9ybWF0dGVycyB9IGZyb20gXCIuL19saWIvZm9ybWF0L2xvbmdGb3JtYXR0ZXJzLm1qc1wiO1xuaW1wb3J0IHtcbiAgaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbixcbiAgaXNQcm90ZWN0ZWRXZWVrWWVhclRva2VuLFxuICB0aHJvd1Byb3RlY3RlZEVycm9yLFxufSBmcm9tIFwiLi9fbGliL3Byb3RlY3RlZFRva2Vucy5tanNcIjtcblxuLy8gVGhpcyBSZWdFeHAgY29uc2lzdHMgb2YgdGhyZWUgcGFydHMgc2VwYXJhdGVkIGJ5IGB8YDpcbi8vIC0gW3lZUXFNTHdJZERlY2loSEtrbXNdbyBtYXRjaGVzIGFueSBhdmFpbGFibGUgb3JkaW5hbCBudW1iZXIgdG9rZW5cbi8vICAgKG9uZSBvZiB0aGUgY2VydGFpbiBsZXR0ZXJzIGZvbGxvd2VkIGJ5IGBvYClcbi8vIC0gKFxcdylcXDEqIG1hdGNoZXMgYW55IHNlcXVlbmNlcyBvZiB0aGUgc2FtZSBsZXR0ZXJcbi8vIC0gJycgbWF0Y2hlcyB0d28gcXVvdGUgY2hhcmFjdGVycyBpbiBhIHJvd1xuLy8gLSAnKCcnfFteJ10pKygnfCQpIG1hdGNoZXMgYW55dGhpbmcgc3Vycm91bmRlZCBieSB0d28gcXVvdGUgY2hhcmFjdGVycyAoJyksXG4vLyAgIGV4Y2VwdCBhIHNpbmdsZSBxdW90ZSBzeW1ib2wsIHdoaWNoIGVuZHMgdGhlIHNlcXVlbmNlLlxuLy8gICBUd28gcXVvdGUgY2hhcmFjdGVycyBkbyBub3QgZW5kIHRoZSBzZXF1ZW5jZS5cbi8vICAgSWYgdGhlcmUgaXMgbm8gbWF0Y2hpbmcgc2luZ2xlIHF1b3RlXG4vLyAgIHRoZW4gdGhlIHNlcXVlbmNlIHdpbGwgY29udGludWUgdW50aWwgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLlxuLy8gLSAuIG1hdGNoZXMgYW55IHNpbmdsZSBjaGFyYWN0ZXIgdW5tYXRjaGVkIGJ5IHByZXZpb3VzIHBhcnRzIG9mIHRoZSBSZWdFeHBzXG5jb25zdCBmb3JtYXR0aW5nVG9rZW5zUmVnRXhwID1cbiAgL1t5WVFxTUx3SWREZWNpaEhLa21zXW98KFxcdylcXDEqfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xuXG4vLyBUaGlzIFJlZ0V4cCBjYXRjaGVzIHN5bWJvbHMgZXNjYXBlZCBieSBxdW90ZXMsIGFuZCBhbHNvXG4vLyBzZXF1ZW5jZXMgb2Ygc3ltYm9scyBQLCBwLCBhbmQgdGhlIGNvbWJpbmF0aW9ucyBsaWtlIGBQUFBQUFBQcHBwcHBgXG5jb25zdCBsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IC9QK3ArfFArfHArfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xuXG5jb25zdCBlc2NhcGVkU3RyaW5nUmVnRXhwID0gL14nKFteXSo/KSc/JC87XG5jb25zdCBkb3VibGVRdW90ZVJlZ0V4cCA9IC8nJy9nO1xuY29uc3QgdW5lc2NhcGVkTGF0aW5DaGFyYWN0ZXJSZWdFeHAgPSAvW2EtekEtWl0vO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZm9ybWF0fSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgZm9ybWF0XG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEZvcm1hdCB0aGUgZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nIGluIHRoZSBnaXZlbiBmb3JtYXQuIFRoZSByZXN1bHQgbWF5IHZhcnkgYnkgbG9jYWxlLlxuICpcbiAqID4g4pqg77iPIFBsZWFzZSBub3RlIHRoYXQgdGhlIGBmb3JtYXRgIHRva2VucyBkaWZmZXIgZnJvbSBNb21lbnQuanMgYW5kIG90aGVyIGxpYnJhcmllcy5cbiAqID4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKlxuICogVGhlIGNoYXJhY3RlcnMgd3JhcHBlZCBiZXR3ZWVuIHR3byBzaW5nbGUgcXVvdGVzIGNoYXJhY3RlcnMgKCcpIGFyZSBlc2NhcGVkLlxuICogVHdvIHNpbmdsZSBxdW90ZXMgaW4gYSByb3csIHdoZXRoZXIgaW5zaWRlIG9yIG91dHNpZGUgYSBxdW90ZWQgc2VxdWVuY2UsIHJlcHJlc2VudCBhICdyZWFsJyBzaW5nbGUgcXVvdGUuXG4gKiAoc2VlIHRoZSBsYXN0IGV4YW1wbGUpXG4gKlxuICogRm9ybWF0IG9mIHRoZSBzdHJpbmcgaXMgYmFzZWQgb24gVW5pY29kZSBUZWNobmljYWwgU3RhbmRhcmQgIzM1OlxuICogaHR0cHM6Ly93d3cudW5pY29kZS5vcmcvcmVwb3J0cy90cjM1L3RyMzUtZGF0ZXMuaHRtbCNEYXRlX0ZpZWxkX1N5bWJvbF9UYWJsZVxuICogd2l0aCBhIGZldyBhZGRpdGlvbnMgKHNlZSBub3RlIDcgYmVsb3cgdGhlIHRhYmxlKS5cbiAqXG4gKiBBY2NlcHRlZCBwYXR0ZXJuczpcbiAqIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBhdHRlcm4gfCBSZXN1bHQgZXhhbXBsZXMgICAgICAgICAgICAgICAgICAgfCBOb3RlcyB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tfFxuICogfCBFcmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRy4uR0dHICB8IEFELCBCQyAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEdHR0cgICAgfCBBbm5vIERvbWluaSwgQmVmb3JlIENocmlzdCAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBHR0dHRyAgIHwgQSwgQiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBDYWxlbmRhciB5ZWFyICAgICAgICAgICAgICAgICAgIHwgeSAgICAgICB8IDQ0LCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHlvICAgICAgfCA0NHRoLCAxc3QsIDB0aCwgMTd0aCAgICAgICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eSAgICAgIHwgNDQsIDAxLCAwMCwgMTcgICAgICAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXl5ICAgICB8IDA0NCwgMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5eXkgICAgfCAwMDQ0LCAwMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eXl5eSAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1ICAgfFxuICogfCBMb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgIHwgWSAgICAgICB8IDQ0LCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlvICAgICAgfCA0NHRoLCAxc3QsIDE5MDB0aCwgMjAxN3RoICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWSAgICAgIHwgNDQsIDAxLCAwMCwgMTcgICAgICAgICAgICAgICAgICAgIHwgNSw4ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVlZICAgICB8IDA0NCwgMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZWVkgICAgfCAwMDQ0LCAwMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgfCA1LDggICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVlZWSAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1ICAgfFxuICogfCBJU08gd2Vlay1udW1iZXJpbmcgeWVhciAgICAgICAgIHwgUiAgICAgICB8IC00MywgMCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSICAgICAgfCAtNDMsIDAwLCAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUlIgICAgIHwgLTA0MywgMDAwLCAwMDEsIDE5MDAsIDIwMTcgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlJSUiAgICB8IC0wMDQzLCAwMDAwLCAwMDAxLCAxOTAwLCAyMDE3ICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSUlJSICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUsNyB8XG4gKiB8IEV4dGVuZGVkIHllYXIgICAgICAgICAgICAgICAgICAgfCB1ICAgICAgIHwgLTQzLCAwLCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXUgICAgICB8IC00MywgMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1dSAgICAgfCAtMDQzLCAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dXV1ICAgIHwgLTAwNDMsIDAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXV1dXUgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSAgIHxcbiAqIHwgUXVhcnRlciAoZm9ybWF0dGluZykgICAgICAgICAgICB8IFEgICAgICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRbyAgICAgIHwgMXN0LCAybmQsIDNyZCwgNHRoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVEgICAgICB8IDAxLCAwMiwgMDMsIDA0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRUSAgICAgfCBRMSwgUTIsIFEzLCBRNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUVFRICAgIHwgMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi4gICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVFRUVEgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8IDQgICAgIHxcbiAqIHwgUXVhcnRlciAoc3RhbmQtYWxvbmUpICAgICAgICAgICB8IHEgICAgICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxbyAgICAgIHwgMXN0LCAybmQsIDNyZCwgNHRoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXEgICAgICB8IDAxLCAwMiwgMDMsIDA0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxcSAgICAgfCBRMSwgUTIsIFEzLCBRNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcXFxICAgIHwgMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi4gICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXFxcXEgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8IDQgICAgIHxcbiAqIHwgTW9udGggKGZvcm1hdHRpbmcpICAgICAgICAgICAgICB8IE0gICAgICAgfCAxLCAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTJ0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU0gICAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NTSAgICAgfCBKYW4sIEZlYiwgLi4uLCBEZWMgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU1NICAgIHwgSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXIgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU1NTU0gICB8IEosIEYsIC4uLiwgRCAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgTW9udGggKHN0YW5kLWFsb25lKSAgICAgICAgICAgICB8IEwgICAgICAgfCAxLCAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTJ0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTEwgICAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMTCAgICAgfCBKYW4sIEZlYiwgLi4uLCBEZWMgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTExMICAgIHwgSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXIgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTExMTEwgICB8IEosIEYsIC4uLiwgRCAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgTG9jYWwgd2VlayBvZiB5ZWFyICAgICAgICAgICAgICB8IHcgICAgICAgfCAxLCAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB3byAgICAgIHwgMXN0LCAybmQsIC4uLiwgNTN0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgd3cgICAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSVNPIHdlZWsgb2YgeWVhciAgICAgICAgICAgICAgICB8IEkgICAgICAgfCAxLCAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBJbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgNTN0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSUkgICAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgICAgICAgICB8IGQgICAgICAgfCAxLCAyLCAuLi4sIDMxICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBkbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMzFzdCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZGQgICAgICB8IDAxLCAwMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgRGF5IG9mIHllYXIgICAgICAgICAgICAgICAgICAgICB8IEQgICAgICAgfCAxLCAyLCAuLi4sIDM2NSwgMzY2ICAgICAgICAgICAgICAgfCA5ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBEbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMzY1dGgsIDM2NnRoICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgREQgICAgICB8IDAxLCAwMiwgLi4uLCAzNjUsIDM2NiAgICAgICAgICAgICB8IDkgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IERERCAgICAgfCAwMDEsIDAwMiwgLi4uLCAzNjUsIDM2NiAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBEREREICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyAgICAgfFxuICogfCBEYXkgb2Ygd2VlayAoZm9ybWF0dGluZykgICAgICAgIHwgRS4uRUVFICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEVFRUUgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBFRUVFRSAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRUVFRUVFICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8ICAgICAgIHxcbiAqIHwgSVNPIGRheSBvZiB3ZWVrIChmb3JtYXR0aW5nKSAgICB8IGkgICAgICAgfCAxLCAyLCAzLCAuLi4sIDcgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgN3RoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWkgICAgICB8IDAxLCAwMiwgLi4uLCAwNyAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaSAgICAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWlpICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpaWkgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaWlpaSAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCA3ICAgICB8XG4gKiB8IExvY2FsIGRheSBvZiB3ZWVrIChmb3JtYXR0aW5nKSAgfCBlICAgICAgIHwgMiwgMywgNCwgLi4uLCAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZW8gICAgICB8IDJuZCwgM3JkLCAuLi4sIDFzdCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlICAgICAgfCAwMiwgMDMsIC4uLiwgMDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWUgICAgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlZSAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZWVlICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWVlZWUgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgICAgICAgfFxuICogfCBMb2NhbCBkYXkgb2Ygd2VlayAoc3RhbmQtYWxvbmUpIHwgYyAgICAgICB8IDIsIDMsIDQsIC4uLiwgMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNvICAgICAgfCAybmQsIDNyZCwgLi4uLCAxc3QgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjYyAgICAgIHwgMDIsIDAzLCAuLi4sIDAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjICAgICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjY2MgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2NjYyAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjY2NjICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8ICAgICAgIHxcbiAqIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgICB8IGEuLmFhICAgfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYWEgICAgIHwgYW0sIHBtICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWFhYSAgICB8IGEubS4sIHAubS4gICAgICAgICAgICAgICAgICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFhYWFhICAgfCBhLCBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICAgfCBiLi5iYiAgIHwgQU0sIFBNLCBub29uLCBtaWRuaWdodCAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYmJiICAgICB8IGFtLCBwbSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGJiYmIgICAgfCBhLm0uLCBwLm0uLCBub29uLCBtaWRuaWdodCAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBiYmJiYiAgIHwgYSwgcCwgbiwgbWkgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBGbGV4aWJsZSBkYXkgcGVyaW9kICAgICAgICAgICAgIHwgQi4uQkJCICB8IGF0IG5pZ2h0LCBpbiB0aGUgbW9ybmluZywgLi4uICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEJCQkIgICAgfCBhdCBuaWdodCwgaW4gdGhlIG1vcm5pbmcsIC4uLiAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBCQkJCQiAgIHwgYXQgbmlnaHQsIGluIHRoZSBtb3JuaW5nLCAuLi4gICAgIHwgICAgICAgfFxuICogfCBIb3VyIFsxLTEyXSAgICAgICAgICAgICAgICAgICAgIHwgaCAgICAgICB8IDEsIDIsIC4uLiwgMTEsIDEyICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGhvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMXRoLCAxMnRoICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBoaCAgICAgIHwgMDEsIDAyLCAuLi4sIDExLCAxMiAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFswLTIzXSAgICAgICAgICAgICAgICAgICAgIHwgSCAgICAgICB8IDAsIDEsIDIsIC4uLiwgMjMgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEhvICAgICAgfCAwdGgsIDFzdCwgMm5kLCAuLi4sIDIzcmQgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBISCAgICAgIHwgMDAsIDAxLCAwMiwgLi4uLCAyMyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFswLTExXSAgICAgICAgICAgICAgICAgICAgIHwgSyAgICAgICB8IDEsIDIsIC4uLiwgMTEsIDAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEtvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMXRoLCAwdGggICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBLSyAgICAgIHwgMDEsIDAyLCAuLi4sIDExLCAwMCAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFsxLTI0XSAgICAgICAgICAgICAgICAgICAgIHwgayAgICAgICB8IDI0LCAxLCAyLCAuLi4sIDIzICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGtvICAgICAgfCAyNHRoLCAxc3QsIDJuZCwgLi4uLCAyM3JkICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBrayAgICAgIHwgMjQsIDAxLCAwMiwgLi4uLCAyMyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBNaW51dGUgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbSAgICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG1vICAgICAgfCAwdGgsIDFzdCwgLi4uLCA1OXRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBtbSAgICAgIHwgMDAsIDAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBTZWNvbmQgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcyAgICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHNvICAgICAgfCAwdGgsIDFzdCwgLi4uLCA1OXRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBzcyAgICAgIHwgMDAsIDAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBGcmFjdGlvbiBvZiBzZWNvbmQgICAgICAgICAgICAgIHwgUyAgICAgICB8IDAsIDEsIC4uLiwgOSAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNTICAgICAgfCAwMCwgMDEsIC4uLiwgOTkgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBTU1MgICAgIHwgMDAwLCAwMDEsIC4uLiwgOTk5ICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU1NTUyAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMgICAgIHxcbiAqIHwgVGltZXpvbmUgKElTTy04NjAxIHcvIFopICAgICAgICB8IFggICAgICAgfCAtMDgsICswNTMwLCBaICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWCAgICAgIHwgLTA4MDAsICswNTMwLCBaICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFhYICAgICB8IC0wODowMCwgKzA1OjMwLCBaICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYWFggICAgfCAtMDgwMCwgKzA1MzAsIFosICsxMjM0NTYgICAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWFhYWCAgIHwgLTA4OjAwLCArMDU6MzAsIFosICsxMjozNDo1NiAgICAgIHwgICAgICAgfFxuICogfCBUaW1lem9uZSAoSVNPLTg2MDEgdy9vIFopICAgICAgIHwgeCAgICAgICB8IC0wOCwgKzA1MzAsICswMCAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4ICAgICAgfCAtMDgwMCwgKzA1MzAsICswMDAwICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eHggICAgIHwgLTA4OjAwLCArMDU6MzAsICswMDowMCAgICAgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHh4eCAgICB8IC0wODAwLCArMDUzMCwgKzAwMDAsICsxMjM0NTYgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4eHh4ICAgfCAtMDg6MDAsICswNTozMCwgKzAwOjAwLCArMTI6MzQ6NTYgfCAgICAgICB8XG4gKiB8IFRpbWV6b25lIChHTVQpICAgICAgICAgICAgICAgICAgfCBPLi4uT09PIHwgR01ULTgsIEdNVCs1OjMwLCBHTVQrMCAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgT09PTyAgICB8IEdNVC0wODowMCwgR01UKzA1OjMwLCBHTVQrMDA6MDAgICB8IDIgICAgIHxcbiAqIHwgVGltZXpvbmUgKHNwZWNpZmljIG5vbi1sb2NhdC4pICB8IHouLi56enogfCBHTVQtOCwgR01UKzU6MzAsIEdNVCswICAgICAgICAgICAgfCA2ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB6enp6ICAgIHwgR01ULTA4OjAwLCBHTVQrMDU6MzAsIEdNVCswMDowMCAgIHwgMiw2ICAgfFxuICogfCBTZWNvbmRzIHRpbWVzdGFtcCAgICAgICAgICAgICAgIHwgdCAgICAgICB8IDUxMjk2OTUyMCAgICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHR0ICAgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDcgICB8XG4gKiB8IE1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICAgfCBUICAgICAgIHwgNTEyOTY5NTIwOTAwICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgVFQgICAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNyAgIHxcbiAqIHwgTG9uZyBsb2NhbGl6ZWQgZGF0ZSAgICAgICAgICAgICB8IFAgICAgICAgfCAwNC8yOS8xNDUzICAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUCAgICAgIHwgQXByIDI5LCAxNDUzICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQICAgICB8IEFwcmlsIDI5dGgsIDE0NTMgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUFAgICAgfCBGcmlkYXksIEFwcmlsIDI5dGgsIDE0NTMgICAgICAgICAgfCAyLDcgICB8XG4gKiB8IExvbmcgbG9jYWxpemVkIHRpbWUgICAgICAgICAgICAgfCBwICAgICAgIHwgMTI6MDAgQU0gICAgICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcHAgICAgICB8IDEyOjAwOjAwIEFNICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHBwcCAgICAgfCAxMjowMDowMCBBTSBHTVQrMiAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBwcHBwICAgIHwgMTI6MDA6MDAgQU0gR01UKzAyOjAwICAgICAgICAgICAgIHwgMiw3ICAgfFxuICogfCBDb21iaW5hdGlvbiBvZiBkYXRlIGFuZCB0aW1lICAgIHwgUHAgICAgICB8IDA0LzI5LzE0NTMsIDEyOjAwIEFNICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQcHAgICAgfCBBcHIgMjksIDE0NTMsIDEyOjAwOjAwIEFNICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFBwcHAgIHwgQXByaWwgMjl0aCwgMTQ1MyBhdCAuLi4gICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQUHBwcHB8IEZyaWRheSwgQXByaWwgMjl0aCwgMTQ1MyBhdCAuLi4gICB8IDIsNyAgIHxcbiAqIE5vdGVzOlxuICogMS4gXCJGb3JtYXR0aW5nXCIgdW5pdHMgKGUuZy4gZm9ybWF0dGluZyBxdWFydGVyKSBpbiB0aGUgZGVmYXVsdCBlbi1VUyBsb2NhbGVcbiAqICAgIGFyZSB0aGUgc2FtZSBhcyBcInN0YW5kLWFsb25lXCIgdW5pdHMsIGJ1dCBhcmUgZGlmZmVyZW50IGluIHNvbWUgbGFuZ3VhZ2VzLlxuICogICAgXCJGb3JtYXR0aW5nXCIgdW5pdHMgYXJlIGRlY2xpbmVkIGFjY29yZGluZyB0byB0aGUgcnVsZXMgb2YgdGhlIGxhbmd1YWdlXG4gKiAgICBpbiB0aGUgY29udGV4dCBvZiBhIGRhdGUuIFwiU3RhbmQtYWxvbmVcIiB1bml0cyBhcmUgYWx3YXlzIG5vbWluYXRpdmUgc2luZ3VsYXI6XG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdkbyBMTExMJywge2xvY2FsZTogY3N9KSAvLz0+ICc2LiBsaXN0b3BhZCdgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdkbyBNTU1NJywge2xvY2FsZTogY3N9KSAvLz0+ICc2LiBsaXN0b3BhZHUnYFxuICpcbiAqIDIuIEFueSBzZXF1ZW5jZSBvZiB0aGUgaWRlbnRpY2FsIGxldHRlcnMgaXMgYSBwYXR0ZXJuLCB1bmxlc3MgaXQgaXMgZXNjYXBlZCBieVxuICogICAgdGhlIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzIChzZWUgYmVsb3cpLlxuICogICAgSWYgdGhlIHNlcXVlbmNlIGlzIGxvbmdlciB0aGFuIGxpc3RlZCBpbiB0YWJsZSAoZS5nLiBgRUVFRUVFRUVFRUVgKVxuICogICAgdGhlIG91dHB1dCB3aWxsIGJlIHRoZSBzYW1lIGFzIGRlZmF1bHQgcGF0dGVybiBmb3IgdGhpcyB1bml0LCB1c3VhbGx5XG4gKiAgICB0aGUgbG9uZ2VzdCBvbmUgKGluIGNhc2Ugb2YgSVNPIHdlZWtkYXlzLCBgRUVFRWApLiBEZWZhdWx0IHBhdHRlcm5zIGZvciB1bml0c1xuICogICAgYXJlIG1hcmtlZCB3aXRoIFwiMlwiIGluIHRoZSBsYXN0IGNvbHVtbiBvZiB0aGUgdGFibGUuXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU0nKSAvLz0+ICdOb3YnYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTScpIC8vPT4gJ05vdmVtYmVyJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU1NJykgLy89PiAnTidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NTU0nKSAvLz0+ICdOb3ZlbWJlcidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NTU1NJykgLy89PiAnTm92ZW1iZXInYFxuICpcbiAqIDMuIFNvbWUgcGF0dGVybnMgY291bGQgYmUgdW5saW1pdGVkIGxlbmd0aCAoc3VjaCBhcyBgeXl5eXl5eXlgKS5cbiAqICAgIFRoZSBvdXRwdXQgd2lsbCBiZSBwYWRkZWQgd2l0aCB6ZXJvcyB0byBtYXRjaCB0aGUgbGVuZ3RoIG9mIHRoZSBwYXR0ZXJuLlxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAneXl5eXl5eXknKSAvLz0+ICcwMDAwMjAxNydgXG4gKlxuICogNC4gYFFRUVFRYCBhbmQgYHFxcXFxYCBjb3VsZCBiZSBub3Qgc3RyaWN0bHkgbnVtZXJpY2FsIGluIHNvbWUgbG9jYWxlcy5cbiAqICAgIFRoZXNlIHRva2VucyByZXByZXNlbnQgdGhlIHNob3J0ZXN0IGZvcm0gb2YgdGhlIHF1YXJ0ZXIuXG4gKlxuICogNS4gVGhlIG1haW4gZGlmZmVyZW5jZSBiZXR3ZWVuIGB5YCBhbmQgYHVgIHBhdHRlcm5zIGFyZSBCLkMuIHllYXJzOlxuICpcbiAqICAgIHwgWWVhciB8IGB5YCB8IGB1YCB8XG4gKiAgICB8LS0tLS0tfC0tLS0tfC0tLS0tfFxuICogICAgfCBBQyAxIHwgICAxIHwgICAxIHxcbiAqICAgIHwgQkMgMSB8ICAgMSB8ICAgMCB8XG4gKiAgICB8IEJDIDIgfCAgIDIgfCAgLTEgfFxuICpcbiAqICAgIEFsc28gYHl5YCBhbHdheXMgcmV0dXJucyB0aGUgbGFzdCB0d28gZGlnaXRzIG9mIGEgeWVhcixcbiAqICAgIHdoaWxlIGB1dWAgcGFkcyBzaW5nbGUgZGlnaXQgeWVhcnMgdG8gMiBjaGFyYWN0ZXJzIGFuZCByZXR1cm5zIG90aGVyIHllYXJzIHVuY2hhbmdlZDpcbiAqXG4gKiAgICB8IFllYXIgfCBgeXlgIHwgYHV1YCB8XG4gKiAgICB8LS0tLS0tfC0tLS0tLXwtLS0tLS18XG4gKiAgICB8IDEgICAgfCAgIDAxIHwgICAwMSB8XG4gKiAgICB8IDE0ICAgfCAgIDE0IHwgICAxNCB8XG4gKiAgICB8IDM3NiAgfCAgIDc2IHwgIDM3NiB8XG4gKiAgICB8IDE0NTMgfCAgIDUzIHwgMTQ1MyB8XG4gKlxuICogICAgVGhlIHNhbWUgZGlmZmVyZW5jZSBpcyB0cnVlIGZvciBsb2NhbCBhbmQgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIChgWWAgYW5kIGBSYCksXG4gKiAgICBleGNlcHQgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhcnMgYXJlIGRlcGVuZGVudCBvbiBgb3B0aW9ucy53ZWVrU3RhcnRzT25gXG4gKiAgICBhbmQgYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCAoY29tcGFyZSBbZ2V0SVNPV2Vla1llYXJdKGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvZ2V0SVNPV2Vla1llYXIpXG4gKiAgICBhbmQgW2dldFdlZWtZZWFyXShodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL2dldFdlZWtZZWFyKSkuXG4gKlxuICogNi4gU3BlY2lmaWMgbm9uLWxvY2F0aW9uIHRpbWV6b25lcyBhcmUgY3VycmVudGx5IHVuYXZhaWxhYmxlIGluIGBkYXRlLWZuc2AsXG4gKiAgICBzbyByaWdodCBub3cgdGhlc2UgdG9rZW5zIGZhbGwgYmFjayB0byBHTVQgdGltZXpvbmVzLlxuICpcbiAqIDcuIFRoZXNlIHBhdHRlcm5zIGFyZSBub3QgaW4gdGhlIFVuaWNvZGUgVGVjaG5pY2FsIFN0YW5kYXJkICMzNTpcbiAqICAgIC0gYGlgOiBJU08gZGF5IG9mIHdlZWtcbiAqICAgIC0gYElgOiBJU08gd2VlayBvZiB5ZWFyXG4gKiAgICAtIGBSYDogSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqICAgIC0gYHRgOiBzZWNvbmRzIHRpbWVzdGFtcFxuICogICAgLSBgVGA6IG1pbGxpc2Vjb25kcyB0aW1lc3RhbXBcbiAqICAgIC0gYG9gOiBvcmRpbmFsIG51bWJlciBtb2RpZmllclxuICogICAgLSBgUGA6IGxvbmcgbG9jYWxpemVkIGRhdGVcbiAqICAgIC0gYHBgOiBsb25nIGxvY2FsaXplZCB0aW1lXG4gKlxuICogOC4gYFlZYCBhbmQgYFlZWVlgIHRva2VucyByZXByZXNlbnQgd2Vlay1udW1iZXJpbmcgeWVhcnMgYnV0IHRoZXkgYXJlIG9mdGVuIGNvbmZ1c2VkIHdpdGggeWVhcnMuXG4gKiAgICBZb3Ugc2hvdWxkIGVuYWJsZSBgb3B0aW9ucy51c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnNgIHRvIHVzZSB0aGVtLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqXG4gKiA5LiBgRGAgYW5kIGBERGAgdG9rZW5zIHJlcHJlc2VudCBkYXlzIG9mIHRoZSB5ZWFyIGJ1dCB0aGV5IGFyZSBvZnRlbiBjb25mdXNlZCB3aXRoIGRheXMgb2YgdGhlIG1vbnRoLlxuICogICAgWW91IHNob3VsZCBlbmFibGUgYG9wdGlvbnMudXNlQWRkaXRpb25hbERheU9mWWVhclRva2Vuc2AgdG8gdXNlIHRoZW0uIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBmb3JtYXQgLSBUaGUgc3RyaW5nIG9mIHRva2Vuc1xuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZ1xuICpcbiAqIEB0aHJvd3MgYGRhdGVgIG11c3Qgbm90IGJlIEludmFsaWQgRGF0ZVxuICogQHRocm93cyBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgbG9jYWxpemVgIHByb3BlcnR5XG4gKiBAdGhyb3dzIGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBmb3JtYXRMb25nYCBwcm9wZXJ0eVxuICogQHRocm93cyB1c2UgYHl5eXlgIGluc3RlYWQgb2YgYFlZWVlgIGZvciBmb3JtYXR0aW5nIHllYXJzIHVzaW5nIFtmb3JtYXQgcHJvdmlkZWRdIHRvIHRoZSBpbnB1dCBbaW5wdXQgcHJvdmlkZWRdOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEB0aHJvd3MgdXNlIGB5eWAgaW5zdGVhZCBvZiBgWVlgIGZvciBmb3JtYXR0aW5nIHllYXJzIHVzaW5nIFtmb3JtYXQgcHJvdmlkZWRdIHRvIHRoZSBpbnB1dCBbaW5wdXQgcHJvdmlkZWRdOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEB0aHJvd3MgdXNlIGBkYCBpbnN0ZWFkIG9mIGBEYCBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHVzZSBgZGRgIGluc3RlYWQgb2YgYEREYCBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIGZvcm1hdCBzdHJpbmcgY29udGFpbnMgYW4gdW5lc2NhcGVkIGxhdGluIGFscGhhYmV0IGNoYXJhY3RlclxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXByZXNlbnQgMTEgRmVicnVhcnkgMjAxNCBpbiBtaWRkbGUtZW5kaWFuIGZvcm1hdDpcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdChuZXcgRGF0ZSgyMDE0LCAxLCAxMSksICdNTS9kZC95eXl5JylcbiAqIC8vPT4gJzAyLzExLzIwMTQnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAyIEp1bHkgMjAxNCBpbiBFc3BlcmFudG86XG4gKiBpbXBvcnQgeyBlb0xvY2FsZSB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZS9lbydcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdChuZXcgRGF0ZSgyMDE0LCA2LCAyKSwgXCJkbyAnZGUnIE1NTU0geXl5eVwiLCB7XG4gKiAgIGxvY2FsZTogZW9Mb2NhbGVcbiAqIH0pXG4gKiAvLz0+ICcyLWEgZGUganVsaW8gMjAxNCdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRXNjYXBlIHN0cmluZyBieSBzaW5nbGUgcXVvdGUgY2hhcmFjdGVyczpcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdChuZXcgRGF0ZSgyMDE0LCA2LCAyLCAxNSksIFwiaCAnbycnY2xvY2snXCIpXG4gKiAvLz0+IFwiMyBvJ2Nsb2NrXCJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChkYXRlLCBmb3JtYXRTdHIsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCBsb2NhbGUgPSBvcHRpb25zPy5sb2NhbGUgPz8gZGVmYXVsdE9wdGlvbnMubG9jYWxlID8/IGRlZmF1bHRMb2NhbGU7XG5cbiAgY29uc3QgZmlyc3RXZWVrQ29udGFpbnNEYXRlID1cbiAgICBvcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgMTtcblxuICBjb25zdCB3ZWVrU3RhcnRzT24gPVxuICAgIG9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICAwO1xuXG4gIGNvbnN0IG9yaWdpbmFsRGF0ZSA9IHRvRGF0ZShkYXRlKTtcblxuICBpZiAoIWlzVmFsaWQob3JpZ2luYWxEYXRlKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiSW52YWxpZCB0aW1lIHZhbHVlXCIpO1xuICB9XG5cbiAgY29uc3QgZm9ybWF0dGVyT3B0aW9ucyA9IHtcbiAgICBmaXJzdFdlZWtDb250YWluc0RhdGU6IGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSxcbiAgICB3ZWVrU3RhcnRzT246IHdlZWtTdGFydHNPbixcbiAgICBsb2NhbGU6IGxvY2FsZSxcbiAgICBfb3JpZ2luYWxEYXRlOiBvcmlnaW5hbERhdGUsXG4gIH07XG5cbiAgY29uc3QgcmVzdWx0ID0gZm9ybWF0U3RyXG4gICAgLm1hdGNoKGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwKVxuICAgIC5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgICAgY29uc3QgZmlyc3RDaGFyYWN0ZXIgPSBzdWJzdHJpbmdbMF07XG4gICAgICBpZiAoZmlyc3RDaGFyYWN0ZXIgPT09IFwicFwiIHx8IGZpcnN0Q2hhcmFjdGVyID09PSBcIlBcIikge1xuICAgICAgICBjb25zdCBsb25nRm9ybWF0dGVyID0gbG9uZ0Zvcm1hdHRlcnNbZmlyc3RDaGFyYWN0ZXJdO1xuICAgICAgICByZXR1cm4gbG9uZ0Zvcm1hdHRlcihzdWJzdHJpbmcsIGxvY2FsZS5mb3JtYXRMb25nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdWJzdHJpbmc7XG4gICAgfSlcbiAgICAuam9pbihcIlwiKVxuICAgIC5tYXRjaChmb3JtYXR0aW5nVG9rZW5zUmVnRXhwKVxuICAgIC5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgICAgLy8gUmVwbGFjZSB0d28gc2luZ2xlIHF1b3RlIGNoYXJhY3RlcnMgd2l0aCBvbmUgc2luZ2xlIHF1b3RlIGNoYXJhY3RlclxuICAgICAgaWYgKHN1YnN0cmluZyA9PT0gXCInJ1wiKSB7XG4gICAgICAgIHJldHVybiBcIidcIjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlyc3RDaGFyYWN0ZXIgPSBzdWJzdHJpbmdbMF07XG4gICAgICBpZiAoZmlyc3RDaGFyYWN0ZXIgPT09IFwiJ1wiKSB7XG4gICAgICAgIHJldHVybiBjbGVhbkVzY2FwZWRTdHJpbmcoc3Vic3RyaW5nKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm9ybWF0dGVyID0gZm9ybWF0dGVyc1tmaXJzdENoYXJhY3Rlcl07XG4gICAgICBpZiAoZm9ybWF0dGVyKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhb3B0aW9ucz8udXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zICYmXG4gICAgICAgICAgaXNQcm90ZWN0ZWRXZWVrWWVhclRva2VuKHN1YnN0cmluZylcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3dQcm90ZWN0ZWRFcnJvcihzdWJzdHJpbmcsIGZvcm1hdFN0ciwgU3RyaW5nKGRhdGUpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgIW9wdGlvbnM/LnVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnMgJiZcbiAgICAgICAgICBpc1Byb3RlY3RlZERheU9mWWVhclRva2VuKHN1YnN0cmluZylcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3dQcm90ZWN0ZWRFcnJvcihzdWJzdHJpbmcsIGZvcm1hdFN0ciwgU3RyaW5nKGRhdGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybWF0dGVyKFxuICAgICAgICAgIG9yaWdpbmFsRGF0ZSxcbiAgICAgICAgICBzdWJzdHJpbmcsXG4gICAgICAgICAgbG9jYWxlLmxvY2FsaXplLFxuICAgICAgICAgIGZvcm1hdHRlck9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXJzdENoYXJhY3Rlci5tYXRjaCh1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXG4gICAgICAgICAgXCJGb3JtYXQgc3RyaW5nIGNvbnRhaW5zIGFuIHVuZXNjYXBlZCBsYXRpbiBhbHBoYWJldCBjaGFyYWN0ZXIgYFwiICtcbiAgICAgICAgICAgIGZpcnN0Q2hhcmFjdGVyICtcbiAgICAgICAgICAgIFwiYFwiLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3Vic3RyaW5nO1xuICAgIH0pXG4gICAgLmpvaW4oXCJcIik7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gY2xlYW5Fc2NhcGVkU3RyaW5nKGlucHV0KSB7XG4gIGNvbnN0IG1hdGNoZWQgPSBpbnB1dC5tYXRjaChlc2NhcGVkU3RyaW5nUmVnRXhwKTtcblxuICBpZiAoIW1hdGNoZWQpIHtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlZFsxXS5yZXBsYWNlKGRvdWJsZVF1b3RlUmVnRXhwLCBcIidcIik7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0O1xuIiwiLy9JbXBvcnRzXG5pbXBvcnQgXywgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5cbi8vQ29uc3R1Y3RvciBmdW5jdGlvbnNcblxuZnVuY3Rpb24gVG9kbyh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcywgcHJvamVjdFRhZyl7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuIGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZUZvcm1hdChkdWVEYXRlKTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy50b2RvcyA9IFtdO1xuICAgIHRoaXMubm90ZXMgPSBub3RlcztcbiAgICB0aGlzLnByb2plY3RUYWcgPSBwcm9qZWN0VGFnO1xuICAgIHRoaXMuc3RhdHVzID0gJyc7XG59O1xuXG5mdW5jdGlvbiBQcm9qZWN0KHByb2plY3RUYWcsIHRkTGlzdCl7XG4gICAgdGhpcy5wcm9qZWN0VGFnID0gcHJvamVjdFRhZztcbiAgICBsZXQgbGlzdCA9IHRkTGlzdC5maWx0ZXIoKHRkKT0+ICh0ZC5wcm9qZWN0VGFnID09PSBwcm9qZWN0VGFnKSk7XG4gICAgdGhpcy50ZExpc3QgPSBsaXN0O1xufTtcblxuZnVuY3Rpb24gVXNlcihuYW1lLCBhdmF0YXIpe1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5hdmF0YXIgPSBhdmF0YXI7XG59O1xuXG5cbi8vSGVscGVyIGZ1bmN0aW9uc1xuZnVuY3Rpb24gZHVlRGF0ZUZvcm1hdChkdWVEYXRlKXtcbiAgICBpZihkdWVEYXRlID09PSAnJyl7XG4gICAgICAgIHJldHVybiBmb3JtYXQobmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpLCdNLWRkLXknKTtcbiAgICB9ZWxzZSB7XG4gICAgICAgIHJldHVybiBmb3JtYXQobmV3IERhdGUoZHVlRGF0ZSkudG9Mb2NhbGVTdHJpbmcoKSwnTS1kZC15Jyk7XG4gICAgfTsgXG59O1xuXG5cblxuZXhwb3J0IHtUb2RvICwgVXNlciwgUHJvamVjdH07IiwiLy9JbXBvcnRzXG5pbXBvcnQgXywge2Zvcm1hdCwgaXNCZWZvcmUsIGFkZERheXMsIHN1YkRheXMgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgeyBUb2RvLCBVc2VyLCBQcm9qZWN0IH0gZnJvbSAnLi9jb25zdHJ1Y3RvcnMnO1xuXG4vL1Rlc3RpbmcgSGFyZGNvZGVcbmxldCBtYWluVG9kb0xpc3QgPSBbXTtcblxuaGFyZENvZGVURHMoJ0NyZWF0ZSB1c2VyIGNvbnN0cnVjdG9yJywgJ0NyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBzdG9yZSB1c2VyIGluZm9ybWF0aW9uIGxpa2UgaWQgYW5kIGF2YXRhcicsICcwMS0yNS0yMDI0JywgJ0hpZ2gnLCd0ZXN0IG5vdGVzJywgJ1RvLWRvIEFwcCcpO1xuaGFyZENvZGVURHMoJ0xvb2sgdXAgZGF0YS1mbnMgbGlicmFyeScsICdTZWUgd2hhdCBmdW5jdGlvbnMgYXJlIGF2YWlsYWJsZScsICcxMi0yOS0yMDIzJywgJ0hpZ2gnLCcnLCdUby1kbyBBcHAnKVxuaGFyZENvZGVURHMoJ0dvIHRvIHRoZSBneW0nLCAnQ29tcGxldGUgdGhlIGRhaWx5IHdvcmtvdXQnLCAnJywgJ0hpZ2gnLCcnLCdEYWlseScpO1xuaGFyZENvZGVURHMoJ3Rlc3RlcjEnLCAnY2hlY2tpbmcgZm4nLCAnMDQtMTEtMTk4OScsICdMb3cnLCcnLCdUZXN0IDEnKVxuaGFyZENvZGVURHMoJ3Rlc3RlcjInLCAnY2hlY2tpbmcgZm4nLCAnMDUtMTgtMjAyMCcsICdNZWRpdW0nLCcnLCdUZXN0IDInKVxuaGFyZENvZGVURHMoJ0Fsd2F5cyB0b2RheScsICdhbHdheXMgdG9kYXknLCBuZXcgRGF0ZSgpLCAnTG93JywnJywnVGVzdCAxJylcbmhhcmRDb2RlVERzKCdUb2RheSBwbHVzIDInLCAnY2hlY2tpbmcgZm4nLCBhZGREYXlzKG5ldyBEYXRlKCksMiksICdIaWdoJywnJywnVGVzdCAyJylcbmhhcmRDb2RlVERzKCdUb2RheSBwbHVzIDUnLCAnY2hlY2tpbmcgZm4nLCBhZGREYXlzKG5ldyBEYXRlKCksNSksICdNZWRpdW0nLCcnLCdUZXN0IDMnKVxuaGFyZENvZGVURHMoJ3JlYWQgdGhlIG5ld3NwYXBlcicsICdDb21wbGV0ZSB0aGUgZGFpbHkgd29ya291dCcsICcnLCAnTWVkaXVtJywnJywnRGFpbHknKTtcbmhhcmRDb2RlVERzKCdCdXkgYSB5YWNodCcsICdDb21wbGV0ZSB0aGUgZGFpbHkgd29ya291dCcsICcnLCAnTG93JywnJywnRGFpbHknKTtcblxuLy9GdW5jdGlvbnNcbmZ1bmN0aW9uIGhhcmRDb2RlVERzKHRpdGxlLCBkZXNjcmlwdCwgZHVlRGF0ZSwgcHJpb3JpdHksIHRvZG9zLCBub3RlcyAsIHByb2plY3RUYWcpe1xuICAgIGxldCBuZXdUb2RvID0gbmV3IFRvZG8odGl0bGUsIGRlc2NyaXB0LCBkdWVEYXRlLCBwcmlvcml0eSwgdG9kb3MsIG5vdGVzICwgcHJvamVjdFRhZyk7XG4gICAgbWFpblRvZG9MaXN0LnB1c2gobmV3VG9kbyk7XG4gICAgbWFpblRvZG9MaXN0LnNvcnQoKGEsYik9PiBuZXcgRGF0ZShhLmR1ZURhdGUpLW5ldyBEYXRlKGIuZHVlRGF0ZSkpO1xuICAgIGluZGV4TGlzdChtYWluVG9kb0xpc3QpO1xuICAgIHJldHVybiBtYWluVG9kb0xpc3Q7XG59O1xuXG5cblxuZnVuY3Rpb24gZGVsZXRlVG9kbyh0ZFRpdGxlLCB0ZExpc3Qpe1xuICAgIC8vUmVtb3ZlIGZyb20gbWFpbiBsaXN0XG4gICAgbGV0IHRkSW5kZXggPXRkTGlzdC5maW5kSW5kZXgodGRPYmplY3QgPT4gdGRPYmplY3QudGl0bGUgPT09IHRkVGl0bGUpO1xuICAgIHRkTGlzdC5zcGxpY2UodGRJbmRleCwgMSk7XG4gICAgdGRMaXN0LnNvcnQoKGEsYik9PmEuZHVlRGF0ZS1iLmR1ZURhdGUpO1xuICAgIC8vUmVtb3ZlIGZyb20gbWFpbiBkaXNwbGF5XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVPdmVyRHVlTGlzdCAodGRMaXN0KXtcbiAgICBsZXQgb3ZlcmR1ZUxpc3QgPSB0ZExpc3QuZmlsdGVyKCh0ZCk9PmlzQmVmb3JlKHRkLmR1ZURhdGUsIHN1YkRheXMobmV3IERhdGUoKSwxKSkpO1xuICAgIHJldHVybiBvdmVyZHVlTGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNoZWNrSWZPdmVyZHVlKHRkT2JqZWN0KXtcbiAgIHJldHVybiBpc0JlZm9yZSh0ZE9iamVjdC5kdWVEYXRlLCBzdWJEYXlzKG5ldyBEYXRlKCksMSkpO1xuICAgXG59O1xuXG5mdW5jdGlvbiBhZGRPdmVyZHVlQ2xhc3ModGRMaXN0KXtcbiAgICBsZXQgb3ZlcmR1ZUxpc3QgPVtdO1xuICAgIHRkTGlzdC5mb3JFYWNoKCh0ZE9iamVjdCk9PiB7XG4gICAgICAgIGlmIChjaGVja0lmT3ZlcmR1ZSh0ZE9iamVjdCkpe1xuICAgICAgICAgICAgb3ZlcmR1ZUxpc3QucHVzaCh0ZE9iamVjdFsnZGF0YS1pbmRleCddLnRvU3RyaW5nKCkpO1xuICAgICAgICB9O1xuICAgIH0pO1xuICAgIGxldCBkaXZMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8nKTtcbiAgICBkaXZMaXN0LmZvckVhY2goKGRpdik9PntcbiAgICAgICAgbGV0IHRkSW5kZXggPSBkaXYuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIGlmIChvdmVyZHVlTGlzdC5pbmNsdWRlcyh0ZEluZGV4KSl7XG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnb3ZlcmR1ZScpO1xuICAgICAgICB9O1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gaW5kZXhMaXN0KHRkTGlzdCl7XG4gICAgdGRMaXN0LmZvckVhY2goKHRkT2JqZWN0KT0+e1xuICAgICAgICB0ZE9iamVjdFsnZGF0YS1pbmRleCddID0gdGRMaXN0LmZpbmRJbmRleCh0ZCA9PiB0ZC50aXRsZSA9PT0gdGRPYmplY3QudGl0bGUpO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlVG9kYXlMaXN0KHRkTGlzdCl7XG4gICAgbGV0IHRvZGF5TGlzdD0gdGRMaXN0LmZpbHRlcigodGQpPT4gKHRkLmR1ZURhdGUgPT09IGZvcm1hdCggbmV3IERhdGUoKSwgJ00tZGQteScpICYmIHRkLnByb2plY3RUYWcgIT0nRGFpbHknKSk7XG4gICAgcmV0dXJuIHRvZGF5TGlzdDtcbn07XG5cblxuZnVuY3Rpb24gY3JlYXRlVGhpc1dlZWtMaXN0KHRkTGlzdCl7XG4gICAgbGV0IHRoaXNXZWVrTGlzdD0gdGRMaXN0LmZpbHRlcigodGQpPT4gKHRkLmR1ZURhdGU+PSBmb3JtYXQoIG5ldyBEYXRlKCksICdNLWRkLXknKSAmJiB0ZC5kdWVEYXRlPD0gZm9ybWF0KCBhZGREYXlzKG5ldyBEYXRlKCksNyksICdNLWRkLXknKSAmJiB0ZC5wcm9qZWN0VGFnICE9J0RhaWx5JyApKTtcbiAgICByZXR1cm4gdGhpc1dlZWtMaXN0O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlRGFpbHlMaXN0KHRkTGlzdCl7XG4gICAgbGV0IGRhaWx5TGlzdCA9IHRkTGlzdC5maWx0ZXIoKHRkKT0+dGQucHJvamVjdFRhZz09PSdEYWlseScpO1xuICAgIHJldHVybiBkYWlseUxpc3Q7XG59O1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RUYWdMaXN0KHRkTGlzdCl7XG4gICAgbGV0IHByb2plY3RUYWdMaXN0ID0gW107XG4gICAgdGRMaXN0LmZvckVhY2goKHRkT2JqZWN0KT0+e1xuICAgICAgICBsZXQgbmV3UHJvamVjdCA9IHRkT2JqZWN0Wydwcm9qZWN0VGFnJ107XG4gICAgICAgIGlmKChuZXdQcm9qZWN0ICE9ICdEYWlseScpICYmIChuZXdQcm9qZWN0IT0gJycpICYmICghcHJvamVjdFRhZ0xpc3QuaW5jbHVkZXMobmV3UHJvamVjdCkpKXtcbiAgICAgICAgICAgIHByb2plY3RUYWdMaXN0LnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgIH07XG4gICAgfSk7cmV0dXJuIHByb2plY3RUYWdMaXN0O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdExpc3QodGRMaXN0LCBwcm9qZWN0VGFnKXtcbiAgICBsZXQgcHJvamVjdExpc3QgPSB0ZExpc3QuZmlsdGVyKCh0ZCk9PiAodGQucHJvamVjdFRhZyA9PT0gcHJvamVjdFRhZykpO1xuICAgIHJldHVybiBwcm9qZWN0TGlzdDtcbn07IFxuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0VERMaXN0cyh0ZExpc3Qpe1xuICAgIGxldCBwcm9qZWN0VGFnTGlzdCA9IGNyZWF0ZVByb2plY3RUYWdMaXN0KHRkTGlzdCk7XG4gICAgbGV0IHByb2plY3RUZExpc3RzID0gW107XG4gICAgcHJvamVjdFRhZ0xpc3QuZm9yRWFjaCgocHJvamVjdFRhZyk9PntcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdFRhZywgdGRMaXN0KTtcbiAgICAgICAgcHJvamVjdFRkTGlzdHMucHVzaChjdXJyZW50UHJvamVjdCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHByb2plY3RUZExpc3RzO1xufTtcblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZVF1YWRMaXN0cyh0ZExpc3Qpe1xuICAgIGxldCB1cmdlbmN5RGF0ZSA9IGFkZERheXMobmV3IERhdGUoKSwgMTApO1xuICAgIGxldCBxdWFkMSA9IHRkTGlzdC5maWx0ZXIoKHRkKT0+KHRkLnByaW9yaXR5ID09PSAnSGlnaCcgJiYgdGQuZHVlRGF0ZTw9IGZvcm1hdCh1cmdlbmN5RGF0ZSwgJ00tZGQteScpKSk7XG4gICAgbGV0IHF1YWQyID0gdGRMaXN0LmZpbHRlcigodGQpPT4odGQucHJpb3JpdHkgPT09ICdIaWdoJyAmJiB0ZC5kdWVEYXRlPiBmb3JtYXQodXJnZW5jeURhdGUsICdNLWRkLXknKSl8fCAodGQucHJpb3JpdHkgPT09ICdNZWRpdW0nICYmIHRkLmR1ZURhdGUgPiBmb3JtYXQodXJnZW5jeURhdGUsICdNLWRkLXknKSkpO1xuICAgIGxldCBxdWFkMyA9IHRkTGlzdC5maWx0ZXIoKHRkKT0+KHRkLnByaW9yaXR5ID09PSAnTG93JyAmJiB0ZC5kdWVEYXRlPD0gZm9ybWF0KHVyZ2VuY3lEYXRlLCAnTS1kZC15JykpIHx8ICh0ZC5wcmlvcml0eSA9PT0gJ01lZGl1bScgJiYgdGQuZHVlRGF0ZTw9IGZvcm1hdCh1cmdlbmN5RGF0ZSwgJ00tZGQteScpKSk7XG4gICAgbGV0IHF1YWQ0ID0gdGRMaXN0LmZpbHRlcigodGQpPT4odGQucHJpb3JpdHkgPT09ICdMb3cnICYmIHRkLmR1ZURhdGU+IGZvcm1hdCh1cmdlbmN5RGF0ZSwgJ00tZGQteScpKSk7XG4gICAgbGV0IHF1YWRMaXN0cyA9IFtxdWFkMSwgcXVhZDIsIHF1YWQzLCBxdWFkNF07XG4gICAgcmV0dXJuIHF1YWRMaXN0cztcbn07XG5cbmZ1bmN0aW9uIGdldFByb2plY3RTdGF0cyhwcm9qZWN0TGlzdCl7XG4gICAgbGV0IGNvbXBsZXRlZFRkcyA9IHByb2plY3RMaXN0LmZpbHRlcigodGQpPT50ZC5zdGF0dXMgPT09ICdjb21wbGV0ZScpO1xuICAgIGxldCBudW1Db21wbGV0ZWQgPSBjb21wbGV0ZWRUZHMubGVuZ3RoO1xuICAgIGxldCBudW1UZHM9cHJvamVjdExpc3QubGVuZ3RoO1xuICAgIGxldCBxdWFkTGlzdHMgPSBjcmVhdGVRdWFkTGlzdHMocHJvamVjdExpc3QpO1xuICAgIGxldCBudW1RMT0gcXVhZExpc3RzWzBdLmxlbmd0aDtcbiAgICBsZXQgbnVtUTI9IHF1YWRMaXN0c1sxXS5sZW5ndGg7XG4gICAgbGV0IG51bVEzPSBxdWFkTGlzdHNbMl0ubGVuZ3RoO1xuICAgIGxldCBudW1RND0gcXVhZExpc3RzWzNdLmxlbmd0aDtcbiAgICByZXR1cm57bnVtVGRzLCBudW1Db21wbGV0ZWQsIG51bVExLCBudW1RMiwgbnVtUTMsIG51bVE0fTtcbn07XG4vL2V4cG9ydHNcblxuZXhwb3J0IHttYWluVG9kb0xpc3QsIGNyZWF0ZVRvZGF5TGlzdCwgY3JlYXRlVGhpc1dlZWtMaXN0LCBjcmVhdGVEYWlseUxpc3QsICBkZWxldGVUb2RvLCBpbmRleExpc3QsIGFkZE92ZXJkdWVDbGFzcywgY3JlYXRlUXVhZExpc3RzLCBjcmVhdGVQcm9qZWN0VGFnTGlzdCwgY3JlYXRlUHJvamVjdExpc3QsIGdldFByb2plY3RTdGF0cywgY3JlYXRlUHJvamVjdFRETGlzdHN9IiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGlzQmVmb3JlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBmaXJzdCBkYXRlIGJlZm9yZSB0aGUgc2Vjb25kIG9uZT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBmaXJzdCBkYXRlIGJlZm9yZSB0aGUgc2Vjb25kIG9uZT9cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBkYXRlIHRoYXQgc2hvdWxkIGJlIGJlZm9yZSB0aGUgb3RoZXIgb25lIHRvIHJldHVybiB0cnVlXG4gKiBAcGFyYW0gZGF0ZVRvQ29tcGFyZSAtIFRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICpcbiAqIEByZXR1cm5zIFRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIGRhdGVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSXMgMTAgSnVseSAxOTg5IGJlZm9yZSAxMSBGZWJydWFyeSAxOTg3P1xuICogY29uc3QgcmVzdWx0ID0gaXNCZWZvcmUobmV3IERhdGUoMTk4OSwgNiwgMTApLCBuZXcgRGF0ZSgxOTg3LCAxLCAxMSkpXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0JlZm9yZShkYXRlLCBkYXRlVG9Db21wYXJlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBfZGF0ZVRvQ29tcGFyZSA9IHRvRGF0ZShkYXRlVG9Db21wYXJlKTtcbiAgcmV0dXJuICtfZGF0ZSA8ICtfZGF0ZVRvQ29tcGFyZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBpc0JlZm9yZTtcbiIsImltcG9ydCB7IGFkZERheXMgfSBmcm9tIFwiLi9hZGREYXlzLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIHN1YkRheXNcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgZGF5cyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgZGF5cyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIGFtb3VudCAtIFRoZSBhbW91bnQgb2YgZGF5cyB0byBiZSBzdWJ0cmFjdGVkLiBQb3NpdGl2ZSBkZWNpbWFscyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguZmxvb3JgLCBkZWNpbWFscyBsZXNzIHRoYW4gemVybyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguY2VpbGAuXG4gKlxuICogQHJldHVybnMgVGhlIG5ldyBkYXRlIHdpdGggdGhlIGRheXMgc3VidHJhY3RlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdWJ0cmFjdCAxMCBkYXlzIGZyb20gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN1YkRheXMobmV3IERhdGUoMjAxNCwgOCwgMSksIDEwKVxuICogLy89PiBGcmkgQXVnIDIyIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1YkRheXMoZGF0ZSwgYW1vdW50KSB7XG4gIHJldHVybiBhZGREYXlzKGRhdGUsIC1hbW91bnQpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN1YkRheXM7XG4iLCJpbXBvcnQgeyBtYWluVG9kb0xpc3QsIGluZGV4TGlzdCB9IGZyb20gXCIuL2FwcGxvZ2ljXCI7XG5pbXBvcnQgeyBUb2RvIH0gZnJvbSBcIi4vY29uc3RydWN0b3JzXCI7XG5pbXBvcnQgeyBmb3JtYXQsIGFkZERheXMgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcbmltcG9ydCB7IGNyZWF0ZVByb2plY3RUYWdMaXN0IH0gZnJvbSBcIi4vYXBwbG9naWNcIjtcblxuXG4vL05ldyBUb2RvXG5mdW5jdGlvbiBjcmVhdGVOZXdUb2RvRm9ybSgpe1xuICAgIGNvbnN0IGRpYWxvZz0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGlhbG9nJyk7XG4gICAgZGlhbG9nLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XG4gICAgZGlhbG9nLnNldEF0dHJpYnV0ZSgnaWQnLCduZXdUb2RvRGlhbG9nJyk7XG4gICAgXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ2RpYWxvZycpO1xuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdteUZvcm0nKVxuXG4gICAgY29uc3QgdGl0bGVSb3cgPWNyZWF0ZUZvcm1Sb3coJ3RkLXRpdGxlJywgJ1RpdGxlIG9mIFRvZG8nLCAndGV4dCcpO1xuICAgIGNvbnN0IGRlc2NyaXB0Um93ID0gY3JlYXRlRm9ybVJvdygndGQtZGVzY3JpcHRpb24nLCAnRGVzY3JpcHRpb24gb2YgVG9kbycsICd0ZXh0Jyk7XG4gICAgY29uc3QgZGF0ZVJvdz0gY3JlYXRlRm9ybVJvdygndGQtZHVlRGF0ZScsICdEdWUgRGF0ZTonLCAnZGF0ZScpO1xuICAgIGNvbnN0IHByaW9yaXR5Um93ID0gY3JlYXRlU2VsZWN0Rm9ybVJvdygndGQtcHJpb3JpdHknLCAnUHJpb3JpdHknLCBbJ0hpZ2gnLCdNZWRpdW0nLCdMb3cnXSk7XG4gICAgY29uc3QgcHJvamVjdFJvdyA9IGNyZWF0ZVNlbGVjdEZvcm1Sb3coJ3RkLXByb2plY3RUYWcnLCAnUHJvamVjdCcsIGNyZWF0ZVByb2plY3RUYWdMaXN0KG1haW5Ub2RvTGlzdCkpO1xuXG4gICAgY29uc3QgYnRuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBidG5Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9ybS1idXR0b25zJyk7XG5cbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKCdpZCcsICdjYW5jZWxCdG4nKTtcbiAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKCd2YWx1ZScsICdjYW5jZWwnKTtcbiAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKCdmb3JtbWV0aG9kJywgJ2RpYWxvZycpO1xuICAgIGNhbmNlbEJ0bi50ZXh0Q29udGVudCA9ICdDYW5jZWwnO1xuXG4gICAgY29uc3QgY29uZmlybUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbmZpcm1CdG4uc2V0QXR0cmlidXRlKCdpZCcsICdjb25maXJtQnRuJyk7XG4gICAgY29uZmlybUJ0bi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2RlZmF1bHQnKTtcbiAgICBjb25maXJtQnRuLnRleHRDb250ZW50ID0gXCJDb25maXJtXCJcbiAgICAgICBcbiAgICBidG5Db250YWluZXIuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcbiAgICBidG5Db250YWluZXIuYXBwZW5kQ2hpbGQoY29uZmlybUJ0bik7XG4gICAgZm9ybS5hcHBlbmRDaGlsZCh0aXRsZVJvdyk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkZXNjcmlwdFJvdyk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkYXRlUm93KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHByaW9yaXR5Um93KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHByb2plY3RSb3cpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoYnRuQ29udGFpbmVyKTtcbiAgICBkaWFsb2cuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgcmV0dXJuIGRpYWxvZztcbn07XG5cblxuZnVuY3Rpb24gYWRkTmV3VG9kbygpe1xuICBsZXQgdGRUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZC10aXRsZScpLnZhbHVlO1xuICBsZXQgdGRkZXNjcmlwdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZC1kZXNjcmlwdGlvbicpLnZhbHVlO1xuICBsZXQgdGRkdWVEYXRlID0gZm9ybWF0KGFkZERheXMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RkLWR1ZURhdGUnKS52YWx1ZSwgMSksICdNLWRkLXknKTtcbiAgbGV0IHRkcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGQtcHJpb3JpdHknKS52YWx1ZTtcbiAgbGV0IHRkcHJvamVjdFRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZC1wcm9qZWN0VGFnJykudmFsdWVcbiAgbGV0IG5ld1RvZG8gPSBuZXcgVG9kbyh0ZFRpdGxlLCB0ZGRlc2NyaXB0LCB0ZGR1ZURhdGUsIHRkcHJpb3JpdHksIFtdLCAnJywgdGRwcm9qZWN0VGFnKTtcbiAgbWFpblRvZG9MaXN0LnB1c2gobmV3VG9kbyk7XG4gIG1haW5Ub2RvTGlzdC5zb3J0KChhLGIpPT4gbmV3IERhdGUoYS5kdWVEYXRlKS1uZXcgRGF0ZShiLmR1ZURhdGUpKTtcbiAgaW5kZXhMaXN0KG1haW5Ub2RvTGlzdCk7XG4gIHJldHVybiBuZXdUb2RvO1xufTtcblxuZnVuY3Rpb24gYWRkTmVzdGVkVG9kbyhpbmRleCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgdG9kb3MsIG5vdGVzLCBwcm9qZWN0VGFnKXtcbiAgbGV0IG5lc3RlZFRvZG8gPSBuZXcgVG9kbyh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCB0b2Rvcywgbm90ZXMsIHByb2plY3RUYWcpO1xuICBsZXQgbmVzdGVkVGRMaXN0ID0gbWFpblRvZG9MaXN0W2luZGV4XVsndG9kb3MnXTtcbiAgbmVzdGVkVGRMaXN0LnB1c2gobmVzdGVkVG9kbyk7XG4gIC8vdGRPYmplY3QudG9kb3Muc29ydCgoYSxiKT0+YS5kdWVEYXRlLWIuZHVlRGF0ZSk7XG59O1xuXG5cblxuLy9oZWxwZXIgZnVuY3Rpb25zXG5mdW5jdGlvbiBjcmVhdGVGb3JtUm93KGlkLCB0aXRsZSwgaVR5cGUpe1xuICBjb25zdCBmb3JtUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGZvcm1Sb3cuY2xhc3NMaXN0LmFkZChcImZvcm0tcm93XCIpO1xuXG4gIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgbGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCBpZCk7XG4gIGxhYmVsLnRleHRDb250ZW50PSB0aXRsZTtcblxuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIGlUeXBlKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgaWQpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xuXG4gIGZvcm1Sb3cuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICBmb3JtUm93LmFwcGVuZENoaWxkKGlucHV0KTtcbiAgcmV0dXJuIGZvcm1Sb3c7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVTZWxlY3RGb3JtUm93KGlkLCB0aXRsZSwgb3B0aW9uc0xpc3QgKXtcbiAgY29uc3QgZm9ybVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBmb3JtUm93LmNsYXNzTGlzdC5hZGQoXCJmb3JtLXJvd1wiKTtcblxuICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgaWQpO1xuICBsYWJlbC50ZXh0Q29udGVudD0gdGl0bGU7XG5cbiAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gIHNlbGVjdC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xuICBzZWxlY3Quc2V0QXR0cmlidXRlKCduYW1lJywgaWQpO1xuXG4gIG9wdGlvbnNMaXN0LmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgIGxldCBjdXJyZW50T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgY3VycmVudE9wdGlvbi50ZXh0Q29udGVudCA9IG9wdGlvbjtcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudE9wdGlvbik7XG4gIH0pO1xuXG4gIGZvcm1Sb3cuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICBmb3JtUm93LmFwcGVuZENoaWxkKHNlbGVjdCk7XG4gIHJldHVybiBmb3JtUm93O1xufTtcblxuXG5cblxuXG5leHBvcnQge2NyZWF0ZU5ld1RvZG9Gb3JtLCBhZGROZXdUb2RvfTsiLCJpbXBvcnQgeyBjcmVhdGVOZXdUb2RvRm9ybSB9IGZyb20gXCIuL25ld1REXCI7XG5pbXBvcnQgeyBlZGl0VG9kb0Zvcm0sIGVkaXRUb2RvUHJvcGVydHkgfSBmcm9tIFwiLi9lZGl0VERcIjtcblxuXG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxuXG4vL0hlYWRlclxuXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXIoKXtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnaGVhZGVyJylcblxuICAgIGNvbnN0IGxvZ29UaXRsZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxvZ29UaXRsZUJveC5jbGFzc0xpc3QuYWRkKCdsdGJveCcpO1xuXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgbG9nby5jbGFzc0xpc3QuYWRkKCdsb2dvJyk7XG4gICAgbG9nby5zcmM9Jy4uL3NyYy9JbWFnZXMvbG9nby5wbmcnXG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd0aXRsZScpXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnQ2hlY2stSXQnXG5cbiAgICBjb25zdCBoZWFkZXJSaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhlYWRlclJpZ2h0LmNsYXNzTGlzdC5hZGQoJ2hlYWRlci1yaWdodCcpO1xuXG4gICAgY29uc3QgdXNlckRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHVzZXJEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ3VzZXJEaXNwbGF5JylcbiAgICB1c2VyRGlzcGxheS50ZXh0Q29udGVudCA9ICdVc2VyIG5hbWUgYW5kIGF2YXRhciBnbyBoZXJlJ1xuXG4gICAgY29uc3QgZGlzcGxheVRvZ2dsZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgZGlzcGxheVRvZ2dsZUJveC5jbGFzc0xpc3QuYWRkKCd0b2dnbGUtYm94Jyk7XG4gICAgY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0b2dnbGVCdG4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG4gICAgdG9nZ2xlQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9nZ2xlLWNoZWNrYm94Jyk7XG4gICAgY29uc3QgdG9nZ2xlQ2lyY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdG9nZ2xlQ2lyY2xlLmNsYXNzTGlzdC5hZGQoJ2NpcmNsZScpXG5cbiAgICBkaXNwbGF5VG9nZ2xlQm94LmFwcGVuZENoaWxkKHRvZ2dsZUJ0bik7XG4gICAgZGlzcGxheVRvZ2dsZUJveC5hcHBlbmRDaGlsZCh0b2dnbGVDaXJjbGUpO1xuICAgIGhlYWRlclJpZ2h0LmFwcGVuZENoaWxkKHVzZXJEaXNwbGF5KVxuICAgIGhlYWRlclJpZ2h0LmFwcGVuZENoaWxkKGRpc3BsYXlUb2dnbGVCb3gpO1xuXG4gICAgbG9nb1RpdGxlQm94LmFwcGVuZENoaWxkKGxvZ28pO1xuICAgIGxvZ29UaXRsZUJveC5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGxvZ29UaXRsZUJveCk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlclJpZ2h0KTtcbiAgICByZXR1cm4gaGVhZGVyO1xufTtcblxuXG4vL05hdiBCYXJcblxuZnVuY3Rpb24gY3JlYXRlTmF2QmFyKCl7XG4gICAgY29uc3QgbmF2QmFyID0gZG9jdW1lbnQuIGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5hdkJhci5jbGFzc0xpc3QuYWRkKCduYXZCYXInKVxuXG5cbiAgICBjb25zdCB0b2RheUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRvZGF5QnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xuICAgIHRvZGF5QnRuLmNsYXNzTGlzdC5hZGQoJ25hdkJ0bicpO1xuICAgIHRvZGF5QnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9kYXlCdG4nKTtcbiAgICB0b2RheUJ0bi50ZXh0Q29udGVudCA9ICdUb2RheSc7XG5cbiAgICBjb25zdCB3ZWVrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgd2Vla0J0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICB3ZWVrQnRuLmNsYXNzTGlzdC5hZGQoJ25hdkJ0bicpO1xuICAgIHdlZWtCdG4uc2V0QXR0cmlidXRlKCdpZCcsICd3ZWVrbHknKTtcbiAgICB3ZWVrQnRuLnRleHRDb250ZW50ID0gJ1RoaXMgV2Vlayc7XG5cbiAgICBjb25zdCBhbGxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBhbGxCdG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XG4gICAgYWxsQnRuLmNsYXNzTGlzdC5hZGQoJ25hdkJ0bicpO1xuICAgIGFsbEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2FsbCcpO1xuICAgIGFsbEJ0bi50ZXh0Q29udGVudCA9ICdBbGwgVGFza3MnO1xuXG4gICAgY29uc3QgZGFpbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBkYWlseUJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICBkYWlseUJ0bi5jbGFzc0xpc3QuYWRkKCduYXZCdG4nKTtcbiAgICBkYWlseUJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2RhaWx5Jyk7XG4gICAgZGFpbHlCdG4udGV4dENvbnRlbnQgPSAnRGFpbHkgVGFza3MnO1xuXG5cbiAgICBjb25zdCBwcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICBwcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ25hdkJ0bicpXG4gICAgcHJvamVjdEJ0bi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3RzJyk7XG4gICAgcHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG4gICAgICAgICAgICBcblxuICAgIGNvbnN0IG5ld1REID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBuZXdURC5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICBuZXdURC5jbGFzc0xpc3QuYWRkKCduYXZCdG4nKVxuICAgIG5ld1RELnNldEF0dHJpYnV0ZSgnaWQnLCduZXctdG9kby1idG4nKTtcbiAgICBuZXdURC50ZXh0Q29udGVudCA9JysgQWRkIE5ldyBUb2RvJztcblxuICAgIG5hdkJhci5hcHBlbmRDaGlsZCh0b2RheUJ0bik7XG4gICAgbmF2QmFyLmFwcGVuZENoaWxkKHdlZWtCdG4pO1xuICAgIG5hdkJhci5hcHBlbmRDaGlsZChhbGxCdG4pO1xuICAgIG5hdkJhci5hcHBlbmRDaGlsZChkYWlseUJ0bik7XG4gICAgbmF2QmFyLmFwcGVuZENoaWxkKHByb2plY3RCdG4pO1xuICAgIG5hdkJhci5hcHBlbmRDaGlsZChuZXdURCk7XG4gICAgcmV0dXJuIG5hdkJhcjtcbn07XG5cbi8vTWFpbiBEaXZcbmZ1bmN0aW9uIGNyZWF0ZU1haW5EaXYoKXtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWFpbi5jbGFzc0xpc3QuYWRkKCdtYWluJyk7XG4gICAgbWFpbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21haW4nKVxuICAgIHJldHVybiBtYWluO1xufTtcblxuLy9Gb290ZXJcbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlcigpeyBcbiAgICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmb290ZXIuY2xhc3NMaXN0LmFkZCgnZm9vdGVyJylcbiAgICBmb290ZXIudGV4dENvbnRlbnQgPSdtYWRlIGJ5IE1zYW1iZXJlJ1xuICAgIHJldHVybiBmb290ZXI7XG59O1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZVNpdGUoKXtcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGNyZWF0ZUhlYWRlcigpKTtcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGNyZWF0ZU5hdkJhcigpKTtcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGNyZWF0ZU1haW5EaXYoKSk7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZChjcmVhdGVGb290ZXIoKSk7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZChjcmVhdGVOZXdUb2RvRm9ybSgpKTtcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGVkaXRUb2RvRm9ybSgpKTtcbn1cblxuZXhwb3J0IHtjcmVhdGVTaXRlfTsiLCJpbXBvcnQgeyBjcmVhdGVQcm9qZWN0VGFnTGlzdCwgY3JlYXRlUHJvamVjdFRETGlzdHMsIGdldFByb2plY3RTdGF0c30gZnJvbSBcIi4vYXBwbG9naWNcIjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVRdWFkRGF0ZVNlbGVjdG9yKCl7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdkYXRlLXNlbGVjdG9yLWRpdicpO1xuXG4gICAgY29uc3QgZGF0ZVNlbGVjdG9yTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGRhdGVTZWxlY3RvckxhYmVsLmNsYXNzTGlzdC5hZGQoJ2RhdGUtc2VsZWN0b3InKTtcbiAgICBkYXRlU2VsZWN0b3JMYWJlbC50ZXh0Q29udGVudCA9ICdDaG9vc2UgdGhlIGRhdGUgY3V0IG9mZiBmb3IgdXJnZW5jeTogICAnXG4gICAgY29uc3QgZGF0ZVNlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBkYXRlU2VsZWN0b3Iuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2RhdGUnKTtcbiAgICBkYXRlU2VsZWN0b3Iuc2V0QXR0cmlidXRlKCdpZCcsICdkYXRlLXNlbGVjdG9yJyk7XG5cbiAgICBkYXRlU2VsZWN0b3JMYWJlbC5hcHBlbmRDaGlsZChkYXRlU2VsZWN0b3IpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkYXRlU2VsZWN0b3JMYWJlbCk7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVQcm9qZWN0T3ZlcnZpZXdzRGlzcGxheSh0ZExpc3Qpe1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHJvamVjdE92ZXJ2aWV3cy1jb250YWluZXInKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbGlzdC1kaXNwbGF5Jyk7XG4gICAgbGV0IHByb2plY3RPYmplY3RMaXN0ID0gY3JlYXRlUHJvamVjdFRETGlzdHModGRMaXN0KVxuICAgIHByb2plY3RPYmplY3RMaXN0LmZvckVhY2goKG9iamVjdCk9PiB7XG4gICAgICAgIGxldCBkaXYgPSBnZW5lcmF0ZVN0YXRzRGl2KG9iamVjdCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH0pO1xuICAgIHJldHVybiBjb250YWluZXI7XG59O1xuXG5mdW5jdGlvbiB0YXNrR3JhbW1hcihudW0pe1xuICAgIGxldCB0YXNrID0gJyc7XG4gICAgaWYgKG51bSA9PT0gMSl7XG4gICAgICAgIHRhc2sgPSAndGFzayBpcyc7XG4gICAgfWVsc2Uge1xuICAgICAgICB0YXNrID0gJ3Rhc2tzIGFyZSc7XG4gICAgfTtcbiAgICByZXR1cm4gdGFza1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVN0YXRzRGl2KHByb2plY3RPYmplY3Qpe1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1vdmVydmlldycpO1xuICAgIGxldCB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgdGl0bGVEaXYuY2xhc3NMaXN0LmFkZCgnb3ZlcnZpZXctdGl0bGUnKTtcbiAgICB0aXRsZURpdi50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3RbJ3Byb2plY3RUYWcnXTtcbiAgICBsZXQgcHJvamVjdFN0YXRzID0gZ2V0UHJvamVjdFN0YXRzKHByb2plY3RPYmplY3RbJ3RkTGlzdCddKTtcbiAgICBcbiAgICBsZXQgY29tcGxldGVuZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNvbXBsZXRlbmVzcy50ZXh0Q29udGVudCA9IGAke3Byb2plY3RTdGF0c1snbnVtQ29tcGxldGVkJ119IC8gJHtwcm9qZWN0U3RhdHNbJ251bVRkcyddfSB0YXNrcyBjb21wbGV0ZWRgO1xuXG4gICAgbGV0IHExID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGxldCB0YXNrMSA9IHRhc2tHcmFtbWFyKHByb2plY3RTdGF0c1snbnVtUTEnXSk7XG4gICAgcTEudGV4dENvbnRlbnQgPSBgJHtwcm9qZWN0U3RhdHNbJ251bVExJ119ICAke3Rhc2sxfSB1cmdlbnQgYW5kIGltcG9ydGFudC5gXG4gICAgXG4gICAgbGV0IHEyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGxldCB0YXNrMiA9IHRhc2tHcmFtbWFyKHByb2plY3RTdGF0c1snbnVtUTInXSk7XG4gICAgcTIudGV4dENvbnRlbnQgPSBgJHtwcm9qZWN0U3RhdHNbJ251bVEyJ119ICR7dGFzazJ9IG5vdCB1cmdlbnQgYW5kIGltcG9ydGFudC5gXG4gICAgXG4gICAgbGV0IHEzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGxldCB0YXNrMyA9IHRhc2tHcmFtbWFyKHByb2plY3RTdGF0c1snbnVtUTMnXSk7XG4gICAgcTMudGV4dENvbnRlbnQgPSBgJHtwcm9qZWN0U3RhdHNbJ251bVEzJ119ICR7dGFzazN9IHVyZ2VudCBhbmQgdW5pbXBvcnRhbnQuYFxuICAgIFxuICAgIGxldCBxNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBsZXQgdGFzazQgPSB0YXNrR3JhbW1hcihwcm9qZWN0U3RhdHNbJ251bVE0J10pO1xuICAgIHE0LnRleHRDb250ZW50ID0gYCR7cHJvamVjdFN0YXRzWydudW1RNCddfSAke3Rhc2s0fSBub3QgdXJnZW50IGFuZCB1bmltcG9ydGFudC5gXG4gICAgXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcGxldGVuZXNzKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocTEpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChxMik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHEzKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocTQpO1xuXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZVByb2plY3RCdXR0b25zKHRkTGlzdCl7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0QnRucy1jb250YWluZXInKVxuICAgIGxldCBwcm9qZWN0VGFnTGlzdCA9IGNyZWF0ZVByb2plY3RUYWdMaXN0KHRkTGlzdCk7XG4gICAgcHJvamVjdFRhZ0xpc3QuZm9yRWFjaCgodGFnKT0+e1xuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nKTtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtYnRuJyk7XG4gICAgICAgIGJ0bi50ZXh0Q29udGVudD0gdGFnO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICB9KTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVQcm9qZWN0SGVhZGVyKHRpdGxlKXtcbiAgICBsZXQgcEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcbiAgICBwSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3BIZWFkZXInKTtcbiAgICBwSGVhZGVyLnRleHRDb250ZW50ID10aXRsZTtcbiAgICByZXR1cm4gcEhlYWRlcjtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVUZExpc3REaXNwbGF5KHRkTGlzdCl7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdsaXN0LWRpc3BsYXknKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGRMaXN0LWNvbnRhaW5lcicpO1xuICAgIHRkTGlzdC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGxldCB0ZD1jcmVhdGVUb2RvRGl2KGVsZW1lbnQpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGQpO1xuICAgIH0pO1xuICAgIHJldHVybiBjb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVGRRdWFkRGlzcGxheShxdWFkTGlzdHMpe1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgncXVhZC1kaXNwbGF5Jyk7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3F1YWQtY29udGFpbmVyJyk7XG4gICAgZm9yKGxldCBpPTE7IGk8NTsgaSsrKXtcbiAgICAgICAgbGV0IG5ld1F1YWQgPSBjcmVhdGVRdWFkQ29udGFpbmVyKHF1YWRMaXN0c1tpLTFdKTtcbiAgICAgICAgbmV3UXVhZC5jbGFzc0xpc3QuYWRkKCdxdWFkJytpKVxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmV3UXVhZCk7XG4gICAgfTtcblxuICAgIGxldCB1cmdlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB1cmdlbnQuY2xhc3NMaXN0LmFkZCgncXVhZC1ncmlkLWxhYmVsJyk7XG4gICAgdXJnZW50LmNsYXNzTGlzdC5hZGQoJ3VyZ2VudCcpO1xuICAgIHVyZ2VudC50ZXh0Q29udGVudCA9ICdVUkdFTlQnO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh1cmdlbnQpOyBcblxuICAgIGxldCBsYXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxhdGVyLmNsYXNzTGlzdC5hZGQoJ3F1YWQtZ3JpZC1sYWJlbCcpO1xuICAgIGxhdGVyLmNsYXNzTGlzdC5hZGQoJ2xhdGVyJyk7XG4gICAgbGF0ZXIudGV4dENvbnRlbnQgPSAnTk9UIFVSR0VOVCc7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxhdGVyKTtcbiAgICBcbiAgICBsZXQgaW1wb3J0YW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW1wb3J0YW50LmNsYXNzTGlzdC5hZGQoJ3F1YWQtZ3JpZC1sYWJlbCcpO1xuICAgIGltcG9ydGFudC5jbGFzc0xpc3QuYWRkKCdyb3RhdGUnKVxuICAgIGltcG9ydGFudC5jbGFzc0xpc3QuYWRkKCdpbXBvcnRhbnQnKTtcbiAgICBpbXBvcnRhbnQudGV4dENvbnRlbnQgPSAnSU1QT1JUQU5UJztcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW1wb3J0YW50KTtcblxuICAgIGxldCB1bmltcG9ydGFudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHVuaW1wb3J0YW50LmNsYXNzTGlzdC5hZGQoJ3F1YWQtZ3JpZC1sYWJlbCcpO1xuICAgIHVuaW1wb3J0YW50LmNsYXNzTGlzdC5hZGQoJ3JvdGF0ZScpXG4gICAgdW5pbXBvcnRhbnQuY2xhc3NMaXN0LmFkZCgndW5pbXBvcnRhbnQnKTtcbiAgICB1bmltcG9ydGFudC50ZXh0Q29udGVudCA9ICcgTk9UIElNUE9SVEFOVCc7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHVuaW1wb3J0YW50KTtcblxuICAgIHJldHVybiBjb250YWluZXI7XG59XG5cblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZVF1YWRDb250YWluZXIobGlzdCl7XG4gICAgbGV0IHF1YWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcXVhZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0ZExpc3QtY29udGFpbmVyJylcbiAgICAgICAgbGlzdC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgdGQ9Y3JlYXRlVG9kb0RpdihlbGVtZW50KTtcbiAgICAgICAgICAgIHF1YWRDb250YWluZXIuYXBwZW5kQ2hpbGQodGQpO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcXVhZENvbnRhaW5lcjsgXG59O1xuLy9IZWxwZXIgRnVuY3Rpb25zXG5cbmZ1bmN0aW9uIGNyZWF0ZVRvZG9EaXYodGRPYmplY3Qpe1xuICAgIC8vQ3JlYXRlIGNvbnRhaW5lciBEaXZcbiAgICBsZXQgdG9kb0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvZG9EaXYuY2xhc3NMaXN0LmFkZCgndG9kbycpO1xuICAgIHRvZG9EaXYuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgdGRPYmplY3RbJ2RhdGEtaW5kZXgnXSlcbiAgICAgICAgLy9jcmVhdGUgY2hlY2tib3ggaW1nL2RpdiB3aXRoIHNyYyBjb250cm9sbGVkIGJ5IGNzc1xuICAgIGxldCBzdGF0dXNCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIHN0YXR1c0JveC5jbGFzc0xpc3QuYWRkKCdjaGVja2JveCcpO1xuICAgIHN0YXR1c0JveC5zcmMgPSAnLi4vc3JjL0ltYWdlcy91bmNoZWNrZWQtYm94LnBuZyc7XG4gICAgICAgIC8vY3JlYXRlIHRpdGxlIGRpdi9idXR0b24gdG8gZXhwYW5kXG4gICAgbGV0IHRvZG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvZG9UaXRsZS5jbGFzc0xpc3QuYWRkKCd0b2RvLXRpdGxlJylcbiAgICB0b2RvVGl0bGUudGV4dENvbnRlbnQgPSB0ZE9iamVjdC50aXRsZTtcbiAgICAgICAgLy9jcmVhdGUgZHVlRGF0ZSBkaXZcbiAgICBsZXQgZHVlRGF0ZURpdiA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZHVlRGF0ZURpdi5jbGFzc0xpc3QuYWRkKCdkdWVEYXRlLWRpdicpO1xuICAgIGR1ZURhdGVEaXYudGV4dENvbnRlbnQgPSB0ZE9iamVjdC5kdWVEYXRlO1xuICAgICAgICAvL2NyZWF0ZSBQcmlvcml0eSBkaXZcbiAgICBsZXQgcHJpb3JpdHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHByaW9yaXR5RGl2LmNsYXNzTGlzdC5hZGQoJ3ByaW9yaXR5LWRpdicpO1xuICAgIHByaW9yaXR5RGl2LnRleHRDb250ZW50PXRkT2JqZWN0LnByaW9yaXR5O1xuICAgIHByaW9yaXR5RGl2LnN0eWxlLmNvbG9yID0gZ2V0UHJpb3JpdHlDb2xvcih0ZE9iamVjdCk7XG4gICAgICAgIC8vY3JlYXRlIGVkaXQgYnV0dG9uXG4gICAgbGV0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoJ2VkaXQnKTtcbiAgICBlZGl0QnRuLnNyYyA9ICcuLi9zcmMvSW1hZ2VzL3BlbmNpbC5wbmcnXG4gICAgICAgIC8vY3JlYXRlIGRlbGV0ZSBidXR0b25cbiAgICBsZXQgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZScpO1xuICAgIGRlbGV0ZUJ0bi5zcmM9Jy4uL3NyYy9JbWFnZXMvZGVsZXRlLnBuZyc7XG4gICAgLy9hcHBlbmQgZWxlbWVudHMgdG8gY29udGFpbmVyXG4gICAgdG9kb0Rpdi5hcHBlbmRDaGlsZChzdGF0dXNCb3gpO1xuICAgIHRvZG9EaXYuYXBwZW5kQ2hpbGQodG9kb1RpdGxlKTtcbiAgICB0b2RvRGl2LmFwcGVuZENoaWxkKGR1ZURhdGVEaXYpO1xuICAgIHRvZG9EaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlEaXYpO1xuICAgIHRvZG9EaXYuYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XG4gICAgdG9kb0Rpdi5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gICAgcmV0dXJuIHRvZG9EaXY7XG59O1xuXG5cbmZ1bmN0aW9uIHNldFRvZG9TdGF0dXNJbWFnZSh0ZERpdiwgY3VycmVudFN0YXR1cyl7XG4gICAgaWYgKGN1cnJlbnRTdGF0dXMgIT0gJ2NvbXBsZXRlJyl7XG4gICAgICAgIHRkRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlJyk7ICBcbiAgICAgICAgdGREaXYuZmlyc3RDaGlsZC5zcmMgPSAnLi4vc3JjL0ltYWdlcy91bmNoZWNrZWQtYm94LnBuZyc7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50U3RhdHVzID09PSAnY29tcGxldGUnKXtcbiAgICAgICAgdGREaXYuY2xhc3NMaXN0LmFkZCgnY29tcGxldGUnKSAgO1xuICAgICAgICB0ZERpdi5maXJzdENoaWxkLnNyYyA9ICcuLi9zcmMvSW1hZ2VzL2NoZWNrZWQtY2hlY2tib3gucG5nJztcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gZ2V0UHJpb3JpdHlDb2xvcih0b2RvT2JqZWN0KXtcbiAgICBsZXQgcHJpb3JpdHkgPSB0b2RvT2JqZWN0LnByaW9yaXR5O1xuICAgIGlmIChwcmlvcml0eSA9PT0gJ0hpZ2gnKXtcbiAgICAgICAgcmV0dXJuICdyZWQnO1xuICAgIH0gZWxzZSBpZiAocHJpb3JpdHkgPT09ICdNZWRpdW0nKXtcbiAgICAgICAgcmV0dXJuICdibHVlJztcbiAgICB9ZWxzZSBpZiAocHJpb3JpdHkgPT09XCJMb3dcIil7XG4gICAgICAgIHJldHVybiAnYmxhY2snO1xuICAgIH1lbHNlIHtcbiAgICAgICAgcmV0dXJuICdncmV5JztcbiAgICB9O1xufTtcblxuXG4vL0V4cG9ydHNcblxuZXhwb3J0IHtnZW5lcmF0ZVRkTGlzdERpc3BsYXksIGdlbmVyYXRlUHJvamVjdEhlYWRlciwgY3JlYXRlVG9kb0Rpdiwgc2V0VG9kb1N0YXR1c0ltYWdlLCBnZW5lcmF0ZVRkUXVhZERpc3BsYXksIGdlbmVyYXRlUHJvamVjdEJ1dHRvbnMsIGdlbmVyYXRlUHJvamVjdE92ZXJ2aWV3c0Rpc3BsYXl9IiwiaW1wb3J0IHsgbWFpblRvZG9MaXN0IH0gZnJvbSBcIi4vYXBwbG9naWNcIjtcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCJkYXRlLWZuc1wiO1xuXG5cblxuLy9OZXcgVG9kb1xuZnVuY3Rpb24gZWRpdFRvZG9Gb3JtKCl7XG4gICAgY29uc3QgZGlhbG9nPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaWFsb2cnKTtcbiAgICBkaWFsb2cuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcbiAgICBkaWFsb2cuc2V0QXR0cmlidXRlKCdpZCcsJ2VkaXRUb2RvRGlhbG9nJyk7XG4gICAgXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ2RpYWxvZycpO1xuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdlZGl0Rm9ybScpXG5cbiAgXG4gICAgY29uc3QgcHJvcGVydHlSb3cgPSBjcmVhdGVTZWxlY3RGb3JtUm93KCd0ZC1wcm9wZXJ0eScsICdDaG9vc2UgYSBwcm9wZXJ0eScsIFsndGl0bGUnLCAnZGVzY3JpcHRpb24nLCAnZHVlRGF0ZScsICdwcmlvcml0eScsICdub3RlcycsICdwcm9qZWN0IHRhZyddKTtcbiAgICBjb25zdCBuZXdWYWx1ZVJvdyA9IGNyZWF0ZUZvcm1Sb3coICduZXdWYWx1ZScsICcnLCAndGV4dCcpO1xuXG4gICAgY29uc3QgYnRuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBidG5Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9ybS1idXR0b25zJyk7XG5cbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKCdpZCcsICdlZGl0Q2FuY2VsQnRuJyk7XG4gICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnY2FuY2VsJyk7XG4gICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZSgnZm9ybW1ldGhvZCcsICdkaWFsb2cnKTtcbiAgICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcblxuICAgIGNvbnN0IGNvbmZpcm1CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb25maXJtQnRuLnNldEF0dHJpYnV0ZSgnaWQnLCAnZWRpdENvbmZpcm1CdG4nKTtcbiAgICBjb25maXJtQnRuLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnZGVmYXVsdCcpO1xuICAgIGNvbmZpcm1CdG4udGV4dENvbnRlbnQgPSBcIkNvbmZpcm1cIlxuICAgICAgIFxuICAgIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuICAgIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChjb25maXJtQnRuKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHByb3BlcnR5Um93KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKG5ld1ZhbHVlUm93KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGJ0bkNvbnRhaW5lcik7XG4gICAgZGlhbG9nLmFwcGVuZENoaWxkKGZvcm0pO1xuICAgIHJldHVybiBkaWFsb2c7XG59O1xuXG5cbmZ1bmN0aW9uIGVkaXRUb2RvUHJvcGVydHkodGRJbmRleCl7XG4gIGxldCBlZGl0UHJvcGVydHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGQtcHJvcGVydHknKS52YWx1ZTtcbiAgbGV0IG5ld1ZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld1ZhbHVlJykudmFsdWU7XG4gIG1haW5Ub2RvTGlzdFt0ZEluZGV4XVtlZGl0UHJvcGVydHldPSBuZXdWYWx1ZTtcbiAgbGV0IGVkaXRlZFRkID0gbWFpblRvZG9MaXN0W3RkSW5kZXhdO1xuICByZXR1cm4gZWRpdGVkVGQ7XG59O1xuXG5cbmZ1bmN0aW9uIGNoYW5nZUNvbXBsZXRlUHJvcGVydHkodGRJbmRleCwgdGRMaXN0KXtcbiAgbGV0IGN1cnJlbnRTdGF0dXMgPSB0ZExpc3RbdGRJbmRleF1bJ3N0YXR1cyddO1xuICBpZiAoY3VycmVudFN0YXR1cyA9PT0gJycpe1xuICAgICAgdGRMaXN0W3RkSW5kZXhdWydzdGF0dXMnXSA9ICdjb21wbGV0ZSc7XG4gIH0gZWxzZXtcbiAgICAgIHRkTGlzdFt0ZEluZGV4XVsnc3RhdHVzJ10gPSAnJztcbiAgfTtcbiAgcmV0dXJuIGN1cnJlbnRTdGF0dXM7XG59XG5cblxuXG4vL2hlbHBlciBmdW5jdGlvbnNcbmZ1bmN0aW9uIGNyZWF0ZUZvcm1Sb3coaWQsIHRpdGxlLCBpVHlwZSl7XG4gIGNvbnN0IGZvcm1Sb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZm9ybVJvdy5jbGFzc0xpc3QuYWRkKFwiZm9ybS1yb3dcIik7XG5cbiAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICBsYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsIGlkKTtcbiAgbGFiZWwudGV4dENvbnRlbnQ9IHRpdGxlO1xuXG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgaVR5cGUpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBpZCk7XG4gIGlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XG5cbiAgZm9ybVJvdy5hcHBlbmRDaGlsZChsYWJlbCk7XG4gIGZvcm1Sb3cuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICByZXR1cm4gZm9ybVJvdztcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlbGVjdEZvcm1Sb3coaWQsIHRpdGxlLCBvcHRpb25zTGlzdCApe1xuICBjb25zdCBmb3JtUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGZvcm1Sb3cuY2xhc3NMaXN0LmFkZChcImZvcm0tcm93XCIpO1xuXG4gIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgbGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCBpZCk7XG4gIGxhYmVsLnRleHRDb250ZW50PSB0aXRsZTtcblxuICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgc2VsZWN0LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XG4gIHNlbGVjdC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBpZCk7XG5cbiAgb3B0aW9uc0xpc3QuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgbGV0IGN1cnJlbnRPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBjdXJyZW50T3B0aW9uLnRleHRDb250ZW50ID0gb3B0aW9uO1xuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50T3B0aW9uKTtcbiAgfSk7XG5cbiAgZm9ybVJvdy5hcHBlbmRDaGlsZChsYWJlbCk7XG4gIGZvcm1Sb3cuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcbiAgcmV0dXJuIGZvcm1Sb3c7XG59O1xuXG5cblxuXG5cbmV4cG9ydCB7ZWRpdFRvZG9Qcm9wZXJ0eSwgZWRpdFRvZG9Gb3JtLCBjaGFuZ2VDb21wbGV0ZVByb3BlcnR5fTsiLCIvL0ltcG9ydHNcbmltcG9ydCB7IGNyZWF0ZVNpdGUgfSBmcm9tICcuL3NpdGVDb25zdGFudHMnO1xuaW1wb3J0IHsgbWFpblRvZG9MaXN0LCBjcmVhdGVEYWlseUxpc3QsIGNyZWF0ZVRoaXNXZWVrTGlzdCwgY3JlYXRlVG9kYXlMaXN0LCBkZWxldGVUb2RvLCBhZGRPdmVyZHVlQ2xhc3MsIGNyZWF0ZVF1YWRMaXN0cywgY3JlYXRlUHJvamVjdExpc3QgfSBmcm9tICcuL2FwcGxvZ2ljJztcbmltcG9ydCB7IGdlbmVyYXRlVGRMaXN0RGlzcGxheSwgZ2VuZXJhdGVQcm9qZWN0SGVhZGVyLCBjcmVhdGVUb2RvRGl2LCBzZXRUb2RvU3RhdHVzSW1hZ2UsIGdlbmVyYXRlVGRRdWFkRGlzcGxheSwgZ2VuZXJhdGVQcm9qZWN0QnV0dG9ucywgZ2VuZXJhdGVQcm9qZWN0T3ZlcnZpZXdzRGlzcGxheSB9IGZyb20gJy4vc2l0ZWR5bmFtaWMnO1xuaW1wb3J0IHsgYWRkTmV3VG9kbyB9IGZyb20gJy4vbmV3VEQnO1xuaW1wb3J0IHsgZWRpdFRvZG9Qcm9wZXJ0eSwgY2hhbmdlQ29tcGxldGVQcm9wZXJ0eSB9IGZyb20gJy4vZWRpdFREJztcbmltcG9ydCB7IGFkZERheXMgfSBmcm9tICdkYXRlLWZucyc7XG5cbi8vU2l0ZSBpbml0aWFsaXphdGlvblxuY3JlYXRlU2l0ZSgpO1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XG5jb25zdCBhbGxUYXNrc0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGwnKTtcbmFsbFRhc2tzQnRuLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuaW5pdGlhbGl6ZURpc3BsYXkoKTtcblxuXG5jb25zdCB0b2dnbGVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZ2dsZS1ib3hcIik7XG5jb25zdCBjaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNpcmNsZVwiKTtcbmNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2dnbGUtY2hlY2tib3hcIik7XG5cbmNpcmNsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT5zd2l0Y2hEaXNwbGF5TW9kZSgpKTtcblxudG9nZ2xlQm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgICBpZihjaGVja2JveC5jaGVja2VkKXtcbiAgICAgICAgY2lyY2xlLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlWCg0MnB4KVwiO1xuICAgICAgICAvL2NpcmNsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIC8vdG9nZ2xlQm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzUwNTE0ZlwiO1xuICAgIH1lbHNle1xuICAgICAgICBjaXJjbGUuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVYKDBweClcIjtcbiAgICAgICAgLy9jaXJjbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNTA1MTRmXCI7XG4gICAgICAgIC8vdG9nZ2xlQm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIjtcbiAgICB9XG59KTtcblxuXG5cbi8vQnV0dG9uIGxvZ2ljXG5jb25zdCB0b2RheUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RheUJ0bicpO1xudG9kYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICB0b2dnbGVOYXZCdG5zKGV2ZW50KTtcbiAgICBjbGVhckRvbURpc3BsYXkoKTtcbiAgICByZWZyZXNoRGlzcGxheSgpO1xufSk7XG5cbmNvbnN0IHRoaXNXZWVrQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlZWtseScpO1xudGhpc1dlZWtCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICBjbGVhckRvbURpc3BsYXkoKTtcbiAgICB0b2dnbGVOYXZCdG5zKGV2ZW50KTtcbiAgICByZWZyZXNoRGlzcGxheSgpO1xufSk7XG5cbmFsbFRhc2tzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgY2xlYXJEb21EaXNwbGF5KCk7XG4gICAgdG9nZ2xlTmF2QnRucyhldmVudCk7XG4gICAgcmVmcmVzaERpc3BsYXkoKTtcbn0pO1xuXG5jb25zdCBkYWlseUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYWlseScpO1xuZGFpbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICBjbGVhckRvbURpc3BsYXkoKTtcbiAgICB0b2dnbGVOYXZCdG5zKGV2ZW50KTtcbiAgICByZWZyZXNoRGlzcGxheSgpO1xufSk7XG5cbmNvbnN0IHByb2plY3ROYXZCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMnKTtcbnByb2plY3ROYXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICB0b2dnbGVOYXZCdG5zKGV2ZW50KTtcbiAgICBwcm9qZWN0TmF2QnRuLmFmdGVyKGdlbmVyYXRlUHJvamVjdEJ1dHRvbnMobWFpblRvZG9MaXN0KSk7XG4gICAgY2xlYXJEb21EaXNwbGF5KCk7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChnZW5lcmF0ZVByb2plY3RIZWFkZXIoJ0FsbCBQcm9qZWN0cycpKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGdlbmVyYXRlUHJvamVjdE92ZXJ2aWV3c0Rpc3BsYXkobWFpblRvZG9MaXN0KSk7XG4gICAgYWN0aXZhdGVBbGxCdG5zKCk7XG4gICAgLy9hZGQgY29kZSBmb3IgY2xlYXJpbmcgRE9NIGFuZCBzaG93aW5nIHByb2plY3QgT3ZlcnZpZXdzXG4gICAgY29uc3QgcHJvamVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1idG4nKTtcbiAgICBwcm9qZWN0QnRucy5mb3JFYWNoKChidG4pID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCk9PntcbiAgICAgICAgY2xlYXJEb21EaXNwbGF5KCk7XG4gICAgICAgIHRvZ2dsZU5hdkJ0bnMoZXZlbnQpO1xuICAgICAgICByZWZyZXNoRGlzcGxheSgpO1xuICAgICAgICBwcm9qZWN0QnRucy5mb3JFYWNoKChidG4pPT5idG4ucmVtb3ZlKCkpXG4gICAgfSkpO1xufSk7XG5cblxuXG5jb25zdCBuZXdUREJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdG9kby1idG4nKTtcbmNvbnN0IG5ld1RvZG9EaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3VG9kb0RpYWxvZycpO1xuY29uc3QgY2FuY2VsQnRuID0gbmV3VG9kb0RpYWxvZy5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsQnRuJyk7XG5jb25zdCBjb25maXJtQnRuID0gbmV3VG9kb0RpYWxvZy5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1CdG5cIik7XG5cbm5ld1REQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbmV3VERCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnY2xpY2tlZCcpO1xuICAgIG5ld1RvZG9EaWFsb2cuc2hvd01vZGFsKCk7XG59KVxuXG5jb25maXJtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgbmV3VGRPYmplY3QgPSBhZGROZXdUb2RvKCk7XG4gICAgZGlzcGxheU5ld1RkRGl2KG5ld1RkT2JqZWN0KTtcbiAgICBhY3RpdmF0ZUFsbEJ0bnMoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlGb3JtJykucmVzZXQoKTtcbiAgICBuZXdUb2RvRGlhbG9nLmNsb3NlKCk7XG59KTtcblxuY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUZvcm0nKS5yZXNldCgpO1xuICAgIG5ld1RvZG9EaWFsb2cuY2xvc2UoKTtcbn0pO1xuXG5cblxuXG5cblxuXG4vL0hlbHBlciBmdW5jdGlvbnNcblxuZnVuY3Rpb24gc3dpdGNoRGlzcGxheU1vZGUoKXtcbiAgICBtYWluLmNsYXNzTGlzdC50b2dnbGUoJ3F1YWQnKTtcbiAgICBjbGVhckRvbURpc3BsYXkoKTtcbiAgICByZWZyZXNoRGlzcGxheSgpO1xufVxuXG5cblxuZnVuY3Rpb24gZGlzcGxheU5ld1RkRGl2KHRkT2JqZWN0KSB7XG4gICAgbGV0IG5ld0RpdiA9IGNyZWF0ZVRvZG9EaXYodGRPYmplY3QpO1xuICAgIGxldCB0ZEluZGV4ID0gbWFpblRvZG9MaXN0LmZpbmRJbmRleChlbGVtZW50ID0+IGVsZW1lbnQudGl0bGUgPT09IHRkT2JqZWN0LnRpdGxlKTtcbiAgICBsZXQgZGl2TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvJylcbiAgICBpZiAodGRJbmRleCAhPSAwKSB7XG4gICAgICAgIGxldCBzaWJsaW5nVGl0bGUgPSBtYWluVG9kb0xpc3RbdGRJbmRleCAtIDFdLnRpdGxlO1xuICAgICAgICBkaXZMaXN0LmZvckVhY2goKGRpdikgPT4ge1xuICAgICAgICAgICAgaWYgKGRpdi50ZXh0Q29udGVudC5pbmNsdWRlcyhzaWJsaW5nVGl0bGUpKSB7XG4gICAgICAgICAgICAgICAgZGl2LmFmdGVyKG5ld0Rpdik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc2Vjb25kVGl0bGUgPSBtYWluVG9kb0xpc3RbMV0udGl0bGU7XG4gICAgICAgIGRpdkxpc3QuZm9yRWFjaCgoZGl2KSA9PiB7XG4gICAgICAgICAgICBpZiAoZGl2LnRleHRDb250ZW50LmluY2x1ZGVzKHNlY29uZFRpdGxlKSkge1xuICAgICAgICAgICAgICAgIGRpdi5iZWZvcmUobmV3RGl2KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cblxuZnVuY3Rpb24gYWN0aXZhdGVBbGxCdG5zKCl7XG4gICAgYWN0aXZhdGVDaGVja0JveGVzKCk7XG4gICAgYWN0aXZhdGVEZWxldGVCdG5zKCk7XG4gICAgYWN0aXZhdGVFZGl0QnRucygpO1xufTtcblxuZnVuY3Rpb24gYWN0aXZhdGVEZWxldGVCdG5zKCkge1xuICAgIGNvbnN0IGRlbGV0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVsZXRlJylcbiAgICBkZWxldGVCdG5zLmZvckVhY2goKEJ0bikgPT4gQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiBkZWxldGVUZERpdihldmVudCkpKTtcbn07XG5cbmZ1bmN0aW9uIGFjdGl2YXRlQ2hlY2tCb3hlcygpe1xuICAgIGNvbnN0IGNoZWNrQm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlY2tib3gnKTtcbiAgICBjaGVja0JveGVzLmZvckVhY2goKGJveCkgPT4gYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0b2dnbGVDb21wbGV0ZShldmVudCkpKTtcbn07XG5cbmZ1bmN0aW9uIGFjdGl2YXRlRWRpdEJ0bnMoKXtcbiAgICBjb25zdCBlZGl0VGRCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVkaXQnKTtcbiAgICBjb25zdCBlZGl0VG9kb0RpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0VG9kb0RpYWxvZycpO1xuICAgIGNvbnN0IGVkaXRDYW5jZWxCdG4gPSBlZGl0VG9kb0RpYWxvZy5xdWVyeVNlbGVjdG9yKCcjZWRpdENhbmNlbEJ0bicpO1xuICAgIGNvbnN0IGVkaXRDb25maXJtQnRuID0gZWRpdFRvZG9EaWFsb2cucXVlcnlTZWxlY3RvcihcIiNlZGl0Q29uZmlybUJ0blwiKTtcblxuICAgIGVkaXRUZEJ0bnMuZm9yRWFjaCgoQnRuKSA9PiBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgbGV0IHRkVGl0bGUgPSAoZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuZmlyc3RDaGlsZC5uZXh0U2libGluZy50ZXh0Q29udGVudCk7XG4gICAgICAgIGxldCB0ZEluZGV4ID0gbWFpblRvZG9MaXN0LmZpbmRJbmRleCh0ZE9iamVjdCA9PiB0ZE9iamVjdC50aXRsZSA9PT0gdGRUaXRsZSk7XG4gICAgICAgIGVkaXRUb2RvRGlhbG9nLnNob3dNb2RhbCgpO1xuICAgICAgICBlZGl0Q29uZmlybUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGVkaXRUb2RvUHJvcGVydHkodGRJbmRleCk7XG4gICAgICAgICAgICBtYWluVG9kb0xpc3Quc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYS5kdWVEYXRlKSAtIG5ldyBEYXRlKGIuZHVlRGF0ZSkpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXRGb3JtJykucmVzZXQoKTtcbiAgICAgICAgICAgIGVkaXRUb2RvRGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgICBjbGVhckRvbURpc3BsYXkoKTtcbiAgICAgICAgICAgIHJlZnJlc2hEaXNwbGF5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlZGl0Q2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXRGb3JtJykucmVzZXQoKTtcbiAgICAgICAgICAgIGVkaXRUb2RvRGlhbG9nLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pKTtcbn1cblxuXG5mdW5jdGlvbiB0b2dnbGVDb21wbGV0ZShldmVudCkge1xuICAgIGxldCB0ZERpdiA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgIGxldCB0ZEluZGV4ID0gdGREaXYuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgbGV0IG5ld1N0YXR1cyA9IGNoYW5nZUNvbXBsZXRlUHJvcGVydHkodGRJbmRleCwgbWFpblRvZG9MaXN0KTtcbiAgICBzZXRUb2RvU3RhdHVzSW1hZ2UodGREaXYsIG5ld1N0YXR1cyk7ICBcbn07XG5cblxuZnVuY3Rpb24gZGVsZXRlVGREaXYoZXZlbnQpIHtcbiAgICBsZXQgdGRUaXRsZSA9IChldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5maXJzdENoaWxkLm5leHRTaWJsaW5nLnRleHRDb250ZW50KTtcbiAgICBkZWxldGVUb2RvKHRkVGl0bGUsIG1haW5Ub2RvTGlzdCk7XG4gICAgbGV0IHRkRGl2ID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgdGREaXYucmVtb3ZlKCk7XG59O1xuXG5mdW5jdGlvbiB0b2dnbGVOYXZCdG5zKGV2ZW50KSB7XG4gICAgbGV0IG9sZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUnKTtcbiAgICBvbGRCdG4uZm9yRWFjaCgoZWxlbWVudCkgPT4gZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKSlcbiAgICBsZXQgYnRuID0gZXZlbnQudGFyZ2V0O1xuICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbn07XG5cbmZ1bmN0aW9uIGNsZWFyRG9tRGlzcGxheSgpIHtcbiAgICB3aGlsZShtYWluLmZpcnN0Q2hpbGQpe1xuICAgICAgICBtYWluLnJlbW92ZUNoaWxkKG1haW4uZmlyc3RDaGlsZCk7XG4gICAgfTtcbn07XG5cbmZ1bmN0aW9uIHJlZnJlc2hEaXNwbGF5KCl7XG4gICAgbGV0IGN1cnJlbnRUYWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XG4gICAgbGV0IGhlYWRlciA9IGN1cnJlbnRUYWIudGV4dENvbnRlbnQ7XG4gICAgbGV0IGNvbnRlbnQgPSAnJztcbiAgICBzd2l0Y2ggKGhlYWRlcil7XG4gICAgICAgIGNhc2UgJ1RvZGF5JzpcbiAgICAgICAgICAgIGNvbnRlbnQgPSBjcmVhdGVUb2RheUxpc3QobWFpblRvZG9MaXN0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdUaGlzIFdlZWsnOlxuICAgICAgICAgICAgY29udGVudCA9IGNyZWF0ZVRoaXNXZWVrTGlzdChtYWluVG9kb0xpc3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0FsbCBUYXNrcyc6XG4gICAgICAgICAgICBjb250ZW50ID0gbWFpblRvZG9MaXN0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RhaWx5IFRhc2tzJzpcbiAgICAgICAgICAgIGNvbnRlbnQgPSBjcmVhdGVEYWlseUxpc3QobWFpblRvZG9MaXN0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiAvLyBmb3IgcHJvamVjdCB0YWJzXG4gICAgICAgICAgICBjb250ZW50ID0gY3JlYXRlUHJvamVjdExpc3QobWFpblRvZG9MaXN0LCBoZWFkZXIpOyBcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH07XG4gICAgbWFpbi5hcHBlbmRDaGlsZChnZW5lcmF0ZVByb2plY3RIZWFkZXIoaGVhZGVyKSk7XG4gICAgaWYgKG1haW4uY2xhc3NMaXN0LmNvbnRhaW5zKCdxdWFkJykpIHtcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChnZW5lcmF0ZVRkUXVhZERpc3BsYXkoY3JlYXRlUXVhZExpc3RzKGNvbnRlbnQpKSk7XG4gICAgICAgIGFkZE92ZXJkdWVDbGFzcyhtYWluVG9kb0xpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoZ2VuZXJhdGVUZExpc3REaXNwbGF5KGNvbnRlbnQpKTtcbiAgICAgICAgYWRkT3ZlcmR1ZUNsYXNzKG1haW5Ub2RvTGlzdCk7XG4gICAgfTtcbiAgICBhY3RpdmF0ZUFsbEJ0bnMoKTtcbiAgICBjb25zdCB0ZERpdkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kbycpO1xuICAgIHRkRGl2TGlzdC5mb3JFYWNoKChkaXYpPT4ge1xuICAgICAgICBsZXQgdGRJbmRleCA9IGRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgbGV0IHN0YXR1cyA9IG1haW5Ub2RvTGlzdFt0ZEluZGV4XVsnc3RhdHVzJ11cbiAgICAgICAgc2V0VG9kb1N0YXR1c0ltYWdlKGRpdiwgc3RhdHVzKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVEaXNwbGF5KCl7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChnZW5lcmF0ZVByb2plY3RIZWFkZXIoJ0FsbCB0YXNrcycpKTtcbiAgICBpZiAobWFpbi5jbGFzc0xpc3QuY29udGFpbnMoJ3F1YWQnKSkge1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKGdlbmVyYXRlVGRRdWFkRGlzcGxheShjcmVhdGVRdWFkTGlzdHMobWFpblRvZG9MaXN0KSkpO1xuICAgICAgICBhZGRPdmVyZHVlQ2xhc3MobWFpblRvZG9MaXN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKGdlbmVyYXRlVGRMaXN0RGlzcGxheShtYWluVG9kb0xpc3QpKTtcbiAgICAgICAgYWRkT3ZlcmR1ZUNsYXNzKG1haW5Ub2RvTGlzdCk7XG4gICAgfTtcbiAgICBhY3RpdmF0ZUFsbEJ0bnMoKTtcbn07XG4gXG4iXSwibmFtZXMiOlsidG9EYXRlIiwiYXJndW1lbnQiLCJhcmdTdHIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJEYXRlIiwiY29uc3RydWN0b3IiLCJOYU4iLCJjb25zdHJ1Y3RGcm9tIiwiZGF0ZSIsInZhbHVlIiwiYWRkRGF5cyIsImFtb3VudCIsIl9kYXRlIiwiaXNOYU4iLCJzZXREYXRlIiwiZ2V0RGF0ZSIsImlzVmFsaWQiLCJOdW1iZXIiLCJmb3JtYXREaXN0YW5jZUxvY2FsZSIsImxlc3NUaGFuWFNlY29uZHMiLCJvbmUiLCJvdGhlciIsInhTZWNvbmRzIiwiaGFsZkFNaW51dGUiLCJsZXNzVGhhblhNaW51dGVzIiwieE1pbnV0ZXMiLCJhYm91dFhIb3VycyIsInhIb3VycyIsInhEYXlzIiwiYWJvdXRYV2Vla3MiLCJ4V2Vla3MiLCJhYm91dFhNb250aHMiLCJ4TW9udGhzIiwiYWJvdXRYWWVhcnMiLCJ4WWVhcnMiLCJvdmVyWFllYXJzIiwiYWxtb3N0WFllYXJzIiwiYnVpbGRGb3JtYXRMb25nRm4iLCJhcmdzIiwib3B0aW9ucyIsIndpZHRoIiwiU3RyaW5nIiwiZGVmYXVsdFdpZHRoIiwiZm9ybWF0cyIsImZvcm1hdExvbmciLCJmdWxsIiwibG9uZyIsIm1lZGl1bSIsInNob3J0IiwidGltZSIsImRhdGVUaW1lIiwiZm9ybWF0UmVsYXRpdmVMb2NhbGUiLCJsYXN0V2VlayIsInllc3RlcmRheSIsInRvZGF5IiwidG9tb3Jyb3ciLCJuZXh0V2VlayIsImJ1aWxkTG9jYWxpemVGbiIsInZhbHVlc0FycmF5IiwiY29udGV4dCIsImZvcm1hdHRpbmdWYWx1ZXMiLCJkZWZhdWx0Rm9ybWF0dGluZ1dpZHRoIiwidmFsdWVzIiwiYXJndW1lbnRDYWxsYmFjayIsImJ1aWxkTWF0Y2hGbiIsInN0cmluZyIsIm1hdGNoUGF0dGVybiIsIm1hdGNoUGF0dGVybnMiLCJkZWZhdWx0TWF0Y2hXaWR0aCIsIm1hdGNoUmVzdWx0IiwibWF0Y2giLCJtYXRjaGVkU3RyaW5nIiwicGFyc2VQYXR0ZXJucyIsImRlZmF1bHRQYXJzZVdpZHRoIiwia2V5IiwiQXJyYXkiLCJpc0FycmF5IiwiYXJyYXkiLCJwcmVkaWNhdGUiLCJsZW5ndGgiLCJ0ZXN0IiwiZmluZEluZGV4Iiwib2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJmaW5kS2V5IiwidmFsdWVDYWxsYmFjayIsInJlc3QiLCJzbGljZSIsImVuVVMiLCJjb2RlIiwiZm9ybWF0RGlzdGFuY2UiLCJ0b2tlbiIsImNvdW50IiwicmVzdWx0IiwidG9rZW5WYWx1ZSIsInJlcGxhY2UiLCJhZGRTdWZmaXgiLCJjb21wYXJpc29uIiwiZm9ybWF0UmVsYXRpdmUiLCJfYmFzZURhdGUiLCJfb3B0aW9ucyIsImxvY2FsaXplIiwib3JkaW5hbE51bWJlciIsImRpcnR5TnVtYmVyIiwibnVtYmVyIiwicmVtMTAwIiwiZXJhIiwibmFycm93IiwiYWJicmV2aWF0ZWQiLCJ3aWRlIiwicXVhcnRlciIsIm1vbnRoIiwiZGF5IiwiZGF5UGVyaW9kIiwiYW0iLCJwbSIsIm1pZG5pZ2h0Iiwibm9vbiIsIm1vcm5pbmciLCJhZnRlcm5vb24iLCJldmVuaW5nIiwibmlnaHQiLCJwYXJzZVBhdHRlcm4iLCJwYXJzZUludCIsInBhcnNlUmVzdWx0IiwiYW55IiwiaW5kZXgiLCJ3ZWVrU3RhcnRzT24iLCJmaXJzdFdlZWtDb250YWluc0RhdGUiLCJkZWZhdWx0T3B0aW9ucyIsImdldERlZmF1bHRPcHRpb25zIiwiTWF0aCIsInBvdyIsIm1pbGxpc2Vjb25kc0luV2VlayIsIm1pbGxpc2Vjb25kc0luRGF5Iiwic3RhcnRPZkRheSIsInNldEhvdXJzIiwiZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyIsInV0Y0RhdGUiLCJVVEMiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsImdldE1pbGxpc2Vjb25kcyIsInNldFVUQ0Z1bGxZZWFyIiwiZ2V0VGltZSIsImdldERheU9mWWVhciIsImRhdGVMZWZ0IiwiZGF0ZVJpZ2h0Iiwic3RhcnRPZkRheUxlZnQiLCJzdGFydE9mRGF5UmlnaHQiLCJ0aW1lc3RhbXBMZWZ0IiwidGltZXN0YW1wUmlnaHQiLCJyb3VuZCIsImRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyIsImNsZWFuRGF0ZSIsInNldEZ1bGxZZWFyIiwic3RhcnRPZlllYXIiLCJzdGFydE9mV2VlayIsImxvY2FsZSIsImdldERheSIsImRpZmYiLCJzdGFydE9mSVNPV2VlayIsImdldElTT1dlZWtZZWFyIiwieWVhciIsImZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIiLCJzdGFydE9mTmV4dFllYXIiLCJmb3VydGhPZkphbnVhcnlPZlRoaXNZZWFyIiwic3RhcnRPZlRoaXNZZWFyIiwiZ2V0SVNPV2VlayIsImZvdXJ0aE9mSmFudWFyeSIsInN0YXJ0T2ZJU09XZWVrWWVhciIsImdldFdlZWtZZWFyIiwiZmlyc3RXZWVrT2ZOZXh0WWVhciIsImZpcnN0V2Vla09mVGhpc1llYXIiLCJnZXRXZWVrIiwiZmlyc3RXZWVrIiwic3RhcnRPZldlZWtZZWFyIiwiYWRkTGVhZGluZ1plcm9zIiwidGFyZ2V0TGVuZ3RoIiwiYWJzIiwicGFkU3RhcnQiLCJsaWdodEZvcm1hdHRlcnMiLCJ5Iiwic2lnbmVkWWVhciIsIk0iLCJkIiwiYSIsImRheVBlcmlvZEVudW1WYWx1ZSIsInRvVXBwZXJDYXNlIiwiaCIsIkgiLCJtIiwicyIsIlMiLCJudW1iZXJPZkRpZ2l0cyIsIm1pbGxpc2Vjb25kcyIsImZsb29yIiwiZm9ybWF0dGVycyIsIkciLCJ1bml0IiwiWSIsInNpZ25lZFdlZWtZZWFyIiwid2Vla1llYXIiLCJSIiwidSIsIlEiLCJjZWlsIiwicSIsIkwiLCJ3Iiwid2VlayIsIkkiLCJpc29XZWVrIiwiRCIsImRheU9mWWVhciIsIkUiLCJkYXlPZldlZWsiLCJlIiwibG9jYWxEYXlPZldlZWsiLCJjIiwiaSIsImlzb0RheU9mV2VlayIsInRvTG93ZXJDYXNlIiwiYiIsImhvdXJzIiwiQiIsIksiLCJrIiwiWCIsIl9sb2NhbGl6ZSIsInRpbWV6b25lT2Zmc2V0IiwiX29yaWdpbmFsRGF0ZSIsImdldFRpbWV6b25lT2Zmc2V0IiwiZm9ybWF0VGltZXpvbmVXaXRoT3B0aW9uYWxNaW51dGVzIiwiZm9ybWF0VGltZXpvbmUiLCJ4IiwiTyIsImZvcm1hdFRpbWV6b25lU2hvcnQiLCJ6IiwidCIsIm9yaWdpbmFsRGF0ZSIsIlQiLCJvZmZzZXQiLCJkZWxpbWl0ZXIiLCJzaWduIiwiYWJzT2Zmc2V0IiwibWludXRlcyIsImRhdGVMb25nRm9ybWF0dGVyIiwicGF0dGVybiIsInRpbWVMb25nRm9ybWF0dGVyIiwibG9uZ0Zvcm1hdHRlcnMiLCJwIiwiUCIsImRhdGVQYXR0ZXJuIiwidGltZVBhdHRlcm4iLCJkYXRlVGltZUZvcm1hdCIsInByb3RlY3RlZERheU9mWWVhclRva2VucyIsInByb3RlY3RlZFdlZWtZZWFyVG9rZW5zIiwidGhyb3dQcm90ZWN0ZWRFcnJvciIsImZvcm1hdCIsImlucHV0IiwiUmFuZ2VFcnJvciIsImZvcm1hdHRpbmdUb2tlbnNSZWdFeHAiLCJsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCIsImVzY2FwZWRTdHJpbmdSZWdFeHAiLCJkb3VibGVRdW90ZVJlZ0V4cCIsInVuZXNjYXBlZExhdGluQ2hhcmFjdGVyUmVnRXhwIiwiZm9ybWF0U3RyIiwiZm9ybWF0dGVyT3B0aW9ucyIsIm1hcCIsInN1YnN0cmluZyIsImZpcnN0Q2hhcmFjdGVyIiwibG9uZ0Zvcm1hdHRlciIsImpvaW4iLCJtYXRjaGVkIiwiY2xlYW5Fc2NhcGVkU3RyaW5nIiwiZm9ybWF0dGVyIiwidXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zIiwiaW5kZXhPZiIsInVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnMiLCJpc1Byb3RlY3RlZERheU9mWWVhclRva2VuIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImR1ZURhdGUiLCJwcmlvcml0eSIsIm5vdGVzIiwicHJvamVjdFRhZyIsInRoaXMiLCJ0b0xvY2FsZVN0cmluZyIsImR1ZURhdGVGb3JtYXQiLCJ0b2RvcyIsInN0YXR1cyIsIlByb2plY3QiLCJ0ZExpc3QiLCJsaXN0IiwiZmlsdGVyIiwidGQiLCJoYXJkQ29kZVREcyIsImRlc2NyaXB0IiwibmV3VG9kbyIsInB1c2giLCJzb3J0IiwiaW5kZXhMaXN0IiwiYWRkT3ZlcmR1ZUNsYXNzIiwib3ZlcmR1ZUxpc3QiLCJmb3JFYWNoIiwidGRPYmplY3QiLCJkYXRlVG9Db21wYXJlIiwiY2hlY2tJZk92ZXJkdWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkaXYiLCJ0ZEluZGV4IiwiZ2V0QXR0cmlidXRlIiwiaW5jbHVkZXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJjcmVhdGVQcm9qZWN0VGFnTGlzdCIsInByb2plY3RUYWdMaXN0IiwibmV3UHJvamVjdCIsImNyZWF0ZVF1YWRMaXN0cyIsInVyZ2VuY3lEYXRlIiwiY3JlYXRlRm9ybVJvdyIsImlkIiwiaVR5cGUiLCJmb3JtUm93IiwiY3JlYXRlRWxlbWVudCIsImxhYmVsIiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVNlbGVjdEZvcm1Sb3ciLCJvcHRpb25zTGlzdCIsInNlbGVjdCIsIm9wdGlvbiIsImN1cnJlbnRPcHRpb24iLCJjb250ZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0YXNrR3JhbW1hciIsIm51bSIsInRhc2siLCJnZW5lcmF0ZVByb2plY3RIZWFkZXIiLCJwSGVhZGVyIiwiZ2VuZXJhdGVUZExpc3REaXNwbGF5IiwiY29udGFpbmVyIiwiZWxlbWVudCIsImNyZWF0ZVRvZG9EaXYiLCJnZW5lcmF0ZVRkUXVhZERpc3BsYXkiLCJxdWFkTGlzdHMiLCJuZXdRdWFkIiwiY3JlYXRlUXVhZENvbnRhaW5lciIsInVyZ2VudCIsImxhdGVyIiwiaW1wb3J0YW50IiwidW5pbXBvcnRhbnQiLCJxdWFkQ29udGFpbmVyIiwidG9kb0RpdiIsInN0YXR1c0JveCIsInNyYyIsInRvZG9UaXRsZSIsImR1ZURhdGVEaXYiLCJwcmlvcml0eURpdiIsInN0eWxlIiwiY29sb3IiLCJ0b2RvT2JqZWN0IiwiZ2V0UHJpb3JpdHlDb2xvciIsImVkaXRCdG4iLCJkZWxldGVCdG4iLCJzZXRUb2RvU3RhdHVzSW1hZ2UiLCJ0ZERpdiIsImN1cnJlbnRTdGF0dXMiLCJyZW1vdmUiLCJmaXJzdENoaWxkIiwiaGVhZGVyIiwibG9nb1RpdGxlQm94IiwibG9nbyIsImhlYWRlclJpZ2h0IiwidXNlckRpc3BsYXkiLCJkaXNwbGF5VG9nZ2xlQm94IiwidG9nZ2xlQnRuIiwidG9nZ2xlQ2lyY2xlIiwiY3JlYXRlSGVhZGVyIiwibmF2QmFyIiwidG9kYXlCdG4iLCJ3ZWVrQnRuIiwiYWxsQnRuIiwiZGFpbHlCdG4iLCJwcm9qZWN0QnRuIiwibmV3VEQiLCJjcmVhdGVOYXZCYXIiLCJtYWluIiwiY3JlYXRlTWFpbkRpdiIsImZvb3RlciIsImNyZWF0ZUZvb3RlciIsImRpYWxvZyIsImZvcm0iLCJ0aXRsZVJvdyIsImRlc2NyaXB0Um93IiwiZGF0ZVJvdyIsInByaW9yaXR5Um93IiwicHJvamVjdFJvdyIsImJ0bkNvbnRhaW5lciIsImNhbmNlbEJ0biIsImNvbmZpcm1CdG4iLCJjcmVhdGVOZXdUb2RvRm9ybSIsInByb3BlcnR5Um93IiwibmV3VmFsdWVSb3ciLCJlZGl0VG9kb0Zvcm0iLCJhbGxUYXNrc0J0biIsInRvZ2dsZSIsImNvbnRhaW5zIiwiYWN0aXZhdGVBbGxCdG5zIiwidG9nZ2xlQm94IiwicXVlcnlTZWxlY3RvciIsImNpcmNsZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGVhckRvbURpc3BsYXkiLCJyZWZyZXNoRGlzcGxheSIsImNoZWNrZWQiLCJ0cmFuc2Zvcm0iLCJldmVudCIsInRvZ2dsZU5hdkJ0bnMiLCJwcm9qZWN0TmF2QnRuIiwiYWZ0ZXIiLCJ0YWciLCJidG4iLCJnZW5lcmF0ZVByb2plY3RCdXR0b25zIiwicHJvamVjdFRkTGlzdHMiLCJjdXJyZW50UHJvamVjdCIsImNyZWF0ZVByb2plY3RURExpc3RzIiwicHJvamVjdE9iamVjdCIsInRpdGxlRGl2IiwicHJvamVjdFN0YXRzIiwicHJvamVjdExpc3QiLCJudW1Db21wbGV0ZWQiLCJudW1UZHMiLCJudW1RMSIsIm51bVEyIiwibnVtUTMiLCJudW1RNCIsImdldFByb2plY3RTdGF0cyIsImNvbXBsZXRlbmVzcyIsInExIiwidGFzazEiLCJxMiIsInRhc2syIiwicTMiLCJ0YXNrMyIsInE0IiwidGFzazQiLCJnZW5lcmF0ZVN0YXRzRGl2IiwiZ2VuZXJhdGVQcm9qZWN0T3ZlcnZpZXdzRGlzcGxheSIsInByb2plY3RCdG5zIiwibmV3VERCdG4iLCJuZXdUb2RvRGlhbG9nIiwiYm94IiwidGFyZ2V0IiwicGFyZW50RWxlbWVudCIsIm5ld1N0YXR1cyIsImNoYW5nZUNvbXBsZXRlUHJvcGVydHkiLCJ0b2dnbGVDb21wbGV0ZSIsIkJ0biIsInRkVGl0bGUiLCJzcGxpY2UiLCJkZWxldGVUb2RvIiwibmV4dFNpYmxpbmciLCJkZWxldGVUZERpdiIsImVkaXRUZEJ0bnMiLCJlZGl0VG9kb0RpYWxvZyIsImVkaXRDYW5jZWxCdG4iLCJlZGl0Q29uZmlybUJ0biIsInNob3dNb2RhbCIsInByZXZlbnREZWZhdWx0IiwiZWRpdFByb3BlcnR5IiwibmV3VmFsdWUiLCJlZGl0VG9kb1Byb3BlcnR5IiwicmVzZXQiLCJjbG9zZSIsImFjdGl2YXRlRWRpdEJ0bnMiLCJyZW1vdmVDaGlsZCIsImNyZWF0ZURhaWx5TGlzdCIsImNyZWF0ZVByb2plY3RMaXN0IiwibmV3RGl2IiwiZGl2TGlzdCIsInNpYmxpbmdUaXRsZSIsInNlY29uZFRpdGxlIiwiYmVmb3JlIiwiZGlzcGxheU5ld1RkRGl2IiwiYWRkTmV3VG9kbyJdLCJzb3VyY2VSb290IjoiIn0=
