import React from 'react'

export default function swrFetcher(url:string) {
    return fetch(url, {method: "GET",credentials: "include",}).then(res => res.json())
}
