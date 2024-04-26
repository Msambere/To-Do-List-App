// New Todo

function editTodoProperty(tdIndex, tdList) {
  console.log("Original", tdList[tdIndex]);
  const editProperty = document.getElementById("td-property").value;
  console.log("What to change", editProperty);
  const newValue = document.getElementById("newValue").value;
  console.log("What to change it to", newValue);
  tdList[tdIndex][editProperty] = newValue;
  const editedTd = tdList[tdIndex];
  console.log("Editted", tdList[tdIndex]);
  return editedTd;
}

function changeCompleteProperty(tdIndex, tdList) {
  const currentStatus = tdList[tdIndex].status;
  console.log(`Original Status: ${currentStatus}`);
  if (tdList[tdIndex].status === "") {
    tdList[tdIndex].status = "complete";
  } else {
    tdList[tdIndex].status = "";
  }
  console.log(`New status: ${tdList[tdIndex].status}`);
  return tdList[tdIndex].status;
}

// helper functions

export { editTodoProperty, changeCompleteProperty };
