const {shell, app, dialog, BrowserWindow, Menu} = require('electron');

function createWindow()
{
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: __dirname + "/icon.png",
        title: "Notion Desktop"
    });

    win.loadURL("https://notion.so/login");

    win.webContents.on("did-finish-load", () => {
        win.webContents.insertCSS("footer,nav{display:none!important;}");
    });

    let menuTemplate = [
        {
            label: "Notion",
            submenu: [
                {
                    label: "Visit Website",
                    click: () => {
                        shell.openExternal("https://notion.so/");
                    }
                },
                {
                    label: "Reload App",
                    role: "forceReload",
                },
                {
                    label: "Quit",
                    role: "quit"
                }
            ]
        },
        {
            label: "Edit",
            submenu: [
                {
                    label: "Undo",
                    role: "undo",
                },
                {
                    label: "Redo",
                    role: "redo",
                },
                {
                    label: "Cut",
                    role: "cut",
                },
                {
                    label: "Copy",
                    role: "copy",
                },
                {
                    label: "Paste",
                    role: "paste",
                }
            ]
        },
        {
            label: "View",
            submenu: [
                {
                    label: "Zoom In",
                    role: "zoomIn",
                },
                {
                    label: "Zoom Out",
                    role: "zoomOut",
                },
                {
                    label: "Reset Zoom",
                    role: "resetZoom",
                },
                {
                    label: "Toggle Fullscreen",
                    role: "togglefullscreen",
                },
            ]
        },
        {
            label: "Help",
            submenu: [
                {
                    label: "Notion Help & Support",
                    click: () => {
                        shell.openExternal("https://www.notion.so/Help-Support-e040febf70a94950b8620e6f00005004");
                    }
                },
                {
                    label: "About this app",
                    click: () => {
                        let msg = "Created by: RBFraphael (rbfraphael.com.br)";
                        msg += "\nVersion: 0.1.0";
                        msg += "\nRepository: github.com/rbfraphael/notion-linux";
                        msg += "\n\nThis app is an unofficial creation, and has no connection with the creators of the Notion platform.";
                        dialog.showMessageBox(win, {
                            title: "About Notion Linux",
                            message: msg,
                            buttons: ['Thanks!']
                        });
                    }
                }
            ],
        }
    ];

    let menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});

app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length == 0){
        createWindow();
    }
});
