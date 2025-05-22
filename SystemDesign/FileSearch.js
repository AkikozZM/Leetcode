class Entry {
  constructor(name) {
    this.name = name;
  }
  isDirectory() {
    throw new Error("Abstract method.");
  }
  getSize() {
    throw new Error("Abstract method.");
  }
}
class File extends Entry {
  constructor(name, content = "") {
    super(name);
    this.content = content;
  }
  isDirectory() {
    return false;
  }
  getSize() {
    return this.content.length;
  }
}
class Directory extends Entry {
  constructor(name) {
    super(name);
    this.entries = [];
  }
  isDirectory() {
    return true;
  }
  getSize() {
    const size = 0;
    for (let i = 0; i < this.entries.length; i++) {
      size += this.entries[i].getSize();
    }
    return size;
  }
  addEntry(entry) {
    this.entries.push(entry);
  }
  getEntry(name) {
    for (let i = 0; i < this.entries.length; i++) {
      if (this.entries[i].name === name) {
        return this.entries[i];
      }
    }
    return null;
  }
}

class FileSystem {
  constructor() {
    this.root = new Directory("root");
    this.currentDirectory = this.root;
  }
  // create directory
  mkdir(path) {
    const parts = path.split("/");
    let curr = this.currentDirectory;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!part) continue;
      let dir = curr.getEntry(part);
      if (!dir) {
        // if dir doesn't exist, create a new one
        dir = new Directory(part);
        curr.addEntry(dir);
      }
      if (!dir.isDirectory()) {
        throw new Error(`${part} is not a directory`);
      }
      curr = dir;
    }
  }
}

let fs = new FileSystem();
fs.mkdir("dir1/dir2");
fs.touch("dir1/dir2/dir3/file.txt");
