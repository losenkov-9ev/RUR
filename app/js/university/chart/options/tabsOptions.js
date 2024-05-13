export const tabsOptions = (defaultTabId) => ({
  controlsSelector: '[data-chart-controls="wrapper"]',
  tabsSelector: '[data-chart-tabs]',
  controlsItem: 'data-chart-controls',
  tabItem: 'data-chart-tab',
  activeClass: 'active',
  defaultDisplay: 'block',
  defaultTabId,
});
