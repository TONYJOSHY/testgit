var addNote = (title, body) => {
    console.log('Adding note')
    console.log(title)
    console.log(body)
}

var removeNote = (title) => {
    console.log('Removing note')
    console.log(title)
}

var getAll = () => {
    console.log('Getting all note')
}

var readNote = (title) => {
    console.log('Reading note')
    console.log(title)
}

module.exports = {
    addNote,
    removeNote,
    getAll,
    readNote
}