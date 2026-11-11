'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent as KeyEv, TouchEvent as TouchEv } from 'react';
import { aset } from '@/lib/aset';
import { Ikon, KotakIkon, gayaWarna, type NamaIkon } from '@/lib/ikon';
import {
  TAMPIL_DRAF, KONTAK, MAIL_SAMPEL, STATISTIK, LINI, VISI, MISI, NILAI, KUTIPAN,
  PERJALANAN, ROADMAP, PIMPINAN, type Chip,
} from '@/data/situs';

/* Urutan slide + ikon dok. id = alamat #hash. */
const SLIDE: Array<{ id: string; nama: string; ikon: NamaIkon; latar: 'beranda' | 'lain'; istimewa?: boolean }> = [
  { id: 'beranda', nama: 'Beranda', ikon: 'rumah', latar: 'beranda' },
  { id: 'lini-usaha', nama: 'Lini Usaha', ikon: 'usaha', latar: 'lain' },
  { id: 'visi-misi', nama: 'Visi & Misi', ikon: 'target', latar: 'lain' },
  { id: 'perjalanan', nama: 'Perjalanan', ikon: 'perjalanan', latar: 'lain', istimewa: true },
  { id: 'roadmap', nama: 'Roadmap', ikon: 'pin', latar: 'lain' },
  { id: 'kontak', nama: 'Kontak', ikon: 'telepon', latar: 'lain' },
];

const i = (n: number) => ({ ['--i' as string]: n }) as CSSProperties;

function Chips({ data }: { data: Chip[] }) {
  if (!data.length) return null;
  return <div className="chip-baris">{data.map((c) => <span key={c.teks} className={`chip ${c.gaya ?? ''}`}>{c.teks}</span>)}</div>;
}

function LabelDraf({ teks = 'Teks draf — mohon ditinjau & disesuaikan' }: { teks?: string }) {
  return <span className="label-draf muncul" style={i(2)}>✎ {teks}</span>;
}

/* Angka berjalan saat slide beranda tampil. */
function Hitung({ ke, tahun, aktif }: { ke: number; tahun?: boolean; aktif: boolean }) {
  const [n, setN] = useState(ke);
  useEffect(() => {
    if (!aktif) return;
    const mulai = tahun ? ke - 24 : 0;
    let t0 = 0, raf = 0;
    const langkah = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(mulai + (ke - mulai) * e));
      if (p < 1) raf = requestAnimationFrame(langkah);
    };
    raf = requestAnimationFrame(langkah);
    return () => cancelAnimationFrame(raf);
  }, [aktif, ke, tahun]);
  return <span>{n}</span>;
}

