const { Builder, By, Key, until } = require('selenium-webdriver');
const readline = require('readline');

function read(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://web.whatsapp.com/');
        await read("Login to whatsapp and then enter");
        setInterval(async () => {
            try {
                const allMessages = await driver.findElements(By.className('vW7d1'));
                const lastMessageObject = allMessages[allMessages.length - 1];
                const alignItemsAttribute = await lastMessageObject.getCssValue("align-items");
                if (alignItemsAttribute === "flex-start") {
                    const lastMessage = await lastMessageObject.getText();
                    
                    if(lastMessage.match(new RegExp('NO[ ]*U', 'i'))) {
                        console.log("NO U message recieved. Replying")
                        const acseq = driver.actions().doubleClick(lastMessageObject);
                        acseq.perform();
                        driver.findElement(By.className('_3F6QL _2WovP')).sendKeys('NO U', Key.RETURN);
                    }
                }
            } catch (error) {
                console.log("No No U's found");
            }
        }, 500)
    } finally {
        //await driver.quit();
    }
})();

