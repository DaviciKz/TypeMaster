'use strict';
// ═══════════════════════════════════════════════════
//  DATA: WORD BANK + QUOTES
// ═══════════════════════════════════════════════════
const LEVELS = {
  1:{label:'Pemula',words:["aku","kau","dia","ada","itu","ini","dan","atau","tapi","mau","ya","bu","pak","mas","kak","nah","nih","bisa","saja","dua","tiga","lima","enam","buku","meja","kursi","pintu","air","api","batu","kayu","kaki","mata","gigi","anak","kakak","adik","teman","guru","makan","minum","tidur","jalan","lari","baca","tulis","main","kerja","beli","satu","pagi","siang","sore","malam","hari","bulan","baik","baru","sama","beda","naik","coba","rasa","suara"]},
  2:{label:'Dasar',words:["makan","minum","tidur","bangun","jalan","kerja","belajar","bermain","berlari","membaca","rumah","sekolah","kantor","pasar","taman","dapur","kamar","lantai","dinding","jendela","buku","pensil","pulpen","kertas","sepatu","baju","celana","topi","kacamata","dompet","nasi","roti","susu","kopi","teh","buah","sayur","daging","ikan","ayam","merah","biru","hijau","kuning","hitam","putih","coklat","ungu","oranye","abu","besar","kecil","tinggi","pendek","panjang","cepat","lambat","berat","ringan","senang","sedih","marah","takut","heran"]},
  3:{label:'Menengah',words:["belajar","bermain","bekerja","berlari","berjalan","berkata","melihat","mendengar","mencoba","sekolah","keluarga","pekerjaan","perjalanan","kehidupan","pengetahuan","kesempatan","kebahagiaan","komputer","internet","telepon","kamera","printer","monitor","keyboard","speaker","baterai","Indonesia","Jakarta","Surabaya","Bandung","Medan","Semarang","Makassar","Yogyakarta","Palembang","makanan","minuman","pakaian","kendaraan","peralatan","kebutuhan","kesehatan","pendidikan","menulis","membaca","menghitung","melukis","memasak","membangun","merancang","mengajar"]},
  4:{label:'Mahir',words:["bertanggung jawab","memperhatikan","mengembangkan","meningkatkan","mempertimbangkan","melaksanakan","menyelesaikan","mendapatkan","membutuhkan","menggunakan","perkembangan","pembangunan","peningkatan","pengembangan","pertumbuhan","perubahan","pengelolaan","internasional","nasional","tradisional","modern","kontemporer","inovatif","profesional","infrastruktur","telekomunikasi","transportasi","administrasi","organisasi","koordinasi","bekerja keras","belajar sungguh","tidak menyerah","terus berusaha","pantang mundur"]},
  5:{label:'Master',words:["belajar dengan sungguh sungguh","bekerja keras setiap hari","jangan pernah menyerah pada mimpi","hidup adalah perjuangan yang indah","ilmu pengetahuan adalah cahaya kehidupan","keluarga adalah harta paling berharga","waktu tidak bisa diputar kembali","setiap langkah kecil membawa perubahan","konsistensi adalah kunci kesuksesan","teknologi mengubah cara kita bekerja","pendidikan membuka pintu kesempatan","Indonesia adalah negara kepulauan terbesar","bahasa Indonesia menyatukan bangsa","gotong royong adalah jiwa bangsa Indonesia","membaca buku memperluas wawasan kita","menghadapi tantangan dengan penuh keberanian","belajar dari kesalahan adalah hal bijaksana"]}
};

const QUOTES = [
  "Bukan seberapa keras kamu jatuh yang penting, melainkan seberapa cepat kamu bangkit.",
  "Kesuksesan bukan milik orang yang pintar, melainkan milik orang yang tidak pernah menyerah.",
  "Setiap hari adalah kesempatan baru untuk menjadi lebih baik dari hari sebelumnya.",
  "Jangan takut gagal, karena kegagalan adalah guru terbaik dalam hidupmu.",
  "Mimpi tidak akan berhasil kecuali kamu bangun dan bekerja keras untuk mewujudkannya.",
  "Kekuatan terbesar manusia bukan pada otaknya, melainkan pada tekadnya yang tidak pernah padam.",
  "Satu langkah kecil hari ini lebih berarti dari seribu rencana yang tidak pernah dilaksanakan.",
  "Ilmu yang bermanfaat adalah yang diamalkan, bukan hanya yang dihafalkan.",
  "Orang yang sukses adalah orang yang bisa mengubah hambatan menjadi batu loncatan.",
  "Jadilah seperti padi, semakin berisi semakin merunduk dan semakin bermanfaat bagi sesama.",
  "Dalam setiap kesulitan pasti terdapat kemudahan yang menunggu untuk ditemukan.",
  "Berani mencoba adalah setengah dari keberhasilan yang sedang kamu kejar.",
  "Waktu adalah aset paling berharga, gunakanlah dengan bijak dan penuh makna.",
  "Karakter seseorang bukan ditentukan oleh nasib, melainkan oleh pilihan yang ia buat setiap hari.",
  "Keberhasilan sejati bukan hanya tentang apa yang kamu capai, tapi siapa yang kamu jadikan inspirasi."
];

