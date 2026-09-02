# 📝 TaskFlow - To-Do App

TaskFlow is a modern and responsive **To-Do List Web Application** built with **HTML, CSS, and JavaScript**. It helps users organize and manage their daily tasks with features such as task creation, editing, completion tracking, search, filtering, dark mode, and browser-based data persistence.

## 🚀 Features

* ➕ Add new tasks
* ⏰ Display the current time with live updates
* 📅 Store the task creation date and time
* ✅ Mark tasks as completed or active
* ✏️ Edit existing tasks
* 🗑️ Delete tasks
* 🔍 Search tasks
* 🔄 Filter tasks by:

  * All
  * Active
  * Completed
* 📊 Display task statistics

  * Total tasks
  * Active tasks
  * Completed tasks
* 🧹 Clear all completed tasks
* 💾 Save tasks using browser LocalStorage
* 🌙 Dark and light mode
* ⌨️ Add tasks using the Enter key
* 📱 Responsive design for desktop and mobile devices
* 🔒 Task data remains available after refreshing the browser

## 🛠️ Technologies Used

| Technology   | Purpose                                        |
| ------------ | ---------------------------------------------- |
| HTML5        | Structure of the application                   |
| CSS3         | Styling, layout, responsiveness, and themes    |
| JavaScript   | Application functionality and DOM manipulation |
| LocalStorage | Persisting tasks and theme preferences         |

## 📂 Project Structure

```text
TaskFlow/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ How to Run the Project

### 1. Clone the Repository

```bash
https://github.com/dharshashi641-web/SCT_WD_04/edit/main/README.md
```

### 2. Open the Project

Navigate to the project folder:

```bash
cd taskflow
```

### 3. Run the Application

Open `index.html` directly in your browser.

You can also use **Live Server** in Visual Studio Code for a better development experience.

## 📖 How to Use

### Add a Task

Enter your task in the input field and click **Add Task**, or press **Enter**.

### Complete a Task

Click the checkbox next to a task to mark it as completed.

### Edit a Task

Click the ✏️ button to edit an existing task.

Press **Enter** to save the changes.

### Delete a Task

Click the 🗑️ button to remove a task.

### Search Tasks

Use the search box to quickly find a specific task.

### Filter Tasks

Use the filter buttons to display:

* **All** – Shows all tasks
* **Active** – Shows incomplete tasks
* **Completed** – Shows completed tasks

### Clear Completed Tasks

Click **Clear Completed** to remove all completed tasks at once.

### Dark Mode

Click the 🌙 button to switch between light and dark mode.

The selected theme is saved in LocalStorage.

## 💾 Data Persistence

TaskFlow uses the browser's **LocalStorage API** to store task information.

Each task contains:

```javascript
{
    id: 123456789,
    text: "Complete project",
    completed: false,
    createdAt: 123456789
}
```

Because tasks are stored in LocalStorage, they remain available when the page is refreshed.

## ⏰ Task Time Tracking

The application provides two types of time information:

### Current Time

The current time displayed at the top of the application updates every second.

### Task Creation Time

Each task stores the exact date and time when it was created.

For example:

```text
Complete JavaScript Project
Created: 02 Sept 2026, 11:30:15 AM
```

The task creation time remains fixed and does not change when the current time updates.

## 📊 Task Statistics

The dashboard automatically calculates:

* **Total** – Number of tasks
* **Active** – Number of incomplete tasks
* **Completed** – Number of completed tasks

These values are updated whenever tasks are added, edited, completed, or deleted.

## 📱 Responsive Design

The application is designed to work across different screen sizes, including:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

The layout automatically adjusts for smaller screens using CSS media queries.

## 🎯 Project Purpose

This project was developed to practice and demonstrate practical front-end development concepts, including:

* DOM manipulation
* JavaScript event handling
* Arrays and objects
* Array methods such as `map()`, `filter()`, and `find()`
* LocalStorage
* Date and time handling
* Dynamic HTML element creation
* Responsive CSS
* Light/dark theme implementation
* Search and filtering functionality

## 🔮 Future Improvements

Possible future enhancements include:

* 📌 Task priority levels
* 📅 Task due dates
* 🔔 Notifications and reminders
* 🏷️ Task categories
* 📈 Productivity analytics
* ☁️ Cloud database synchronization
* 👤 User authentication
* 🔄 Drag-and-drop task ordering
* 🎨 Custom themes

## 👨‍💻 Author

**Shashidhar**

B.Tech – Computer Science Engineering

## ⭐ Contributing

Contributions and suggestions are welcome.

If you would like to improve this project:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Create a Pull Request

## 📄 License

This project is created for learning and educational purposes.
