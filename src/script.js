const closeBtn = document.querySelector("#close-btn");
const closeBtnMobile = document.querySelector("#close-btn-mobile");
const sidebar = document.querySelector("#sidebar");
const main = document.querySelector("main");
const closeX = document.querySelector("#closeX");
const loginAlert = document.querySelector("#loginAlert");
const blurBg = document.querySelector("#blur-bg");
const addList = document.querySelector("#addList");
const setDate = document.querySelector("#setDate");
const calenderAdd = document.querySelector("#calender");
const timeAdd = document.querySelector("#time");
const timeAddUpdate = document.querySelector("#timeUpdate");
const tanggalInput = document.getElementById("tanggal");
const tanggalInputUpdate = document.getElementById("tanggalUpdate");
const Task = document.querySelector("#addTask");
const TaskUpdate = document.querySelector("#addTaskUpdate");
const listAddTask = document.querySelector("#listAddTask");
const btnListTask = document.querySelector("#btn-listTask");
const calenderIcon = document.querySelector("#calenderIcon");
const clockIcon = document.querySelector("#clockIcon");
const btnSaveChange = document.querySelector("#btnSaveChange");
const btnSaveChangeUpdate = document.querySelector("#btnSaveChangeUpdate");
const namaTask = document.querySelector("#namaTask");
const idList = document.querySelector("#idList");
const selected = [];
const timeStartInput = document.querySelector("#timeStart");
const timeEndInput = document.querySelector("#timeEnd");
const timeStartInputUpdate = document.querySelector("#timeStartUpdate");
const timeEndInputUpdate = document.querySelector("#timeEndUpdate");
const waktuStart = document.querySelector("#waktuStart");
const waktuEnd = document.querySelector("#waktuEnd");
const profileBtn = document.querySelector("#profile-btn");
const profilePopup = document.querySelector("#profile-popup");
const clockIconUpdate = document.querySelector("#clockIconUpdate");
const calenderIconUpdate = document.querySelector("#calenderIconUpdate");
const btnListTaskUpdate = document.querySelector("#btn-listTaskUpdate");
const listAddTaskUpdate = document.querySelector("#listAddTaskUpdate");
const calenderAddUpdate = document.querySelector("#calenderUpdate");
const namaTaskUpdate = document.querySelector("#namaTaskUpdate");
const waktuStartUpdate = document.querySelector("#waktuStartUpdate");
const waktuEndUpdate = document.querySelector("#waktuEndUpdate");


closeBtnMobile.addEventListener("click", function () {
  sidebar.classList.toggle("-left-[400px]");
  sidebar.classList.toggle("left-0");
  closeBtnMobile.classList.toggle("left-[30px]");
  closeBtnMobile.classList.toggle("left-[290px]");
  blurBg.classList.toggle("hidden");
});

closeBtn.addEventListener("click", function () {
  sidebar.classList.toggle("lg:-left-[400px]");
  sidebar.classList.toggle("lg:left-0");
  closeBtn.classList.toggle("left-[40px]");
  closeBtn.classList.toggle("left-[380px]");
  main.classList.toggle("lg:pl-[300px]");
  main.classList.toggle("lg:pr-[300px]");
  main.classList.toggle("lg:pl-[500px]");
});

