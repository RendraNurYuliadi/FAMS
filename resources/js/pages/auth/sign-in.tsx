"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Eye, EyeOff } from "lucide-react";

const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200";

const labelClass = "mb-1.5 block text-xs font-semibold text-gray-900";

function Required() {
    return <span className="text-orange-500"> *</span>;
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-10">
            {/* Header kiri atas */}
            <div className="absolute left-6 top-5 text-[11px] text-gray-500">
                FAMS <span className="mx-1">•</span> v1.0
            </div>

            {/* Badge status kanan atas */}
            <div className="absolute right-6 top-4 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-medium text-gray-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Sistem Aktif
            </div>

            {/* Card */}
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                {/* Logo */}
                <div className="mb-4 flex justify-center">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-black text-base font-bold text-white">
                        F
                        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-orange-500" />
                    </div>
                </div>

                <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">
                    Registrasi Akun Baru
                </h1>
                <p className="mx-auto mb-6 mt-2 max-w-xs text-center text-xs leading-relaxed text-gray-500">
                    Daftarkan diri Anda untuk mengajukan atau mengelola aset fakultas
                </p>

                <form className="space-y-4">
                    {/* Nama Lengkap */}
                    <div>
                        <label className={labelClass}>
                            Nama Lengkap
                            <Required />
                        </label>
                        <input
                            type="text"
                            placeholder="cth. Muhammad Farhan Pratama"
                            className={inputClass}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className={labelClass}>
                            Email Institusi / Mahasiswa
                            <Required />
                        </label>
                        <input
                            type="email"
                            placeholder="contoh@student.fakultas.ac.id"
                            className={inputClass}
                        />
                    </div>

                    {/* NIM & Tipe Peminjam */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>
                                NIM / NIP
                                <Required />
                            </label>
                            <input
                                type="text"
                                placeholder="cth. 21120140089"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>
                                Tipe Peminjam
                                <Required />
                            </label>
                        <div className="relative">
                                <select
                                    defaultValue="" 
                                      className={`${inputClass} appearance-none pr-8`}
                                >
                                    <option value="" disabled>
                                        Pilih Tipe
                                    </option>
                                    
                                    <option value="mahasiswa">Mahasiswa</option>
                                    <option value="dosen">Dosen</option>
                                    <option value="staf">Staf</option>
                                    <option value="organisasi">Organisasi</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            </div>
                    </div>

                    {/* Organisasi */}
                    <div>
                        <div className="mb-1.5 flex items-center justify-between">
                            <label className="text-xs font-semibold text-gray-900">
                                Nama Organisasi / Unit
                            </label>
                            <span className="text-[10px] text-gray-400">
                                Opsional
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="cth. BEM / Himpunan Mahasiswa / Laboratorium"
                            className={inputClass}
                        />
                    </div>

                    {/* WhatsApp */}
                    <div>
                        <label className={labelClass}>
                            Nomor WhatsApp / HP Aktif
                            <Required />
                        </label>
                        <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-gray-50/50 focus-within:border-gray-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-gray-200">
                            <span className="flex items-center border-r border-gray-200 px-3 text-sm text-gray-600">
                                +62
                            </span>
                            <input
                                type="tel"
                                placeholder="81234567890"
                                className="w-full bg-transparent px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Kata Sandi */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>
                                Kata Sandi
                                <Required />
                            </label>
                            <div>
                                <div className="relative">
                                    <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`${inputClass} pr-9`}/>
                                    
                                    <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label="Tampilkan kata sandi">
                                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                    </div>
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>
                                Konfirmasi Kata Sandi
                                <Required />
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`${inputClass} pr-9`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label="Tampilkan konfirmasi kata sandi"
                                >
                                    {showConfirm ? (
                                        <EyeOff size={14} />
                                    ) : (
                                        <Eye size={14} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Checkbox */}
                    <label className="flex items-center gap-2 text-xs text-gray-600">
                        <input
                            type="checkbox"
                            className="h-3.5 w-3.5 rounded border-gray-300 accent-black"
                        />
                        Saya menyetujui aturan dan kebijakan peminjaman aset fakultas
                    </label>

                    {/* Tombol */}
                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                        Daftar Akun Baru
                        <ArrowRight size={16} />
                    </button>
                </form>

                {/* Footer card */}
                <div className="mt-6 border-t border-gray-100 pt-5 text-center text-xs text-gray-500">
                    Sudah punya akun?{" "}
                    <a
                        href="/sign-in"
                        className="font-semibold text-orange-500 hover:text-orange-600"
                    >
                        Masuk di sini
                    </a>
                </div>
            </div>

            <p className="mt-6 text-[11px] text-gray-400">
                Didukung Integrasi QR &amp; IoT Scanner Dua Tombol
            </p>
        </div>
    );
}