const XP_RANKS=[
  {min:0,   max:100,  rank:'Pemula'},
  {min:100, max:300,  rank:'Pelajar'},
  {min:300, max:600,  rank:'Terampil'},
  {min:600, max:1000, rank:'Mahir'},
  {min:1000,max:1500, rank:'Ahli'},
  {min:1500,max:2200, rank:'Pakar'},
  {min:2200,max:3000, rank:'Master'},
  {min:3000,max:9999, rank:'Legenda'}
];

const KB_ROWS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m']
];

// ═══════════════════════════════════════════════════
//  DOM REFS
// ═══════════════════════════════════════════════════
const $ = id => document.getElementById(id);
const wordArea=$('word-area'), typingInput=$('typing-input');
const wpmDisplay=$('wpm-display'), accDisplay=$('acc-display');
const correctDisplay=$('correct-display'), wrongDisplay=$('wrong-display');
const liveDisplay=$('live-display'), liveUnit=$('live-unit');
const pbBadge=$('pb-badge'), pbText=$('pb-text');
const capslockWarn=$('capslock-warn');
const levelupToast=$('levelup-toast'), levelupText=$('levelup-text');
const pbToast=$('pb-toast');
const confettiCanvas=$('confetti-canvas');
const targetInput=$('target-input'), soundBtn=$('sound-btn');
const targetWrap=$('target-progress-wrap');
const targetFill=$('target-progress-fill'), targetLabel=$('target-progress-label');
const liveGraphCanvas=$('live-graph');
const historyTbody=$('history-tbody'), historyEmpty=$('history-empty');
const historyClearBtn=$('history-clear-btn');
const resultOverlay=$('result-overlay');
const resultWpm=$('result-wpm'), resultAcc=$('result-acc');
const resultCorrect=$('result-correct'), resultWrong=$('result-wrong');
const resultTime=$('result-time'), resultConsist=$('result-consistency');
const resultLvlBadge=$('result-level-badge'), resultModeBadge=$('result-mode-badge');
const resultPbFlag=$('result-pb-flag');
const wpmChart=$('wpm-chart');
const weakKeysList=$('weak-keys-list'), kbHeatmap=$('keyboard-heatmap');
const xpGainedText=$('xp-gained-text'), resultXpFill=$('result-xp-bar-fill');
const xpBarFill=$('xp-bar-fill'), xpVal=$('xp-val'), xpRank=$('xp-rank');
const streakCount=$('streak-count');
const restartBtn=$('restart-btn'), exportBtn=$('export-btn');
const drillHint=$('drill-hint'), drillOpts=$('drill-options');

// ═══════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════
const POOL=80;
let currentLevel=1, gameMode='timer', modeValue=15;
let drillChars=[];
let words=[], wordEls=[], letterEls=[];
let currentWordIdx=0, currentLetterIdx=0;
let gameStarted=false, gameEnded=false;
let timeLeft=15, timerInterval=null;
let elapsedSeconds=0, stopwatchInterval=null;
let correctChars=0, wrongChars=0, totalTyped=0, correctWords=0, wrongWords=0;
let wpmHistory=[], liveKpmHistory=[];
let charStats={};
let soundEnabled=true;
let currentQuote='';
let quoteLetters=[];

// Audio context for sound effects
let audioCtx=null;
function getAudioCtx(){
  if(!audioCtx) audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  return audioCtx;
}
function playBeep(freq,dur,vol,type='sine'){
  if(!soundEnabled) return;
  try{
    const ctx=getAudioCtx();
    const o=ctx.createOscillator(), g=ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value=freq; o.type=type;
    g.gain.setValueAtTime(vol,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+dur);
    o.start(); o.stop(ctx.currentTime+dur);
  }catch(e){}
}
function playSoundCorrect(){ playBeep(880,.06,.08); }
function playSoundWrong()  { playBeep(180,.1,.12,'sawtooth'); }
function playSoundPB()     { playBeep(1046,.08,.1); setTimeout(()=>playBeep(1318,.08,.1),80); setTimeout(()=>playBeep(1568,.12,.1),160); }

// ═══════════════════════════════════════════════════
//  LOCALSTORAGE
// ═══════════════════════════════════════════════════
function loadStorage(){
  return JSON.parse(localStorage.getItem('typemaster_v2')||'null')||
    {xp:0,streak:0,lastDate:'',pb:{},charStats:{},history:[],theme:'amber',sound:true,target:0};
}
function saveStorage(d){ localStorage.setItem('typemaster_v2',JSON.stringify(d)); }
let storage=loadStorage();

// Streak
function updateStreak(){
  const today=new Date().toDateString();
  if(storage.lastDate===today) return;
  const yesterday=new Date(Date.now()-86400000).toDateString();
  storage.streak=(storage.lastDate===yesterday)?(storage.streak||0)+1:1;
  storage.lastDate=today;
  saveStorage(storage);
  streakCount.textContent=storage.streak;
}
function initStreak(){ streakCount.textContent=storage.streak||0; }

// ═══════════════════════════════════════════════════
//  THEME
// ═══════════════════════════════════════════════════
function applyTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  document.querySelectorAll('.theme-btn').forEach(b=>b.classList.toggle('active',b.dataset.theme===t));
  storage.theme=t; saveStorage(storage);
}
document.querySelectorAll('.theme-btn').forEach(btn=>{
  btn.addEventListener('click',()=>applyTheme(btn.dataset.theme));
});

