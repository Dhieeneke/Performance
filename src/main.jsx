import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './components/Header.jsx';

// Lazy loading для Main компонента
const Main = React.lazy(() => import('./components/Main.jsx'));

function App() {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Загрузка...</div>}>
                <Main />
            </Suspense>
        </>
    );
}

// Убираем setTimeout для более быстрой загрузки
const root = createRoot(document.getElementById('app'));
root.render(<App />); 