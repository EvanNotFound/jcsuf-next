export default async function getUserInfo(userId : string) {
    const res = await fetch(`https://api.jcsuf.top/api/userinfo?uid=${userId}`)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        return {
          "name": "John Cena",
          "uid": 666666,
          "exp": 20668,
          "desc": "谜",
          "pword_md5": "",
          "mailbox": "",
          "verified": true,
          "isSub": false,
          "avatar": "https://s2.loli.net/2023/07/05/yKpZWBrVfaIJDul.png",
          "theme_preferrence": "",
          "ctime": 1657087692408,
          "admin_level": 0,
          "ban_until": 0,
          "last_seen": 1688093417969,
          "last_check": 1658324348685,
          "last_access": 0,
          "totallike": 7,
          "totaldislike": 5,
          "totalread": 1142,
          "totalcomment": 57,
          "ban_by": -1,
          "articles": [
            666
          ],
          "subscribers": [],
          "subscribings": [],
          "subscribeStatus": 0,
          "sex": -1,
          "sex_select": -1,
          "messages": [],
          "unreadmsgcount": 0,
          "bili_bind": 666666666,
          "workorders": []
        }
    }
    const userInfo = await res.json()
    
  return userInfo
}
