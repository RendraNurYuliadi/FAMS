<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordResetCodeNotification extends Notification
{
    use Queueable;

    public function __construct(
        public readonly string $code,
        public readonly int $expiresInMinutes,
    ) {}

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(User $notifiable): MailMessage
    {
        $data = [
            'name' => $notifiable->name,
            'code' => $this->code,
            'expiresInMinutes' => $this->expiresInMinutes,
        ];

        return (new MailMessage)
            ->subject('Kode verifikasi reset password — FAMS')
            ->view([
                'html' => 'emails.auth.password-reset-code',
                'text' => 'emails.auth.password-reset-code-text',
            ], $data);
    }
}
