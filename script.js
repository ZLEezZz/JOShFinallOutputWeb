let records = [];

function computeAverage() {
  let p = parseFloat(prelim.value) || 0;
  let m = parseFloat(midterm.value) || 0;
  let f = parseFloat(final.value) || 0;

  let avg = (p + m + f) / 3;
  average.value = avg.toFixed(2);
}

function addRecord() {
  let record = {
    year: new Date().getFullYear(),
    section: section.value,
    strand: strand.value,
    name: name.value,
    subject: subject.value,
    prelim: prelim.value,
    midterm: midterm.value,
    final: final.value,
    average: average.value
  };

  records.push(record);
  displayData();
  clearFields();
}

function displayData() {
  tableBody.innerHTML = "";
  let total = 0;

  records.forEach((r, i) => {
    total += parseFloat(r.average);

    tableBody.innerHTML += `
    <tr>
      <td>${r.year}</td>
      <td>${r.section}</td>
      <td>${r.strand}</td>
      <td>${r.name}</td>
      <td>${r.subject}</td>
      <td>${r.prelim}</td>
      <td>${r.midterm}</td>
      <td>${r.final}</td>
      <td>${r.average}</td>
      <td><button onclick="deleteRecord(${i})">Delete</button></td>
    </tr>`;
  });

  genAvg.innerText = records.length 
    ? (total / records.length).toFixed(2) 
    : "0.00";
}

function deleteRecord(i) {
  records.splice(i, 1);
  displayData();
}

function clearFields() {
  document.querySelectorAll("input").forEach(i => i.value = "");
  document.querySelectorAll("select").forEach(s => s.value = "");
}

function searchData() {
  let val = search.value.toLowerCase();
  let rows = document.querySelectorAll("#tableBody tr");

  rows.forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(val) ? "" : "none";
  });
}<td>${s.name}</td>
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
