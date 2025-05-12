/**
 * Design a data structure that simulates an in-memory file system.
    Implement the FileSystem class:
    FileSystem() Initializes the object of the system.
    List<String> ls(String path)
        If path is a file path, returns a list that only contains this file's name.
        If path is a directory path, returns the list of file and directory names in this directory.
        The answer should in lexicographic order.
    void mkdir(String path) Makes a new directory according to the given path. The given directory path does not exist. If the middle directories in the path do not exist, you should create them as well.
    void addContentToFile(String filePath, String content)
        If filePath does not exist, creates that file containing given content.
        If filePath already exists, appends the given content to original content.
    String readContentFromFile(String filePath) Returns the content in the file at filePath.
 */
class FileSystem {
  constructor() {
    this.root = {
      type: "directory",
      children: {},
    };
  }
  /**
   * @param {string} path
   * @return {string[]}
   */
  ls(path) {
    const node = this.traverse(path);
    if (node.type === "file") {
      // For files, return array with just the filename
      const parts = path.split("/").filter((part) => part !== "");
      return [parts[parts.length - 1]];
    } else {
      // For directories, return sorted list of children
      return Object.keys(node.children).sort();
    }
  }
  traverse(path) {
    if (path === "/") return this.root;

    const parts = path.split("/").filter((part) => part !== "");
    let current = this.root;

    for (const part of parts) {
      if (!current.children[part]) {
        current.children[part] = { type: "directory", children: {} };
      }
      current = current.children[part];
    }

    return current;
  }
  /**
   * @param {string} path
   * @return {void}
   */
  mkdir(path) {
    this.traverse(path);
  }
  /**
   * @param {string} filePath
   * @param {string} content
   * @return {void}
   */
  addContentToFile(filePath, content) {
    const node = this.traverse(filePath);
    if (node.type === "directory") {
      node.type = "file";
      node.content = content;
    } else {
      node.content = (node.content || "") + content;
    }
  }
  /**
   * @param {string} filePath
   * @return {string}
   */
  readContentFromFile(filePath) {
    const node = this.traverse(filePath);
    if (node.type === "file") {
      return node.content || "";
    }
  }
}

/**
 * Your FileSystem object will be instantiated and called as such:
 * var obj = new FileSystem()
 * var param_1 = obj.ls(path)
 * obj.mkdir(path)
 * obj.addContentToFile(filePath,content)
 * var param_4 = obj.readContentFromFile(filePath)
 */
// Input
// ["FileSystem", "ls", "mkdir", "addContentToFile", "ls", "readContentFromFile"]
// [[], ["/"], ["/a/b/c"], ["/a/b/c/d", "hello"], ["/"], ["/a/b/c/d"]]
// Output
// [null, [], null, null, ["a"], "hello"]

// Explanation
// FileSystem fileSystem = new FileSystem();
// fileSystem.ls("/");                         // return []
// fileSystem.mkdir("/a/b/c");
// fileSystem.addContentToFile("/a/b/c/d", "hello");
// fileSystem.ls("/");                         // return ["a"]
// fileSystem.readContentFromFile("/a/b/c/d"); // return "hello"
