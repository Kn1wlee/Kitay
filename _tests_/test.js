const { JSDOM } = require('jsdom');
const { darkModeToggle } = require('./manhwa');

describe('toggleDarkMode', () => {
  let dom, body, button;

  beforeEach(() => {
    // create a new JSDOM instance
    dom = new JSDOM(`
      <html>
        <body>
          <button id="dark-mode-btn"></button>
        </body>
      </html>
    `);

    // get the body and button elements
    body = dom.window.document.getElementsByTagName('body')[0];
    button = dom.window.document.getElementById('dark-mode-btn');

    // set up the event listener for the button
    button.addEventListener('click', toggleDarkMode);
  });

  afterEach(() => {
    // remove the event listener for the button
    button.removeEventListener('click', toggleDarkMode);
  });

  it('should switch to dark mode when the button is clicked', () => {
    // simulate a click on the button
    button.click();

    // check that the body element has the 'dark' class
    expect(body.classList.contains('dark')).toBe(true);
  });
});
