function activateEditFormBtns() {
  const editTodoDialog = document.getElementById("editToDoDialog");
  const editForm = document.getElementById("editForm");
  const editCancelBtn = document.querySelector("#editCancelBtn");
  const editConfirmBtn = document.querySelector("#editConfirmBtn");
  editConfirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const editTdIndex = document.getElementById("editTdIndex").value;
    console.log("Step before calling editTodoProperty");
    currentTodoList[editTdIndex] = editTodoProperty(currentTodoList);
    currentTodoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    console.log("TD editted");
    editForm.reset();
    console.log("Form reset");
    editTodoDialog.close();
    console.log("Form closed");
    storeTdList(currentTodoList);
    console.log("Td list updated");
    clearDomDisplay();
    refreshDisplay();
    console.log("display refreshed");
  });
  editCancelBtn.addEventListener("click", () => {
    document.getElementById("editForm").reset();
    editTodoDialog.close();
  });
}

function editTodoProperty(tdList) {
  console.log("editTodoProperty called");
  const editTdIndex = document.getElementById("editTdIndex").value;
  const editProperty = document.getElementById("td-property").value;
  const newValue = document.getElementById("newValue").value;
  const editedTd = { ...tdList[editTdIndex], [editProperty]: newValue };
  console.log("Todo at ", editTdIndex, " ", editProperty, " property was changed to ", newValue);
  return editedTd;
}

function changeCompleteProperty(tdIndex, tdList) {
  if (tdList[tdIndex].status === "") {
    tdList[tdIndex].status = "complete";
  } else {
    tdList[tdIndex].status = "";
  }
  return tdList[tdIndex].status;
}

// helper functions

export { editTodoProperty, changeCompleteProperty, activateEditFormBtns };
