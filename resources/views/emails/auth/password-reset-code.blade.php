MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_TIMEOUT=10
MAIL_USERNAME=USERNAME_SMTP_BARU
MAIL_PASSWORD=PASSWORD_SMTP_BARU
MAIL_FROM_ADDRESS="rendra.education@gmail.com"
MAIL_FROM_NAME="FAMS"<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kode reset password FAMS</title>
</head>
<body style="margin:0;background:#f4f4f3;padding:32px 12px;font-family:Arial,Helvetica,sans-serif;color:#171717;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;border-collapse:collapse;">
        <tr>
            <td style="padding:0 0 18px;text-align:center;">
                <span style="display:inline-block;width:42px;height:42px;line-height:42px;border-radius:12px;background:#111;color:#fff;font-size:20px;font-weight:700;">F</span>
                <div style="padding-top:8px;font-size:18px;font-weight:700;letter-spacing:-.4px;">FAMS<span style="color:#a3a3a3;">.</span></div>
                <div style="padding-top:3px;color:#737373;font-size:9px;letter-spacing:2px;">FACULTY ASSET MANAGEMENT</div>
            </td>
        </tr>
        <tr>
            <td style="border:1px solid #e5e5e5;border-radius:18px;background:#fff;padding:36px 32px;">
                <div style="display:inline-block;border:1px solid #e5e5e5;border-radius:20px;background:#fafafa;padding:7px 11px;color:#737373;font-size:10px;font-weight:700;letter-spacing:1.5px;">ACCOUNT RECOVERY</div>
                <h1 style="margin:20px 0 10px;font-size:24px;line-height:1.3;letter-spacing:-.5px;">Halo, {{ $name }}.</h1>
                <p style="margin:0;color:#525252;font-size:14px;line-height:1.7;">Kami menerima permintaan untuk mengatur ulang password akun FAMS Anda. Gunakan kode verifikasi berikut:</p>
                <div style="margin:26px 0;border:1px solid #e5e5e5;border-radius:14px;background:#fafafa;padding:20px;text-align:center;">
                    <div style="color:#737373;font-size:10px;font-weight:700;letter-spacing:1.5px;">KODE VERIFIKASI</div>
                    <div style="padding-top:10px;color:#111;font-family:Arial,Helvetica,sans-serif;font-size:34px;font-weight:700;letter-spacing:10px;">{{ $code }}</div>
                </div>
                <p style="margin:0;color:#525252;font-size:13px;line-height:1.7;">Kode berlaku selama <strong>{{ $expiresInMinutes }} menit</strong> dan hanya dapat digunakan satu kali. Jangan bagikan kode ini kepada siapa pun.</p>
                <p style="margin:18px 0 0;color:#737373;font-size:12px;line-height:1.7;">Jika Anda tidak meminta reset password, abaikan email ini. Password Anda tidak akan berubah.</p>
            </td>
        </tr>
        <tr>
            <td style="padding:18px 12px 0;text-align:center;color:#a3a3a3;font-size:11px;line-height:1.6;">
                Email otomatis dari FAMS.<br>
                © {{ date('Y') }} Faculty Asset Management System
            </td>
        </tr>
    </table>
</body>
</html>
