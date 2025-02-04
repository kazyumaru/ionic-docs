# ion-datetime

Datetimes present a picker interface from the bottom of a page, making it easy for
users to select dates and times. The picker displays scrollable columns that can be
used to individually select years, months, days, hours and minute values. Datetimes
are similar to the native `input` elements of type `datetime-local`, however, Ionic's
Datetime component makes it easy to display the date and time in a preferred format,
and manage the datetime values.


## Display and Picker Formats

The datetime component displays the values in two places: in the `<ion-datetime>` component,
and in the picker interface that is presented from the bottom of the screen. The following
chart lists all of the formats that can be used.

| Format | Description                    | Example                 |
| ------ | ------------------------------ | ----------------------- |
| `YYYY` | Year, 4 digits                 | `2018`                  |
| `YY`   | Year, 2 digits                 | `18`                    |
| `M`    | Month                          | `1` ... `12`            |
| `MM`   | Month, leading zero            | `01` ... `12`           |
| `MMM`  | Month, short name              | `Jan`                   |
| `MMMM` | Month, full name               | `January`               |
| `D`    | Day                            | `1` ... `31`            |
| `DD`   | Day, leading zero              | `01` ... `31`           |
| `DDD`  | Day, short name                | `Fri`                   |
| `DDDD` | Day, full name                 | `Friday`                |
| `H`    | Hour, 24-hour                  | `0` ... `23`            |
| `HH`   | Hour, 24-hour, leading zero    | `00` ... `23`           |
| `h`    | Hour, 12-hour                  | `1` ... `12`            |
| `hh`   | Hour, 12-hour, leading zero    | `01` ... `12`           |
| `a`    | 12-hour time period, lowercase | `am` `pm`               |
| `A`    | 12-hour time period, uppercase | `AM` `PM`               |
| `m`    | Minute                         | `1` ... `59`            |
| `mm`   | Minute, leading zero           | `01` ... `59`           |
| `s`    | Second                         | `1` ... `59`            |
| `ss`   | Second, leading zero           | `01` ... `59`           |
| `Z`    | UTC Timezone Offset            | `Z or +HH:mm or -HH:mm` |

