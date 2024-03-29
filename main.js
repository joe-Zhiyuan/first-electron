// main.js

// 控制应用生命周期和创建原生浏览器窗口的模组
const {
  app, Menu,
  BrowserWindow
} = require('electron')
const path = require('path')

// const Menu = app.Menu
function createWindow() {
  // 隐藏菜单栏 file option等
  Menu.setApplicationMenu(null)
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // 加载 index.html
  mainWindow.loadURL('http://localhost:3000') // 此处跟electron官网路径不同，需要注意
  // mainWindow.loadFile('index.html') // 此处跟electron官网路径不同，需要注意
  
  // 打开开发工具
  // mainWindow.webContents.openDevTools()
}
// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用 require 导入。


// 前端（vue，electron）怎么获取电脑的唯一码?
// 可以获取硬盘和cpu序列号来作为唯一id
const os = require('os');
const { execSync } = require('child_process');

// 获取硬盘序列号
const disks = os.platform() === 'win32' ? execSync('wmic diskdrive get serialnumber').toString().split('\n').slice(1,-1) : [];
const diskSerials = disks.map(serial => serial.trim());

// 获取CPU序列号
const cpu = os.platform() === 'win32' ? execSync('wmic cpu get processorid').toString().split('\n').slice(1,-1) : [];
const cpuSerial = cpu[0].trim();

console.log('硬盘序列号：', diskSerials);
console.log('CPU序列号：', cpuSerial);