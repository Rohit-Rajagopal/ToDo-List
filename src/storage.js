class StorageManager {
  constructor() {
    this.storage = window["localStorage"];
  }

  storageAvailable(type = "localStorage") {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  dataStored() {
    // this.storage.clear();
    if (this.storage["data"]) {
      return true;
    }
    return false;
  }

  storeData(projects) {
    let jsonObj = {};
    for (let project in projects) {
      jsonObj[project] = [];
      for (let key in projects[project].toDoList) {
        let item = projects[project].toDoList[key];
        jsonObj[project].push({
          title: item.title,
          description: item.description,
          dueDate: item.dueDate,
          priority: item.priority,
        });
      }
    }
    this.storage["data"] = JSON.stringify(jsonObj);
  }

  loadData() {
    return JSON.parse(this.storage["data"]);
  }
}

export { StorageManager };
