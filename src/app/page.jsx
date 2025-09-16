import Link from "next/link";

export default function Home() {
    return(
    <div>
        <h1>CRUD Completo</h1>
        <nav>
        <Link href="/get">GET</Link>
        <Link href="/post">POST</Link>
        <Link href="/put">PUT</Link>
        <Link href="/delete">DELETE</Link>
        </nav>
    </div>
    );
}