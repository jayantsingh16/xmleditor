ClassicEditor
    .create( document.querySelector( '#editor' ), {
      autosave: {
            save( editor ) {
                return saveData( editor.getData() );
            }
        }
    } )
    .then( editor => {
        window.editor = editor;

        displayStatus( editor );
    } )
    .catch( err => {
        console.error( err.stack );
    } );

// Save the data to a fake HTTP server (emulated here with a setTimeout())
function saveData( data ) {
    return new Promise( resolve => {
        setTimeout( () => {
            console.log( 'Saved', data );

            resolve();
        }, HTTP_SERVER_LAG );
    } );
}

// Update the "Status: Saving..." info.
function displayStatus( editor ) {
    const pendingActions = editor.plugins.get( 'PendingActions' );
    const statusIndicator = document.querySelector( '#editor-status' );

    pendingActions.on( 'change:hasAny', ( evt, propertyName, newValue ) => {
        if ( newValue ) {
            statusIndicator.classList.add( 'busy' );
        } else {
            statusIndicator.classList.remove( 'busy' );
        }
    } );
}