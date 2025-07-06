import React from 'react';
import { Event } from './Event.jsx';
import { TABS, TABS_KEYS, generateItems } from '../data/tabs.js';

export function Main() {
    const ref = React.useRef();
    const initedRef = React.useRef(false);
    const [activeTab, setActiveTab] = React.useState('');
    const [hasRightScroll, setHasRightScroll] = React.useState(false);

    React.useEffect(() => {
        if (!activeTab && !initedRef.current) {
            initedRef.current = true;
            setActiveTab(new URLSearchParams(location.search).get('tab') || 'all');
        }
    });

    const onSelectInput = event => {
        setActiveTab(event.target.value);
    };

    let sizes = [];
    const onSize = size => {
        sizes = [...sizes, size];
    };

    React.useEffect(() => {
        if (sizes.length > 0 && ref.current) {
            const container = ref.current;
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            const itemWidth = sizes[0].width;
            const itemHeight = sizes[0].height;
            const itemsPerRow = Math.floor(containerWidth / itemWidth);
            const itemsPerColumn = Math.floor(containerHeight / itemHeight);
            const totalItems = itemsPerRow * itemsPerColumn;
            
            if (totalItems > 0) {
                const items = generateItems(TABS[activeTab]?.items || [], totalItems);
                setItems(items);
            }
        }
    }, [activeTab, sizes]);

    const [items, setItems] = React.useState([]);

    const onScroll = () => {
        if (ref.current) {
            const { scrollLeft, scrollWidth, clientWidth } = ref.current;
            setHasRightScroll(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    React.useEffect(() => {
        const container = ref.current;
        if (container) {
            container.addEventListener('scroll', onScroll);
            onScroll();
            return () => container.removeEventListener('scroll', onScroll);
        }
    });

    const onTabClick = tab => {
        setActiveTab(tab);
    };

    return (
        <main className="main">
            <section className="section main__general">
                <h2 className="section__title section__title-header section__main-title">Главное</h2>
                <div className="hero-dashboard">
                    <div className="hero-dashboard__primary">
                        <h3 className="hero-dashboard__title">Привет, Геннадий!</h3>
                        <p className="hero-dashboard__subtitle">Двери и окна закрыты, сигнализация включена.</p>
                        <ul className="hero-dashboard__info">
                            <li className="hero-dashboard__item">
                                <div className="hero-dashboard__item-title">Дома</div>
                                <div className="hero-dashboard__item-details">
                                    +23
                                    <span className="a11y-hidden">°</span>
                                </div>
                            </li>
                            <li className="hero-dashboard__item">
                                <div className="hero-dashboard__item-title">За окном</div>
                                <div className="hero-dashboard__item-details">
                                    +19
                                    <span className="a11y-hidden">°</span>
                                    <div
                                        className="hero-dashboard__icon hero-dashboard__icon_rain"
                                        role="img"
                                        aria-label="Дождь"
                                    ></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul className="hero-dashboard__schedule">
                        <Event
                            icon="temp"
                            iconLabel="Температура"
                            title="Philips Cooler"
                            subtitle="Начнет охлаждать в 16:30"
                        />
                        <Event
                            icon="light"
                            iconLabel="Освещение"
                            title="Xiaomi Yeelight LED Smart Bulb"
                            subtitle="Включится в 17:00"
                        />
                        <Event
                            icon="light"
                            iconLabel="Освещение"
                            title="Xiaomi Yeelight LED Smart Bulb"
                            subtitle="Включится в 17:00"
                        />
                    </ul>
                </div>
            </section>

            <section className="section main__scripts">
                <h2 className="section__title section__title-header">Избранные сценарии</h2>
                <ul className="event-grid">
                    <Event
                        slim={true}
                        icon="light2"
                        iconLabel="Освещение"
                        title="Выключить весь свет в доме и во дворе"
                    />
                    <Event
                        slim={true}
                        icon="schedule"
                        iconLabel="Расписание"
                        title="Я ухожу"
                    />
                    <Event
                        slim={true}
                        icon="light2"
                        iconLabel="Освещение"
                        title="Включить свет в коридоре"
                    />
                    <Event
                        slim={true}
                        icon="temp2"
                        iconLabel="Температура"
                        title="Набрать горячую ванну"
                        subtitle="Начнётся в 18:00"
                    />
                    <Event
                        slim={true}
                        icon="temp2"
                        iconLabel="Температура"
                        title="Сделать пол тёплым во всей квартире"
                    />
                </ul>
            </section>

            <section className="section main__devices">
                <div className="section__title">
                    <h2 className="section__title-header">
                        Избранные устройства
                    </h2>

                    <select className="section__select" defaultValue="all" onInput={onSelectInput}>
                        {TABS_KEYS.map(key =>
                            <option key={key} value={key}>
                                {TABS[key].title}
                            </option>
                        )}
                    </select>

                    <div className="section__tabs">
                        {TABS_KEYS.map(key => (
                            <button
                                key={key}
                                className={'section__tab' + (activeTab === key ? ' section__tab_active' : '')}
                                onClick={() => onTabClick(key)}
                            >
                                {TABS[key].title}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="section__panel" ref={ref}>
                    <div className="section__panel-wrapper">
                        <ul className="section__panel-list">
                            {items.map((item, index) => (
                                <Event
                                    key={index}
                                    {...item}
                                    onSize={onSize}
                                />
                            ))}
                        </ul>
                    </div>
                    {hasRightScroll && (
                        <button className="section__arrow" aria-label="Показать больше">
                            <span></span>
                        </button>
                    )}
                </div>
            </section>
        </main>
    );
} 