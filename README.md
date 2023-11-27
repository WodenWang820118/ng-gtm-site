# NgGtmSite: Angular Google Tag Manager Integration Sample

# Overview

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

The basic methodology in the project cached a query parameter, `app_source`, and in GTM, we can use a custom Javascript variable `app_source` variable to differentiate the data stream. For example, `http://localhost:4200/?app_source=app` is the data stream for the Android/iOS application, and `http://localhost:4200/` is by default the data stream for the web application.

Checking GTM tags via GTM preview mode is straightforward. There could be another way to differentiate data streams such as checking registered window objects from Flutter/Android/iOS, but not obvious.

## Firebase SDK

The events data sent from the website to Flutter/Android/iOS are in the same format suggested by the [GA4 recommended events](https://support.google.com/analytics/answer/9267735?hl=en) and it's easy to integrate and map events with the [Firebase SDK](https://firebase.google.com/docs/guides).

Be aware of the data types of the parameters. For instance, inconsistent `value` parameter types such as double from the website and integer in Flutter will cause the `purchase` event to fail to send.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build-file` to generate the local file with [http-server](https://github.com/http-party/http-server).
Run `npm run build-github` to generate the GitHub page.
