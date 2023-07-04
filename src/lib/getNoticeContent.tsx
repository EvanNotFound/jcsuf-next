export async function getNoticeData() {
    const res = await fetch("https://api.jcsuf.top/api/notice");
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return res.json();
  }