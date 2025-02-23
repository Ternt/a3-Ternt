export function hashCode(s) {
    let h=0;
    for(let i = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;

    return h;
}

export const calculateUUID = (json) => {
    let initial = json.username[0] + json.password[0];

    // hash from only username + password
    const hash = hashCode(json.username + json.password);

    return initial + hash.toString();
}