const now = new Date();
const hour = now.getHours();
const day = now.getDay();
const year = now.getFullYear();
const date = now.getDate();
const month = now.getMonth();

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function time() {
  if (hour >= 1 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

function formattedDate() {
  return `${dayNames[day]} ${date} ${monthNames[month]} ${year}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const greeting = time();
  const date = formattedDate();

  document.querySelector("#greeting").textContent = `${greeting}`;
  document.querySelector("#dateInform").textContent = `Today, ${date}`;
});

let timeSet = function (timeTask) {
  timeStartInputUpdate.innerHTML = ""
  timeEndInputUpdate.innerHTML = ""
  waktuStartUpdate.innerHTML = ""
  waktuEndUpdate.innerHTML = ""

  if (selected.includes(timeTask)) {
    timeTask.classList.remove("ring-green-500", "ring-2", "bg-green-100");

    const index = selected.indexOf(timeTask);
    if (index !== -1) {
      selected.splice(index, 1);
    }

    timeStartInput.value = selected[0]?.innerHTML || "";
    timeEndInput.value = selected[1]?.innerHTML || "";
    timeStartInputUpdate.value = selected[0]?.innerHTML || "";
    timeEndInputUpdate.value = selected[1]?.innerHTML || "";

    waktuStart.innerHTML = timeStartInput.value || "-";
    if (waktuEnd) waktuEnd.innerHTML = timeEndInput.value || "-";
    waktuStartUpdate.innerHTML = timeStartInputUpdate.value || "-";
    if (waktuEndUpdate) waktuEndUpdate.innerHTML = timeEndInputUpdate.value || "-";
    
    return;
  }

  timeTask.classList.add("ring-green-500", "ring-2", "bg-green-100");
  selected.push(timeTask);

  if (selected.length === 1) {
    timeStartInput.value = selected[0].innerHTML;
    timeEndInput.value = "";
  } else if (selected.length === 2) {
    timeStartInput.value = selected[0].innerHTML;
    timeEndInput.value = selected[1].innerHTML;
  } 

  if (selected.length === 1) {
    timeStartInputUpdate.value = selected[0].innerHTML;
    timeEndInputUpdate.value = "";
  } else if (selected.length === 2) {
    timeStartInputUpdate.value = selected[0].innerHTML;
    timeEndInputUpdate.value = selected[1].innerHTML;
  }

  if (selected.length > 2) {
    const removed = selected.shift();
    removed.classList.remove("ring-green-500", "ring-2", "bg-green-100");

    timeStartInput.value = selected[0].innerHTML;
    timeEndInput.value = selected[1]?.innerHTML || "";
    timeStartInputUpdate.value = selected[0]?.innerHTML;
    timeEndInputUpdate.value = selected[1]?.innerHTML || "";
  }

  waktuStart.innerHTML = timeStartInput.value || "-";
  if (waktuEnd) waktuEnd.innerHTML = timeEndInput.value || "-";
  waktuStartUpdate.innerHTML = timeStartInputUpdate.value || "-";
  if (waktuEndUpdate) waktuEndUpdate.innerHTML = timeEndInputUpdate.value || "-";

  
  btnSave();
  btnSaveUpdate();
};

let alert = function (alert) {
  loginAlert.classList.remove("hidden");
  loginAlert.classList.add("flex");
  blurBg.classList.remove("hidden");
};

closeX.addEventListener("click", function () {
  addRemove(loginAlert);
  blurBg.classList.add("hidden");
});

blurBg.addEventListener("click", function () {
  addRemove(loginAlert);
  blurBg.classList.add("hidden");
  sidebar.classList.add("-left-[400px]");
  sidebar.classList.remove("left-0");
  closeBtnMobile.classList.add("left-[30px]");
  closeBtnMobile.classList.remove("left-[290px]");
});


const containerAddList = document.querySelector("#containerAddList");
const containerAddTask = document.querySelector("#containerAddTask");
const containerAddTaskUpdate = document.querySelector("#containerAddTaskUpdate");

let newList = function (list) {
  containerAddList.classList.toggle("invisible");
  addList.classList.toggle("visible");
  addList.classList.toggle("translate-y-20");
  addList.classList.toggle("opacity-0");
  addList.classList.toggle("invisible");
  sidebar.classList.toggle("-left-[400px]");
  sidebar.classList.toggle("left-0");
  closeBtnMobile.classList.toggle("left-[30px]");
  closeBtnMobile.classList.toggle("left-[290px]");
};

function addTask() {
  containerAddTask.classList.toggle("invisible");
  Task.classList.toggle("visible");
  Task.classList.toggle("translate-y-20");
  Task.classList.toggle("opacity-0");
  Task.classList.toggle("invisible");
}

function addTaskUpdate(taskId, el) {
  fetch(`/update/${taskId}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  })
  .then(res => res.json())
  .then(data => {
    const { updateTask } = data;

    document
      .getElementById("calendar-inline-update")
      .addEventListener("changeDate", function (e) {
        const selected = e.detail.date;

        const formatted = selected.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        tanggalInputUpdate.value = formatted;
        document.querySelector("#tanggalSetUpdate").innerHTML = cekTanggal(
          tanggalInputUpdate.value
        );
        btnSaveUpdate();
      });
    
    document.querySelector("#idTask").value = updateTask._id;
    namaTaskUpdate.value = updateTask.todo;
    document.querySelector("#emojiListUpdate").value = updateTask.emojiRef;
    document.querySelector("#idListUpdate").value = updateTask.todoList._id;
    tanggalInputUpdate.value = updateTask.dateStart;
    timeStartInputUpdate.value = updateTask.timeStart;
    timeEndInputUpdate.value = updateTask.timeEnd;

    waktuStartUpdate.innerHTML = updateTask.timeStart;
    waktuEndUpdate.innerHTML = updateTask.timeEnd;
    document.querySelector("#tanggalSetUpdate").innerHTML = cekTanggal(
      updateTask.dateStart
    );
    document.querySelector("#UI-Emoji-Task-Update").innerHTML =
      updateTask.emojiRef;
    document.querySelector("#UI-Emoji-Input-Task-Update").innerHTML =
      updateTask.emojiRef;
    document.querySelector("#namaListUpdate").innerHTML =
      updateTask.todoList.content;
    document.querySelector("#namaListUpdate").classList.add("font-medium");

    btnSaveUpdate();
  })
  
  containerAddTaskUpdate.classList.toggle("invisible");
  TaskUpdate.classList.toggle("visible");
  TaskUpdate.classList.toggle("translate-y-20");
  TaskUpdate.classList.toggle("opacity-0");
  TaskUpdate.classList.toggle("invisible");
}

