/* eslint-disable */

const DATA = {
  tasks: [
    {
      id: 1,
      title: "Test title 1",
      detail: "Test detail 1",
      client: {
        id: 1,
        name: "One"
      },
      colaborator: {
        id: 2,
        name: "Two"
      },
      importance: "high",
      status: "todo",
      createdAt: new Date(2019, 12, 10).getTime(),
      time: new Date(2019, 12, 12).getTime()
    },
    {
      id: 2,
      title: "Test title 2",
      detail: "Test detail 2",
      client: {
        id: 1,
        name: "One"
      },
      colaborator: {
        id: 2,
        name: "Two"
      },
      importance: "low",
      status: "doing",
      createdAt: new Date(2019, 12, 10).getTime(),
      time: new Date(2019, 12, 12).getTime()
    },
    {
      id: 3,
      title: "Test title 3",
      detail: "Test detail 3",
      client: {
        id: 1,
        name: "One"
      },
      colaborator: {
        id: 2,
        name: "Two"
      },
      importance: "critical",
      status: "done",
      createdAt: new Date(2019, 12, 10).getTime(),
      time: new Date(2019, 12, 12).getTime()
    }
  ],
  clients: [
    {
      id: 1,
      name: "One",
      scheme: "initial",
      status: "active"
    },
    {
      id: 2,
      name: "Two",
      scheme: "intermediary",
      status: "active"
    },
    {
      id: 3,
      name: "Three",
      scheme: "complete",
      status: "active"
    },
    {
      id: 4,
      name: "Four",
      scheme: "initial",
      status: "inactive"
    }
  ],
  colaborators: [
    {
      id: 1,
      name: "One",
      status: "active"
    },
    {
      id: 2,
      name: "Two",
      status: "active"
    },
    {
      id: 3,
      name: "Three",
      status: "active"
    },
    {
      id: 4,
      name: "Four",
      status: "inactive"
    }
  ]
};

const fakedb = {
  // Fake data

  val() {
    console.log("Val", this.table);
    return DATA[this.table];
  },
  then(callback) {
    callback(this);
  },

  // EventEmitter interface
  off() {
    return this;
  },
  on(_event, callback) {
    callback(this);
    return this;
  },
  once(_event) {
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
