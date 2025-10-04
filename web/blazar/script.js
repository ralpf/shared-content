
//.......................................................................HELPERS     

function do_fetch(request) {
    fetch(request).then((response) => {
        if (response.ok) console.log(`Request OK ${request}`);
        else console.error(`FAIL Reques ${request}`);
    }).catch((error) => console.error(`Exception on ${request}`, error));
}

document.addEventListener("DOMContentLoaded", function() {
    Main.ModeChanged(document.getElementById('main-dropdown').value);
}); // run on document laod

//..........................................................................MAIN


