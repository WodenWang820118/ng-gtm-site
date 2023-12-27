import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: [
    'Overview',
    'Single Page Application',
    'Setting up Google Tag Manager',
    'Javascript Interface',
    'Data Stream Differentiation',
    'Firebase SDK',
    'Progressive Web App',
    'YouTube Tracking',
    'Consent Mode v2',
    'Scroll in SPA',
    // {
    //   type: 'category',
    //   label: 'Tutorial',
    //   items: ['tutorial-basics/create-a-document'],
    // },
  ],
};

export default sidebars;
