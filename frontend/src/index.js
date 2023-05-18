import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/index';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

// ReactDOM.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <App />
//         </Provider>
//     </React.StrictMode>,
//     document.getElementById('root')
// );

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
</React.StrictMode>);

reportWebVitals();
