const path = require('path');

(async () => {
  const open = await import('open');
  const reportPath = path.join(__dirname, 'reports', 'cucumber-report.html');

  try {
    await open.default(reportPath);
    console.log('Archivo abierto exitosamente.');
  } catch (err) {
    console.error('Error abriendo el archivo:', err);
  }
})();
