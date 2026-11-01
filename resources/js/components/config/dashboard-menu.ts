
import type { DashboardMenuItem } from '../../types/dashboard';

export const dashboardMenu: DashboardMenuItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: 'chart',
    },
    {
        title: 'Manajemen Aset',
        href: '/dashboard/aset',
        icon: 'package',
        children: [
            {
                title: 'Data Aset',
                href: '/dashboard/aset',
                icon: 'package',
            },
            {
                title: 'Barang',
                href: '/dashboard/aset/barang',
                icon: 'box',
            },
            {
                title: 'Katalog Aset',
                href: '/dashboard/aset/katalog',
                icon: 'box',
            },
            {
                title: 'Ruangan',
                href: '/dashboard/aset/ruangan',
                icon: 'building',
            },
            {
                title: 'Lokasi',
                href: '/dashboard/aset/lokasi',
                icon: 'map-pin',
            },
        ],
    },
    {
        title: 'Peminjaman',
        href: '/dashboard/peminjaman',
        icon: 'clipboard-list',
        children: [
            {
                title: 'Data Peminjaman',
                href: '/dashboard/peminjaman',
                icon: 'clipboard-list',
            },
            {
                title: 'Pengajuan Peminjaman',
                href: '/dashboard/peminjaman/pengajuan',
                icon: 'file',
            },
        ],
    },
    {
        title: 'Pengembalian',
        href: '/dashboard/pengembalian',
        icon: 'package',
        children: [
            {
                title: 'Data Pengembalian',
                href: '/dashboard/pengembalian',
                icon: 'package',
            },
            {
                title: 'Pemeriksaan Aset',
                href: '/dashboard/pengembalian/pemeriksaan',
                icon: 'check-circle',
            },
        ],
    },
    {
        title: 'Pengaduan',
        href: '/dashboard/pengaduan',
        icon: 'message',
        children: [
            {
                title: 'Laporan Kerusakan',
                href: '/dashboard/pengaduan',
                icon: 'shield',
            },
            {
                title: 'Riwayat Pengaduan',
                href: '/dashboard/pengaduan/riwayat',
                icon: 'clock',
            },
        ],
    },
    {
        title: 'Pemeliharaan',
        href: '/dashboard/pemeliharaan',
        icon: 'wrench',
        children: [
            {
                title: 'Data Pemeliharaan',
                href: '/dashboard/pemeliharaan',
                icon: 'wrench',
            },
            {
                title: 'Jadwal Pemeliharaan',
                href: '/dashboard/pemeliharaan/jadwal',
                icon: 'calendar',
            },
        ],
    },
    {
        title: 'RFID & IoT',
        href: '/dashboard/rfid',
        icon: 'rfid',
        children: [
            {
                title: 'Perangkat RFID',
                href: '/dashboard/rfid',
                icon: 'rfid',
            },
            {
                title: 'Riwayat Pemindaian',
                href: '/dashboard/rfid/pemindaian',
                icon: 'search',
            },
        ],
    },
    {
        title: 'Laporan',
        href: '/dashboard/laporan/aset',
        icon: 'chart',
        children: [
            {
                title: 'Laporan Aset',
                href: '/dashboard/laporan/aset',
                icon: 'chart',
            },
            {
                title: 'Laporan Peminjaman',
                href: '/dashboard/laporan/peminjaman',
                icon: 'activity',
            },
            {
                title: 'Laporan Kerusakan',
                href: '/dashboard/laporan/kerusakan',
                icon: 'file',
            },
        ],
    },
    {
        title: 'Manajemen Pengguna',
        href: '/dashboard/pengguna',
        icon: 'users',
        children: [
            {
                title: 'Data Pengguna',
                href: '/dashboard/pengguna',
                icon: 'users',
            },
            {
                title: 'Data Organisasi',
                href: '/dashboard/pengguna/organisasi',
                icon: 'building',
            },
        ],
    },
];

export const settingsMenu: DashboardMenuItem[] = [
    {
        title: 'Pengaturan Sistem',
        href: '/dashboard/pengaturan',
        icon: 'wrench',
    },
    {
        title: 'Profil Saya',
        href: '/dashboard/pengaturan/profil',
        icon: 'users',
    },
];
