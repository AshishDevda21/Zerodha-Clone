const fs = require('fs');
const path = require('path');

const indexCssPath = path.join(__dirname, 'src', 'index.css');
const dashboardScssPath = path.join(__dirname, 'src', 'dashboard', 'dashboard.scss');

const content = fs.readFileSync(indexCssPath, 'utf8');

// Find the split point
const splitIndex = content.indexOf('}body {');

if (splitIndex !== -1) {
  const frontendCss = content.substring(0, splitIndex + 1);
  let dashboardCss = content.substring(splitIndex + 1);

  // Replace body and code with .dashboard-app
  dashboardCss = dashboardCss.replace(/^body\s*{/m, '.dashboard-app {');
  dashboardCss = dashboardCss.replace(/^code\s*{/m, '.dashboard-app code {');

  // Wrap the rest in .dashboard-app
  const scssContent = `.dashboard-app {\n${dashboardCss}\n}`;

  fs.writeFileSync(indexCssPath, frontendCss);
  fs.writeFileSync(dashboardScssPath, scssContent);
  console.log('Successfully split CSS and created dashboard.scss');
} else {
  console.log('Split point not found');
}
