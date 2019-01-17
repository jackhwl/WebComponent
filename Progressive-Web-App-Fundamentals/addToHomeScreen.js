window.addEventListener('appinstalled', evt => {
    console.log('The app was installed!');
});

window.addEventListener('beforeinstallprompt', evt => {
    evt.userChoice.then(choice => {
        var message = choice.outcome === 'dismissed'
            ? 'User cancelled'
            : 'User installed';

        console.log(message);
    });
});


window.addEventListener('beforeinstallprompt', evt => {
    evt.preventDefault();
    
    // save the event for later
    promptEvt = evt;

    return false;
});

if (promptEvt !== undefined) {
    // show install banner now
    promptEvt.prompt();

    promptEvt.userChoice.then(choice => {
        console.log('User choice: ', choice.outcome);
    });
}