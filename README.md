# NgGtmSite: Angular Google Tag Manager Integration Sample

# Overview

This project demonstrates a simple implementation of Google Tag Manager (GTM) with an Angular application. It showcases various GTM events like `page_view`, `view_promotion`, and more, to help you understand and test GTM integration in a real-world scenario.

For now the app supports:

1. `page_view`
2. `view_promotion`
3. `select_promotion`
4. `view_item_list`
5. `view_item`
6. `add_to_cart`
7. `remove_from_cart`
8. `begin_checkout`
9. `add_shipping_info`
10. `add_payment_info`
11. `purchase`
12. `refund`

## How to Use (For Non-technical Users)

This section guides you through running this project on your local machine without deep technical knowledge.

Please install [data layer checker extention](https://chrome.google.com/webstore/detail/datalayer-checker/ffljdddodmkedhkcjhpmdajhjdbkogke) to inject the GTM ID on the [GitHub page](https://wodenwang820118.github.io/ng-gtm-site/#/). Then, you can send the data back to you GA4 property accordingly.

## How to use (technical)

1. First, install [npm and node.js](https://nodejs.org/en/download).
2. Download the project.
3. Open the terminal and go to the project folder.
4. Run `npm install` to install the dependencies.
5. Run `ng serve` for a dev server.
6. Open the browser and go to `http://localhost:4200/`.

The analytics code is in the `analytics.service.ts` file.

## Quick GTM setup

- In the project files, find the `tagging-plan.json`, and use the [automatic configration tool](https://gtm-config-generator.netlify.app/) to import the file to your GTM account.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build-file` to generate the local file with http-server.
Run `npm run "build-github"` to generate the github page. Remember to fork the project and change the `base-href` in the `package.json` file.
