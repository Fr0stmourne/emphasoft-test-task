import { fakeFriends } from './fakeData'
import { proxy } from './constants'

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}



export async function fetchFriends(token) {
  await delay(2000);

  // const friendApi = `${proxy}https://api.vk.com/method/friends.get?count=5&fields=photo_100&v=5.122&&access_token=${token}`;
  // const friendsResp = await fetch(friendApi);
  // const data = await friendsResp.json();
  // return data.response.items;

  return fakeFriends;
}

export async function fetchProfile(token) {
  // await delay(2000);

  const userApi = `${proxy}https://api.vk.com/method/users.get?fields=photo_100&v=5.122&&access_token=${token}`;
  const resp = await fetch(userApi);
  const data = await resp.json();
  return data.response[0];

  // return fakeFriends;
}