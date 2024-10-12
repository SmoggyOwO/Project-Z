"use client";

import { useEffect, useState } from "react";

export default function Home() {
    let [apiData, setData] = useState("Loading...");
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/home`)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            setData(data);
        })
    }, [])

    function HandleClick() {
        window.location.replace(`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&scope=read:user repo`);
    }

  return (
    <>
        <section className="main">
            <h1>Project-Z</h1>
            <p>Coming Soon</p>
            <p>{apiData}</p>
            <button onClick={HandleClick} className="btn">Signin</button>
        </section>
    </>
  );
}
