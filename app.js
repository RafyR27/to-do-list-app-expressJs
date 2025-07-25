require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const yup = require("yup");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const session = require("express-session");
const methodOverride = require("method-override");
const path = require("path");
const MongoStore = require("connect-mongo");

require("./utils/db-user");
const User = require("./model/user");
const listUser = require("./model/list-user");
const todoUser = require("./model/todo-user");

const app = express();
// const port = process.env.PORT || 3000;

const userSchema = yup.object({
  namaDepan: yup.string().required(),
  namaBelakang: yup.string().required(),
  email: yup
    .string()
    .required()
    .email()
    .test("email-unique", "Email is already registered", async (value) => {
      const duplikat = await User.findOne({ email: value });
      return !duplikat;
    }),
  password: yup
    .string()
    .min(8, "Password mush be at least 8 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+[\]{}|;':",.?/\\-_=]+$/,
      "Password must contain at least one letter and one digit"
    ),
});

app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(express.static("src"));

function randomAvatarColor() {
  const colors = [
    "10b981",
    "3b82f6",
    "f59e0b",
    "ef4444",
    "8b5cf6",
    "ec4899",
    "14b8a6",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

const emojis = [
  "🟥",
  "🟧",
  "🟨",
  "🟩",
  "🟦",
  "🟪",
  "🟫",
  "⬛",
  "⬜",
  "🍔",
  "📚",
  "💪",
  "🚗",
  "☕",
  "🧹",
  "🛍️",
  "📝",
  "🧘",
  "💻",
  "🎧",
];

app.get("/", async (req, res) => {
  let list = [];
  let task = [];
  let taskUncomplete = [];
  let taskCompleted = [];

  if (req.session.user) {
    list = await listUser.find({ userId: req.session.user.id });
    task = await todoUser
      .find({ todoId: req.session.user.id })
      .populate("todoList")
      .lean();
    taskUncomplete = await todoUser
      .find({ todoId: req.session.user.id, complete: false })
      .populate("todoList")
      .lean();
    taskCompleted = await todoUser.find({
      todoId: req.session.user.id,
      complete: true,
    });
  }

  res.render("index", {
    nama: "main",
    layout: "layouts/main-layouts",
    title: "To Do List App",
    user: req.session.user,
    list,
    task,
    emojis,
    taskUncomplete,
    taskCompleted,
  });
});

app.get("/list/completed", async (req, res) => {
  let listTodo = [];
  let list = [];
  let task = [];
  let taskUncomplete = [];
  let taskCompleted = [];

  if (req.session.user) {
    list = await listUser.find({ userId: req.session.user.id });
    listTodo = await todoUser
      .find({ todoList: req.params._id, complete: false })
      .populate("todoList")
      .lean();
    task = await todoUser
      .find({ todoId: req.session.user.id })
      .populate("todoList")
      .lean();
    taskUncomplete = await todoUser
      .find({
        todoId: req.session.user.id,
        complete: false,
      })
      .populate("todoList")
      .lean();
    taskCompleted = await todoUser.find({
      todoId: req.session.user.id,
      complete: true,
    });
  }

  res.render("completed", {
    nama: "completed",
    layout: "layouts/main-layouts",
    title: "To Do List App",
    user: req.session.user,
    list,
    listTodo,
    task,
    emojis,
    idActive: req.params._id,
    taskUncomplete,
    taskCompleted,
  });
});

app.get("/list/:_id", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/not-found");
  }

  let listTodo = [];
  let list = [];
  let task = [];
  let taskUncomplete = [];
  let taskCompleted = [];

  if (req.session.user) {
    list = await listUser.find({ userId: req.session.user.id });
    listTodo = await todoUser
      .find({ todoList: req.params._id, complete: false })
      .populate("todoList")
      .lean();
    task = await todoUser
      .find({ todoId: req.session.user.id })
      .populate("todoList")
      .lean();
    taskUncomplete = await todoUser
      .find({
        todoId: req.session.user.id,
        complete: false,
      })
      .populate("todoList")
      .lean();
    taskCompleted = await todoUser.find({
      todoId: req.session.user.id,
      complete: true,
    });
  }

  res.render("list", {
    nama: "list",
    layout: "layouts/main-layouts",
    title: "To Do List App",
    user: req.session.user,
    list,
    listTodo,
    task,
    emojis,
    idActive: req.params._id,
    taskUncomplete,
    taskCompleted,
  });
});