// ═══════════════════════════════════════════════════
//  XP
// ═══════════════════════════════════════════════════
function getCurrentRank(xp){
  for(let i=XP_RANKS.length-1;i>=0;i--) if(xp>=XP_RANKS[i].min) return XP_RANKS[i];
  return XP_RANKS[0];
}
function renderXpBar(xp,animate){
  const r=getCurrentRank(xp), range=r.max-r.min;
  const pct=Math.min(((xp-r.min)/range)*100,100);
  xpRank.textContent=r.rank; xpVal.textContent=`${xp-r.min} / ${range} XP`;
  if(animate) setTimeout(()=>{ xpBarFill.style.width=pct+'%'; },120);
  else xpBarFill.style.width=pct+'%';
}
function addXP(amount){
  const oldRank=getCurrentRank(storage.xp).rank;
  storage.xp+=amount;
  const newRank=getCurrentRank(storage.xp).rank;
  saveStorage(storage); renderXpBar(storage.xp,true);
  if(newRank!==oldRank) showToast(levelupToast,`🎉 Naik Pangkat: ${newRank}!`,3000);
}

// ═══════════════════════════════════════════════════
//  PB
// ═══════════════════════════════════════════════════
function pbKey(){ return `${currentLevel}_${gameMode}${modeValue}`; }
function getPB(){ return (storage.pb&&storage.pb[pbKey()])||0; }
function updatePB(kpm){
  const key=pbKey(), isNew=kpm>(storage.pb[key]||0);
  if(isNew){ storage.pb[key]=kpm; saveStorage(storage); }
  return isNew;
}
function showPBBadge(){
  const pb=getPB();
  pbBadge.classList.toggle('hidden',pb===0);
  if(pb>0) pbText.textContent=`PB: ${pb} kpm`;
}

// ═══════════════════════════════════════════════════
//  CHAR STATS + HEATMAP + WEAK KEYS
// ═══════════════════════════════════════════════════
function recordChar(ch,ok){
  if(!charStats[ch]) charStats[ch]={correct:0,wrong:0};
  if(ok) charStats[ch].correct++; else charStats[ch].wrong++;
}
function mergeCharStats(){
  if(!storage.charStats) storage.charStats={};
  for(const[ch,v] of Object.entries(charStats)){
    if(!storage.charStats[ch]) storage.charStats[ch]={correct:0,wrong:0};
    storage.charStats[ch].correct+=v.correct;
    storage.charStats[ch].wrong+=v.wrong;
  }
  saveStorage(storage);
}
function getWeakKeys(n=8){
  return Object.entries(storage.charStats||{})
    .filter(([ch,v])=>ch.trim().length===1&&(v.correct+v.wrong)>=3)
    .map(([ch,v])=>({char:ch,rate:Math.round((v.wrong/(v.correct+v.wrong))*100)}))
    .filter(e=>e.rate>0).sort((a,b)=>b.rate-a.rate).slice(0,n);
}
function renderWeakKeys(){
  const weak=getWeakKeys(8);
  weakKeysList.innerHTML='';
  if(!weak.length){ weakKeysList.innerHTML='<span style="font-size:.62rem;color:var(--text-dim)">Belum ada data — mainkan beberapa sesi dulu</span>'; return; }
  weak.forEach(w=>{
    const c=document.createElement('div'); c.classList.add('weak-key-chip');
    c.innerHTML=`<span class="weak-key-char">${w.char===' '?'␣':w.char}</span><span class="weak-key-rate">${w.rate}% salah</span>`;
    weakKeysList.appendChild(c);
  });
}
function renderHeatmap(){
  kbHeatmap.innerHTML='';
  const stats=storage.charStats||{};
  KB_ROWS.forEach((row,ri)=>{
    const rowEl=document.createElement('div'); rowEl.classList.add('kb-row');
    if(ri===1) rowEl.style.marginLeft='16px';
    if(ri===2) rowEl.style.marginLeft='32px';
    row.forEach(ch=>{
      const key=document.createElement('div'); key.classList.add('kb-key');
      key.textContent=ch.toUpperCase();
      const v=stats[ch];
      if(v){
        const total=v.correct+v.wrong;
        const rate=total>0?v.wrong/total:0;
        const r=Math.round(202*rate), g=Math.round(196*(1-rate)), b=Math.round(84*(1-rate));
        key.style.background=`rgb(${r},${g},${b})`;
        key.style.borderColor=`rgba(${r},${g},${b},.5)`;
        if(total>=3){
          const rateSpan=document.createElement('span');
          rateSpan.classList.add('kb-rate');
          rateSpan.textContent=Math.round(rate*100)+'%';
          key.appendChild(rateSpan);
        }
      }
      rowEl.appendChild(key);
    });
    kbHeatmap.appendChild(rowEl);
  });
}
function updateDrillOptions(){
  const weak=getWeakKeys(6);
  drillOpts.innerHTML='';
  if(!weak.length){
    const s=document.createElement('span'); s.classList.add('sub-info');
    s.id='drill-hint'; s.textContent='Selesaikan beberapa sesi dulu';
    drillOpts.appendChild(s); return;
  }
  weak.forEach(w=>{
    const btn=document.createElement('button'); btn.classList.add('sub-btn');
    if(drillChars.includes(w.char)) btn.classList.add('active');
    btn.textContent=`${w.char} (${w.rate}%)`; btn.dataset.char=w.char;
    btn.addEventListener('click',()=>{
      btn.classList.toggle('active');
      drillChars=[...drillOpts.querySelectorAll('.sub-btn.active')].map(b=>b.dataset.char);
      resetGame();
    });
    drillOpts.appendChild(btn);
  });
}