// tanggal update
const calendarUpdate = new Datepicker(
  document.getElementById("calendar-inline-update"),
  {
    language: "id",
    format: "dd-mm-yyyy",
    todayHighlight: true,
    autohide: false,
    inline: true,
    defaultDate: new Date(),
    minDate: new Date(),
  }
);
  
window.onclick = (event) => {
  if (!event.target.matches(".createNewList")) {
    if (addList.classList.contains("visible")) {
      containerAddList.classList.add("invisible");
      addList.classList.remove("visible");
      addList.classList.add("translate-y-20");
      addList.classList.add("opacity-0");
      addList.classList.add("invisible");
    }
  }
  if (!event.target.matches(".createNewTask")) {
    if (Task.classList.contains("visible")) {
      containerAddTask.classList.add("invisible");
      Task.classList.remove("visible");
      Task.classList.add("translate-y-20");
      Task.classList.add("opacity-0");
      Task.classList.add("invisible");
    }
  }
  if (!event.target.matches(".updateTask")) {
    if (TaskUpdate.classList.contains("visible")) {
      containerAddTaskUpdate.classList.add("invisible");
      TaskUpdate.classList.remove("visible");
      TaskUpdate.classList.add("translate-y-20");
      TaskUpdate.classList.add("opacity-0");
      TaskUpdate.classList.add("invisible");
    }
  }
}

addList.addEventListener("click", event => event.stopPropagation())

Task.addEventListener("click", event => event.stopPropagation())

TaskUpdate.addEventListener("click", event => event.stopPropagation())

let changeIcon = function (taskId, taskShow) {
  fetch(`/task/${taskId}/complete`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      complete: true,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { todoList } = data;

      const icon = taskShow.querySelector("i.fa-square");
      const teks = taskShow.querySelector("p.teks");
      const containerTask = taskShow.closest(".containerTask");

      icon.classList.remove("fa-square");
      icon.classList.add("fa-square-check");
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
      teks.classList.add("line-through");
      containerTask.classList.add("animate__fadeOut");

      const taskCounts = document.querySelector("#taskCounts");
      const countNow = parseInt(taskCounts.innerHTML);
      if (countNow > 0) {
        taskCounts.innerHTML = countNow - 1;
      }

      const taskCountCompleted = document.querySelector("#taskCountCompleted");
      const countCompleted = parseInt(taskCountCompleted.innerHTML);
      if (countCompleted > 0) {
        taskCountCompleted.innerHTML = countCompleted + 1;
      }

      const taskCount = document.querySelectorAll(".taskCount");
      taskCount.forEach((tc) => {
        if (tc.dataset.listId === todoList) {
          const counts = parseInt(tc.innerHTML);
          if (counts > 0) {
            tc.innerHTML = counts - 1;
          }
        }
      });

      setTimeout(() => {
        containerTask.remove();
      }, 900);
    });
};


function selectEmoji(el) {
  const content = el.innerHTML;

  document.querySelector("#emojiInput").value = content;
  document.querySelector("#UI-Emoji").innerHTML = content;
}


