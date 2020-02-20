/*
Modules
*/
const {
    Client
} = require('discord-rpc'),
    client = new Client({
        transport: 'ipc'
    }),
    clientId = '680100906913497113',
    log = require('log-symbols'),
    monitor = require('active-win');
/*
Updating the presence function
*/
const updateRP = (status,
        appVersion) => {
        if (status == null) status =
            'Test mode';
        client['setActivity']({
            details: 'Algorithm Editor',
            state: status,
            largeImageKey: 'algobox',
            largeImageText: `${appVersion}`,
            instance: false
        });
        console['log'](
            `${log['info']} Updated Status : ${status}`
        );
    },
    isWin = () => {
        if (process.platform == "win32")
            return true;
        return false;
    };
/*
The function that checks if AlgoBox is used
*/
const checkAlgo = async () => {
    let window = monitor['sync']
        ();
    try {
        let appExtension =
            isWin() ? ".exe" :
            ".app",
            processName =
            window['owner']
            .name,
            windowTitle =
            window['title'];
        if (processName
            .toLowerCase() ==
            `algobox${appExtension}`
        ) {
            const AppElements =
                windowTitle[
                    'split'](
                    ':');
            updateRP(AppElements
                .length >
                1 ?
                `Working on : ${AppElements[1]}` :
                null,
                AppElements[
                    0],
                false);
        }
    } catch (e) {
        console['log'](
            `${log['error']} ${e}`
        );
    }
}
/*
Ready event
*/
client['on']('ready', () => {
    console.log(
        `${log['success']} Connected to Discord !`
    );
    setInterval(() => {
        checkAlgo();
    }, 15000);
});
/*
Login with id
*/
client['login']({
    clientId
}).catch(console.error);
