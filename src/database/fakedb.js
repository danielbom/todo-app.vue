/* eslint-disable no-console */
const DATA = {
  tasks: [
    {
      ".key": 1,
      title: "Test title",
      detail: "Test detail",
      clientName: "Me",
      clientId: 1,
      colaboratorName: "Other",
      colaboratorId: 1,
      importance: 2,
      status: "todo",
      createdAt: new Date(2019, 12, 10),
      time: new Date(2019, 12, 12)
    },
    {
      ".key": 1,
      title: "Test title",
      detail: "Test detail",
      clientName: "Me",
      clientId: 1,
      colaboratorName: "Other",
      colaboratorId: 1,
      importance: 2,
      status: "todo",
      createdAt: new Date(2019, 12, 10),
      time: new Date(2019, 12, 12)
    }
  ],
  clients: []
};

const fakedb = {
  // Fake data

  val() {
    console.log("Val", this.table);
    return DATA[this.table];
  },

  // EventEmitter interface
  off() {
    return this;
  },
  on(_event, callback) {
    callback(this);
    return this;
  },
  once(_event, callback) {
    callback(this);
    return this;
  },

  // Database interface
  ref(table) {
    this.table = table;
    return this;
  },
  child() {
    return this;
  },
  update(values) {
    console.log("Update", { values });
  },
  remove() {
    console.log("Remove");
  }
};

export const database = fakedb;
