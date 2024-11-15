import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { exec } from 'child_process';
import util from 'util';
import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';
export default {
  name: 'my-astro-integration',
  hooks: {
    'astro:config:setup': ({ addDevToolbarApp }) => {
      addDevToolbarApp({
        id: 'my-toolbar-app',
        name: 'My Toolbar App',
        icon: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Vonage</title><path d="M9.279 11.617l-4.54-10.07H0l6.797 15.296a.084.084 0 0 0 .153 0zm9.898-10.07s-6.148 13.868-6.917 15.565c-1.838 4.056-3.2 5.07-4.588 5.289a.026.026 0 0 0 .004.052h4.34c1.911 0 3.219-1.285 5.06-5.341C17.72 15.694 24 1.547 24 1.547z" fill="white"/></svg>',
        entrypoint: fileURLToPath(new URL('./app.ts', import.meta.url)),
      });
    },
    'astro:server:setup': ({ toolbar }) => {
      // console.log('hello');
      toolbar.on('my-app:my-message', async (data: any) => {
        console.log(data.message);
        // const child_process = require('child_process');
        // child_process.execSync(`zip -r 'test.zip' *`, {
        //   cwd: './public',
        // });

        // execSync(`zip -r 'test.zip' *`, {
        //   cwd: './public',
        // });

        // exec('npm run build', (error, stdout, stderr) => {
        //   if (error) {
        //     console.error(`error: ${error.message}`);
        //     return;
        //   }
        //   if (stderr) {
        //     console.error(`stderr: ${stderr}`);
        //     return;
        //   }
        //   console.log(`stdout: ${stdout}`);
        // });
        const execPromise = util.promisify(exec);

        function copyDirRecursive(src, dest) {
          fs.mkdirSync(dest, { recursive: true });

          for (const file of fs.readdirSync(src)) {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);

            if (file === 'node_modules' || file === 'root-copy') {
              continue; // Skip node_modules
            }

            const stat = fs.statSync(srcPath);
            if (stat.isDirectory()) {
              copyDirRecursive(srcPath, destPath);
            } else {
              fs.copyFileSync(srcPath, destPath);
            }
          }
        }

        try {
          // Build Astro Project
          const { stdout, stderr } = await execPromise('npm run build');
          console.log('stdout:', stdout);
          console.error('stderr:', stderr);
          // Rename dist folder to docs and copy over to environment folder
          // Create files needed for tutorial in environment folder
          // Create ofos.json based on files needed in environment -> .vscode folder
          // Zip up the environment folder
          const zip = new AdmZip();
          const sourceDir = './environment';
          const zipFile = 'environment.zip';
          await zip.addLocalFolderPromise(sourceDir);
          await zip.writeZipPromise(zipFile);
          console.log(`Zip file ${zipFile} created successfully!`);
          // Zip up the whole project folder without the node_module folder and name it the slug generated from the title
          const zip2 = new AdmZip();
          let exclude = ['node_modules'];
          const sourceDir2 = './';
          const zipFile2 = 'project.zip';
          // zip2.addLocalFolder(sourceDir2);
          await zip2.addLocalFolderPromise(sourceDir2, {
            filter: (filePath) => !exclude.some((ex) => filePath.includes(ex)),
          });
          await zip2.writeZipPromise(zipFile2);
          console.log(`Zip file ${zipFile2} created successfully!`);
          // display link to download project zip file in toolbar.
          toolbar.send('server-message', { message: 'Done!' });
        } catch (error) {
          console.error('Error:', error);
        }
      });
    },
  },
} satisfies AstroIntegration;
