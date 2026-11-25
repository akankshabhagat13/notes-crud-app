let notes = JSON.parse(
    localStorage.getItem("notes") || "[]"
);

let nextId = Number(
    localStorage.getItem("nextId") || "1"
);

const form = document.getElementById("noteForm");
const title = document.getElementById("title");
const content = document.getElementById("content");
const noteId = document.getElementById("noteId");
const saveBtn = document.getElementById("saveBtn");
const notesContainer = document.getElementById("notesContainer");

// Save notes in browser storage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("nextId", String(nextId));
}

// READ: Display all notes
function displayNotes() {
    notesContainer.innerHTML = "";

    notes.forEach(note => {
        const card = document.createElement("div");
        card.className = "note";

        const heading = document.createElement("h3");
        heading.textContent = note.title;

        const paragraph = document.createElement("p");
        paragraph.textContent = note.content;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        editBtn.onclick = () => editNote(note.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => deleteNote(note.id);

        card.append(heading, paragraph, editBtn, deleteBtn);
        notesContainer.appendChild(card);
    });
}

// CREATE and UPDATE
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const noteTitle = title.value.trim();
    const noteContent = content.value.trim();

    if (!noteTitle || !noteContent) return;

    if (noteId.value) {
        const note = notes.find(
            n => n.id === Number(noteId.value)
        );

        if (note) {
            note.title = noteTitle;
            note.content = noteContent;
        }
    } else {
        notes.push({
            id: nextId++,
            title: noteTitle,
            content: noteContent
        });
    }

    saveNotes();
    displayNotes();
    form.reset();
    noteId.value = "";
    saveBtn.textContent = "Add Note";
});

// Select a note for editing
function editNote(id) {
    const note = notes.find(n => n.id === id);

    if (!note) return;

    noteId.value = note.id;
    title.value = note.title;
    content.value = note.content;

    saveBtn.textContent = "Update Note";
}

// DELETE
function deleteNote(id) {
    if (!confirm("Do you want to delete this note?")) {
        return;
    }

    notes = notes.filter(n => n.id !== id);

    saveNotes();
    displayNotes();
}

// Display saved notes when opening the app
displayNotes();