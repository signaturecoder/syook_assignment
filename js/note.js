console.log('working');
showNoteList();
let addBtn = document.querySelector('#actions__btn');
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let actionTitle = document.getElementById('actions__title')
    let actionDescription = document.getElementById('actions__description')
    // console.log('Actions Title', actionTitle.value);
    // console.log('Actions Description', actionDescription.value);
    let notes = localStorage.getItem("notes");
    if(notes === null) {
         notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    const newNote = {
        noteTitle: actionTitle.value,
        noteDescription: actionDescription.value
    }
    console.log("new Note", newNote);
    notesObj.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    actionTitle.value = "";
    actionDescription.value = "";
    showNoteList();
});

function showNoteList() {
    let notes = localStorage.getItem("notes");
    if(notes === null){
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach((element, index) => {
        html += `
        <div class="note">
        <div class="note__title">${element.noteTitle}</div>
        <div class="note__description">${element.noteDescription}</div>
        <div class="note__actions">
          <button class="note__btn note__btn--edit">Edit</button> 
          <button id="${index}" class="note__btn note__btn--delete" onclick="deleteNote(this.id)">Delete</button> 
        </div>
      </div>
        `;
        
    });

    let notesContainerEle = document.querySelector('.note-list__container');
    if(notesObj.length !== 0) {
        notesContainerEle.innerHTML = html;
    } else {
        notesContainerEle.innerHTML = 'No notes are added!';
    }
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