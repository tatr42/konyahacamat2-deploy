"use client";

import { useState } from "react";
import { Search, CheckCircle2, XCircle } from "lucide-react";
import { findCertificate, CERTIFICATES, type CertificateRecord } from "@/data/graduates";

/**
 * Sertifika doğrulama formu — tamamen istemci tarafında, statik kayıt
 * defterinden çalışır (veritabanı/API yok, site tam SSG kalır).
 */
export default function CertificateChecker() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<CertificateRecord | null | "empty">("empty");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) {
      setResult("empty");
      return;
    }
    setResult(findCertificate(code));
  }

  return (
    <div className="card-ak p-6 lg:p-8">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="cert-code" className="sr-only">
          Sertifika numarası
        </label>
        <input
          id="cert-code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Sertifika numarası (ör. EA-2026-0148)"
          className="flex-1 rounded-md border border-line bg-canvas px-4 py-3 text-[15px] text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-navy"
        />
        <button type="submit" className="btn-navy">
          <Search size={17} />
          Doğrula
        </button>
      </form>

      {result !== "empty" && (
        <div className="mt-6">
          {result ? (
            <div className="rounded-md border border-gold/40 bg-gold-tint p-5">
              <span className="flex items-center gap-2 font-semibold text-navy">
                <CheckCircle2 size={19} className="text-gold" />
                Kayıt bulundu
              </span>
              {/* KVKK: belge sahibinin adı ve ili BİLİNÇLİ olarak gösterilmez —
                  gizlilik sayfasında verdiğimiz taahhütle birebir aynı. Doğrulama
                  için belgenin geçerliliği, programı ve tarihi yeterlidir. */}
              <dl className="mt-4 space-y-2.5 text-[15px]">
                {[
                  { l: "Sertifika no", v: result.code },
                  { l: "Durum", v: "Geçerli — kaydımızda mevcut" },
                  { l: "Program", v: result.program },
                  { l: "Veriliş tarihi", v: result.issued },
                ].map((r) => (
                  <div key={r.l} className="flex flex-wrap gap-x-3">
                    <dt className="text-ink-soft w-32 shrink-0">{r.l}</dt>
                    <dd className="text-ink font-medium">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <div className="rounded-md border border-line bg-canvas-deep p-5">
              <span className="flex items-center gap-2 font-semibold text-navy">
                <XCircle size={19} className="text-ink-soft" />
                Bu numarayla eşleşen kayıt bulunamadı
              </span>
              <p className="text-ink-soft text-[14.5px] leading-relaxed mt-2">
                {CERTIFICATES.length === 0
                  ? "Çevrimiçi belge kaydımız şu anda hazırlanıyor; henüz sorgulanabilir kayıt bulunmuyor. Belgenizi doğrulatmak için WhatsApp veya telefon üzerinden bize ulaşın, kaydınızı elden teyit edelim."
                  : "Numarayı belgenizde yazdığı gibi (tire dahil) girdiğinizden emin olun. Sorun devam ederse WhatsApp üzerinden bize ulaşın; kaydı elden kontrol edelim."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
