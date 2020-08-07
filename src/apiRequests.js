import fakeFriendsArr from './fake_friends'
import {proxy} from './constants'

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}



export async function fetchFriends(token) {
  const friendApi = `${proxy}https://api.vk.com/method/friends.get?count=5&fields=photo_100&v=5.122&&access_token=${token}`;
  const friendsResp = await fetch(friendApi);
  const data = await friendsResp.json();
  await delay(2000);
  return data.response.items;
  // return fakeFriendsArr;
}