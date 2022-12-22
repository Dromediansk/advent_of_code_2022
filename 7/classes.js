class File {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
}

class Directory {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.size = 0;
    this.children = []; // list of instances of File class or Directory class
    this.parent = null;
  }

  changeDirectory(argument) {
    if (argument === "..") {
      return this.parent;
    } else if (argument === "/") {
      let currentDir = this;
      while (currentDir.name !== "/") {
        currentDir = currentDir.parent;
      }
      return currentDir;
    } else {
      const directory = this.children.find((item) => item.name === argument);
      if (!directory) {
        throw new Error("Directory does not exist!");
      }
      return directory;
    }
  }

  incrementSize(size) {
    this.size += size;
    if (this.name === "/") {
      return;
    }

    return this.parent.incrementSize(size);
  }
}

module.exports = {
  File,
  Directory,
};