**Important**: See the [Month Names and Day of the Week
Names](#month-names-and-day-of-the-week-names) section below on how to use
different names for the month and day.

### Display Format

The `displayFormat` property specifies how a datetime's value should be
printed, as formatted text, within the datetime component.

A few examples are provided in the chart below. The formats mentioned
above can be passed in to the display format in any combination.

| Display Format        | Example                 |
| ----------------------| ----------------------- |
| `M-YYYY`              | `6-2005`                |
| `MM/YY`               | `06/05`                 |
| `MMM YYYY`            | `Jun 2005`              |
| `YYYY, MMMM`          | `2005, June`            |
| `MMM DD, YYYY HH:mm`  | `Jun 17, 2005 11:06`    |

**Important**: `ion-datetime` will always display values relative to the user's timezone.
Given a value of `09:00:00+01:00`, the datetime component will
display it as `04:00:00-04:00` for users in a `-04:00` timezone offset.


### Picker Format

The `pickerFormat` property determines which columns should be shown in the picker
interface, the order of the columns, and which format to use within each
column. If `pickerFormat` is not provided then it will use the value of
`displayFormat`. Refer to the chart in the [Display Format](#display-format) section
for some formatting examples.


### Datetime Data

Historically, handling datetime values within JavaScript, or even within HTML
inputs, has always been a challenge. Specifically, JavaScript's `Date` object is
notoriously difficult to correctly parse apart datetime strings or to format
datetime values. Even worse is how different browsers and JavaScript versions
parse various datetime strings differently, especially per locale.

Fortunately, Ionic's datetime input has been designed so developers can avoid
the common pitfalls, allowing developers to easily format datetime values within
the input, and give the user a simple datetime picker for a great user
experience.

##### ISO 8601 Datetime Format: YYYY-MM-DDTHH:mmZ

Ionic uses the [ISO 8601 datetime format](https://www.w3.org/TR/NOTE-datetime)
for its value. The value is simply a string, rather than using JavaScript's
`Date` object. Additionally, when using the ISO datetime format, it makes it
easier to serialize and pass within JSON objects, and sending databases a
standardized format which it can be easily parsed if need be.

An ISO format can be used as a simple year, or just the hour and minute, or get
more detailed down to the millisecond and timezone. Any of the ISO formats below
can be used, and after a user selects a new value, Ionic will continue to use
the same ISO format which datetime value was originally given as.

| Description          | Format                 | Datetime Value Example        |
| -------------------- | ---------------------- | ----------------------------  |
| Year                 | YYYY                   | 1994                          |
| Year and Month       | YYYY-MM                | 1994-12                       |
| Complete Date        | YYYY-MM-DD             | 1994-12-15                    |
| Date and Time        | YYYY-MM-DDTHH:mm       | 1994-12-15T13:47              |
| UTC Timezone         | YYYY-MM-DDTHH:mm:ssTZD | 1994-12-15T13:47:20.789Z      |
| Timezone Offset      | YYYY-MM-DDTHH:mm:ssTZD | 1994-12-15T13:47:20.789+05:00 |
| Hour and Minute      | HH:mm                  | 13:47                         |
| Hour, Minute, Second | HH:mm:ss               | 13:47:20                      |

Note that the year is always four-digits, milliseconds (if it's added) is always
three-digits, and all others are always two-digits. So the number representing
January always has a leading zero, such as `01`. Additionally, the hour is
always in the 24-hour format, so `00` is `12am` on a 12-hour clock, `13` means
`1pm`, and `23` means `11pm`.

It's also important to note that neither the `displayFormat` or `pickerFormat`
can set the datetime value's output, which is the value that is set by the
component's `ngModel`. The format's are merely for displaying the value as text
and the picker's interface, but the datetime's value is always persisted as a
valid ISO 8601 datetime string.

## Min and Max Datetimes

Dates are infinite in either direction, so for a user's selection there should
be at least some form of restricting the dates that can be selected. By default,
the maximum date is to the end of the current year, and the minimum date is from
the beginning of the year that was 100 years ago.

To customize the minimum and maximum datetime values, the `min` and `max`
component properties can be provided which may make more sense for the app's
use-case, rather than the default of the last 100 years. Following the same IS0
8601 format listed in the table above, each component can restrict which dates
can be selected by the user. By passing `2016` to the `min` property and `2020-10-31`
to the `max` property, the datetime will restrict the date selection between the
beginning of 2016, and October 31st of 2020.


## Month Names and Day of the Week Names

At this time, there is no one-size-fits-all standard to automatically choose the
correct language/spelling for a month name, or day of the week name, depending
on the language or locale.

The good news is that there is an [Intl.DatetimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DatetimeFormat)
standard which [most browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DatetimeFormat#Browser_compatibility) have adopted.

However, at this time the standard has not been fully implemented by all popular browsers
so Ionic is unavailable to take advantage of it yet.

Additionally, Angular also provides an internationalization service, but it is still
under heavy development so Ionic does not depend on it at this time.

The current best practice is to provide an array of names if the app needs to use names other
than the default English version of month and day names. The month names and day names can be
either configured at the app level, or individual `ion-datetime` level.


### Advanced Datetime Validation and Manipulation

The datetime picker provides the simplicity of selecting an exact format, and
persists the datetime values as a string using the standardized [ISO 8601
datetime format](https://www.w3.org/TR/NOTE-datetime). However, it's important
to note that `ion-datetime` does not attempt to solve all situations when
validating and manipulating datetime values. If datetime values need to be
parsed from a certain format, or manipulated (such as adding 5 days to a date,
subtracting 30 minutes, etc.), or even formatting data to a specific locale,
then we highly recommend using [date-fns](https://date-fns.org) to work with
dates in JavaScript.