export default function Korporat() {
  const [kini, setKini] = useState(0);
  const [maju, setMaju] = useState(true);
  const [sebelumnya, setSebelumnya] = useState<number | null>(null);
  const [tab, setTab] = useState(LINI[0].id);
  const slideRef = useRef<Array<HTMLElement | null>>([]);
  const dokBtn = useRef<Array<HTMLButtonElement | null>>([]);
  const sorotRef = useRef<HTMLSpanElement | null>(null);
  const [geserSorot, setGeserSorot] = useState(0);

  const ke = useCallback((n: number, dariHash = false) => {
    setKini((lama) => {
      const baru = Math.max(0, Math.min(SLIDE.length - 1, n));
      if (baru === lama) return lama;
      setMaju(baru > lama);
      setSebelumnya(lama);
      if (!dariHash) history.replaceState(null, '', `#${SLIDE[baru].id}`);
      const el = slideRef.current[baru];
      if (el) el.scrollTop = 0;
      return baru;
    });
  }, []);

  // Buka langsung ke #hash
  useEffect(() => {
    const dariHash = () => {
      const k = SLIDE.findIndex((s) => `#${s.id}` === location.hash);
      if (k >= 0) ke(k, true);
    };
    dariHash();
    window.addEventListener('hashchange', dariHash);
    return () => window.removeEventListener('hashchange', dariHash);
  }, [ke]);

  // Keyboard ← →
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input,textarea,[role=tab]')) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); ke(kini + 1); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); ke(kini - 1); }
    };
    document.addEventListener('keydown', f);
    return () => document.removeEventListener('keydown', f);
  }, [kini, ke]);

  // Posisi sorotan dok
  useLayoutEffect(() => {
    const ukur = () => {
      const b = dokBtn.current[kini], s = sorotRef.current;
      if (b && s) setGeserSorot(b.offsetLeft - s.offsetLeft);
    };
    ukur();
    window.addEventListener('resize', ukur);
    return () => window.removeEventListener('resize', ukur);
  }, [kini]);

  // Geser di HP (horizontal saja)
  const sentuh = useRef<{ x: number; y: number } | null>(null);
  const awalSentuh = (e: TouchEv) => {
    if ((e.target as HTMLElement).closest('.tab-bar')) { sentuh.current = null; return; }
    sentuh.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const akhirSentuh = (e: TouchEv) => {
    const s = sentuh.current; if (!s) return;
    const dx = e.changedTouches[0].clientX - s.x, dy = e.changedTouches[0].clientY - s.y;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) ke(kini + (dx < 0 ? 1 : -1));
    sentuh.current = null;
  };

  const kelasSlide = (k: number) => {
    if (k === kini) return 'slide aktif';
    if (k === sebelumnya && maju) return 'slide keluar-kiri';
    return 'slide';
  };
  const gayaSlide = (k: number) => (k === kini ? ({ ['--masuk' as string]: maju ? '60px' : '-60px' } as CSSProperties) : undefined);
  const propsSlide = (k: number) => ({
    id: SLIDE[k].id,
    className: kelasSlide(k),
    style: gayaSlide(k),
    'aria-label': SLIDE[k].nama,
    'aria-hidden': k !== kini,
    ref: (el: HTMLElement | null) => { slideRef.current[k] = el; },
  });

  const pilihTab = (id: string) => setTab(id);
  const tabKey = (e: KeyEv, idx: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const n = LINI[(idx + (e.key === 'ArrowRight' ? 1 : LINI.length - 1)) % LINI.length];
    setTab(n.id);
    document.getElementById(`tb-${n.id}`)?.focus();
  };

  const latar = SLIDE[kini].latar;

  return (
    <>
      <div className="progres" style={{ width: `${((kini + 1) / SLIDE.length) * 100}%` }} />
      <div className="latar" aria-hidden="true">
        <div className={`latar-foto ${latar === 'beranda' ? 'on' : ''}`} style={{ backgroundImage: `url('${aset('hero')}')` }} />
        <div className={`latar-foto ${latar === 'lain' ? 'on' : ''}`} style={{ backgroundImage: `url('${aset('pohon')}')` }} />
        <div className="latar-butir" />
      </div>

      <header className="kepala">
        {TAMPIL_DRAF && <span className="draf-chip" title="Halaman pratinjau — teks bertanda draf perlu ditinjau">Draf tampilan</span>}
        <a className="logo" href="#beranda" onClick={(e) => { e.preventDefault(); ke(0); }} aria-label="PT Highland Urban Nusantara — beranda">
          <span className="logo-mark"><img src={aset('logo')} alt="" /></span>
          <span className="logo-teks"><b>HIGHLAND URBAN</b><small>Nusantara · Gayo</small></span>
        </a>
        <div className="kepala-kanan">
          <a className="pil" href={KONTAK.toko} target="_blank" rel="noopener"><Ikon nama="tas" /><span className="pil-teks">Toko Online</span></a>
        </div>
      </header>

      <main className="panggung" onTouchStart={awalSentuh} onTouchEnd={akhirSentuh}>

        {/* ================= 1. BERANDA ================= */}
        <section {...propsSlide(0)}>
          <div className="wadah hero">
            <span className="hero-eyebrow muncul" style={i(0)}><b>PT</b> Takengon, Aceh Tengah · Sejak 2024</span>
            <h1 className="muncul" style={i(1)}><span className="putih">Dari Kebun Gayo</span><br /><span className="gradasi">ke Pasar Dunia</span></h1>
            <p className="hero-lead muncul" style={i(2)}>PT Highland Urban Nusantara menanam, mengolah, dan menjual kopi arabika Gayo sendiri — dari kebun di dataran tinggi Aceh Tengah sampai ke rumah, kedai, roaster, dan importir.</p>
            <div className="statistik">
              {STATISTIK.map((s, k) => (
                <div className="stat muncul" style={i(k + 3)} key={s.label}>
                  <div className="stat-angka">
                    <Ikon nama={s.ikon} />
                    {s.teks ? <span className="angka-kecil">{s.teks}</span> : <>{s.awalan}<Hitung ke={s.angka!} tahun={s.tahun} aktif={kini === 0} />{s.akhiran?.replace(' ', ' ')}</>}
                  </div>
                  <small>{s.label}</small>
                </div>
              ))}
            </div>
            <button className="jelajah muncul" style={i(7)} onClick={() => ke(1)}>Jelajahi HUN<Ikon nama="bawah" /></button>
          </div>
        </section>

        {/* ================= 2. LINI USAHA ================= */}
        <section {...propsSlide(1)}>
          <div className="wadah">
            <div className="judul-slide">
              <h2 className="muncul">Lini <span className="gradasi">Usaha</span></h2>
              <p className="muncul" style={i(1)}>Satu rantai pasok yang utuh — dari kebun dan pengolahan di Gayo, ekspor green bean, toko online, sampai kemitraan dengan kedai, reseller, dan UMKM.</p>
            </div>
            <div className="tab-bar kaca muncul" style={i(2)} role="tablist" aria-label="Lini usaha">
              {LINI.map((l, k) => (
                <button key={l.id} id={`tb-${l.id}`} role="tab" aria-selected={tab === l.id} aria-controls={`t-${l.id}`}
                  tabIndex={tab === l.id ? 0 : -1} onClick={() => pilihTab(l.id)} onKeyDown={(e) => tabKey(e, k)}>{l.tab}</button>
              ))}
            </div>
            {LINI.map((l) => (
              <div key={l.id} id={`t-${l.id}`} role="tabpanel" aria-labelledby={`tb-${l.id}`} className={`tab-panel ${tab === l.id ? 'on' : ''}`}>
                <div className="ringkas kaca">
                  <div className="ringkas-kepala">
                    <KotakIkon nama={l.ikon} warna={l.warna} />
                    <div><h3>{l.judul}</h3><small>{l.sub}</small></div>
                  </div>
                  <p>{l.teks}</p>
                  <Chips data={l.chip} />
                  {l.tombol && (
                    <a className="tombol" href={l.tombol.url} {...(l.tombol.baru ? { target: '_blank', rel: 'noopener' } : {})}>
                      <Ikon nama={l.tombol.ikon} />{l.tombol.label}
                    </a>
                  )}
                </div>
                <div className="unit-daftar">
                  {l.unit.map((u) => (
                    <article className="unit kaca" key={u.judul}>
                      <div className="unit-foto" style={u.logo ? { background: '#f4f1e8' } : undefined}>
                        <img src={aset(u.foto)} alt={u.alt} loading="lazy" style={u.logo ? { objectFit: 'contain', padding: 14 } : undefined} />
                      </div>
                      <div className="unit-isi">
                        <h4>{u.judul}</h4>
                        <p>{u.teks}</p>
                        <Chips data={u.chip} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 3. VISI & MISI ================= */}
        <section {...propsSlide(2)}>
          <div className="wadah">
            <div className="judul-slide">
              <h2 className="muncul">Visi &amp; <span className="gradasi">Misi</span></h2>
              <p className="muncul" style={i(1)}>Arah dan nilai yang memandu HUN membangun usaha kopi Gayo yang dipercaya dan berkelanjutan.</p>
              {VISI.draf && <LabelDraf />}
            </div>
            <div className="vm-grid">
              <div className="vm-kolom">
                <div className="blok kaca muncul" style={i(3)}>
                  <div className="blok-kepala"><KotakIkon nama="lampu" warna="emas" /><div><h3>Visi</h3><small>Arah jangka panjang</small></div></div>
                  <p className="visi-teks">{VISI.sebelum}<em className="gradasi">{VISI.sorot}</em>{VISI.sesudah}</p>
                  <p>{VISI.catatan}</p>
                </div>
                <div className="blok kaca muncul" style={i(4)}>
                  <div className="blok-kepala"><KotakIkon nama="target" warna="hijau" /><div><h3>Misi</h3><small>{MISI.length} pilar kerja</small></div></div>
                  <div className="misi">
                    {MISI.map((m, k) => (
                      <div className="misi-item" key={m.judul}>
                        <KotakIkon nama={m.ikon} warna={m.warna} />
                        <div><b>{m.judul} <i>{String(k + 1).padStart(2, '0')}</i></b><p>{m.teks}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="vm-kolom">
                <div className="blok kaca muncul" style={i(5)}>
                  <div className="blok-kepala"><KotakIkon nama="hati" warna="mawar" /><div><h3>Nilai Kami</h3><small>Nilai <b>{NILAI.map((n) => n.huruf).join('')}</b></small></div></div>
                  <div className="misi">
                    {NILAI.map((n) => (
                      <div className="nilai-item" key={n.huruf}>
                        <span className="huruf" style={gayaWarna(n.warna)}>{n.huruf}</span>
                        <div><b>{n.judul}</b><p>{n.teks}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {KUTIPAN && (
              <div className="kutipan-besar kaca muncul" style={i(6)}>
                <p>“{KUTIPAN.teks}”</p>
                <small>{KUTIPAN.oleh}{KUTIPAN.draf && <span className="label-draf" style={{ margin: '0 0 0 8px', padding: '2px 8px' }}>usulan kutipan</span>}</small>
              </div>
            )}
          </div>
        </section>

        {/* ================= 4. PERJALANAN ================= */}
        <section {...propsSlide(3)}>
          <div className="wadah">
            <div className="judul-slide">
              <h2 className="muncul">Perjalanan <span className="gradasi">HUN</span></h2>
              <p className="muncul" style={i(1)}>Langkah-langkah yang sudah dan sedang kami tempuh.</p>
            </div>
            <div className="garis-waktu">
              {PERJALANAN.map((p, k) => (
                <div className={`titik-waktu ${p.berjalan ? 'berjalan' : ''} muncul`} style={i(k + 2)} key={p.judul}>
                  <div className="kartu-w kaca">
                    <div className="kartu-w-kepala"><KotakIkon nama={p.ikon} warna={p.warna} /><b>{p.judul}</b>{p.berjalan && <span className="tag-status">Berjalan</span>}</div>
                    <p>{p.teks}</p>
                  </div>
                  <span className="bulat" /><span className="tahun gradasi">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5. ROADMAP ================= */}
        <section {...propsSlide(4)}>
          <div className="wadah">
            <div className="judul-slide">
              <h2 className="muncul">Roadmap <span className="gradasi">HUN</span></h2>
              <p className="muncul" style={i(1)}>Tahapan strategi untuk membawa kopi Gayo dari Takengon ke pasar dunia.</p>
              {ROADMAP.draf && <LabelDraf teks="Teks draf — tahun & target mohon diisi oleh manajemen" />}
            </div>
            <div className="fase">
              {ROADMAP.fase.map((f, k) => (
                <article className="fase-kartu kaca muncul" style={i(k + 3)} key={f.no}>
                  <div className="fase-kiri"><span className="fase-no gradasi">{f.no}</span><b>{f.judul}</b><small>{f.sub}</small></div>
                  <div className="fase-isi">
                    {f.item.map((it) => (
                      <div className="fase-item" key={it.judul}><KotakIkon nama={it.ikon} warna={it.warna} /><div><b>{it.judul}</b><p>{it.teks}</p></div></div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 6. KONTAK ================= */}
        <section {...propsSlide(5)}>
          <div className="wadah">
            <div className="judul-slide">
              <h2 className="muncul">Mari <span className="gradasi">Bekerja Sama</span></h2>
              <p className="muncul" style={i(1)}>Untuk pembelian ekspor, kemitraan, atau pertanyaan seputar kopi Gayo — tim kami siap membantu.</p>
            </div>
            <div className="kontak-grid">
              <div className="pimpinan kaca muncul" style={i(2)}>
                <div className="pimpinan-atas">
                  {PIMPINAN.foto
                    ? <img className="avatar" src={aset(PIMPINAN.foto)} alt={PIMPINAN.nama} style={{ objectFit: 'cover' }} />
                    : <span className="avatar" aria-hidden="true">{PIMPINAN.inisial}</span>}
                  <div>
                    <h3>{PIMPINAN.nama}</h3>
                    <span className="jabatan">{PIMPINAN.jabatan}</span>
                    <p>{PIMPINAN.teks}</p>
                  </div>
                </div>
                <div className="ajakan">
                  <div><b>Butuh sampel green bean?</b><span>Kirim kebutuhan Anda — proses, grade, dan volume — kami balas dengan spesifikasi lot.</span></div>
                  <a className="tombol" href={MAIL_SAMPEL}><Ikon nama="surat" />Minta sampel</a>
                </div>
              </div>
              <div className="info-kolom">
                <div className="info kaca muncul" style={i(3)}>
                  <KotakIkon nama="pin" warna="hijau" />
                  <div><b>{KONTAK.perusahaan}</b><p>{KONTAK.alamat.map((b, k) => <span key={b}>{b}{k < KONTAK.alamat.length - 1 && <br />}</span>)}</p></div>
                </div>
                <div className="info kaca muncul" style={i(4)}>
                  <KotakIkon nama="surat" warna="kopi" />
                  <div><b>Email</b><a className="teks" href={`mailto:${KONTAK.email}`}>{KONTAK.email}</a><p>Ekspor, sampel &amp; kerja sama</p></div>
                </div>
                <div className="info kaca muncul" style={i(5)}>
                  <KotakIkon nama="wa" warna="wa" />
                  <div>
                    <b>WhatsApp</b>
                    <a className="teks" href={`https://wa.me/${KONTAK.wa}`} target="_blank" rel="noopener">{KONTAK.waTampil}</a><br />
                    <a className="tombol hijau" href={`https://wa.me/${KONTAK.wa}`} target="_blank" rel="noopener">Chat sekarang</a>
                  </div>
                </div>
                <div className="info kaca muncul" style={i(6)}>
                  <KotakIkon nama="tas" warna="cokelat" />
                  <div><b>Toko online</b><a className="teks" href={KONTAK.toko} target="_blank" rel="noopener">{KONTAK.toko.replace(/^https?:\/\/|\/$/g, '')}</a><p>Belanja kopi Gayo untuk rumah &amp; kedai</p></div>
                </div>
              </div>
            </div>
            <p className="kaki">© {new Date().getFullYear()} {KONTAK.perusahaan} · Takengon, Aceh Tengah</p>
          </div>
        </section>
      </main>

      <button className="panah kiri" aria-label="Bagian sebelumnya" disabled={kini === 0} onClick={() => ke(kini - 1)}><Ikon nama="kiri" /></button>
      <button className="panah kanan" aria-label="Bagian berikutnya" disabled={kini === SLIDE.length - 1} onClick={() => ke(kini + 1)}><Ikon nama="kanan" /></button>

      <nav className="dok-wadah" aria-label="Navigasi bagian">
        <span className="dok-label">{SLIDE[kini].nama}</span>
        <div className="dok">
          <span className="dok-sorot" ref={sorotRef} style={{ transform: `translateX(${geserSorot}px)` }} />
          {SLIDE.map((s, k) => (
            <button key={s.id} ref={(el) => { dokBtn.current[k] = el; }} className={s.istimewa ? 'istimewa' : undefined}
              aria-label={s.nama} aria-current={k === kini ? 'true' : undefined} onClick={() => ke(k)}>
              <Ikon nama={s.ikon} /><span className="tip">{s.nama}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
