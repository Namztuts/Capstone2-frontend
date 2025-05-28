import { render } from '@testing-library/react';
import App from '../App';

//Smoke test | render
test('App renders without crashing', () => {
   render(<App />);
});