// task
const calendar = new Datepicker(document.getElementById("calendar-inline"), {
  language: "id",
  format: "dd-mm-yyyy",
  todayHighlight: true,
  autohide: false,
  inline: true,
  defaultDate: new Date(),
  minDate: new Date(),
});

document
  .getElementById("calendar-inline")
  .addEventListener("changeDate", function (e) {

    const selected = e.detail.date;

    const formatted = selected.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    tanggalInput.value = formatted;
    tampilTanggal(cekTanggal(tanggalInput.value));
    btnSave();
  });

function cekTanggal(inputDate) {
  const [day, month, year] = inputDate.split("/");
  const date = new Date(`${year}-${month}-${day}`);

  const dayNum = date.getDate();
  const monthName = date.toLocaleString("en-US", { month: "short" });
  const tanggalTampil = `${dayNum} ${monthName} ${year}`;
  return tanggalTampil;
}

function tampilTanggal(tanggal){
  const tanggalSet = document.querySelector("#tanggalSet");
  tanggalSet.innerHTML = tanggal;
}

function calender() {
  addRemove(calenderAdd);
  addRemove(listAddTask);
  if(tanggalInput.value == ""){
    document.querySelector("#tanggalSet").innerHTML = "-";
  } else {
    tampilTanggal(cekTanggal(tanggalInput.value));
  }

  timeAdd.classList.remove("hidden");
  timeAdd.classList.add("flex");

  calenderIcon.classList.add("hover:bg-[#DCFCE7]");
  calenderIcon.classList.remove(
    "bg-[#3E9F5E]",
    "text-white",
    "hover:bg-[#2c7043]"
  );
  clockIcon.classList.remove("hover:bg-[#DCFCE7]");
  clockIcon.classList.add("bg-[#3E9F5E]", "text-white", "hover:bg-[#2c7043]");

  setDate.classList.add("hidden");

  document.querySelector("#arrow").classList.remove("rotate-180");
}

// update
btnListTaskUpdate.addEventListener("click", () => {
  addRemove(calenderAddUpdate);
  addRemove(timeAddUpdate);

  listAddTaskUpdate.classList.remove("hidden");
  listAddTaskUpdate.classList.add("flex");

  calenderIconUpdate.classList.remove(
    "bg-[#3E9F5E]",
    "text-white",
    "hover:bg-[#2c7043]"
  );

  calenderIconUpdate.classList.add("hover:bg-[#DCFCE7]");
  clockIconUpdate.classList.add("hover:bg-[#DCFCE7]");

  clockIconUpdate.classList.remove(
    "bg-[#3E9F5E]",
    "text-white",
    "hover:bg-[#2c7043]"
  );

  document.querySelector("#arrow").classList.add("rotate-180");

  setDate.classList.add("hidden");
});

calenderIconUpdate.addEventListener("click", () => {
  addRemove(listAddTaskUpdate);
  addRemove(timeAddUpdate);

  calenderAddUpdate.classList.remove("hidden");
  calenderAddUpdate.classList.add("flex");

  calenderIconUpdate.classList.remove("hover:bg-[#DCFCE7]");
  calenderIconUpdate.classList.add(
    "bg-[#3E9F5E]",
    "text-white",
    "hover:bg-[#2c7043]"
  );

  clockIconUpdate.classList.remove(
    "text-white",
    "hover:bg-[#2c7043]",
    "bg-[#3E9F5E]"
  );
  clockIconUpdate.classList.add("hover:bg-[#DCFCE7]");

  setDate.classList.remove("hidden");

  document.querySelector("#arrow").classList.remove("rotate-180");
});

clockIconUpdate.addEventListener("click", () => {
  addRemove(listAddTaskUpdate);
  addRemove(calenderAddUpdate);

  timeAddUpdate.classList.remove("hidden");
  timeAddUpdate.classList.add("flex");

  setDate.classList.remove("hidden");

  calenderIconUpdate.classList.remove(
    "text-white",
    "hover:bg-[#2c7043]",
    "bg-[#3E9F5E]"
  );
  calenderIconUpdate.classList.add("hover:bg-[#DCFCE7]");

  clockIconUpdate.classList.remove("hover:bg-[#DCFCE7]");
  clockIconUpdate.classList.add(
    "bg-[#3E9F5E]",
    "text-white",
    "hover:bg-[#2c7043]"
  );

  document.querySelector("#arrow").classList.remove("rotate-180");

  setDate.classList.add("hidden");
});

