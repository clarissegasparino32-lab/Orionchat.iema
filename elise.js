
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";



/* ==============================
   LOGIN
============================== */

const usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");
const entrar = document.getElementById("entrar");
const mensagem = document.getElementById("mensagem");
const chats = document.getElementById("chats");

const usuarioCorreto = "Elise.Smith";
const senhaCorreta = "053517052328";

entrar.addEventListener("click", function () {

    const nomeDigitado = usuario.value;
    const senhaDigitada = senha.value;

    if (
        nomeDigitado === usuarioCorreto &&
        senhaDigitada === senhaCorreta
    ) {

        document.querySelector(".login").style.display = "none";
        chats.style.display = "block";
        mensagem.textContent = "";

    } else {

        mensagem.textContent = "Usuário ou senha incorretos.";

    }

});




/* ==============================
   FIREBASE
============================== */

const firebaseConfig = {
    apiKey: "AIzaSyDU2--r4T9UcLnLnAQVdu2JZx2B7Q4uLMLOc",
    authDomain: "elisa-5bcbf.firebaseapp.com",
    projectId: "elisa-5bcbf",
    storageBucket: "elisa-5bcbf.firebasestorage.app",
    messagingSenderId: "520491436148",
    appId: "1:520491436148:web:988d6587375e7c486ee921"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);




/* ==============================
   CONTATOS
============================== */

const nick = document.getElementById("nick");
const sophie = document.getElementById("sophie");
const madison = document.getElementById("madison");
const chloe = document.getElementById("chloe");
const ethan = document.getElementById("ethan");


/* ==============================
   CONVERSAS
============================== */

const conversaNick =
    document.getElementById("conversaNick");

const conversaSophie =
    document.getElementById("conversaSophie");

const conversaMadison =
    document.getElementById("conversaMadison");

const conversaChloe =
    document.getElementById("conversaChloe");

const conversaEthan =
    document.getElementById("conversaEthan");


/* ==============================
   CONTROLE DAS CONVERSAS
============================== */

let conversaAberta = null;


const ultimaMensagemVista = {
    mensagensNick: 0,
    mensagensSophie: 0,
    mensagensMadison: 0,
    mensagensChloe: 0,
    mensagensEthan: 0
};


let firebaseInicializado = false;


/* ==============================
   MAPA DOS CONTATOS
============================== */

const contatos = {

    mensagensNick: nick,

    mensagensSophie: sophie,

    mensagensMadison: madison,

    mensagensChloe: chloe,

    mensagensEthan: ethan

};


/* ==============================
   ABRIR CONVERSA
============================== */

function abrirConversa(
    contato,
    conversa,
    mensagensId
) {

    /*
       ESCONDE A LISTA DE CONTATOS
    */

    chats.style.display = "none";


    /*
       ESCONDE TODAS AS CONVERSAS
       ANTES DE ABRIR A ESCOLHIDA
    */

    conversaNick.style.display = "none";

    conversaSophie.style.display = "none";

    conversaMadison.style.display = "none";

    conversaChloe.style.display = "none";

    conversaEthan.style.display = "none";


    /*
       MOSTRA SOMENTE A CONVERSA CLICADA
    */

    conversa.style.display = "block";


    /*
       GUARDA A CONVERSA ABERTA
    */

    conversaAberta = mensagensId;


    /*
       REMOVE A BOLINHA DE NOTIFICAÇÃO
    */

    const notificacao =
        contato.querySelector(".notificacao");

    if (notificacao) {

        notificacao.remove();

    }


    /*
       MARCA AS MENSAGENS COMO VISTAS
    */

    marcarComoVista(mensagensId);

}


/* ==============================
   NICK
============================== */

nick.addEventListener("click", function () {

    abrirConversa(
        nick,
        conversaNick,
        "mensagensNick"
    );

});


/* ==============================
   SOPHIE
============================== */

sophie.addEventListener("click", function () {

    abrirConversa(
        sophie,
        conversaSophie,
        "mensagensSophie"
    );

});


/* ==============================
   MADISON
============================== */

