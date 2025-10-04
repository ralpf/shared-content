
//.......................................................................HELPERS     

function do_fetch(request) {
    fetch(request).then((response) => {
        if (response.ok) console.log(`Request OK ${request}`);
        else console.error(`FAIL Reques ${request}`);
    }).catch((error) => console.error(`Exception on ${request}`, error));
}

document.addEventListener("DOMContentLoaded", function() {
    console.log('Document Loaded')
}); // run on document laod

//..........................................................................MAIN


