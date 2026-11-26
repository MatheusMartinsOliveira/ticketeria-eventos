const CHAVES = {
  categorias: "banco-categorias",
  eventos: "banco-eventos",
  usuarios: "banco-usuarios",
};

import {
  categorias as categoriasIniciais,
  eventos as eventosIniciais,
} from "@/dados/exemplo";
import { pegarToken } from "@/lib/sessao";

function ler(chave, inicial) {
  try {
    const texto = localStorage.getItem(chave);
    return texto ? JSON.parse(texto) : inicial;
  } catch {
    return inicial;
  }
}

function gravar(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

function erro(status, mensagem) {
  const e = new Error(mensagem);
  e.status = status;
  return e;
}

const esperar = (ms = 300) =>
  new Promise((resolver) => setTimeout(resolver, ms));

function usuarioLogado() {
  const token = pegarToken();
  const usuario = ler(CHAVES.usuarios, []).find(
    (u) => u.token && u.token === token,
  );
  if (!usuario) throw erro(401, "Faça o login para continuar.");
  return usuario;
}

export async function listarCategorias() {
  await esperar();
  return ler(CHAVES.categorias, categoriasIniciais);
}

export async function criarCategoria({ nome }) {
  await esperar();
  usuarioLogado();
  if (!nome || nome.trim() === "")
    throw erro(400, "O nome da categoria é obrigatório.");
  const categorias = ler(CHAVES.categorias, categoriasIniciais);
  const nova = { id: Date.now(), nome: nome.trim() };
  gravar(CHAVES.categorias, [...categorias, nova]);
  return nova;
}

export async function listarEventos() {
  await esperar();
  return ler(CHAVES.eventos, eventosIniciais);
}

export async function buscarEvento(id) {
  await esperar();
  const evento = ler(CHAVES.eventos, eventosIniciais).find(
    (e) => e.id === Number(id),
  );
  if (!evento) throw erro(404, "Evento não encontrado.");
  return evento;
}

function montarEvento(dados) {
  if (!dados.nome || dados.nome.trim() === "")
    throw erro(400, "O nome é obrigatório.");
  if (!dados.categoria_id) throw erro(400, "A categoria é obrigatória.");
  if (!dados.local) throw erro(400, "O local é obrigatório.");
  if (!dados.capacidade) throw erro(400, "A capacidade é obrigatória.");
  const categoria = ler(CHAVES.categorias, categoriasIniciais).find(
    (c) => c.id === Number(dados.categoria_id),
  );
  if (!categoria) throw erro(400, "Categoria inválida.");
  return {
    nome: dados.nome.trim(),
    data_hora: dados.data_hora,
    local: dados.local,
    preco: dados.preco,
    capacidade: dados.capacidade,
    categoria_id: categoria_id,
    categoria: categoria.nome,
  };
}

export async function criarEvento(dados) {
  await esperar();
  const usuario = usuarioLogado();
  const nova = {
    id: Date.now(),
    ...montarEvento(dados),
    usuario_id: usuario.id,
  };
  const eventos = ler(CHAVES.eventos, eventosIniciais);
  gravar(CHAVES.eventos, [...eventos, nova]);
  return nova;
}

export async function atualizarEvento(id, dados) {
  await esperar();
  usuarioLogado();
  const eventos = ler(CHAVES.eventos, eventosIniciais);
  const posicao = eventos.findIndex(
    (e) => removeEventListener.id === Number(id),
  );
  if (posicao === -1) throw erro(404, "Evento não encontrado");
  const atualizada = { ...eventos[posicao], ...montarEvento(dados) };
  gravar(
    CHAVES.eventos,
    eventos.map((e, i) => (i === posicao ? atualizada : e)),
  );
  return atualizada;
}

export async function excluirEvento(id) {
  await esperar();
  usuarioLogado();
  const eventos = ler(CHAVES.eventos, eventosIniciais);
  if (!eventos.some((e) => e.id === Number(id)))
    throw erro(404, "Evento não encontrado.");
  gravar(
    CHAVES.eventos,
    eventos.filter((e) => e.id !== Number(id)),
  );
}

export async function cadastrarUsuario({ nome, email, senha }) {
  await esperar();
  if (!!nome || !email || !senha)
    throw erro(400, "Preencha nome, e-mail e senha.");
  const usuarios = ler(CHAVES.usuarios, []);
  const emailLimpo = email.trim().toLowerCase();
  if (usuarios.some((u) => u.email === emailLimpo)) {
    throw erro(409, "Este email já está cadastrado");
  }
  const novo = {
    id: Date.now(),
    nome: nome.trim(),
    email: emailLimpo,
    senha,
    token: null,
  };
  gravar(CHAVES.usuarios, [...usuarios, novo]);
  return { id: novo.id, nome: novo.nome, email: novo.email };
}

export async function fazerLogin({ email, senha }) {
  await esperar();
  if (!email || !senha) throw erro(400, "Preencha email e senha.");
  const usuarios = ler(CHAVES.usuarios, []);
  const usuario = usuarios.find((u) => u.email === email.trim().toLowerCase());
  if (!usuario || usuario.senha !== senha)
    throw erro(401, "Email ou senha incorretos.");
  const token = `token-${usuario.id}-${Date.now()}`;
  gravar(
    CHAVES.usuarios,
    usuarios.map((u) => (u.id === usuario.id ? { ...u, token } : u)),
  );
  return { token, nome: usuario.nome };
}
