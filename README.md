# NgGtmSite: Angular Google Tag Manager Integration Sample

## Table of Contents

- [Overview](#overview)
- [How to Use (For Non-technical Users)](#how-to-use-for-non-technical-users)
- [How to use (technical)](#how-to-use-technical)
- [Quick GTM setup](#quick-gtm-setup)
- [Javascript interface](#javascript-interface)
- [Data streams differentiation](#data-streams-differentiation)
- [Firebase SDK](#firebase-sdk)
- [PWA (Progressive Web App)](#pwa-progressive-web-app)
- [YouTube video tracking](#youtube-video-tracking)
- [Consent mode v2](#consent-mode-v2)
- [Development server](#development-server)
- [Build](#build)
- [Documentation as a static site (Experimental)](#documentation-as-a-static-site-experimental)
- [License](#license)

## Overview

This project demonstrates a simple implementation of Google Tag Manager (GTM) with an Angular application. It showcases various GTM events like `page_view`, `view_promotion`, and more, to help you understand and test GTM integration in a real-world scenario.

For now, the app supports:

1. `page_view`
2. `view_promotion`
3. `select_promotion`
4. `view_item_list`
5. `select_item`
6. `view_item`
7. `add_to_cart`
8. `remove_from_cart`
9. `view_cart`
10. `begin_checkout`
11. `add_shipping_info`
12. `add_payment_info`
13. `purchase`
14. `refund`

## How to Use (For Non-technical Users)

This section guides you through running this project on your local machine without deep technical knowledge.

Please install [data layer checker extension](https://chrome.google.com/webstore/detail/datalayer-checker/ffljdddodmkedhkcjhpmdajhjdbkogke) to inject the GTM ID on the [GitHub page](https://wodenwang820118.github.io/ng-gtm-site/#/). Then, you can send the data back to your GA4 property accordingly.

## How to use (technical)

1. First, install [npm and node.js](https://nodejs.org/en/download).
2. Download the project.
3. Open the terminal and go to the project folder.
4. Run `npm install` to install the dependencies.
5. Run `ng serve` for a dev server.
6. Open the browser and go to `http://localhost:4200/`.

The analytics code is in the `analytics.service.ts` file.

## Quick GTM setup

- In the project files, find the `tagging-plan.json`, and use the [automatic configuration tool](https://gtm-config-generator.netlify.app/) to import and generate the GTM configuration JSON file.

## Javascript interface

The [Javascript interface](https://firebase.google.com/docs/analytics/webview?platform=android) is used to bridge the Angular application and the Android/iOS applications. Additionally, I configured the [flutter_inappwebview](https://pub.dev/packages/flutter_inappwebview/versions/6.0.0-beta.28) plugin to send the data back to the Flutter application.

## Data streams differentiation

### Overview

Sometimes we want to reuse the website and embed it in the Android/iOS application. The data in the app (Android/iOS) should be separated from the website. The project demonstrates how to differentiate the data streams from the website and the Android/iOS application.

### Methodology

The basic methodology in the project cached a query parameter, `app_source`, and in GTM, we can use a custom Javascript variable `app_source` variable to differentiate the data stream. For example, `http://localhost:4200/?app_source=app` is the data stream for the Android/iOS application, and `http://localhost:4200/` is by default the data stream for the web application.

Checking GTM tags via GTM preview mode is straightforward. There could be another way to differentiate data streams such as checking registered window objects from Flutter/Android/iOS, but not obvious.

## Firebase SDK

The events data sent from the website to Flutter/Android/iOS are in the same format suggested by the [GA4 recommended events](https://support.google.com/analytics/answer/9267735?hl=en) and it's easy to integrate and map events with the [Firebase SDK](https://firebase.google.com/docs/guides).

Be aware of the data types of the parameters. For instance, inconsistent `value` parameter types such as double from the website and integer in Flutter will cause the `purchase` event to fail to send.

## PWA (Progressive Web App)

A Progressive Web App (PWA) is designed to work offline, mimicking a native app experience on the user's device. To ensure important analytics data isn't lost when users are offline, [Dexie.js](https://dexie.org/) is utilized to store data in IndexedDB. Once the user is back online, the stored data is sent to the GA4 property through `window.dataLayer.push()`, adhering to Google Tag Manager (GTM) practices. For more details about PWAs and their capabilities, refer to the [PWA documentation](https://web.dev/progressive-web-apps/). Please also refer to the Angular service worker [documentation](https://angular.io/guide/service-worker-intro) for more implementation details.

Use the following steps to test the PWA functionality:

1. Run `ng build` to build the project.
2. Use `http-server` and run `npx http-server -p 8080 -c-1 dist/ng-gtm-site`
3. Follow and click the port number link in the terminal to open the PWA.
4. Turn off the network and trigger some events.
5. Turn on the network and check the events in the data layer object.

## YouTube video tracking

Please follow the documentation in the [YouTube Player API Reference for iframe Embeds](https://developers.google.com/youtube/iframe_api_reference) to set up YouTube video tracking. The project utilizes Angular's [youtube-player component](https://github.com/angular/components) to streamline the integration process.

### Enhanced measurement

Due to CORS policy restrictions, the YouTube iframe is unable to perform `postMessage` actions and use [enhanced measurement](https://support.google.com/analytics/answer/9216061?hl=en) to transmit data to the data layer. To address this, it is necessary to modify the Content Security Policy (CSP) to permit these actions from the YouTube iframe. For detailed guidance on configuring CSP, please refer to the [Content Security Policy (CSP) documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

### Data stream differentiation issue

The enhanced measurement is unable to [differentiate data streams](#data-streams-differentiation). To address this, the project implements events manually according to API. The details are in the `services/youtube/youtube.service.ts` file.

## Consent mode v2

### Overview

Google is updating its offerings, including Consent Mode, to comply with regulations like GDPR and DMA. The Consent Mode V2 introduces additional settings to better control data usage and ensure lawful consent collection. This tool helps organizations adapt Google tags based on user consent, with new parameters like "Ad personalization" and "ad user data" for more refined control. Organizations in the European Economic Area using Google's advertising and measurement products must upgrade to [Consent Mode V2](https://developers.google.com/tag-platform/security/guides/consent#upgrade-consent-v2) by March 6, 2024, to maintain features and comply with DMA requirements​.

The implementation uses localStorage to store the consent status and uses the `gtm-templates-simo-ahava`[template](https://github.com/gtm-templates-simo-ahava) in GTM implementation. Here are some setup steps:

### Consent tags using the template

1. A `Default Consent` Tag. It is a tag that fires on the earliest `Consent Initialization` stage with default values.
2. An `Update Consent` Tag. It is a tag that fires when the consent status is updated, with a trigger of `Custom Event`, `update_consent` for example.

The codebase updates the consent status within the local storage and fires the `update_consent` event with the consent status. Then, the tag uses data layer variables to update the consent status.

### Configuration tags

1. A `Default Configuration tag` is necessary before data collection as it uses [gtag.js](https://developers.google.com/tag-platform/gtagjs) to configure the analytics tracking:

```javascript
// Default Configuration tag; Tag Type: 'Google Tag' in GTM
gtag("config", "G-XXXXXXXX", {
  send_page_view: false,
  allow_ad_personalization_signals: false, // consent mode v2 ad_personalization parameter
  allow_google_signals: false, // consent mode v2 advertising features
  debug_mode: "true", // to use it in the Google Analytics 4 debug mode
});
```

Please refer to the configuration settings in the [documentation](https://support.google.com/tagmanager/answer/13438166).

The trigger is usually `All Pages`, with the condition `{{CJS - analytics_consent}}` equals true.

```javascript
// {{CJS - analytics_consent}} is a custom Javascript variable
function() {
  var consent = JSON.parse(localStorage.getItem('consentPreferences'));
  var analytics_storage = consent.analytics_storage;
  var ad_storage = consent.ad_storage;
  var ad_user_data = consent.ad_user_data;
  var ad_personalization = consent.ad_personalization;
  return ad_storage && analytics_storage && ad_user_data;
}
```

2. An `Update Configuration tag` is necessary to update the configuration settings when the consent status is updated. The trigger is usually `Custom Event`, `update_consent` for example. To stop data collection when the consent status is false, the workaround, for now, is utilizing [Tag ID](https://support.google.com/tagmanager/answer/12002338#Tag). The variable `{{CJS - Measurement ID}}` is used to control the data collection.

```javascript
// {{CJS - Measurement ID}} is a custom Javascript variable
function() {
  var analyticsConsent = {{CJS - analytics_consent}};
  return analyticsConsent ? {{Measurement ID}} : 'G-0';
}
```

The `{{Measurement ID}}` is the measurement ID of the GA4 property. The `G-0` is a non-existent measurement ID.

### Tags

All tags should configure the measurement ID with the `{{CJS - Measurement ID}}` variable.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

- Run `npm run build-file` to generate the local file with [http-server](https://github.com/http-party/http-server).
- Run `npm run build-github` to generate the GitHub page. Remember to change the repo to your own.
- By allowing Workflow permissions, the GitHub page will be automatically updated after pushing the code to the `main` branch.

## Documentation as a static site (Experimental)

Utilizing [Docusaurus](https://docusaurus.io/), this project's [REAEMD.md](https://ng-gtm-site-docs.netlify.app/) is transformed into a static website, which is hosted via Netlify. It is designed specifically for non-technical users, providing an easy-to-understand overview of the project and topics related to GTM, without the need for familiarity with GitHub or GitLab.

## License

MIT
