function activateEditFormBtns() {
  const editTodoDialog = document.getElementById("editToDoDialog");
  const editForm = document.getElementById("editForm");
  const editCancelBtn = document.querySelector("#editCancelBtn");
  const editConfirmBtn = document.querySelector("#editConfirmBtn");
  editConfirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const editTdIndex = document.getElementById("editTdIndex").value;
    currentTodoList[editTdIndex] = editTodoProperty(currentTodoList);
    currentTodoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    editForm.reset();
    editTodoDialog.close();
    storeTdList(currentTodoList);
    clearDomDisplay();
    refreshDisplay();
  });
  editCancelBtn.addEventListener("click", () => {
    document.getElementById("editForm").reset();
    editTodoDialog.close();
  });
}

function editTodoProperty(tdList) {
  const editTdIndex = document.getElementById("editTdIndex").value;
  const editProperty = document.getElementById("td-property").value;
  const newValue = document.getElementById("newValue").value;
  const editedTd = { ...tdList[editTdIndex], [editProperty]: newValue };
  return editedTd;
}

function changeCompleteProperty(tdIndex, tdList) {
  if (tdList[tdIndex].status === "incomplete") {
    const changedTd = { ...tdList[tdIndex], status: "complete" };
    return changedTd;
  }
  if (tdList[tdIndex].status === "complete") {
    const changedTd = { ...tdList[tdIndex], status: "incomplete" };
    return changedTd;
  }
}

// Helper functions

export { editTodoProperty, changeCompleteProperty, activateEditFormBtns };
