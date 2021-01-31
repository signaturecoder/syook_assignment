
showNoteList();
let addBtn = document.querySelector("#actions__btn");
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let actionTitle = document.getElementById("actions__title");
  let actionDescription = document.getElementById("actions__description");


  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  const newNote = {
    noteTitle: actionTitle.value,
    noteDescription: actionDescription.value,
  };
  if (actionTitle.value === "") {
    alert("Title should not be empty");
  } else if (actionDescription.value === "") {
    alert("Description should not be empty");
  } else {
    var existNoteIndex = notesObj.findIndex(
      (item) => item.noteTitle === actionTitle.value
    );
    let btnText = addBtn.innerText;

    if (btnText === "Add Note") {
      if (existNoteIndex !== -1) {
        alert("Title should be unique");
      }

      if (existNoteIndex === -1) {
        notesObj.push(newNote);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        actionTitle.value = "";
        actionDescription.value = "";
      }
    } else if (btnText === "Update Note") {
      // update item of array without mutating the array
      const newNotesObj = notesObj.map((obj) =>
        obj.noteTitle === actionTitle.value
          ? { ...obj, noteDescription: newNote.noteDescription }
          : obj
      );
      localStorage.setItem("notes", JSON.stringify(newNotesObj));
      actionTitle.disabled = false;
      actionTitle.value = "";
      actionDescription.value = "";
    }
  }

  showNoteList();
});

function showNoteList() {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach((element, index) => {
    html += `
        <div class="note">
        <div class="note__title">${element.noteTitle}</div>
        <div class="note__description__wrapper" >
        <div class="note__description">${element.noteDescription}</div>
        <div class="note__actions">
          <button id="${index}" class="note__btn note__btn--edit" onclick='editNote(this.id)'>Edit</button> 
          <button id="${index}" class="note__btn note__btn--delete" onclick="deleteNote(this.id)">Delete</button> 
        </div>
        </div>
      </div>
        `;
  });

  let notesContainerEle = document.querySelector(".note-list__container");
  if (notesObj.length !== 0) {
    notesContainerEle.innerHTML = html;
  } else {
    notesContainerEle.innerHTML = "No notes are added!";
  }
}

function expand(index) {
  console.log("index", index);
}

function editNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let actionTitle = document.getElementById("actions__title");
  actionTitle.value = notesObj[index].noteTitle;
  let actionDescription = document.getElementById("actions__description");
  actionDescription.value = notesObj[index].noteDescription;
  addBtn.innerHTML = "Update Note";
  document.getElementById("actions__title").disabled = true;
}

function deleteNote(noteId) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNoteList();
}

let searchEle = document.querySelector(".search__box");
let searchBtn = document.querySelector(".search__btn");
searchEle.addEventListener("input", () => {
  let searchItem = searchEle.value.toLowerCase();

  let noteCards = document.getElementsByClassName("note");
  Array.from(noteCards).forEach((element) => {
    let noteCardTitle = element.getElementsByClassName("note__description")[0]
      .innerText;
    if (noteCardTitle.includes(searchItem)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

function searchNote(searchItem) {
  if (notesObj.length === 0) {
    console.log("no item to search");
  } else {
    let filteredNotes = notesObj.filter((item) => {
      if (item.noteTitle === searchItem) return item;
      else return;
    });
    console.log("filtered Notes", filteredNotes);
  }
}