// task
btnListTask.addEventListener("click", () => {
  addRemove(calenderAdd);
  addRemove(timeAdd);

  listAddTask.classList.remove("hidden");
  listAddTask.classList.add("flex");

  calenderIcon.classList.remove(
    "bg-[#3E9F5E]",
    "text-white",
    "hover:bg-[#2c7043]"
  );

  calenderIcon.classList.add("hover:bg-[#DCFCE7]");
  clockIcon.classList.add("hover:bg-[#DCFCE7]");

  clockIcon.classList.remove(
    "bg-[#3E9F5E]",
    "text-white",
    "hover:bg-[#2c7043]"
  );

  document.querySelector("#arrow").classList.add("rotate-180");

  setDate.classList.add("hidden");
});

calenderIcon.addEventListener("click", () => {
  addRemove(listAddTask);
  addRemove(timeAdd);

  calenderAdd.classList.remove("hidden");
  calenderAdd.classList.add("flex");

  calenderIcon.classList.remove("hover:bg-[#DCFCE7]");
  calenderIcon.classList.add(
    "bg-[#3E9F5E]",
    "text-white",
    "hover:bg-[#2c7043]"
  );

  clockIcon.classList.remove(
    "text-white",
    "hover:bg-[#2c7043]",
    "bg-[#3E9F5E]"
  );
  clockIcon.classList.add("hover:bg-[#DCFCE7]");

  setDate.classList.remove("hidden");

  document.querySelector("#arrow").classList.remove("rotate-180");
});

clockIcon.addEventListener("click", () => {
  addRemove(listAddTask);
  addRemove(calenderAdd);

  timeAdd.classList.remove("hidden");
  timeAdd.classList.add("flex");

  setDate.classList.remove("hidden");

  calenderIcon.classList.remove(
    "text-white",
    "hover:bg-[#2c7043]",
    "bg-[#3E9F5E]"
  );
  calenderIcon.classList.add("hover:bg-[#DCFCE7]");

  clockIcon.classList.remove("hover:bg-[#DCFCE7]");
  clockIcon.classList.add("bg-[#3E9F5E]", "text-white", "hover:bg-[#2c7043]");

  document.querySelector("#arrow").classList.remove("rotate-180");

  setDate.classList.add("hidden");
});

const alertTask = document.querySelector("#alertTask");

function btnSave() {
  if (
    timeStartInput.value !== "" &&
    timeEndInput.value !== "" &&
    namaTask.value !== "" &&
    idList.value !== "" &&
    tanggalInput.value !== ""
  ) {
    btnSaveChange.disabled = false;
    return true;
  } else {
    return false;
  }
}

function btnSaveUpdate() {
  if (
    timeStartInputUpdate.value !== "" &&
    timeEndInputUpdate.value !== "" &&
    namaTaskUpdate.value !== "" &&
    idListUpdate.value !== "" &&
    tanggalInputUpdate.value !== ""
  ) {
    btnSaveChangeUpdate.disabled = false;
    return true;
  } else {
    return false;
  }
}

function saveChange() {
  if (btnSave() == true || btnSaveUpdate() == true) {
    return;
  } else {
    alertTask.classList.remove("opacity-0", "top-0", "invisible");
    alertTask.classList.add("opacity-100", "top-3");
    setTimeout(() => {
      alertTask.classList.remove("opacity-100", "top-3");
      alertTask.classList.add("opacity-0", "top-0", "invisible");
    }, 7000);
    btnSaveChange.disabled = true;
    btnSaveChangeUpdate.disabled = true;
  }
}

function putList(el) {
  const emoji = el.querySelector("#selectEmoji").innerHTML;
  const id = el.querySelector("#selectId").innerHTML;
  const namaList = el.querySelector("#selectNama").innerHTML;

  document.querySelector("#emojiList").value = emoji;
  document.querySelector("#idList").value = id;
  document.querySelector("#UI-Emoji-Task").innerHTML = emoji;
  document.querySelector("#UI-Emoji-Input-Task").innerHTML = emoji;

  document.querySelector("#namaList").innerHTML = namaList;
  document.querySelector("#namaList").classList.add("font-medium");
  btnSave();
}

