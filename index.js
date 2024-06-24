function meetAutoReactions() { // функція для пошуку та повернення першого елемента у веб-сторінці, що відповідає заданому XPath-виразу
  function getElement(xpath) {
    return document.evaluate( // vетод `document.evaluate` - пошук елемента за заданим шляхом XPath і повертає знайдений елемент.
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    ).singleNodeValue;
  }
  function getEmojiButton(index) {
    const emojis = ['💖', '👍', '🎉', '👏', '😂', '😮', '😢', '🤔', '👎']; // список іконок емоджі 
    return getElement(`//button/img[@data-emoji="${emojis[index]}"]`); // пошук кнопки яка має зображення змінної по атрибуту data-emoji з XPath-виразу
  }

  const sendReactionButton = getElement('//i[text()="mood"]'); // кнопка яка викликає перелік емоджі 
  
  const intervalIds = []; // пустий масив інтервалу 

  return ({
    startReacting(index, timeout = 1000) {
      if (!getEmojiButton(index)) sendReactionButton.click(); // якщо кнопка кнопка emoji за певним індексом (`index`) на сторінці не присутня, тоді відбувається клік по ній 
      intervalIds.push(setInterval(() => { // клікання на кнопку  emoji з певним індексом через timeout = 1000 часу.
        try {
          getEmojiButton(index).click(); // якщо кнопка є, і індекс знаходить то відбувається клік на цю емоджі 
        } catch {
          this.stopReacting(); // якщо кнопки немає, чи при отриманні доступу до кнопки є помилка - тоді відбувається припинення натискання на реакцію 
        }
      }, timeout));
    },
    stopReacting() {
      intervalIds.forEach(id => clearInterval(id)); // зкпиняє автоматичну реацію, після того як перебери всі id інтервалів в масиві const intervalIds = []; після чого очищяє масив clearInterval(id)
      intervalIds.length = 0; // перевіряє довжину інтервалу яка має бути 0 
    }
  });
}

const meet = meetAutoReactions(); // об'єкт за допмогою функції meetAutoReactions

meet.startReacting(0); //виклик методу startReacting(0), де 0 це індекс емоджі 
