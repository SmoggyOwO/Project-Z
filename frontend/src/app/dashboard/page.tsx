"use client";
import { useEffect, useState } from "react"
import Cookies from "js-cookie";

export default function page() {
    const [userName, setUserName] = useState("");
    const [link, setLink] = useState("");

    const accessToken = Cookies.get("token");

    console.log(accessToken);

    useEffect(() => {
        fetch("https://api.github.com/user", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setUserName(data.name);
            setLink(data.html_url);
        })
    }, [])

  return (
    <div className="fillPage">Welcome<a href={link}>{userName}</a></div>
  )
}
