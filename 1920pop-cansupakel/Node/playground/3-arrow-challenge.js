const tasks = {
  tasks: [
    {
      text: "Grocery shopping",
      completed: true
    },
    {
      text: "Clean",
      completed: false
    },
    {
      text: "Film",
      completed: false
    }
  ],
  getTasksToDo() {
      const taskToDo = this.tasks.filter((task) => {
          return task.completed === false
      })
      return taskToDo
  }
};

console.log(tasks.getTasksToDo());
