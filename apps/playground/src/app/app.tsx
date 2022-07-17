// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      When controlling the flow of text, using the CSS property
      <span className="inline">display: inline</span>
      will cause the text inside the element to wrap normally. While using the
      property <span className="inline-block">display: inline-block</span>
      will wrap the element to prevent the text inside from extending beyond its
      parent. Lastly, using the property{' '}
      <span className="block">display: block</span>
      will put the element on its own line and fill its parent.
      <div className="flex items-center">
        <img alt="App icon" src="favicon.ico" />
        <div>
          <strong>Andrew Alfred</strong>
          <span>Technical advisor</span>
        </div>
      </div>
    </div>
  );
}

export default App;
