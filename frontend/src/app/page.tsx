"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const [apiData, setData] = useState("Loading...");

    console.log(process.env.NEXT_PUBLIC_BACKEND_URI);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/home`)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            setData(data);
        })
    }, [])
  return (
    <>Response from backend : {apiData}</>
  );
}
