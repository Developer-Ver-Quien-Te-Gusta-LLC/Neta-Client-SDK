import remoteConfig from '@react-native-firebase/remote-config';

async function _fetch(key) {
    try {
        // Ensure default values are loaded from Firebase, and fetch them.
        await remoteConfig().setDefaults({
            // ...default values, if any...
        });
        
        // Fetch values from Firebase
        await remoteConfig().fetch(1 * 60 * 6); // 10 seconds cache duration
        await remoteConfig().activate();

        // Fetch value for the key(s)
        if (!Array.isArray(key)) {
            const value = remoteConfig().getValue(key);
            console.log(`Fetched key ${key} with value ${value.asString()}`);
            return value ? { [key]: value.asString() } : null;
        } else {
            const result = {};
            key.forEach(k => {
                const value = remoteConfig().getValue(k);
                if (value) {
                    result[k] = value.asString();
                    console.log(`Fetched key ${k} with value ${result[k]}`);
                }
            });
            return result;
        }
    } catch (err) {
        console.log("Error fetching KV from Firebase Remote Config", err);
        return [];
    }
}

export { _fetch };
