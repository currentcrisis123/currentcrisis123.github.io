import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Source and destination directories
const sourceDir = resolve(__dirname, 'unity');
const destDir = resolve(__dirname, 'public/unity');

// Create destination directory if it doesn't exist
try {
    mkdirSync(destDir, { recursive: true });
    console.log(`Created directory: ${destDir}`);
} catch (err) {
    console.error(`Error creating directory: ${err}`);
}

// Function to copy directory recursively
const copyDir = (src, dest) => {
    try {
        const entries = readdirSync(src, { withFileTypes: true });
        
        entries.forEach(entry => {
            const srcPath = join(src, entry.name);
            const destPath = join(dest, entry.name);
            
            if (entry.isDirectory()) {
                // Create the destination directory
                try {
                    mkdirSync(destPath, { recursive: true });
                } catch (err) {
                    console.error(`Error creating directory ${destPath}: ${err}`);
                }
                // Copy contents recursively
                copyDir(srcPath, destPath);
            } else {
                // Copy file
                try {
                    copyFileSync(srcPath, destPath);
                    console.log(`Copied: ${srcPath} to ${destPath}`);
                } catch (err) {
                    console.error(`Error copying file ${srcPath}: ${err}`);
                }
            }
        });
    } catch (err) {
        console.error(`Error reading directory ${src}: ${err}`);
    }
};

// Execute the copy
console.log(`Copying Unity files from ${sourceDir} to ${destDir}`);
copyDir(sourceDir, destDir);
console.log('Unity files copied successfully');
