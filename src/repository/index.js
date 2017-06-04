const key = '__apps__';

export function getAll() {
    return JSON.parse(localStorage.getItem(key)) || [];
};

export function saveApp(name, id, key) {
    const apps = getAll();
    apps.push({ 
        appName: name,
        appKey: key,
        appId: id,
        logs: [],
        filters: { types:['$all'], date: 'PT24H' },
        top: 100,
        skip: 0
    });

    localStorage.setItem('__apps__', JSON.stringify(apps));
};

export function saveAllApps(newApps) {
    const apps = getAll();
    newApps.forEach(function(element) {
        var { appName, appKey, appId } = element;

        apps.push({
            appName,
            appKey,
            appId,
            logs: [],
            filters: { types:['$all'], date: 'PT24H' },
            top: 100,
            skip: 0
        });   
    });

    localStorage.setItem(key, JSON.stringify(apps));
};

export function removeById(id) {
    const apps = getAll();
    const newApps = apps.filter(a => a.appId !== id)

    localStorage.setItem(key, JSON.stringify(newApps));
};