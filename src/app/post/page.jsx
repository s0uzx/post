"use client";
import { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function Edit(){
  const [ commentID, setCommentID ] = useState("");
  const [ form, setForm ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ success, setSuccess ] = useState(false);

  const buscarComentario = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentID}`);
      setForm({name: data.name, email: data.email, body: data.body});
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const editarComentario = async () => {
    setLoading(true);
    try {
        await axios.put(`https://jsonplaceholder.typicode.com/comments/${commentID}`, form);
        setSuccess(true);
    } catch (error) {
        setError(true);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Comentário</h1>

    <div className={styles.inputGroup}>
      <input
      type="number"
      value={commentID}
      onChange={(e) => setCommentID(e.target.value)}
      placeholder="ID do comentário"
      />
      <button onClick={buscarComentario} disabled={loading}>
        {loading ? "Carregando..." : "Buscar Comentário"}
      </button>
    </div>

    {form.name && (
      <div className={styles.form}>
        <h2 className={styles.subtitle}>Editar Detalhes do Comentário</h2>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          placeholder="Digita o seu nome aqui fih"
          className={styles.input}
          />
        <br />
      <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          placeholder="Coloca o seu email aqui, zé!"
          className={styles.input}
          />
      <br />
      <textarea
          value={form.body}
          onChange={(e) => setForm({...form, body: e.target.value})}
          placeholder="Escreve o seu comentário aqui, moço!"
          rows="3"
          />
      <br />
      <button onClick={editarComentario} disabled={loading || !form.name?.trim()} className={styles.button}>
        {loading ? "Carregando..." : "Salvar Alterações"}
      </button>
      </div>
     )}    

    {error && <p className={styles.error} style={{color: "red"}}>Deu um probleminha aqui. Tenta de novo aí, rapaz.</p>}
    {success && <p  className={styles.success} style={{color: "green"}}>Comentário atualizado com sucesso, sô!</p>}
  </div>

  )
}