// ═══════════════════════════════════════════════════
//  HISTORY
// ═══════════════════════════════════════════════════
function saveHistory(entry){
  if(!storage.history) storage.history=[];
  storage.history.unshift(entry);
  if(storage.history.length>20) storage.history.pop();
  saveStorage(storage);
}
function renderHistory(){
  const h=storage.history||[];
  historyEmpty.style.display=h.length?'none':'block';
  historyTbody.innerHTML='';
  h.forEach((e,i)=>{
    const tr=document.createElement('tr');
    if(e.isPB) tr.classList.add('pb-row');
    tr.innerHTML=`<td>${i+1}</td><td class="kpm-cell">${e.kpm}${e.isPB?' 🏆':''}</td><td>${e.acc}%</td><td>${e.consist}%</td><td>Lv.${e.level}</td><td>${e.mode}</td><td>${e.date}</td>`;
    historyTbody.appendChild(tr);
  });
}

// ═══════════════════════════════════════════════════
//  CONFETTI
// ═══════════════════════════════════════════════════
let confettiParticles=[];
function spawnConfetti(){
  confettiCanvas.width=window.innerWidth; confettiCanvas.height=window.innerHeight;
  const colors=['#e2b714','#57c484','#4fc3f7','#f48fb1','#fff'];
  for(let i=0;i<120;i++){
    confettiParticles.push({
      x:Math.random()*window.innerWidth, y:-10,
      vx:(Math.random()-.5)*4, vy:Math.random()*4+2,
      color:colors[Math.floor(Math.random()*colors.length)],
      size:Math.random()*7+3, rot:Math.random()*360, rotV:(Math.random()-.5)*6
    });
  }
  animateConfetti();
}
function animateConfetti(){
  const ctx=confettiCanvas.getContext('2d');
  ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  confettiParticles=confettiParticles.filter(p=>p.y<confettiCanvas.height+20);
  confettiParticles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy; p.rot+=p.rotV;
    ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
    ctx.fillStyle=p.color; ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);
    ctx.restore();
  });
  if(confettiParticles.length>0) requestAnimationFrame(animateConfetti);
  else ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
}

// ═══════════════════════════════════════════════════
//  TOAST HELPER
// ═══════════════════════════════════════════════════
function showToast(el,text,duration=2500){
  el.textContent=text; el.classList.remove('hidden');
  clearTimeout(el._timer);
  el._timer=setTimeout(()=>el.classList.add('hidden'),duration);
}

// ═══════════════════════════════════════════════════
//  WORD GENERATION
// ═══════════════════════════════════════════════════
function getRandomWords(count){
  let pool;
  if(gameMode==='drill'&&drillChars.length>0){
    const all=LEVELS[currentLevel].words;
    const f=all.filter(w=>drillChars.some(ch=>w.includes(ch)));
    pool=f.length>=5?f:all;
  } else pool=LEVELS[currentLevel].words;
  const r=[];
  for(let i=0;i<count;i++) r.push(pool[Math.floor(Math.random()*pool.length)]);
  return r;
}

// ═══════════════════════════════════════════════════
//  BUILD WORD AREA
// ═══════════════════════════════════════════════════
const smoothCaret=document.createElement('div');
smoothCaret.id='smooth-caret';

function buildWordArea(){
  wordArea.innerHTML=''; wordArea.appendChild(smoothCaret);
  wordEls=[]; letterEls=[];
  const source=(gameMode==='quote')?[currentQuote]:words;
  source.forEach((word,wIdx)=>{
    const wEl=document.createElement('div'); wEl.classList.add('word');
    const lArr=[];
    [...word].forEach(ch=>{
      const s=document.createElement('span'); s.classList.add('letter');
      s.textContent=ch; s.dataset.char=ch;
      wEl.appendChild(s); lArr.push(s);
    });
    wordEls.push(wEl); letterEls.push(lArr);
    wordArea.appendChild(wEl);
  });
  setCaret(0,0); markActiveWord(); wordArea.scrollTop=0;
}

function markActiveWord(){
  wordEls.forEach((el,i)=>el.classList.toggle('active-word',i===currentWordIdx));
}

function setCaret(wIdx,lIdx){
  const letters=letterEls[wIdx];
  if(!letters||!letters.length) return;
  const span=lIdx<letters.length?letters[lIdx]:letters[letters.length-1];
  const aR=wordArea.getBoundingClientRect(), sR=span.getBoundingClientRect();
  const left=sR.left-aR.left+wordArea.scrollLeft+(lIdx>=letters.length?sR.width+1:0);
  const top =sR.top -aR.top +wordArea.scrollTop+3;
  smoothCaret.style.left=left+'px'; smoothCaret.style.top=top+'px';
  smoothCaret.style.height=(sR.height-6)+'px';
}

function scrollWordArea(){
  const el=wordEls[currentWordIdx]; if(!el) return;
  const aR=wordArea.getBoundingClientRect(), eR=el.getBoundingClientRect();
  const rowH=el.offsetHeight+6;
  if(eR.top-aR.top>rowH*1.3){
    // Smooth animated scroll — ease-out cubic
    const startTop=wordArea.scrollTop;
    const endTop=startTop+rowH;
    const duration=120;
    const t0=performance.now();
    (function animStep(now){
      const p=Math.min((now-t0)/duration,1);
      const ease=1-Math.pow(1-p,3);
      wordArea.scrollTop=startTop+(endTop-startTop)*ease;
      if(p<1) requestAnimationFrame(animStep);
      else setTimeout(()=>setCaret(currentWordIdx,currentLetterIdx),0);
    })(t0);
  }
}

