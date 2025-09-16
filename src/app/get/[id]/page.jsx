"use client";
    import { useState, useEffect } from "react";
    import { useParams } from "next/navigation";    
    import axios from "axios";

    export default function GetByIdPage() {
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState([]);
    const [error, setError] = useState(false);

    const params = useParams();
    const commentId = params.id;

    const buscarComentario = async (id) => {
        setLoading(true);

        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`);
            setComment(response.data);
        } catch (error) {
            setError(true);
            console.error("❌ Erro ao buscar comentário:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarComentario();
    }, [commentId]);

    if (loading)  return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar o comentário.</div>;
    if (!comment) return <div>Nenhum comentário encontrado.</div>;
        

    return (
        <div>
        <h1>Comentário #{commentId.id}</h1>
        <hr  />
        <p>Nome: {commentId.name}</p>
        <p>Email: {commentId.email}</p>
        <p>Comentário: {commentId.body}</p>

        </div>
    )
}
