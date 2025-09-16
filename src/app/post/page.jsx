"use client";
import { useState } from "react";
import axios from "axios";

export default function PostPage() {
    const [loading, setLoading] = useState(false);
    const [addComment, setAddComment] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        body: ""
    });
    const [error, setError] = useState(false);

    const criarNovoComment = async () => {
        setLoading(true);

        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/comments", {
                name: form.name.trim(),
                email: form.email.trim(),
                body: form.body.trim()
            });
            setAddComment([response.data, ...addComment]);
            setForm({name: "", email: "", body: ""});
           
        } catch (error) {
                setError(true);
            console.error("❌ Erro ao criar comentários:", error);
           
        } finally {
            setLoading(false);
        }


    };

    const atualizarForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div>
            <h1>Criar Novo Comentário</h1>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={form.name}
                    onChange={atualizarForm}
                    required
                />
                <br />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={atualizarForm}
                    required
                />
                <br />
                <textarea
                    name="body"
                    placeholder="Comentário"
                    value={form.body}
                    onChange={atualizarForm}
                    raws="4"
                />
                <br />
                <button onClick={criarNovoComment} disabled={!form.name.trim() || loading}>
                    {loading ? "Carregando..." : "Criar Comentário"}
                </button>
            </div>
            {error && <p>❌ Erro ao criar comentário</p>}

            <h2>Comentários Adicionados</h2>
            <ul>
                {addComment.map((comment) => (
                    <li key={comment.id}>
                        <hr />
                        <p> {comment.name}</p>
                        <p> ({comment.email})</p>
                        <p> {comment.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
