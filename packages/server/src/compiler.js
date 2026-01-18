const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const TEMP_DIR = path.join(__dirname, '..', 'temp');

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

/**
 * Helper function to run a single pass of xelatex.
 * @returns {Promise<{code: number, stdout: string, stderr: string, error?: Error}>}
 */
const runXelatexPass = (jobName, inputPath) => {
  return new Promise((resolve) => {
    const args = [
      '-interaction=nonstopmode',
      `-output-directory=${TEMP_DIR}`,
      `-jobname=${jobName}`,
      inputPath
    ];

    const child = spawn('xelatex', args);
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => { stdout += data.toString(); });
    child.stderr.on('data', (data) => { stderr += data.toString(); });

    child.on('error', (err) => {
      resolve({ error: err, stdout, stderr, code: -1 });
    });

    child.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });
  });
};

/**
 * Compiles LaTeX source code to PDF.
 * Runs xelatex twice to ensure references and TOC are resolved.
 * @param {string} source - The LaTeX source code.
 * @param {string} jobName - Unique identifier for this compilation job.
 * @returns {Promise<{success: boolean, pdfUrl?: string, logs: string, errorMsg?: string}>}
 */
const compileTeX = async (source, jobName) => {
  const inputPath = path.join(TEMP_DIR, `${jobName}.tex`);

  // 1. Write source file
  try {
    await fs.promises.writeFile(inputPath, source);
  } catch (err) {
    return {
      success: false,
      logs: '',
      errorMsg: `Failed to write file: ${err.message}`
    };
  }

  // 2. First Pass
  let result = await runXelatexPass(jobName, inputPath);
  
  if (result.error) {
    return {
      success: false,
      logs: result.stdout + '\n' + result.stderr,
      errorMsg: `Failed to start xelatex: ${result.error.message}`
    };
  }

  // If first pass failed fundamentally (e.g. fatal syntax error), we might skip the second,
  // but in nonstopmode xelatex often returns 0 even with errors.
  // We'll proceed to second pass unless the PDF wasn't created at all, which suggests a crash.
  // However, for references to resolve, we just blindly run it again usually.

  // 3. Second Pass (to resolve references/TOC)
  result = await runXelatexPass(jobName, inputPath);

  // 4. Check for PDF
  const pdfFilename = `${jobName}.pdf`;
  const pdfPath = path.join(TEMP_DIR, pdfFilename);

  if (fs.existsSync(pdfPath)) {
    return {
      success: true,
      pdfUrl: `/static/${pdfFilename}`,
      logs: result.stdout // Return logs from the final pass
    };
  } else {
    return {
      success: false,
      logs: result.stdout + '\n' + result.stderr,
      errorMsg: 'Compilation failed, no PDF generated.'
    };
  }
};

module.exports = { compileTeX };