madison.addEventListener("click", function () {

    abrirConversa(
        madison,
        conversaMadison,
        "mensagensMadison"
    );

});


/* ==============================
   CHLOE
============================== */

chloe.addEventListener("click", function () {

    abrirConversa(
        chloe,
        conversaChloe,
        "mensagensChloe"
    );

});


/* ==============================
   ETHAN
============================== */

ethan.addEventListener("click", function () {

    abrirConversa(
        ethan,
        conversaEthan,
        "mensagensEthan"
    );

});


/* ==============================
   BOTÕES VOLTAR
============================== */

document
    .getElementById("voltarNick")
    .addEventListener("click", function () {

        conversaNick.style.display = "none";

        chats.style.display = "block";

        conversaAberta = null;

    });


document
    .getElementById("voltarSophie")
    .addEventListener("click", function () {

        conversaSophie.style.display = "none";

        chats.style.display = "block";

        conversaAberta = null;

    });


document
    .getElementById("voltarMadison")
    .addEventListener("click", function () {

        conversaMadison.style.display = "none";

        chats.style.display = "block";

        conversaAberta = null;

    });


document
    .getElementById("voltarChloe")
    .addEventListener("click", function () {

        conversaChloe.style.display = "none";

        chats.style.display = "block";

        conversaAberta = null;

    });


document
    .getElementById("voltarEthan")
    .addEventListener("click", function () {

        conversaEthan.style.display = "none";

        chats.style.display = "block";

        conversaAberta = null;

    });


/* ==============================
   ENVIAR MENSAGEM
============================== */

function enviarMensagem(
    inputId,
    mensagensId
) {

    /*
       ETHAN CONTINUA BLOQUEADO
    */

    if (mensagensId === "mensagensEthan") {

        alert(
            "🔒 Ethan está bloqueado. Não é possível enviar mensagens."
        );

        return;

    }


    const input =
        document.getElementById(inputId);

    const texto =
        input.value.trim();


    if (texto === "") {

        return;

    }


    input.value = "";


    const mensagemRef =
        push(ref(db, "mensagens"));


    set(mensagemRef, {

        para: mensagensId,

        remetente: "Elise",

        texto: texto,

        data: Date.now()

    });

}


/* ==============================
   BOTÕES ENVIAR
============================== */

document
    .getElementById("enviarNick")
    .addEventListener("click", function () {

        enviarMensagem(
            "textoNick",
            "mensagensNick"
        );

    });


document
    .getElementById("enviarSophie")
    .addEventListener("click", function () {

        enviarMensagem(
            "textoSophie",
            "mensagensSophie"
        );

    });


document
    .getElementById("enviarMadison")
    .addEventListener("click", function () {

        enviarMensagem(
            "textoMadison",
            "mensagensMadison"
        );

    });


document
    .getElementById("enviarChloe")
    .addEventListener("click", function () {

        enviarMensagem(
            "textoChloe",
            "mensagensChloe"
        );

    });


document
    .getElementById("enviarEthan")
    .addEventListener("click", function () {

        enviarMensagem(
            "textoEthan",
            "mensagensEthan"
        );

    });


/* ==============================
   MARCAR COMO VISTA
============================== */

function marcarComoVista(mensagensId) {

    const mensagens =
        document.getElementById(mensagensId);


    if (!mensagens) {

        return;

    }


    const mensagensFirebase =
        mensagens.querySelectorAll(
            ".mensagem-firebase"
        );


    let maiorData = 0;


    mensagensFirebase.forEach(
        function (elemento) {

            const data =
                Number(
                    elemento.dataset.data
                );


            if (data > maiorData) {

                maiorData = data;

            }

        }
    );


    if (
        maiorData >
        ultimaMensagemVista[mensagensId]
    ) {

        ultimaMensagemVista[mensagensId] =
            maiorData;

    }


    const contato =
        contatos[mensagensId];


    if (contato) {

        const notificacao =
            contato.querySelector(
                ".notificacao"
            );


        if (notificacao) {

            notificacao.remove();

        }

    }

}


/* ==============================
   CARREGAR TODAS AS MENSAGENS
============================== */

