## mock-browser-timezone

A Javascript library to mock the browser's timezone using ECMAScript Internationalization API.

### What's different?

Many modern browsers use the <a href = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl'>Intl</a> API to get the desired IANA timezone string which depicts the current browser timezone.</br>

This library is specifically designed to mock the browser timezone, assisting to test the relevant code which uses the `Intl` API.

### Installation

##### Using npm:
```
npm install mock-browser-timezone --save-dev
```

##### Using yarn:
```
yarn add mock-browser-timezone -D
```
### API

<ul>
<li><b>registerTimezone</b>: For mocking the browser's timezone represented in IANA timezone string.</li>
<li><b>registerAbbreviatedTimezone</b>: For mocking the abbreviated timezone string. Factually, there can be a lot of ambiguity in determining abbreviated timezone since it highly depends on the daylight time and a single abbreviated string can also represent many other timezone values.<br/>
For a better read regarding the same: https://stackoverflow.com/tags/timezone/info.</li>
<li><b>reset</b>: Used to bring back the mocked timezones to their original state.</li>
</ul>

### Usage

For a better implementation of `mock-browser-timezone`, have a look at <a href = 'https://github.com/aryanshridhar/mock-browser-timezone/blob/master/mock-browser-timezone.js'><code>mock-browser-timezone.js</code></a> file.

```javascript
const {
  registerTimezone,
  registerAbbreviatedTimezone,
  reset,
} = require('mock-browser-timezone');

// Mocking the timezone using IANA timezone string.
registerTimezone('Europe/Paris');

reset(); // Default back to the orginal value.

new Intl.DateTimeFormat().resolvedOptions().timeZone; // Europe/Paris

registerAbbreviatedTimezone('CET');

new Intl.DateTimeFormat([], {
  timeZoneName: 'short',
})
  .formatToParts(date)
  .find((locale) => locale.type === 'timeZoneName').value; // CET

reset(); // Default back to the orginal abbreviated timezone value.
```

### Supported Timezones

A list of supported IANA formatted timezones as well as abbreviated timezones can be found at <a href = 'https://github.com/aryanshridhar/mock-browser-timezone/blob/master/static/timezones.json'><code>timezones.json</code></a>.
