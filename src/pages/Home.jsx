import React, { useEffect, useState } from 'react'
import { useAuth } from './components/Auth';
import { useNavigate } from 'react-router-dom'
import { Layout } from './layout';
import { Apps } from '../App';


function Home() {
    const [items, setItems] = useState(Apps.map(app => ({ ...app })));
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useAuth();
    const open = (path) => navigate(path);
    const navigate = useNavigate();

    const logout = () => {
        setIsLoggedIn(false);
        navigate('/lock');
    }

    useEffect(() => {
        if (!isLoggedIn)
            navigate('/lock');
    }, [isLoggedIn]);

    useEffect(() => {
        document.addEventListener("dragover", (evt) => {
            evt.dataTransfer.dropEffect = "move";
            evt.preventDefault();
        });
    }, []);

    const dragStart = (index, evt) => {
        evt.dataTransfer.effectAllowed = "move";
        setDraggedItemIndex(index);
    };

    const dragOver = (evt) => {
        evt.dataTransfer.effectAllowed = "move";
        evt.preventDefault();
    };

    const dragEnter = (index, evt) => {
        if (draggedItemIndex === null) return;
        const newItems = [...items];
        const draggedItemContent = newItems[draggedItemIndex];
        newItems.splice(draggedItemIndex, 1);
        newItems.splice(index, 0, draggedItemContent);
        setDraggedItemIndex(index);
        setItems(newItems);
    };

    const dragEnd = () => {
        setDraggedItemIndex(null);
    };

    return (
        <Layout title='Hello, JJ!'>
            <div className={`apps h-full grid items-center ${draggedItemIndex !== null ? 'dragging' : ''}`}>
                <ul className='grid grid-cols-4 gap-5 text-5xl w-[80%] justify-self-center cursor-pointer'>
                    {
                        items.map((app, i) => {
                            const { Icon, path } = app;
                            return (<li key={i}
                                onClick={() => open(path)}
                                className={`app justify-self-center p-4 bg-gray-50 bg-opacity-0 cursor-pointer rounded-full ${draggedItemIndex === i ? 'dragging' : ''}`}
                                draggable={true}
                                onDragStart={(evt) => dragStart(i, evt)}
                                onDragEnter={(evt) => dragEnter(i, evt)}
                                onDragEnd={dragEnd}
                                onDragOver={dragOver}>
                                <Icon />
                            </li>);
                        })
                    }
                </ul>
            </div>
        </Layout>
    )
}
// export default withAuth(Home)
export default Home;