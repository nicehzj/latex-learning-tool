const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const TEMP_DIR = path.join(__dirname, '..', 'temp');

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

/**
 * Compiles LaTeX source code to PDF.
 * @param {string} source - The LaTeX source code.
 * @param {string} jobName - Unique identifier for this compilation job.
 * @returns {Promise<{success: boolean, pdfUrl?: string, logs: string, errorMsg?: string}>}
 */
const compileTeX = (source, jobName) => {
  return new Promise((resolve, reject) => {
    const inputPath = path.join(TEMP_DIR, `${jobName}.tex`);
    
    // Write source to file
    fs.writeFile(inputPath, source, (err) => {
      if (err) {
        return resolve({
          success: false,
          logs: '',
          errorMsg: `Failed to write file: ${err.message}`
        });
      }

      // Spawn xelatex process
      // -interaction=nonstopmode: Don't stop on errors
      // -output-directory: Where to put the PDF
      const args = [
        '-interaction=nonstopmode',
        `-output-directory=${TEMP_DIR}`,
        `-jobname=${jobName}`,
        inputPath
      ];

      const child = spawn('xelatex', args);

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('error', (err) => {
         resolve({
          success: false,
          logs: stdout + '\n' + stderr,
          errorMsg: `Failed to start xelatex: ${err.message}`
        });
      });

      child.on('close', (code) => {
        // xelatex returns 0 on success (or recoverable errors in nonstopmode)
        // If PDF exists, we consider it a success for now, or partial success.
        // However, if code is non-zero, it might mean severe failure.
        // Let's check if PDF was generated.
        const pdfFilename = `${jobName}.pdf`;
        const pdfPath = path.join(TEMP_DIR, pdfFilename);

        if (fs.existsSync(pdfPath)) {
          resolve({
            success: true, // Even if there were warnings, if PDF exists, we return it
            pdfUrl: `/static/${pdfFilename}`,
            logs: stdout
          });
        } else {
          resolve({
            success: false,
            logs: stdout + '\n' + stderr,
            errorMsg: 'Compilation failed, no PDF generated.'
          });
        }
      });
    });
  });
};

module.exports = { compileTeX };
