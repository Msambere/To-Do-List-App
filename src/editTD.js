function editTodoProperty(tdList) {
  const editTdIndex = document.getElementById("editTdIndex").value;
  const editProperty = document.getElementById("td-property").value;
  const newValue = document.getElementById("newValue").value;
  const editedTd = { ...tdList[editTdIndex], [editProperty]: newValue };
  return editedTd;
}

function changeCompleteProperty(tdIndex, tdList) {
  if (tdList[tdIndex].status === "incomplete") {
    tdList[tdIndex].status = "complete";
  } else {
    tdList[tdIndex].status = "incomplete";
  }
  return tdList[tdIndex].status;
}

// helper functions

export { editTodoProperty, changeCompleteProperty };
