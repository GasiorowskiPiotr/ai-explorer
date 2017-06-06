import * as localforage from 'localforage';

const key = '__apps__';

function saveAll(items) {
    return localforage.setItem(key, items);
};

export function getAll() {
    return localforage.getItem(key).then((data) => data || [] );
};

export function saveApp(name, id, key) {
    return getAll().then(apps => {
        apps.push({ 
            appName: name,
            appKey: key,
            appId: id,
            logs: [],
            filters: { types:['$all'], date: 'PT24H' },
            top: 100,
            skip: 0
        });

        return apps;
    }).then(apps => saveAll(apps));
};

export function saveAllApps(newApps) {
    return getAll().then(apps => {
        newApps.forEach((element) => {
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

        return newApps;
    }).then(apps => saveAll(apps));
};

export function removeById(id) {
    return getAll()
        .then(apps => apps.filter(a => a.appId !== id))
        .then(apps => saveAll(apps));
};