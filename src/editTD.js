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

export { editTodoProperty, changeCompleteProperty };