// ═══════════════════════════════════════════════════
//  TIMERS
// ═══════════════════════════════════════════════════
function startTimer(){
  if(timerInterval) return;
  timerInterval=setInterval(()=>{
    timeLeft--;
    liveDisplay.textContent=timeLeft;
    if(timeLeft<=5) liveDisplay.classList.add('urgent');
    const elapsed=modeValue-timeLeft;
    const kpm=calcKPM(correctChars,elapsed);
    wpmDisplay.textContent=kpm;
    wpmHistory.push({sec:elapsed,kpm});
    liveKpmHistory.push(kpm);
    drawLiveGraph(); updateTargetProgress(kpm);
    if(timeLeft<=0) endGame();
  },1000);
}
function startStopwatch(){
  if(stopwatchInterval) return;
  stopwatchInterval=setInterval(()=>{
    elapsedSeconds++;
    const kpm=calcKPM(correctChars,elapsedSeconds);
    wpmDisplay.textContent=kpm;
    wpmHistory.push({sec:elapsedSeconds,kpm});
    liveKpmHistory.push(kpm);
    drawLiveGraph(); updateTargetProgress(kpm);
    if(gameMode==='words'||gameMode==='quote'||gameMode==='drill')
      liveDisplay.textContent=elapsedSeconds+'s';
  },1000);
}
function stopAllTimers(){
  clearInterval(timerInterval); timerInterval=null;
  clearInterval(stopwatchInterval); stopwatchInterval=null;
}

// ═══════════════════════════════════════════════════
//  CALCULATIONS
// ═══════════════════════════════════════════════════
function calcKPM(chars,sec){ return sec===0?0:Math.round(chars/(sec/60)); }
function calcAccuracy(c,t){ return t===0?100:Math.round((c/t)*100); }
function calcConsistency(h){
  if(h.length<2) return 100;
  const avg=h.reduce((s,d)=>s+d.kpm,0)/h.length;
  const v=h.reduce((s,d)=>s+Math.pow(d.kpm-avg,2),0)/h.length;
  return Math.max(0,Math.round(100-(avg===0?0:(Math.sqrt(v)/avg)*100)));
}
function getElapsed(){ return gameMode==='timer'?modeValue-timeLeft:elapsedSeconds; }

function updateTargetProgress(kpm){
  const target=parseInt(targetInput.value)||0;
  if(!target){ targetWrap.classList.add('hidden'); return; }
  targetWrap.classList.remove('hidden');
  const pct=Math.min((kpm/target)*100,100);
  targetFill.style.width=pct+'%';
  targetLabel.textContent=`${kpm} / ${target} kpm`;
}

// ═══════════════════════════════════════════════════
//  INPUT
// ═══════════════════════════════════════════════════
typingInput.addEventListener('keydown',handleKeydown);

function handleKeydown(e){
  if(gameEnded) return;
  if(e.key==='Tab'){ e.preventDefault(); resetGame(); return; }
  if(e.key==='Backspace'){ e.preventDefault(); handleBackspace(); return; }
  if(e.key===' '){ e.preventDefault(); handleSpace(); return; }
  // Quote mode: Enter = submit whole sentence
  if(e.key==='Enter'&&gameMode==='quote'){ e.preventDefault(); handleEnterQuote(); return; }
  if(e.key.length!==1) return;
  if(!gameStarted){
    gameStarted=true; updateStreak();
    if(gameMode==='timer') startTimer(); else startStopwatch();
  }
  handleCharInput(e.key);
}

function handleCharInput(ch){
  const target=words[currentWordIdx];
  const letters=letterEls[currentWordIdx];
  if(!target||!letters) return;
  if(currentLetterIdx>=target.length) return;
  const expected=target[currentLetterIdx];
  const span=letters[currentLetterIdx];
  totalTyped++;
  const ok=(ch===expected);
  recordChar(expected,ok);
  if(ok){
    span.classList.remove('wrong','shake'); span.classList.add('correct');
    correctChars++; currentLetterIdx++;
    playSoundCorrect();
    setCaret(currentWordIdx,currentLetterIdx);
  } else {
    wrongChars++; wrongDisplay.textContent=wrongChars;
    span.classList.add('wrong'); triggerShake(span); playSoundWrong();
    accDisplay.textContent=calcAccuracy(correctChars,totalTyped);
  }
}

function triggerShake(span){
  span.classList.remove('shake'); void span.offsetWidth; span.classList.add('shake');
}

function handleBackspace(){
  if(currentLetterIdx===0){ if(currentWordIdx>0) goToPreviousWord(); return; }
  currentLetterIdx--;
  const span=letterEls[currentWordIdx][currentLetterIdx];
  span.classList.remove('correct','wrong','shake');
  setCaret(currentWordIdx,currentLetterIdx);
}

function handleSpace(){
  if(currentLetterIdx===0) return;
  if(gameMode==='quote') return; // quote uses Enter
  submitWord();
}

function handleEnterQuote(){
  // In quote mode the entire display is one "word"
  if(currentLetterIdx===0) return;
  endGame();
}

