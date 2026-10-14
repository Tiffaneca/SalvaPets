/* SalvaPets – funcionalidades gerais e de cada página (dados 100% locais/demonstrativos) */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const P={heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',bag:'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',truck:'<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="18.5" cy="18.5" r="2"/>',home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',search:'<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>',pin:'<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/>',lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',check:'<path d="M20 6L9 17l-5-5"/>',clip:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3h6v3H9zM9 12h6M9 16h6"/>',arrow:'<path d="M19 12H5M12 19l-7-7 7-7"/>',menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',ong:'<path d="M4 21V9l8-6 8 6v12"/><path d="M9 21v-8h6v8"/>'};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
const PAW='<svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="14" cy="30" rx="6" ry="8"/><ellipse cx="25" cy="16" rx="6" ry="9"/><ellipse cx="39" cy="16" rx="6" ry="9"/><ellipse cx="50" cy="30" rx="6" ry="8"/><path d="M32 30c-9 0-17 10-15 18 1 5 7 5 15 3 8 2 14 2 15-3 2-8-6-18-15-18z"/></svg>';
const HEART='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
const store={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const page=document.body.dataset.page;
function toast(m){let t=$("#toast");if(!t){t=document.createElement("div");t.id="toast";t.setAttribute("role","status");document.body.append(t)}t.textContent=m;t.hidden=false;clearTimeout(t.t);t.t=setTimeout(()=>t.hidden=true,5000)}
const validEmail=e=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
// Modal de formulário genérico. fields: [{id,label,type,req,opts,val}]
function modal(title,intro,fields,okLabel,onOk,note){
  const m=document.createElement("div");m.className="mask";const prev=document.activeElement;
  m.innerHTML=`<form class="mod" role="dialog" aria-modal="true" aria-labelledby="mt" novalidate><h2 id="mt">${esc(title)}</h2><p class="sub">${esc(intro||"")}</p>${fields.map(f=>`<div class="fld"><label for="f_${f.id}">${f.label}${f.req?" *":""}</label>${f.type=="textarea"?`<textarea id="f_${f.id}" rows="3"></textarea>`:f.type=="select"?`<select id="f_${f.id}">${f.opts.map(o=>`<option>${o}</option>`).join("")}</select>`:`<input id="f_${f.id}" type="${f.type||"text"}" value="${esc(f.val||"")}">`}<div class="err" id="e_${f.id}"></div></div>`).join("")}<p class="note">${esc(note||"")}</p><div class="row"><button type="button" class="btn out" data-x>Cancelar</button><button class="btn">${okLabel}</button></div></form>`;
  document.body.append(m);const close=()=>{m.remove();prev&&prev.focus&&prev.focus()};
  $("input,textarea,select",m)?.focus();
  m.onclick=e=>{if(e.target==m||e.target.dataset.x!=null)close()};m.onkeydown=e=>{if(e.key=="Escape")close()};
  $("form",m).onsubmit=e=>{e.preventDefault();const v={};let ok=true;
    fields.forEach(f=>{const x=$("#f_"+f.id,m).value.trim();v[f.id]=x;let er="";
      if(f.req&&!x)er="Campo obrigatório.";else if(f.type=="email"&&x&&!validEmail(x))er="Informe um e-mail válido.";
      $("#e_"+f.id,m).textContent=er;if(er)ok=false});
    if(ok){close();onOk(v)}};
}
// Cabeçalho, rodapé e menu
function layout(){
  const L=[["index.html","Início","home"],["animais.html","Animais","animais"],["index.html#ongs","ONGs",""],["index.html#como-funciona","Como Funciona",""],["#sobre","Sobre",""]].map(([h,t,k])=>`<a href="${h}" ${k&&page==k?'class="on" aria-current="page"':""}>${t}</a>`).join("");
  const right=page=="home"?`<a class="btn" href="login.html">Entrar</a>`:`<a class="rb" href="animais.html?fav=1" aria-label="Favoritos">${ic("heart")}</a><a class="rb" href="login.html" aria-label="Minha conta">${ic("user")}</a>`;
  if(page!="login")document.body.insertAdjacentHTML("afterbegin",`<header class="hd"><div class="c hd-in"><a class="logo" href="index.html"><span class="lg">${PAW}</span>Salva<b>Pets</b></a><nav id="nav" aria-label="Principal">${L}</nav><div class="hd-r">${right}<button class="rb burger" aria-label="Abrir menu" aria-expanded="false">${ic("menu")}</button></div></div></header>`);
  if(page!="login")document.body.insertAdjacentHTML("beforeend",`<footer id="sobre"><div class="c"><div><span class="logo">SalvaPets</span><p>Unindo patinhas a lares cheios de amor.</p></div><div class="fr">Taquara – RS<p>Projeto de Pesquisa · ETEC Monteiro Lobato · 2026</p></div></div></footer>`);
  const b=$(".burger"),n=$("#nav");if(!b)return;b.onclick=()=>b.setAttribute("aria-expanded",n.classList.toggle("open"));
  n.onclick=e=>{if(e.target.tagName=="A")n.classList.remove("open")};
}
const favs=()=>store.get("sp_fav",[]);
function toggleFav(id){let f=favs();f=f.includes(id)?f.filter(x=>x!=id):[...f,id];store.set("sp_fav",f);return f.includes(id)}
function card(a,i){return `<article class="card"><div class="ph ${i%2?"t1":""}">${PAW}<span class="tag">${a.especie}</span><button class="fav ${favs().includes(a.id)?"on":""}" data-id="${a.id}" aria-label="Favoritar ${esc(a.nome)}" aria-pressed="${favs().includes(a.id)}">${ic("heart")}</button></div><h3><a href="detalhes.html?id=${a.id}">${esc(a.nome)}</a></h3><p>${a.idade} • Porte ${a.porte.toLowerCase()}</p><span class="loc">${ic("pin")}${a.local}</span></article>`}
function bindFav(root,after){root.addEventListener("click",e=>{const b=e.target.closest(".fav");if(!b)return;const on=toggleFav(+b.dataset.id);b.classList.toggle("on",on);b.setAttribute("aria-pressed",on);toast(on?"Adicionado aos favoritos (salvo neste navegador).":"Removido dos favoritos.");after&&after()})}
const volunteer=()=>modal("Quero ser voluntário","Cadastre-se para receber pedidos de ONGs de Taquara.",[{id:"nome",label:"Nome",req:1},{id:"email",label:"E-mail",type:"email",req:1},{id:"tel",label:"Telefone / WhatsApp",req:1},{id:"tipo",label:"Como quer ajudar?",type:"select",opts:["Lar temporário","Transporte","Doações","Divulgação"]}],"Cadastrar",v=>{store.set("sp_voluntarios",[...store.get("sp_voluntarios",[]),v]);toast("Cadastro de voluntário salvo neste navegador (demonstração). Ainda não foi enviado a nenhuma ONG.")},"Demonstração: os dados ficam apenas neste navegador.");

const pages={
home(){
  $("#feat").innerHTML=ANIMAIS.slice(0,4).map(card).join("");bindFav($("#feat"));
  $$("[data-vol]").forEach(b=>b.onclick=volunteer);
},
login(){
  const f=$("#lf"),hash=async s=>[...new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)))].map(b=>b.toString(16).padStart(2,"0")).join("");
  let reg=false;
  const set=()=>{$("#ttl").textContent=reg?"Criar conta":"Bem-vindo!";$("#sb").textContent=reg?"Preencha seus dados":"Faça login para continuar";$("#nm").hidden=!reg;$("#go").textContent=reg?"Criar conta":"Entrar";$("#sw").textContent=reg?"Entrar":"Criar conta";$("#q").textContent=reg?"Já tem conta?":"Ainda não tem conta?";$("#fg").hidden=reg;$$(".err").forEach(e=>e.textContent="")};
  $("#sw").onclick=()=>{reg=!reg;set()};
  $("#eye").onclick=()=>{const p=$("#pw"),s=p.type=="password";p.type=s?"text":"password";$("#eye").setAttribute("aria-label",s?"Ocultar senha":"Mostrar senha")};
  $("#fg").onclick=()=>modal("Recuperar senha","Informe seu e-mail cadastrado.",[{id:"email",label:"E-mail",type:"email",req:1,val:$("#em").value}],"Enviar",v=>{const ex=store.get("sp_users",[]).some(u=>u.email==v.email.toLowerCase());toast(ex?"Demonstração: nenhum e-mail foi enviado de fato. Em um sistema real, você receberia o link de redefinição.":"Demonstração: não encontramos esse e-mail neste navegador. Crie uma conta primeiro.")},"Recurso demonstrativo, sem envio real de e-mail.");
  f.onsubmit=async e=>{e.preventDefault();const em=$("#em").value.trim().toLowerCase(),pw=$("#pw").value,nome=$("#nome").value.trim();let ok=true;
    const er=(id,t)=>{$("#e_"+id).textContent=t;if(t)ok=false};
    er("em",!em?"Informe seu e-mail.":!validEmail(em)?"E-mail inválido.":"");er("pw",!pw?"Informe sua senha.":reg&&pw.length<6?"A senha deve ter ao menos 6 caracteres.":"");if(reg)er("nome",nome?"":"Informe seu nome.");if(!ok)return;
    const us=store.get("sp_users",[]),h=await hash(pw);
    if(reg){if(us.some(u=>u.email==em))return er("em","Este e-mail já está cadastrado.");us.push({nome,email:em,h});store.set("sp_users",us);store.set("sp_user",{nome,email:em});toast("Conta criada (demonstração, salva só neste navegador). Redirecionando…");setTimeout(()=>location="animais.html",1800)}
    else{const u=us.find(u=>u.email==em&&u.h==h);if(!u)return er("pw","E-mail ou senha incorretos (ou conta não criada neste navegador).");store.set("sp_user",{nome:u.nome,email:em});toast("Login demonstrativo realizado. Redirecionando…");setTimeout(()=>location="animais.html",1500)}};
  set();
},
animais(){
  const S={esp:"",porte:"",idade:"",sexo:"",q:"",fav:new URLSearchParams(location.search).get("fav")=="1",p:1},PER=12,g=$("#grid");
  const age=m=>m<12?"Filhote":m<36?"Jovem":"Adulto";
  function draw(){
    const q=S.q.toLowerCase(),F=favs(),l=ANIMAIS.filter(a=>(!S.esp||a.especie==S.esp)&&(!S.porte||a.porte==S.porte)&&(!S.idade||age(a.meses)==S.idade)&&(!S.sexo||a.sexo==S.sexo)&&(!q||a.nome.toLowerCase().includes(q))&&(!S.fav||F.includes(a.id)));
    const n=Math.max(1,Math.ceil(l.length/PER));S.p=Math.min(S.p,n);
    const v=l.slice((S.p-1)*PER,S.p*PER);let h="";
    for(let i=0;i<v.length;i+=4)h+=`<div class="tray grid4">${v.slice(i,i+4).map((a,j)=>card(a,i+j)).join("")}</div>`;
    g.innerHTML=h||`<div class="empty"><h2>Nenhum animal encontrado</h2><p>${S.fav?"Você ainda não favoritou nenhum animal.":"Tente outros filtros ou outro nome."}</p><button class="btn" id="rs">Limpar filtros</button></div>`;
    $("#pg").innerHTML=l.length?`<button aria-label="Página anterior" data-p="${S.p-1}" ${S.p==1?"disabled":""}>‹</button>${Array.from({length:n},(_,i)=>`<button data-p="${i+1}" class="${i+1==S.p?"on":""}" ${i+1==S.p?'aria-current="page"':""}>${i+1}</button>`).join("")}<button aria-label="Próxima página" data-p="${S.p+1}" ${S.p==n?"disabled":""}>›</button>`:"";
    $$("[data-e]").forEach(b=>b.classList.toggle("on",b.dataset.e==S.esp));
    $("#clr").hidden=!(S.esp||S.porte||S.idade||S.sexo||S.q||S.fav);$("#info").textContent=S.fav?"Mostrando seus favoritos.":"";
  }
  const reset=()=>{Object.assign(S,{esp:"",porte:"",idade:"",sexo:"",q:"",fav:false,p:1});["porte","idade","sexo","q"].forEach(k=>$("#"+k).value="");draw()};
  $$("[data-e]").forEach(b=>b.onclick=()=>{S.esp=b.dataset.e;S.p=1;draw()});
  ["porte","idade","sexo"].forEach(k=>$("#"+k).onchange=e=>{S[k]=e.target.value;S.p=1;draw()});
  $("#q").oninput=e=>{S.q=e.target.value.trim();S.p=1;draw()};$("#clr").onclick=reset;
  $("#pg").onclick=e=>{const b=e.target.closest("[data-p]");if(b&&!b.disabled){S.p=+b.dataset.p;draw();scrollTo({top:0,behavior:"smooth"})}};
  g.onclick=e=>{if(e.target.id=="rs")reset()};bindFav(g,()=>S.fav&&draw());draw();
},
detalhes(){
  const a=ANIMAIS.find(x=>x.id==new URLSearchParams(location.search).get("id"));
  if(!a){$("#d").innerHTML=`<div class="empty" style="grid-column:1/-1"><h2>Animal não encontrado</h2><p>O animal que você procura não existe ou foi removido.</p><a class="btn" href="animais.html">Ver todos os animais</a></div>`;$("#rec").hidden=true;return}
  document.title=a.nome+" – SalvaPets";
  $("#d").innerHTML=`<div class="ph">${PAW}<span class="tag" style="font-size:12px;padding:6px 14px">${a.especie}</span></div><div><h1>${esc(a.nome)}</h1><span class="disp">${ic("check")}Disponível</span><div class="tbl"><div>Idade<b>${a.idade}</b></div><div>Porte<b>${a.porte}</b></div><div>Sexo<b>${a.sexo}</b></div><div>Localização<b>${a.local}</b></div></div><h2>Sobre ${esc(a.nome)}</h2><p class="d">${esc(a.desc)}</p>${a.vac?`<span class="bd">${ic("check")}Vacinado</span>`:""}${a.cast?`<span class="bd">${ic("check")}Castrado</span>`:""}${a.verm?`<span class="bd">${ic("check")}Vermifugado</span>`:""}<div class="int"><h2>Tenho interesse!</h2><p>Preencha o formulário e, em seguida, entramos em contato.</p><button class="btn wh" id="ad">Quero adotá-lo</button><small>${ic("ong")}ONG responsável: ${a.ong}</small></div></div>`;
  $("#ad").onclick=()=>modal("Quero adotar "+a.nome,"Preencha seus dados para registrar o interesse.",[{id:"nome",label:"Nome completo",req:1},{id:"email",label:"E-mail",type:"email",req:1},{id:"tel",label:"Telefone / WhatsApp",req:1},{id:"msg",label:"Conte um pouco sobre você e sua casa",type:"textarea"}],"Registrar interesse",v=>{store.set("sp_interesses",[...store.get("sp_interesses",[]),{...v,animal:a.nome,data:new Date().toISOString()}]);toast("Interesse registrado neste navegador (demonstração). Nenhuma mensagem foi enviada à ONG.")},"Demonstração: não há servidor, então a ONG não recebe este pedido.");
  $("#recg").innerHTML=ANIMAIS.filter(x=>x.id!=a.id).slice(0,4).map(card).join("");bindFav($("#recg"));
},
ajudar(){
  $("#ops").innerHTML=OPORTUNIDADES.map((o,i)=>`<button class="op" data-i="${i}"><div class="ph ${i%2?"t1":""}">${ic(o.i)}</div><h3>${o.t}</h3><span>${ic("pin")}${o.l}</span><b>${o.d}</b></button>`).join("");
  $("#items").innerHTML=ITENS.map(t=>`<button class="item" data-t="${t}">${PAW}${t}</button>`).join("");
  const interest=(t,extra)=>modal(t,"Informe seus dados para demonstrar interesse.",[{id:"nome",label:"Nome",req:1},{id:"email",label:"E-mail",type:"email",req:1},...(extra||[])],"Enviar interesse",v=>{store.set("sp_ajuda",[...store.get("sp_ajuda",[]),{...v,acao:t}]);toast("Interesse salvo neste navegador (demonstração). A organização ainda não foi avisada.")},"Demonstração: os dados não são enviados a nenhum servidor.");
  $("#ops").onclick=e=>{const b=e.target.closest(".op");if(b){const o=OPORTUNIDADES[b.dataset.i];interest(o.t+" – "+o.l)}};
  $("#items").onclick=e=>{const b=e.target.closest(".item");if(b)interest("Doar: "+b.dataset.t,[{id:"qtd",label:"Quantidade aproximada",req:1}])};
  $("#doar").onclick=()=>interest("Doar ração",[{id:"tipo",label:"Tipo",type:"select",opts:ITENS},{id:"qtd",label:"Quantidade aproximada",req:1}]);
  $("#vol").onclick=volunteer;
  $("#div").onclick=async()=>{const d={title:"SalvaPets",text:"Ajude a manter nossos peludinhos bem alimentados!",url:location.href};try{if(navigator.share)await navigator.share(d);else{await navigator.clipboard.writeText(location.href);toast("Link da campanha copiado! Compartilhe com amigos e familiares.")}}catch{toast("Copie o endereço da página para compartilhar a campanha.")}};
}};
layout();pages[page]&&pages[page]();
$$("[data-paw]").forEach(e=>e.innerHTML=PAW);$$("[data-ic]").forEach(e=>e.innerHTML=ic(e.dataset.ic));$$("[data-heart]").forEach(e=>e.innerHTML=HEART);
