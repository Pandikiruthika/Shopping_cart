export default {
    getCookie: (name) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split(';').map((cookie) => cookie.trim());
    
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split('=');
          if (cookieName === name) {
            return decodeURIComponent(cookieValue);
          }
        }
    
        return null; 
      },
      getQuery: (name) => {
        let params = new URL(document.location).searchParams;
        return params.get(name) ? atob(params.get(name)) : null;
      },
      buildURLQuery: (obj, searchQuery) =>
        Object.keys(obj)
          .map((k) => k + '=' + (searchQuery ? btoa(obj[k]) : obj[k]))
          .join('&')
}