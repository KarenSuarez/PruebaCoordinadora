module.exports = {
  default:
    "--require src/tests/api/steps/*.js --format html:reports/cucumber-report.html src/tests/api/scenarios/*.feature",
};
