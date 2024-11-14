import { defineToolbarApp } from 'astro/toolbar';

const motivationalMessages = [
  "You're doing great!",
  'Keep up the good work!',
  "You're awesome!",
  "You're a star!",
];

export default defineToolbarApp({
  init(canvas, app) {
    // canvas.appendChild(document.createTextNode('Hello World!'));
    // const h1 = document.createElement('h1');
    // h1.textContent =
    //   motivationalMessages[
    //     Math.floor(Math.random() * motivationalMessages.length)
    //   ];

    // canvas.append(h1);

    const myWindow = document.createElement('astro-dev-toolbar-window');
    // const myContent = document.createElement('p');
    // myContent.textContent = 'My content';
    const myButton = document.createElement('astro-dev-toolbar-button');
    myButton.textContent = 'Click me!';
    myButton.buttonStyle = 'purple';
    myButton.size = 'medium';

    myButton.addEventListener('click', () => {
      console.log('Clicked!');
    });
    const myContent = document.createElement('div');
    myContent.innerHTML = `
    <details name='steps' open>
      <summary>Step 1</summary>
      Something small enough to escape casual notice.
    </details>
    <details name='steps'>
      <summary>Step 2</summary>
      Something small enough to escape casual notice.
    </details>
    <br/><button>click me</button>
    `;
    // use appendChild directly on `window`, not `myWindow.shadowRoot`
    myWindow.appendChild(myContent);
    myWindow.append(myButton);

    canvas.append(myWindow);

    console.log(
      'canvas.querySelector',
      canvas.querySelector('astro-dev-toolbar-window')
    );

    // Display a random message when the app is toggled
    app.onToggled(({ state }) => {
      console.log('app ontoggled!: ', state);
      // const newMessage =
      //   motivationalMessages[
      //     Math.floor(Math.random() * motivationalMessages.length)
      //   ];
      // h1.textContent = newMessage;
    });

    // app.onToggled(({ state }) => {
    //   const text = document.createTextNode(
    //     `The app is now ${state ? 'enabled' : 'disabled'}!`
    //   );
    //   canvas.appendChild(text);
    // });
  },
});