// ═══════════════════════════════════════════════════
//  SUBMIT + PREVIOUS WORD
// ═══════════════════════════════════════════════════
function submitWord(){
  const target=words[currentWordIdx], letters=letterEls[currentWordIdx];
  const hasWrong=letters.some(l=>l.classList.contains('wrong'));
  const incomplete=currentLetterIdx<target.length;
  if(hasWrong||incomplete){
    letters.forEach((s,i)=>{ if(i>=currentLetterIdx) s.classList.add('wrong'); });
    wordEls[currentWordIdx].classList.add('word-error'); wrongWords++;
  } else {
    wordEls[currentWordIdx].classList.remove('word-error');
    correctWords++; correctDisplay.textContent=correctWords;
  }
  accDisplay.textContent=calcAccuracy(correctChars,totalTyped);
  currentWordIdx++; currentLetterIdx=0;
  if(currentWordIdx>=words.length) appendMoreWords();
  setCaret(currentWordIdx,0); markActiveWord(); scrollWordArea();
  if(gameMode==='words'&&correctWords>=modeValue) endGame();
  if(gameMode==='drill'&&correctWords>=25) endGame();
}

function goToPreviousWord(){
  currentWordIdx--;
  const letters=letterEls[currentWordIdx];
  wordEls[currentWordIdx].classList.remove('word-error');
  let last=-1;
  letters.forEach((s,i)=>{ if(s.classList.contains('correct')) last=i; });
  currentLetterIdx=last+1;
  letters.forEach((s,i)=>{ if(i>=currentLetterIdx) s.classList.remove('correct','wrong','shake'); });
  setCaret(currentWordIdx,currentLetterIdx); markActiveWord();
}

function appendMoreWords(){
  getRandomWords(POOL).forEach(word=>{
    words.push(word);
    const wEl=document.createElement('div'); wEl.classList.add('word');
    const lArr=[];
    [...word].forEach(ch=>{
      const s=document.createElement('span'); s.classList.add('letter');
      s.textContent=ch; s.dataset.char=ch; wEl.appendChild(s); lArr.push(s);
    });
    wordEls.push(wEl); letterEls.push(lArr); wordArea.appendChild(wEl);
  });
}

// ═══════════════════════════════════════════════════
//  END GAME
// ═══════════════════════════════════════════════════
function endGame(){
  stopAllTimers(); gameEnded=true; typingInput.blur();
  mergeCharStats();
  const elapsed=Math.max(getElapsed(),1);
  const finalKPM=calcKPM(correctChars,elapsed);
  const finalAcc=calcAccuracy(correctChars,totalTyped);
  const consist=calcConsistency(wpmHistory);
  const isNewPB=updatePB(finalKPM);

  let xpEarned=Math.round(finalKPM*0.5+correctWords*2);
  if(isNewPB){ xpEarned+=20; playSoundPB(); spawnConfetti(); showToast(pbToast,'🏆 Personal Best Baru!',3000); }
  if(finalAcc>=95) xpEarned+=10;
  addXP(xpEarned);

  const modeLabel=gameMode==='timer'?`timer ${modeValue}s`:gameMode==='words'?`${modeValue} kata`:gameMode==='quote'?'kalimat':'drill';
  saveHistory({kpm:finalKPM,acc:finalAcc,consist,level:currentLevel,
    mode:modeLabel,date:new Date().toLocaleDateString('id-ID'),isPB:isNewPB});
  renderHistory();

  // Fill result
  resultWpm.textContent=finalKPM; resultAcc.textContent=finalAcc+'%';
  resultCorrect.textContent=correctWords; resultWrong.textContent=wrongChars;
  resultTime.textContent=elapsed; resultConsist.textContent=consist+'%';
  resultLvlBadge.textContent=`Lv.${currentLevel} ${LEVELS[currentLevel].label}`;
  resultModeBadge.textContent=modeLabel;
  resultPbFlag.classList.toggle('hidden',!isNewPB);
  xpGainedText.textContent=`+${xpEarned} XP`;
  const rank=getCurrentRank(storage.xp);
  const pct=Math.min(((storage.xp-rank.min)/(rank.max-rank.min))*100,100);
  setTimeout(()=>{ resultXpFill.style.width=pct+'%'; },350);
  renderWeakKeys(); renderHeatmap(); drawResultChart();
  resultOverlay.classList.remove('hidden');
}

