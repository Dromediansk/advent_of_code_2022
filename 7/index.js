const { readInputFile } = require("../functions");
const { Directory, File } = require("./classes");

readInputFile(__dirname).then((data) => {
  const lines = data.split("\n");

  const root = new Directory(0, "/");
  const dirsById = { [root.id]: root };

  let currentDir = root;
  let dirId = 1;

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];

    if (line.startsWith("$")) {
      // line is a command
      const [command, argument] = line.substring(2).split(" ");

      if (command.startsWith("cd")) {
        currentDir = currentDir.changeDirectory(argument);
      }
      continue;
    }

    // listing files and folders of the current dir
    if (line.startsWith("dir")) {
      // introducing a new directory
      const [, dirName] = line.split(" ");

      const directory = new Directory(dirId, dirName);

      currentDir.children.push(directory);
      directory.parent = currentDir;

      dirsById[directory.id] = directory;

      // Incrementing directory id so it stays unique
      dirId++;
    } else {
      // introducing a new file
      const [fileSize, fileName] = line.split(" ");
      const size = parseInt(fileSize);
      const file = new File(fileName, size);

      currentDir.children.push(file);
      currentDir.incrementSize(size);
    }
  }

  let DIR_SIZE_LIMIT = 100000;
  let totalSizesSum = 0;

  Object.values(dirsById).forEach((dir) => {
    if (dir.size > DIR_SIZE_LIMIT) {
      return;
    }
    totalSizesSum += dir.size;
  });

  console.log(totalSizesSum);

  // PART 2

  const TOTAL_DISK_SPACE = 70000000;
  const REQUIRED_UNUSED_SPACE = 30000000;

  const CURRENT_UNUSED_SPACE = TOTAL_DISK_SPACE - root.size;
  const MIN_DIR_SIZE = REQUIRED_UNUSED_SPACE - CURRENT_UNUSED_SPACE;

  const sortedDirs = Object.values(dirsById).sort((a, b) =>
    a.size > b.size ? 1 : a.size < b.size ? -1 : 0
  );

  let dirToDelete;

  for (let index = 0; index < sortedDirs.length; index++) {
    const dir = sortedDirs[index];

    if (dir.size >= MIN_DIR_SIZE) {
      dirToDelete = dir;
      break;
    }
  }

  console.log(dirToDelete.size);
});