app.post("/list", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  try {
    await listUser.create({
      userId: req.session.user.id,
      content: req.body.content,
      emoji: req.body.emoji,
    });

    res.redirect("/");
  } catch (error) {
    res.status(500);
  }
});

app.post("/task/:id/complete", async (req, res) => {
  try {
    const taskId = await todoUser.findByIdAndUpdate(
      req.params.id,
      { complete: true },
      { new: true }
    );
    res.json({ complete: true, todoList: taskId.todoList.toString() });
  } catch (err) {
    res.status(500);
  }
});

app.post("/task/:id/uncompleted", async (req, res) => {
  try {
    const taskId = await todoUser.findByIdAndUpdate(
      req.params.id,
      { complete: false },
      { new: true }
    );
    res.json({ complete: true, todoList: taskId.todoList.toString() });
  } catch (err) {
    res.status(500);
  }
});

app.delete("/hapus/:id", async (req, res) => {
  try {
    const taskId = await todoUser.findById(req.params.id);

    await todoUser.deleteOne({ _id: req.params.id });

    res
      .status(200)
      .json({ success: true, todoList: taskId.todoList.toString() });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.post("/task", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  try {
    await todoUser.create({
      todoId: req.session.user.id,
      todoList: req.body.todoList,
      todo: req.body.todo,
      emojiRef: req.body.emojiRef,
      timeStart: req.body.timeStart,
      timeEnd: req.body.timeEnd,
      dateStart: req.body.dateStart,
    });

    res.redirect("/");
  } catch (error) {
    res.status(500);
  }
});

app.post("/update/:id", async (req, res) => {
  try {
    const updateTask = await todoUser
      .findOne({ _id: req.params.id })
      .populate("todoList")
      .lean();
    res.json({ updateTask });
  } catch (err) {
    res.status(500);
  }
});

app.put("/task", async (req, res) => {
  try {
    await todoUser.updateOne(
      { _id: req.body.id },
      {
        $set: {
          todoList: req.body.todoList,
          emojiRef: req.body.emojiRef,
          todo: req.body.todo,
          dateStart: req.body.dateStart,
          timeStart: req.body.timeStart,
          timeEnd: req.body.timeEnd,
        },
      }
    );
    res.redirect("/");
  } catch (error) {
    res.status(500);
  }
});

app.get("/register", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  res.render("register", {
    layout: "layouts/main-layouts",
    title: "Register",
    errors: [],
    old: [],
  });
});

app.post("/register", async (req, res) => {
  try {
    await userSchema.validate(req.body, { abortEarly: false });
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    req.body.avatarColor = randomAvatarColor();
    await User.create(req.body);
    res.redirect("/login");
  } catch (error) {
    const errorObj = {};
    error.inner.forEach((err) => {
      if (!errorObj[err.path]) {
        errorObj[err.path] = [];
      }
      errorObj[err.path].push(err.message);
    });
    res.render("register", {
      layout: "layouts/main-layouts",
      title: "Register",
      errors: errorObj,
      old: req.body,
    });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.status(500).send("Internal Server Error");
      return res.redirect("/");
    }
    res.redirect("/");
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  res.render("login", {
    layout: "layouts/main-layouts",
    title: "Login",
    errors: "",
    old: [],
  });
});

app.post("/login", async (req, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email });
    if (!checkEmail) {
      return res.render("login", {
        layout: "layouts/main-layouts",
        title: "Login",
        errors: "Oops! Your email or password is not correct. Please try again",
        old: req.body,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      checkEmail.password
    );
    if (!isPasswordValid) {
      return res.render("login", {
        layout: "layouts/main-layouts",
        title: "Login",
        errors: "Oops! Your email or password is not correct. Please try again",
        old: req.body,
      });
    }

    req.session.user = {
      id: checkEmail._id,
      namaDepan: checkEmail.namaDepan,
      namaBelakang: checkEmail.namaBelakang,
      email: checkEmail.email,
      avatarColor: checkEmail.avatarColor,
    };

    res.redirect("/");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.use("/", (req, res) => {
  res.status(404).render("not-found", {
    title: "Page Not Found",
    layout: "layouts/main-layouts",
  });
});

// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`);
// });

module.exports = app;
