// Project Password: BZMS3Sl6msKf5e2N
// Data API Access: https://buyfmjxiufihlvnxwgud.supabase.co/rest/v1/todos

const supabaseClient = supabase.createClient(
    "https://buyfmjxiufihlvnxwgud.supabase.co",
    "sb_publishable_NqX8Quqciicgw080SxUHcg_3SEUSTnx",
);

// console.log("Responce: ", response);

const input = document.querySelector("#todoTask");
const todoList = document.querySelector("#todoList");
const todoListH2 = document.querySelector("#todoListH2");
const error = document.querySelector("#error");

const showTodo = async () => {
    const response = await supabaseClient.from("todos").select("*");

    if (response.error) {
        error.textContent = response.error.message;
        error.style.color = "red";
        return;
    }

    const todoTask = response.data;

    if (todoTask.length > 0) {
        todoListH2.style.display = "block";
    } else {
        todoListH2.style.display = "none";
    }

    todoList.innerHTML = "";

    for (let i = 0; i < todoTask.length; i++) {
        todoList.innerHTML +=
        `<li><span>${todoTask[i].TodosDescription}</span>
            <button class="delete-button" onclick="deleteTodo(${todoTask[i].id})">
                <svg class="delete-svgIcon" viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
            </button>
        </li>`;
    }
};
showTodo();

const todoUpdate = async (event) => {
    event.preventDefault();

    if (input.value.trim() === "") {
        error.textContent = "Please enter a task!";
        error.style.color = "red";
        return;
    }
    error.textContent = "";

    const todo = input.value.trim();

    const response = await supabaseClient.from("todos").insert({ TodosDescription: todo });

    if (response.error) {
        error.textContent = response.error.message;
        error.style.color = "red";
        return;
    }

    input.value = "";
    await showTodo();
};

const deleteTodo = async(id) => {
    const response = await supabaseClient.from("todos").delete().eq("id", id);
    if (response.error) {
        error.textContent = response.error.message;
        error.style.color = "red";
        return;
    }
    await showTodo();
}