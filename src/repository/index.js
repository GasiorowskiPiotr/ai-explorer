const key = '__apps__';

export function getAll() {
    return JSON.parse(localStorage.getItem(key));
};

export function saveApp(name, id, key) {
    let apps = getAll();
    apps = apps || [];
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
    let apps = getAll();
    apps = apps || [];
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

    localStorage.setItem('__apps__', JSON.stringify(apps));
};

export function removeById(id) {
    let apps = getAll();
    apps = apps || [];
    apps = apps.filter(a => a.appId !== id)

    localStorage.setItem('__apps__', JSON.stringify(apps));
};