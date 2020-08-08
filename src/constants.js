const proxy = `https://cors-anywhere.herokuapp.com/`;

const clientID = 7560327;
const clientSecret = '8BapO0AwbPmQFfeTawZS';
console.log('REDIRECT', process.env);
const redirectCallbackUrl = 'http://localhost:3000/auth/vkontakte/callback';
const tokenKey = 'vk-token';

export {
  proxy, clientID, clientSecret, redirectCallbackUrl, tokenKey
}