// ═══════════════════════════════════════════════════
//  LIVE GRAPH
// ═══════════════════════════════════════════════════
function drawLiveGraph(){
  const W=liveGraphCanvas.offsetWidth||900, H=38;
  liveGraphCanvas.width=W; liveGraphCanvas.height=H;
  const ctx=liveGraphCanvas.getContext('2d');
  ctx.clearRect(0,0,W,H);
  const data=liveKpmHistory;
  if(data.length<2) return;
  const maxV=Math.max(...data,1), step=W/(data.length-1);
  const grad=ctx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0,'rgba(226,183,20,.22)'); grad.addColorStop(1,'rgba(226,183,20,0)');
  ctx.beginPath();
  data.forEach((v,i)=>{ const x=i*step, y=H-(v/maxV)*(H-4)-2; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
  ctx.strokeStyle='rgba(226,183,20,.7)'; ctx.lineWidth=1.5; ctx.stroke();
  ctx.lineTo((data.length-1)*step,H); ctx.lineTo(0,H); ctx.closePath();
  ctx.fillStyle=grad; ctx.fill();
}

// ═══════════════════════════════════════════════════
//  RESULT CHART
// ═══════════════════════════════════════════════════
function drawResultChart(){
  const W=wpmChart.width=wpmChart.offsetWidth||520, H=wpmChart.height=110;
  const ctx=wpmChart.getContext('2d');
  ctx.clearRect(0,0,W,H);
  const data=wpmHistory;
  if(data.length<2){ ctx.fillStyle='#646669'; ctx.font='10px Roboto Mono,monospace';
    ctx.textAlign='center'; ctx.fillText('Data belum cukup',W/2,H/2); return; }
  const maxKPM=Math.max(...data.map(d=>d.kpm),1);
  const pad={top:8,right:10,bottom:22,left:34};
  const cW=W-pad.left-pad.right, cH=H-pad.top-pad.bottom;
  ctx.strokeStyle='rgba(255,255,255,.04)'; ctx.lineWidth=1;
  for(let i=0;i<=4;i++){
    const y=pad.top+(cH/4)*i; ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(pad.left+cW,y); ctx.stroke();
  }
  ctx.fillStyle='#646669'; ctx.font='8px Roboto Mono,monospace'; ctx.textAlign='right';
  for(let i=0;i<=4;i++) ctx.fillText(Math.round(maxKPM*(1-i/4)),pad.left-4,pad.top+(cH/4)*i+3);
  ctx.textAlign='center';
  const xStep=Math.ceil(data.length/6);
  data.forEach((d,i)=>{ if(i%xStep===0){ const x=pad.left+(i/(data.length-1))*cW; ctx.fillText(d.sec+'s',x,H-4); } });
  const grad=ctx.createLinearGradient(0,pad.top,0,pad.top+cH);
  grad.addColorStop(0,'rgba(226,183,20,.28)'); grad.addColorStop(1,'rgba(226,183,20,0)');
  ctx.fillStyle=grad; ctx.beginPath();
  data.forEach((d,i)=>{ const x=pad.left+(i/(data.length-1))*cW, y=pad.top+(1-d.kpm/maxKPM)*cH; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
  ctx.lineTo(pad.left+cW,pad.top+cH); ctx.lineTo(pad.left,pad.top+cH); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='#e2b714'; ctx.lineWidth=2; ctx.lineJoin='round'; ctx.beginPath();
  data.forEach((d,i)=>{ const x=pad.left+(i/(data.length-1))*cW, y=pad.top+(1-d.kpm/maxKPM)*cH; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
  ctx.stroke();
  ctx.fillStyle='#e2b714';
  data.forEach((d,i)=>{ const x=pad.left+(i/(data.length-1))*cW, y=pad.top+(1-d.kpm/maxKPM)*cH; ctx.beginPath(); ctx.arc(x,y,2.2,0,Math.PI*2); ctx.fill(); });
}

// ═══════════════════════════════════════════════════
//  EXPORT AS IMAGE
// ═══════════════════════════════════════════════════
exportBtn.addEventListener('click',()=>{
  const card=$('result-card');
  // Use html2canvas-like approach via inline SVG foreignObject
  // Simple fallback: draw stats to a canvas
  const cw=520, ch=320;
  const cv=document.createElement('canvas'); cv.width=cw; cv.height=ch;
  const ctx=cv.getContext('2d');
  ctx.fillStyle='#27282c'; ctx.fillRect(0,0,cw,ch);
  ctx.strokeStyle='#35363b'; ctx.lineWidth=2; ctx.strokeRect(1,1,cw-2,ch-2);
  ctx.fillStyle='#e2b714'; ctx.font='bold 18px Roboto Mono,monospace';
  ctx.textAlign='center'; ctx.fillText('TypeMaster.ID',cw/2,38);
  ctx.fillStyle='#646669'; ctx.font='10px Roboto Mono,monospace';
  ctx.fillText(resultLvlBadge.textContent+'  ·  '+resultModeBadge.textContent,cw/2,58);
  const stats=[
    {label:'KPM',val:resultWpm.textContent},
    {label:'Akurasi',val:resultAcc.textContent},
    {label:'Konsistensi',val:resultConsist.textContent},
    {label:'Kata Benar',val:resultCorrect.textContent},
  ];
  stats.forEach((s,i)=>{
    const col=i%2===0?120:380, row=Math.floor(i/2);
    const y=100+row*80;
    ctx.fillStyle='#e2b714'; ctx.font='bold 36px Roboto Mono,monospace'; ctx.textAlign='center';
    ctx.fillText(s.val,col,y+30);
    ctx.fillStyle='#646669'; ctx.font='9px Roboto Mono,monospace';
    ctx.fillText(s.label.toUpperCase(),col,y+48);
  });
  ctx.fillStyle='#646669'; ctx.font='9px Roboto Mono,monospace'; ctx.textAlign='center';
  ctx.fillText(new Date().toLocaleDateString('id-ID'),cw/2,ch-14);
  const a=document.createElement('a');
  a.download='typemaster-result.png'; a.href=cv.toDataURL();
  a.click();
});

// ═══════════════════════════════════════════════════
//  RESET
// ═══════════════════════════════════════════════════
function resetGame(){
  stopAllTimers();
  gameStarted=false; gameEnded=false;
  correctChars=0; wrongChars=0; totalTyped=0; correctWords=0; wrongWords=0;
  currentWordIdx=0; currentLetterIdx=0;
  wpmHistory=[]; liveKpmHistory=[]; charStats={};
  timeLeft=gameMode==='timer'?modeValue:0; elapsedSeconds=0;
  wpmDisplay.textContent='0'; accDisplay.textContent='100';
  correctDisplay.textContent='0'; wrongDisplay.textContent='0';
  liveDisplay.classList.remove('urgent');
  if(gameMode==='timer'){ liveDisplay.textContent=modeValue; liveUnit.textContent='detik'; }
  else if(gameMode==='words'){ liveDisplay.textContent=`0/${modeValue}`; liveUnit.textContent='kata'; }
  else if(gameMode==='quote'){ liveDisplay.textContent='0'; liveUnit.textContent='kalimat'; }
  else { liveDisplay.textContent='0'; liveUnit.textContent='drill'; }
  const lctx=liveGraphCanvas.getContext('2d');
  lctx.clearRect(0,0,liveGraphCanvas.width||900,liveGraphCanvas.height||38);
  targetWrap.classList.add('hidden');
  resultOverlay.classList.add('hidden');
  typingInput.value='';
  if(gameMode==='quote'){
    currentQuote=QUOTES[Math.floor(Math.random()*QUOTES.length)];
    words=[currentQuote]; buildWordArea();
  } else {
    words=getRandomWords(POOL); buildWordArea();
  }
  showPBBadge(); focusGame();
}

// ═══════════════════════════════════════════════════
//  FOCUS
// ═══════════════════════════════════════════════════
function focusGame(){ typingInput.focus(); wordArea.classList.remove('unfocused'); }
typingInput.addEventListener('focus',()=>wordArea.classList.remove('unfocused'));
typingInput.addEventListener('blur', ()=>{ if(!gameEnded) wordArea.classList.add('unfocused'); });
wordArea.addEventListener('click',focusGame);

// ═══════════════════════════════════════════════════
//  CAPS LOCK
// ═══════════════════════════════════════════════════
document.addEventListener('keydown',e=>{ if(e.getModifierState) capslockWarn.classList.toggle('hidden',!e.getModifierState('CapsLock')); });
document.addEventListener('keyup',  e=>{ if(e.getModifierState) capslockWarn.classList.toggle('hidden',!e.getModifierState('CapsLock')); });

// ═══════════════════════════════════════════════════
//  RIPPLE EFFECT
// ═══════════════════════════════════════════════════
function addRipple(e){
  const btn=e.currentTarget;
  const r=document.createElement('span'); r.classList.add('ripple');
  const rect=btn.getBoundingClientRect();
  const size=Math.max(rect.width,rect.height);
  r.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
  btn.appendChild(r);
  r.addEventListener('animationend',()=>r.remove());
}
document.querySelectorAll('.level-btn,.mode-btn,.sub-btn').forEach(btn=>{
  btn.addEventListener('click',addRipple);
});

// ═══════════════════════════════════════════════════
//  FONT SELECTOR
// ═══════════════════════════════════════════════════
function applyFont(f){
  document.documentElement.setAttribute('data-font',f);
  document.querySelectorAll('.font-btn').forEach(b=>b.classList.toggle('active',b.dataset.font===f));
  storage.font=f; saveStorage(storage);
}
document.querySelectorAll('.font-btn').forEach(btn=>{
  btn.addEventListener('click',()=>applyFont(btn.dataset.font));
});
document.querySelectorAll('.mode-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    gameMode=btn.dataset.mode;
    document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    $('timer-options').classList.toggle('active',gameMode==='timer');
    $('words-options').classList.toggle('active',gameMode==='words');
    $('quote-options').classList.toggle('active',gameMode==='quote');
    $('drill-options').classList.toggle('active',gameMode==='drill');
    if(gameMode==='timer')  modeValue=15;
    if(gameMode==='words')  modeValue=25;
    if(gameMode==='quote')  modeValue=0;
    if(gameMode==='drill')  { modeValue=0; updateDrillOptions(); }
    resetGame();
  });
});
document.querySelectorAll('.sub-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    btn.closest('.sub-options').querySelectorAll('.sub-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active'); modeValue=parseInt(btn.dataset.value)||0; resetGame();
  });
});
document.querySelectorAll('.level-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    currentLevel=parseInt(btn.dataset.level);
    document.querySelectorAll('.level-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active'); resetGame();
  });
});
soundBtn.addEventListener('click',()=>{
  soundEnabled=!soundEnabled;
  soundBtn.classList.toggle('muted',!soundEnabled);
  soundBtn.textContent=soundEnabled?'🔊':'🔇';
});
$('reset-btn').addEventListener('click',resetGame);
restartBtn.addEventListener('click',resetGame);
$('finish-btn').addEventListener('click',()=>{ if(gameStarted&&!gameEnded) endGame(); });
historyClearBtn.addEventListener('click',()=>{
  storage.history=[]; saveStorage(storage); renderHistory();
});

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
(function init(){
  applyTheme(storage.theme||'amber');
  applyFont(storage.font||'mono');
  initStreak(); renderXpBar(storage.xp,false);
  soundEnabled=storage.sound!==false;
  if(!soundEnabled){ soundBtn.classList.add('muted'); soundBtn.textContent='🔇'; }
  if(storage.target) targetInput.value=storage.target;
  targetInput.addEventListener('change',()=>{ storage.target=parseInt(targetInput.value)||0; saveStorage(storage); });
  renderHistory();
  words=getRandomWords(POOL); buildWordArea();
  showPBBadge(); wordArea.classList.add('unfocused');
})();
