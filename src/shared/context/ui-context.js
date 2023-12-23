import { createContext, useState, useCallback } from 'react';

export const UIContext = createContext({
    isDrawerOpen: false,
    openDrawer: () => { },
    closeDrawer: () => { },
});


export const UIContextProvider = props => {

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawer = useCallback(() => {
        setDrawerIsOpen(true);
    }, [])

    const closeDrawer = useCallback(() => {
        setDrawerIsOpen(false);
    }, [])


    const ctxValue = {
        isDrawerOpen: drawerIsOpen,
        openDrawer,
        closeDrawer,
    }

    return (
        <UIContext.Provider value={ctxValue}>{props.children}</UIContext.Provider>
    )
}
