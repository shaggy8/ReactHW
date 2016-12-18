var Note = React.createClass({
    render: function() {
        var style = { backgroundColor: this.props.color };
        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> × </span>
                {this.props.children}
            </div>
        );
    }
});



var NoteEditor = React.createClass({
    getInitialState: function() {
        return {
            text: ''
        };
    },

    handleTextChange: function(event) {
        this.setState({ text: event.target.value });
    },

    handleColorChange: function(event) {
        this.setState({ color: event.target.value });
    },

    handleNoteAdd: function() {
        var newNote = {
            text: this.state.text,
            color: this.state.color || this.randomColor(),
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);
        this.setState({ text: '' });
    },

    randomColor: function() {
        var randomNumber = Math.floor(Math.random() * 6 + 1); // Math.floor(Math.random()*(max-min+1)+min);
        var color;

        switch (randomNumber) {
            case 1:
                color = 'yellow';
                break;
            case 2:
                color = '#337ab7';
                break;
            case 3:
                color = '#5cb85c';
                break;
            case 4:
                color = '#5bc0de';
                break;
            case 5:
                color = '#f0ad4e';
                break;
            case 6:
                color = '#d9534f';
        };

        return color;
    },

    render: function() {
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <div className="radio-color-block">
                    <input type="radio" onChange={this.handleColorChange} id="yellow" className="radio-color" name="color-option" value="yellow" />
                    <label className="color-label" htmlFor="yellow" style={{backgroundColor: 'yellow'}} />
                    <input type="radio" onChange={this.handleColorChange} id="blue" className="radio-color" name="color-option" value="#337ab7" />
                    <label className="color-label" htmlFor="blue" style={{backgroundColor: '#337ab7'}} />
                    <input type="radio" onChange={this.handleColorChange} id="green" className="radio-color" name="color-option" value="#5cb85c" />
                    <label className="color-label" htmlFor="green" style={{backgroundColor: '#5cb85c'}} />
                    <input type="radio" onChange={this.handleColorChange} id="sky" className="radio-color" name="color-option" value="#5bc0de" />
                    <label className="color-label" htmlFor="sky" style={{backgroundColor: '#5bc0de'}} />
                    <input type="radio" onChange={this.handleColorChange} id="orange" className="radio-color" name="color-option" value="#f0ad4e" />
                    <label className="color-label" htmlFor="orange" style={{backgroundColor: '#f0ad4e'}} />
                    <input type="radio" onChange={this.handleColorChange} id="red" className="radio-color" name="color-option" value="#d9534f" />
                    <label className="color-label" htmlFor="red" style={{backgroundColor: '#d9534f'}} />
                </div>
                <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
            </div>
        );
    }
});



var NotesGrid = React.createClass({
    componentDidMount: function() {
        var grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate: function(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    render: function() {
        var onNoteDelete = this.props.onNoteDelete;

        return (
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(function(note){
                        return (
                            <Note
                                key={note.id}
                                onDelete={onNoteDelete.bind(null, note)}
                                color={note.color}>
                                {note.text}
                            </Note>
                        );
                    })
                }
            </div>
        );
    }
});



var NotesApp = React.createClass({
    getInitialState: function() {
        return {
            notes: [],
            filterWord: '',
            displayedNotes: []
        };
    },

    componentDidMount: function() {
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({ notes: localNotes, displayedNotes: localNotes });
        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    handleNoteDelete: function(note) {
        var noteId = note.id;
        var newNotes = this.state.notes.filter(function(note) {
            return note.id !== noteId;
        });
        var filteredNotes = this.filterNotes(null, newNotes);
        
        this.setState({ 
            notes: newNotes,
            displayedNotes: filteredNotes
        });
    },

    handleNoteAdd: function(newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        var filteredNotes = this.filterNotes(null, newNotes);
        
        this.setState({ 
            notes: newNotes,
            displayedNotes: filteredNotes
        });
    },

    handleSearch: function(event) {
        var searchQuery = event.target.value.toLowerCase();
        var filteredNotes = this.filterNotes(searchQuery);

        this.setState({
            filterWord: searchQuery,
            displayedNotes: filteredNotes
        });
    },

    render: function() {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <input type="text" className="search-field" onChange={this.handleSearch} placeholder="To find a note type search text here..."/>
                <NotesGrid notes={this.state.displayedNotes} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    },

    filterNotes: function(searchQuery, newNotes) {
        var filterWord = searchQuery || this.state.filterWord;
        var notes = newNotes || this.state.notes;

        if (searchQuery === '') return notes;

        var filteredNotes = notes.filter(function(el) {
            var searchValue = el.text.toLowerCase();
            return searchValue.indexOf(filterWord) !== -1;
        });

        return filteredNotes;
    },

    _updateLocalStorage: function() {
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
});



ReactDOM.render(
    <NotesApp />,
    document.getElementById('mount-point')
);