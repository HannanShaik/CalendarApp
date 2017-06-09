export const fetchConfig = () => {
    return fetch('https://api.myjson.com/bins/q6u31')
    .then((res) => res.json())
    .catch((e) => { throw e; });
};

export const applyDates = (payload) => {
    return {};
    /*
    * Uncomment with post URL

    return fetch('https://api.myjson.com/bins/q6u31po', {
        method: 'post',
        body: JSON.stringify(payload)
    }).then((res) => res.json())
    .catch((e) => { throw e; });
    */
};
