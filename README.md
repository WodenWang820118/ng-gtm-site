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

### Prerequisites

- [Node.js and npm](https://nodejs.org/en/download) (npm is distributed with Node.js) - Follow the link to download and install them.

### Installation

1. **Download the Project:**

   - [Download the project files](https://github.com/WodenWang820118/ng-gtm-site) and unzip them on your computer.

2. **Install Dependencies:**

   - Open your terminal (you can search for it on your computer if you're not sure where it is).
   - Use the `cd` command to navigate to the project folder. For example, if you saved it in your `Downloads` folder, you would type `cd Downloads/NgGtmSite`.
   - Type `npm install` and press `Enter`. This will install the necessary software to run the project.

3. **Prepare the Project:**

   - Still in the terminal, type `npm run build-file` and press `Enter`. This prepares the project to run on your local computer.

4. **Install http-server:**

   - In the same terminal window, type `npm i -g http-server` and press `Enter`. This installs a tool that allows you to view the project in your web browser.

5. **Run the Project:**
   - Next, navigate to the `dist/ng-gtm-site` folder in the terminal (you may use the `cd` command like before).
   - Type `http-server -p 8080` and press `Enter`.
   - Now, open your web browser and type `http://localhost:8080/` in the address bar, then press `Enter`.

### Adding GTM Code

- In the project files, find the `index.html` file. You can insert your GTM code snippet here for testing. [Learn more about getting a GTM code snippet](https://support.google.com/tagmanager/answer/6103696?hl=en).

## How to use (technical)

1. First, install [npm and node.js](https://nodejs.org/en/download).
2. Download the project.
3. Open the terminal and go to the project folder.
4. Run `npm install` to install the dependencies.
5. Run `ng serve` for a dev server.
6. Open the browser and go to `http://localhost:4200/`.

The analytics code is in the `analytics.service.ts` file.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build-file` to generate the local file with http-server.
Run `npm run "build-github"` to generate the github page. Remember to fork the project and change the `base-href` in the `package.json` file.
