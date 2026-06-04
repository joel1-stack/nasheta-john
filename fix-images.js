const fs = require('fs');
const path = require('path');

const imagesDir = 'C:\\Users\\JOEL STACK\\OneDrive\\Desktop\\nasheta-portfolio\\src\\assets\\images';

// Rename files
const files = fs.readdirSync(imagesDir);
const fileMap = {};

for (const file of files) {
  if (file.includes(' ')) {
    const newName = file.replace(/ /g, '-').toLowerCase();
    fs.renameSync(path.join(imagesDir, file), path.join(imagesDir, newName));
    fileMap[file] = newName;
  } else {
    fileMap[file] = file.toLowerCase();
    if (file !== file.toLowerCase()) {
      fs.renameSync(path.join(imagesDir, file), path.join(imagesDir, file.toLowerCase()));
    }
  }
}

console.log('Renamed files:', fileMap);

// Files to search and replace
const srcDir = 'C:\\Users\\JOEL STACK\\OneDrive\\Desktop\\nasheta-portfolio\\src\\app';

function replaceInDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Replace missing hero images with actual ones
      if (content.includes('hero-casino.jpg')) { content = content.replace(/hero-casino\.jpg/g, 'online-casino-website.jpg'); changed = true; }
      if (content.includes('hero-sports.jpg')) { content = content.replace(/hero-sports\.jpg/g, 'sports-betting-app.jpg'); changed = true; }
      if (content.includes('hero-africa.jpg')) { content = content.replace(/hero-africa\.jpg/g, 'kenya-nairobi-tech.jpg'); changed = true; }
      if (content.includes('hero-slots.jpg')) { content = content.replace(/hero-slots\.jpg/g, 'slot-game-interface.jpg'); changed = true; }

      // Replace old spaced filenames with hyphenated
      for (const [oldName, newName] of Object.entries(fileMap)) {
        if (oldName.includes(' ')) {
          // It could be 'assets/images/some file.jpg'
          const regex = new RegExp(oldName, 'g');
          if (regex.test(content)) {
            content = content.replace(regex, newName);
            changed = true;
          }
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

replaceInDir(srcDir);
