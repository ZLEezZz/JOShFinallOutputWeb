let editIndex = -1;

window.onload = function() {
  displayData();
}

// AUTO COMPUTE
function computeAverage() {
  let p = parseFloat(prelim.value);
  let m = parseFloat(midterm.value);
  let f = parseFloat(final.value);
  
  if (isNaN(p) || isNaN(m) || isNaN(f)) {
    average.value = "";
    return;
  }
  
  average.value = ((p * 0.3) + (m * 0.3) + (f * 0.4)).toFixed(2);
}

// ADD / UPDATE
function addRecord() {
  
  if (name.value === "" || average.value === "") {
    alert("Complete inputs first!");
    return;
  }
  
  let data = JSON.parse(localStorage.getItem("students")) || [];
  
  let student = {
    name: name.value,
    section: section.value,
    strand: strand.value,
    subject: subject.value,
    prelim: prelim.value,
    midterm: midterm.value,
    final: final.value,
    average: average.value
  };
  
  if (editIndex === -1) {
    data.push(student);
  } else {
    data[editIndex] = student;
    editIndex = -1;
  }
  
  localStorage.setItem("students", JSON.stringify(data));
  displayData();
  clearFields();
}

// DISPLAY
function displayData() {
  let data = JSON.parse(localStorage.getItem("students")) || [];
  tableBody.innerHTML = "";
  
  data.forEach((s, i) => {
    tableBody.innerHTML += `
<tr>
<td>Grade 11</td>
<td>${s.section}</td>
<td>${s.strand}</td>
<td>${s.name}</td>
<td>${s.subject}</td>
<td>${s.prelim}</td>
<td>${s.midterm}</td>
<td>${s.final}</td>
<td>${s.average}</td>
<td>
<button class="edit" onclick="editRecord(${i})">Edit</button>
<button class="delete" onclick="deleteRecord(${i})">Delete</button>
</td>
</tr>`;
  });
  
  updateGeneralAverage();
}

// DELETE
function deleteRecord(i) {
  let data = JSON.parse(localStorage.getItem("students")) || [];
  data.splice(i, 1);
  localStorage.setItem("students", JSON.stringify(data));
  displayData();
}

// EDIT
function editRecord(i) {
  let data = JSON.parse(localStorage.getItem("students")) || [];
  let s = data[i];
  
  name.value = s.name;
  section.value = s.section;
  strand.value = s.strand;
  subject.value = s.subject;
  prelim.value = s.prelim;
  midterm.value = s.midterm;
  final.value = s.final;
  
  computeAverage();
  editIndex = i;
}

// CLEAR
function clearFields() {
  name.value = "";
  section.value = "";
  strand.value = "";
  subject.value = "";
  prelim.value = "";
  midterm.value = "";
  final.value = "";
  average.value = "";
}

// SEARCH
function searchData() {
  let keyword = search.value.toLowerCase();
  let data = JSON.parse(localStorage.getItem("students")) || [];
  
  tableBody.innerHTML = "";
  
  data.forEach((s, i) => {
    if (
      s.name.toLowerCase().includes(keyword) ||
      s.section.toLowerCase().includes(keyword) ||
      s.strand.toLowerCase().includes(keyword) ||
      s.subject.toLowerCase().includes(keyword)
    ) {
      tableBody.innerHTML += `
<tr>
<td>Grade 11</td>
<td>${s.section}</td>
<td>${s.strand}</td>
<td>${s.name}</td>
<td>${s.subject}</td>
<td>${s.prelim}</td>
<td>${s.midterm}</td>
<td>${s.final}</td>
<td>${s.average}</td>
<td>
<button class="edit" onclick="editRecord(${i})">Edit</button>
<button class="delete" onclick="deleteRecord(${i})">Delete</button>
</td>
</tr>`;
    }
  });
  
  updateGeneralAverage();
}

// GENERAL AVERAGE
function updateGeneralAverage() {
  let data = JSON.parse(localStorage.getItem("students")) || [];
  let total = 0;
  
  data.forEach(s => {
    total += parseFloat(s.average);
  });
  
  genAvg.innerText = data.length ? (total / data.length).toFixed(2) : "0.00";
}