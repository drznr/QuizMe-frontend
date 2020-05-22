import { httpService } from './http.service';
import { utilService } from './util.service';

export const userService = {
    signup,
    login,
    logout,
    update,
    getLoggedUser,
    getGuestUser,
    getEmptyCredentials
}

async function signup(credentials) {
    const user = await httpService.post('auth/signup', credentials);
    return _handleLogin(user);
}

async function login(credentials) {
    const user = await httpService.post('auth/login', credentials);
    return _handleLogin(user);
}

async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}

async function update(user) {
    const savedUser = await httpService.put(`user/${user._id}`, user);
    return _handleLogin(savedUser);
}

function getLoggedUser() {
    return (sessionStorage.user) ? JSON.parse(sessionStorage.user) : null;
}

function getGuestUser() {
    const uid = utilService.makeId();
    return {
        uid,
        isReady: false,
        username: `Guest_${uid}`,
        avatar: `https://robohash.org/${uid}?set=set2/`,
        ansCount: 0,
        rightCount: 0
    }
}

function getEmptyCredentials() {
    return {
        username: '',
        email: '',
        password: '',
        avatar: ''
    }
}

function _handleLogin(user) {
    if (user) sessionStorage.setItem('user', JSON.stringify(user));
    return user;
}