const mensagensRef =
    ref(db, "mensagens");


onValue(
    mensagensRef,
    function (snapshot) {

        const dados =
            snapshot.val();


        if (!dados) {

            return;

        }


        const conversas = {

            mensagensNick: [],

            mensagensSophie: [],

            mensagensMadison: [],

            mensagensChloe: [],

            mensagensEthan: []

        };


        Object.values(dados).forEach(
            function (mensagem) {

                if (
                    conversas[mensagem.para]
                ) {

                    conversas[mensagem.para]
                        .push(mensagem);

                }

            }
        );


        /* ==============================
           PRIMEIRA LEITURA
        ============================== */

        if (!firebaseInicializado) {

            Object.keys(conversas).forEach(
                function (mensagensId) {

                    let maiorData = 0;


                    conversas[mensagensId]
                        .forEach(
                            function (mensagem) {

                                if (
                                    mensagem.remetente !== "Elise" &&
                                    mensagem.data > maiorData
                                ) {

                                    maiorData =
                                        mensagem.data;

                                }

                            }
                        );


                    ultimaMensagemVista[mensagensId] =
                        maiorData;

                }
            );


            firebaseInicializado = true;

        }


        /* ==============================
           ATUALIZAR CONVERSAS
        ============================== */

        Object.keys(conversas).forEach(
            function (mensagensId) {

                const mensagens =
                    document.getElementById(
                        mensagensId
                    );


                if (!mensagens) {

                    return;

                }


                mensagens
                    .querySelectorAll(
                        ".mensagem-firebase"
                    )
                    .forEach(
                        function (elemento) {

                            elemento.remove();

                        }
                    );


                let maiorMensagemRecebida = 0;


                conversas[mensagensId]
                    .forEach(
                        function (mensagem) {

                            const novaMensagem =
                                document.createElement("p");


                            novaMensagem.dataset.data =
                                mensagem.data;


                            novaMensagem.classList.add(
                                "mensagem-firebase"
                            );


                            if (
                                mensagem.remetente === "Elise"
                            ) {

                                novaMensagem.classList.add(
                                    "mensagem-enviada"
                                );

                            } else {

                                novaMensagem.classList.add(
                                    "mensagem-recebida"
                                );

                            }


                            novaMensagem.innerHTML =
                                "<strong>" +
                                mensagem.remetente +
                                ":</strong> " +
                                mensagem.texto;


                            mensagens.appendChild(
                                novaMensagem
                            );


                            if (
                                mensagem.remetente !== "Elise" &&
                                mensagem.data >
                                maiorMensagemRecebida
                            ) {

                                maiorMensagemRecebida =
                                    mensagem.data;

                            }

                        }
                    );


                /* ==============================
                   NOVA MENSAGEM
                ============================== */

                if (
                    maiorMensagemRecebida >
                    ultimaMensagemVista[mensagensId]
                ) {

                    if (
                        conversaAberta === mensagensId
                    ) {

                        ultimaMensagemVista[mensagensId] =
                            maiorMensagemRecebida;

                    } else {

                        mostrarNotificacao(
                            contatos[mensagensId]
                        );


                        colocarNoTopo(
                            contatos[mensagensId]
                        );

                    }

                }


                mensagens.scrollTop =
                    mensagens.scrollHeight;

            }
        );

    }
);


/* ==============================
   NOTIFICAÇÃO
============================== */

function mostrarNotificacao(contato) {

    if (!contato) {

        return;

    }


    let bolinha =
        contato.querySelector(
            ".notificacao"
        );


    if (!bolinha) {

        bolinha =
            document.createElement("span");


        bolinha.className =
            "notificacao";


        contato.appendChild(
            bolinha
        );

    }

}


/* ==============================
   COLOCAR NO TOPO
============================== */

function colocarNoTopo(contato) {

    if (!contato) {

        return;

    }


    const lista =
        document.getElementById("chats");


    if (!lista) {

        return;

    }


    if (
        contato !== lista.children[1]
    ) {

        lista.insertBefore(
            contato,
            lista.children[1]
        );

    }

}