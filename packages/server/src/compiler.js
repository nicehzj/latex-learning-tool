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
 * Helper function to run bibtex.
 * @returns {Promise<{code: number, stdout: string, stderr: string, error?: Error}>}
 */
const runBibtexPass = (jobName) => {
  return new Promise((resolve) => {
    // bibtex needs to run in the temp directory to find the .aux file
    const args = [jobName];
    const child = spawn('bibtex', args, { cwd: TEMP_DIR });
    
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
 * Runs full chain: xelatex -> bibtex -> xelatex -> xelatex to resolve refs and bibliography.
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

  // 2. First Pass: xelatex (generates .aux)
  let result = await runXelatexPass(jobName, inputPath);
  if (result.error) return { success: false, logs: result.stdout + '\n' + result.stderr, errorMsg: result.error.message };

  // 3. BibTeX Pass (processes .bib if .aux contains citation data)
  // We blindly run bibtex; if no bibliography is used, it will just fail/warn harmlessly, 
  // or we can check the source for \bibliography command to optimize.
  // For robustness, let's try running it.
  const bibResult = await runBibtexPass(jobName);
  
  // 4. Second Pass: xelatex (incorporates .bbl)
  result = await runXelatexPass(jobName, inputPath);

  // 5. Third Pass: xelatex (resolves cross-references)
  result = await runXelatexPass(jobName, inputPath);

  // 6. Check for PDF
  const pdfFilename = `${jobName}.pdf`;
  const pdfPath = path.join(TEMP_DIR, pdfFilename);

  if (fs.existsSync(pdfPath)) {
    // Combine logs from xelatex and bibtex for debugging
    const fullLogs = `--- Xelatex Log ---\n${result.stdout}\n\n--- Bibtex Log ---\n${bibResult.stdout}\n${bibResult.stderr}`;
    return {
      success: true,
      pdfUrl: `/static/${pdfFilename}`,
      logs: fullLogs
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
