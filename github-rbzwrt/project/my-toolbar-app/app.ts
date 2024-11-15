import { defineToolbarApp } from 'astro/toolbar';

const motivationalMessages = [
  "You're doing great!",
  'Keep up the good work!',
  "You're awesome!",
  "You're a star!",
];

export default defineToolbarApp({
  init(canvas, app, server) {
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
      <summary>Step 1: Enter title</summary>
      <input id='title' placeholder='Enter title'/>
    </details>
    <details name='steps'>
      <summary>Step 2</summary>
      Something small enough to escape casual notice.
    </details>
    <br/><button id="generate">generate</button>
    <script>
      console.log('input: ', document.querySelector('title'));
    </script>
    `;
    // use appendChild directly on `window`, not `myWindow.shadowRoot`
    myWindow.appendChild(myContent);
    myWindow.append(myButton);

    canvas.append(myWindow);

    console.log(
      'canvas.querySelector',
      canvas.querySelector('astro-dev-toolbar-window')
    );

    const astroToolbarWindow = canvas.querySelector('astro-dev-toolbar-window');
    console.log(astroToolbarWindow?.querySelector('#title'));

    const titleInput = astroToolbarWindow?.querySelector(
      '#title'
    ) as HTMLInputElement;
    titleInput?.addEventListener('change', (event) => {
      console.log('change event: ', event, titleInput?.value);
    });

    const generateButton = astroToolbarWindow?.querySelector(
      '#generate'
    ) as HTMLButtonElement;

    generateButton?.addEventListener('click', (event) => {
      console.log('generate!');
      server.send('my-app:my-message', { message: 'Hello World2!' });
    });

    server.on('server-message', (data: any) => {
      console.log(data.message);
    });

    // Display a random message when the app is toggled
    app.onToggled(({ state }) => {
      console.log('app ontoggled!: ', state);
      // server.send('my-app:my-message', { message: 'Hello World!' });
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
