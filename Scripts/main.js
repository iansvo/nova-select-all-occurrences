
exports.activate = function() {
    // Do work when the extension is activated
}

exports.deactivate = function() {
    // Clean up state before the extension is deactivated
}


// Invoked by the "Select All Occurrences" command
nova.commands.register("select-all-occurrences.selectOccurrences", (editor) => {
    
    const selection = editor.selectedText;
    
    editor.edit(function(e) {                
        const occurrences = getOccurrences(selection);
        
        for( const range of occurrences ) {        
            editor.addSelectionForRange(new Range(range.start, range.end))
        }
    });
    
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }      

    function getOccurrences(string = '') {
        const charCount   = editor.document.length,
              text        = editor.document.getTextInRange(new Range(0, charCount)),
              regex       = new RegExp(escapeRegExp(string), 'gi'),
              matches     = [...text.matchAll(regex)];
        
        return Array.isArray(matches) ? matches.map(match => {
            return {
                string: match[0],
                start: match.index,
                end: match.index + match[0].length
            }  
          }) : []
    }  
});


