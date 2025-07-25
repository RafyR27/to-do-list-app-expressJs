let changeIconUncompleted = function (taskId, el) {
    fetch(`/task/${taskId}/uncompleted`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            complete: false,
        }),
    })
    .then(res => res.json())
    .then(data => {
        const { todoList } = data;

        const icon = el.querySelector("i.fa-square-check");
        const teks = el.querySelector("p.teks");
        const containerTask = el.closest(".containerTask");

        icon.classList.toggle("fa-square-check");
        icon.classList.toggle("fa-square");
        icon.classList.toggle("fa-solid");
        icon.classList.toggle("fa-regular");
        teks.classList.remove("line-through");
        containerTask.classList.add("animate__fadeOut");

        const taskCounts = document.querySelector("#taskCounts");
        const countNow = parseInt(taskCounts.innerHTML);
        if (countNow > 0) {
            taskCounts.innerHTML = countNow + 1;
        }

        const taskCountCompleted = document.querySelector("#taskCountCompleted");
        const countCompleted = parseInt(taskCountCompleted.innerHTML);
        if (countCompleted > 0) {
            taskCountCompleted.innerHTML = countCompleted - 1;
        }

        const taskCount = document.querySelectorAll(".taskCount");
        taskCount.forEach((tc) => {
            if (tc.dataset.listId === todoList) {
            const counts = parseInt(tc.innerHTML);
            if (counts > 0) {
                tc.innerHTML = counts + 1;
            }
            }
        });

        setTimeout(() => {
            containerTask.remove();
        }, 9000);
    })
}