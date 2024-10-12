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
        .finally(() => {
            console.log(apiData);
        })

    }, [])
  return (
    <>
        <section className="main">
            <h1>Project-Z</h1>
            <p>Coming Soon</p>
        </section>
    </>
  );
}