function putListUpdate(el) {
  const emoji = el.querySelector("#selectEmojiUpdate").innerHTML;
  const id = el.querySelector("#selectIdUpdate").innerHTML;
  const namaList = el.querySelector("#selectNamaUpdate").innerHTML;

  document.querySelector("#emojiListUpdate").value = emoji;
  document.querySelector("#idListUpdate").value = id;
  document.querySelector("#UI-Emoji-Task-Update").innerHTML = emoji;
  document.querySelector("#UI-Emoji-Input-Task-Update").innerHTML = emoji;

  document.querySelector("#namaListUpdate").innerHTML = namaList;
  document.querySelector("#namaListUpdate").classList.add("font-medium");
  btnSaveUpdate();
}

function autofillTime(input) {
    const val = input.value.trim();

    if (/^\d{1,2}$/.test(val)) {
      let num = parseInt(val);
      if (num >= 1 && num <= 24) {
        input.value = (num < 10 ? "0" + num : num) + ".00";
      } else {
        input.value = "";
      }
    } else if (!/^\d{2}\.\d{2}$/.test(val)) {
      input.value = "";
    }
}


timeStartInput.addEventListener("blur", () => {
  autofillTime(timeStartInput);
  waktuStart.innerHTML = timeStartInput.value || "-";
  btnSave();
});
timeEndInput.addEventListener("blur", () => {
  autofillTime(timeEndInput);
  waktuEnd.innerHTML = timeEndInput.value || "-";
  btnSave();
});
namaTask.addEventListener("input", btnSave);

timeStartInputUpdate.addEventListener("blur", () => {
  autofillTime(timeStartInput);
  waktuStartUpdate.innerHTML = timeStartInputUpdate.value || "-";
  btnSaveUpdate();
});
timeEndInputUpdate.addEventListener("blur", () => {
  autofillTime(timeEndInput);
  waktuEndUpdate.innerHTML = timeEndInputUpdate.value || "-";
  btnSaveUpdate();
});
namaTaskUpdate.addEventListener("input", btnSaveUpdate);

function addRemove(el) {
  el.classList.add("hidden");
  el.classList.remove("flax");
}

let hovering = false;
let hidetimeout;

function showPopup(){
  clearTimeout(hidetimeout);
  hovering = true;
  profilePopup.classList.remove(
    "opacity-0",
    "invisible",
    "-translate-y-[10px]"
  );
}

function hidePopup(){
  hovering = false;
  hidetimeout = setTimeout(() => {
    if(!hovering){
      profilePopup.classList.add(
        "opacity-0",
        "invisible",
        "-translate-y-[10px]"
      );
    }
  }, 200);
}

profileBtn.addEventListener("mouseenter", showPopup)
profilePopup.addEventListener("mouseenter", showPopup);

profileBtn.addEventListener("mouseleave", hidePopup)
profilePopup.addEventListener("mouseleave", hidePopup);

function settingTask(el) {
  const e = el.closest(".containerUpdateDelete");
  const updateDelete = e.querySelector(".updateDelete");

  updateDelete.classList.toggle("hidden");
  updateDelete.classList.toggle("flex");
}

function hapusAlert(taskId, el){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      hapus(taskId, el);
    }
  });
}

function hapus(taskId, el) {
  fetch(`/hapus/${taskId}?_method=DELETE`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  })
  .then(res => res.json())
  .then(data => {
    if(data.success){
      const { todoList } = data;
      const containerUD = el.closest(".updateDelete");
      const containerUDelete = containerUD.closest(".containerUpdateDelete"); 
      const taskSee = containerUDelete.closest(".containerTask")
    
      taskSee.classList.add("animate__fadeOut");

      const taskCounts = document.querySelector("#taskCounts");
      const countNow = parseInt(taskCounts.innerHTML);
      if (countNow > 0) {
        taskCounts.innerHTML = countNow - 1;
      }

      const taskCount = document.querySelectorAll(".taskCount");
      taskCount.forEach((tc) => {
        if (tc.dataset.listId === todoList) {
          const counts = parseInt(tc.innerHTML);
          if (counts > 0) {
            tc.innerHTML = counts - 1;
          }
        }
      });

      setTimeout(() => {
        taskSee.remove();
      }, 900);
    }
  })
}
