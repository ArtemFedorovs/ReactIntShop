
export function fakeApiResults(name, password) {
        if (name === "admin" && password === "admin"){return "admin"};
        if (name === "user" && password === "user"){return "user"};
        return null
}

