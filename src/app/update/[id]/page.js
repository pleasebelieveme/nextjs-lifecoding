"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    useEffect(()=>{
        fetch(process.env.NEXT_PUBLIC_API_URL+`topics/`+id)
        .then(response => response.json())
        .then(result => {
            setTitle(result.title);
            setBody(result.body);
        });
    }, []);
    return (
        <form onSubmit={(event)=>{
            event.preventDefault();
            const title = event.target.title.value;
            const body = event.target.body.value;
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body})
            } 
            fetch(process.env.NEXT_PUBLIC_API_URL + `topics/`+id, options)
                .then(response => response.json())
                .then(result => {
                    const lastid = result.id;
                    router.refresh();
                    router.push(`/read/${lastid}`);
                });
        }}>
            <p>
                <input type="text" name="title" placeholder="title" value={title} onChange={event=>setTitle(event.target.value)}/>
            </p>
            <p>
                <textarea name="body" placeholder="body" value={body} onChange={event=>setBody(event.target.value)}/>
            </p>
            <p>
                <input type="submit" value="update" />
            </p>
        </form>
    )
}