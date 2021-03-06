const proxy = `https://cors-anywhere.herokuapp.com/`;

const clientID = 7560327;
const clientSecret = process.env.REACT_APP_CLIENT_KEY;
const localhostCallbackUrl = 'http://localhost:3000';
const redirectCallbackUrl = `${
  process.env.REACT_APP_URL || localhostCallbackUrl
}/auth/vkontakte/callback`;
const tokenKey = 'vk-token';

export { proxy, clientID, clientSecret, redirectCallbackUrl, tokenKey };
