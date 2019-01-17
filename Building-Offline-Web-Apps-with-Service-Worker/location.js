function getCurrentPositionWithPromise() {
    return new Promise(function (fullfill, reject) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                fullfill(position);
            },
            function (error) {
                reject(error);
            }
        );
    });
}

function getCurrentPositionWithPromise() {
    return new Promise(function (fullfill, reject) {
        navigator.geolocation.getCurrentPosition(fullfill, reject);
    });
}

getCurrentPositionWithPromise()
    .then(r => console.log(r.coords.longitude) || r)
    .catch(r => console.error(r.message))
;

async function main() {
    try {
        var p = await getCurrentPositionWithPromise();
        console.info(p.coords.latitude);
    } catch (e) {
        console.error(e.message);
    }
}
